const Groq = require('groq-sdk');

const groq = new Groq();
async function main() {
  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      {
        "role": "system",
        "content": "create a detailed specs of a specific car."
      },
      {
        "role": "user",
        "content": "show car details in this car? honda, supra"
      }
    ],
    "model": "llama3-groq-70b-8192-tool-use-preview",
    "temperature": 0.5,
    "max_tokens": 1024,
    "top_p": 0.65,
    "stream": true,
    "stop": null
  });

  for await (const chunk of chatCompletion) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
}

main();

// token: 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