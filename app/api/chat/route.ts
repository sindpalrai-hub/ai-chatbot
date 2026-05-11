import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const chatCompletion =
      await groq.chat.completions.create({

        messages: [

          {
            role: "system",

            content: `
You are a ${body.personality} AI companion.

Talk naturally like a real human.
`,
          },

          {
            role: "user",
            content: body.message,
          },
        ],

        model: "llama-3.1-8b-instant",
      });

    const reply =
      chatCompletion
        .choices[0]
        ?.message?.content;

    return Response.json({
      reply,
    });

  } catch (error) {

    console.log(error);

    return Response.json({
      reply: "Error 😢",
    });
  }
}