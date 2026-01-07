import { OpenAI } from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'File is required' }, { status: 400 });
        }

        // Convert File to strict Blob/File type required by OpenAI if needed, 
        // but in Node environment with formData, we often need to cast or just pass it if using 'openai' > 4.0
        // OpenAI SDK expects a File-like object (name, type, etc.)

        const transcription = await openai.audio.transcriptions.create({
            file: file,
            model: 'whisper-1',
            language: 'zh', // Optimized for Chinese
        });

        return NextResponse.json({ text: transcription.text });
    } catch (error) {
        console.error('STT Error:', error);
        return NextResponse.json({ error: 'Failed to transcribe audio' }, { status: 500 });
    }
}
