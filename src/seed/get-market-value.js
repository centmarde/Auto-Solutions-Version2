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
          content: `Provide the market values for the make "${make}" and model "${model}" over the past 5 months in the following format:\nMay: \nJune: \nJuly: \nAugust: \nSeptember: \n`
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
    lines.forEach(line => {
      const [month, value] = line.split(':').map(part => part.trim());
      if (month && value) {
        marketValues.push(parseFloat(value.replace(/[$,]/g, ''))); // Convert to float and clean value
      }
    });

    return marketValues; // Return an array of market values
}
