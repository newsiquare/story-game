import { OpenAI } from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
    try {
        const { question, userAnswer, correctOptionText } = await req.json();

        if (!question || !userAnswer) {
            return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
        }

        const systemPrompt = `
      You are a friendly teacher for a children's picture book game. 
      The child answers a question about the story.
      
      Question: "${question}"
      Correct Answer Logic: "${correctOptionText}"
      
      Your task:
      1. Determine if the User's Answer ("${userAnswer}") is essentially correct based on the Correct Answer Logic. It doesn't have to be exact word-for-word, just conceptually right.
      2. If correct, provide a short, enthusiastic compliment in Traditional Chinese (Taiwan).
      3. If incorrect, provide a gentle, encouraging hint in Traditional Chinese (Taiwan), guiding them to the right answer without scolding.
      
      Output JSON format:
      {
        "isCorrect": boolean,
        "feedback": "string"
      }
    `;

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                { role: 'system', content: 'You are a helpful JSON assistant.' },
                { role: 'user', content: systemPrompt }
            ],
            response_format: { type: 'json_object' },
        });

        const result = JSON.parse(completion.choices[0].message.content || '{}');

        return NextResponse.json(result);
    } catch (error) {
        console.error('Judge Error:', error);
        return NextResponse.json({ error: 'Failed to evaluate answer' }, { status: 500 });
    }
}
