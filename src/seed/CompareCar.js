// CompareCar.js
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: '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',
  dangerouslyAllowBrowser: true,
});

async function getResponse(userMessage) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You will compare the two cars and provide ratings 0 to 100 in the format: Design: V, Topspeed: W, Torque: X, Technology: Y, Comfort: Z, FuelEfficiency: Q, ResaleValue: S; Topspeed: A, Torque: B, Technology: C, Comfort: D, Design: E,  FuelEfficiency: G, ResaleValue: I; 'OverallComment: <comment>'; 'Winner: <car>';"
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
    model: "llama3-groq-70b-8192-tool-use-preview",
    temperature: 0.5,
    max_tokens: 1024,
    top_p: 0.65,
    stream: true,
    stop: null,
  });

  let response = '';
  for await (const chunk of chatCompletion) {
    response += chunk.choices[0]?.delta?.content || '';
  }
  console.log(response);
  return response;
}

export { getResponse };
