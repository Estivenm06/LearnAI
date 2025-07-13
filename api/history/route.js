import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);
const tableName = "history";

export async function GET() {
  const { data } = await supabase.from(tableName).select("*");
  return Response.json(data);
}

export async function PUT(request) {
  try {
    const body = await request.json();

    if (Object.keys(body).length === 0)
      return Response.json({ error: "Body is empty." });

    const { id, message } = body;
    if (message.trim() === "")
      return Response.json({ error: "Message is empty." });

    const { data, error } = await supabase
      .from(tableName)
      .update({ message })
      .eq("id", id)
      .select();
    console.log(data);

    if (error) return Response.json(error);

    return Response.json(data);
  } catch (error) {
    return Response.json({ error: error.message });
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();

    if (Object.keys(body).length === 0)
      return Response.json({ error: "Body is empty." });

    const { id } = body;

    const { data, error } = await supabase
      .from(tableName)
      .delete()
      .eq("id", id)
      .select();

    if (error) return Response.json(error);

    return Response.json(data);
  } catch (error) {
    return Response.json({ error: error.message });
  }
}
