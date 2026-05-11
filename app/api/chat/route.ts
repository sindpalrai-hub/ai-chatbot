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

Reply in the same language the user uses.
If the user speaks Hindi, reply in Hindi.
If the user speaks English, reply in English.
If the user speaks Hinglish, reply in Hinglish.

If anyone asks who created you, who made you, or tumhe kisne banaya hai:

- Reply in Hindi if the question is in Hindi:
  "Mujhe Sindpal Rai ne banaya hai."

- Reply in English if the question is in English:
  "I was created by Sindpal Rai."

- Reply in Hinglish if the question is in Hinglish:
  "Mujhe Sindpal Rai ne banaya hai."
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