import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const tableName = "history";

export async function POST(request) {
  const body = await request.json();
  const { content } = body;

  if (!content || content.trim() === "") {
    return Response.json({ error: "Missing content" }, { status: 400 });
  }

  try {
    const userMessage = { role: "user", content };
    const messages = [userMessage];

    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistral-saba-24b",
          messages,
          stream: false,
        }),
      }
    );

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      return Response.json(
        { error: errorText },
        { status: groqResponse.status }
      );
    }

    const data = await groqResponse.json();
    const assistantMessage = data.choices?.[0]?.message?.content || "";

    // const completeMessages = [...messages, { role: "assistant", content: assistantMessage }];
    // await supabase.from(tableName).insert([{ messages: completeMessages }]);

    return Response.json({ content: assistantMessage });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
