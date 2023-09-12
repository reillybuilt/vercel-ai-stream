import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
  apiKey: import.meta.env.PUBLIC_OPENAI_API_KEY,
});

export const runtime = 'edge';

export async function POST({ request }) {
  const { messages } = await request.json();
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages,
  });

  // Transform the response into a readable stream
  const stream = OpenAIStream(response);

  // Return a StreamingTextResponse, which can be consumed by the client
  return new StreamingTextResponse(stream);
}
