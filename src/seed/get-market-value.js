import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: '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',
  dangerouslyAllowBrowser: true
});

export async function getMarketValue(make, model) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `Provide a realistic market value for the make "${make}" and model "${model}" over the past 5 solds, provide the value only eg(5,000,000) no text in it. in the following format:\nsold1: \nsold2: \nsold3: \nsold4: \nsold5: \n`
      },
      {
        role: 'user',
        content: `${make} ${model}`
      }
    ],
    model: 'llama3-groq-70b-8192-tool-use-preview',
    temperature: 1,
    max_tokens: 1024,
    top_p: 1,
    stream: true,
    stop: null
  });

  let result = '';
  for await (const chunk of chatCompletion) {
    result += chunk.choices[0]?.delta?.content || '';
  }

  if (typeof result !== 'string') {
    throw new Error('Expected result to be a string');
  }

  const marketValues = [];
  const lines = result.trim().split('\n');

  // Debugging: Log the response to see the format
  console.log('Market Value Response:', result);

  lines.forEach(line => {
    const [month, value] = line.split(':').map(part => part.trim());
    
    // Log month and value to debug
    console.log(`Sold: ${month}, Value: ${value}`);

    if (month && value) {
      // Check if value is a string before replacing
      if (typeof value === 'string') {
        const floatValue = parseFloat(value.replace(/[$,]/g, ''));
        if (!isNaN(floatValue)) {
          marketValues.push(floatValue);
        }
      } else {
        console.warn(`Expected value to be a string but got: ${typeof value}`, value);
      }
    }
  });

  return marketValues; // Return an array of market values
}
