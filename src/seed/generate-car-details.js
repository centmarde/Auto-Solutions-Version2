
import Groq from 'groq-sdk';

// Initialize Groq with the API key from environment variables
const groq = new Groq({
  apiKey: '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',
  dangerouslyAllowBrowser: true // Enable browser usage (not recommended for production)
});

export async function getChatCompletion(make, model, fieldsToFill) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `If I enter a make and model of a car, and some details are missing, fill the form with default specifications for these fields: ${fieldsToFill.join(', ')}.\nFormat:\nMileage: \nYearModel:  \nprice(PHP): \nEngine: \nHorsepower: \nTorque: \nTopSpeed: \nTransmission:\nDescription: \n`
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
  return result;
}

