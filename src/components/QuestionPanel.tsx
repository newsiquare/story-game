import { Question } from '@/types/game';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Mic, Square, Loader2 } from 'lucide-react';
import { useState, useRef } from 'react';

interface QuestionPanelProps {
    question: Question;
    onAnswer: (isCorrect: boolean) => void;
}

export function QuestionPanel({ question, onAnswer }: QuestionPanelProps) {
    const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Voice interaction states
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [voiceTranscript, setVoiceTranscript] = useState('');
    const [aiFeedback, setAiFeedback] = useState('');

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const playFeedbackAudio = async (text: string) => {
        try {
            const response = await fetch('/api/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text }),
            });
            if (response.ok) {
                const blob = await response.blob();
                const audio = new Audio(URL.createObjectURL(blob));
                audio.play();
            }
        } catch (e) {
            console.error('Feedback TTS error', e);
        }
    };

    const handleVoiceAnswer = async () => {
        if (isRecording) {
            // Stop recording
            mediaRecorderRef.current?.stop();
            setIsRecording(false);
            setIsProcessing(true);
        } else {
            // Start recording
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorderRef.current = mediaRecorder;
                chunksRef.current = [];

                mediaRecorder.ondataavailable = (e) => {
                    if (e.data.size > 0) chunksRef.current.push(e.data);
                };

                mediaRecorder.onstop = async () => {
                    const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });

                    try {
                        // 1. STT
                        const formData = new FormData();
                        formData.append('file', audioBlob, 'answer.webm');

                        const sttRes = await fetch('/api/stt', { method: 'POST', body: formData });
                        const sttData = await sttRes.json();

                        if (sttData.text) {
                            setVoiceTranscript(sttData.text);

                            // 2. Judge
                            const judgeRes = await fetch('/api/judge', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    question: question.text,
                                    userAnswer: sttData.text,
                                    correctOptionText: question.options.find(o => o.id === question.correctOptionId)?.text
                                }),
                            });

                            const judgeData = await judgeRes.json();
                            setIsSubmitted(true);
                            setAiFeedback(judgeData.feedback);

                            // 3. Play AI Feedback
                            await playFeedbackAudio(judgeData.feedback);

                            onAnswer(judgeData.isCorrect);
                        }
                    } catch (err) {
                        console.error(err);
                        alert('語音辨識失敗，請再試一次');
                    } finally {
                        setIsProcessing(false);
                    }
                };

                mediaRecorder.start();
                setIsRecording(true);
            } catch (err) {
                console.error('Microphone access denied', err);
                alert('無法存取麥克風');
            }
        }
    };

    const handleOptionClick = (optionId: string) => {
        if (isSubmitted || isProcessing) return;
        setSelectedOptionId(optionId);
        setIsSubmitted(true);

        const isCorrect = optionId === question.correctOptionId;
        const feedback = isCorrect ? question.feedbackCorrect : question.feedbackIncorrect;
        setAiFeedback(feedback);
        playFeedbackAudio(feedback);

        setTimeout(() => {
            onAnswer(isCorrect);
        }, 2000);
    };

    return (
        <div className="flex flex-col items-center w-full max-w-3xl mx-auto p-8 bg-sky-50 rounded-3xl shadow-xl min-h-[500px] border-4 border-sky-200">
            <div className="flex-1 w-full flex flex-col items-center justify-center">
                <h3 className="text-3xl font-bold text-sky-900 mb-8 text-center leading-normal">
                    {question.text}
                </h3>

                <div className="grid gap-4 w-full">
                    {question.options.map((option) => {
                        let bgColor = 'bg-white';
                        let borderColor = 'border-sky-100';
                        let icon = null;

                        if (isSubmitted && option.id === selectedOptionId) {
                            if (option.id === question.correctOptionId) {
                                bgColor = 'bg-green-100';
                                borderColor = 'border-green-400';
                                icon = <CheckCircle className="text-green-500" />;
                            } else {
                                bgColor = 'bg-red-100';
                                borderColor = 'border-red-400';
                                icon = <XCircle className="text-red-500" />;
                            }
                        }

                        return (
                            <motion.button
                                key={option.id}
                                whileHover={!isSubmitted ? { scale: 1.02 } : {}}
                                whileTap={!isSubmitted ? { scale: 0.98 } : {}}
                                onClick={() => handleOptionClick(option.id)}
                                className={`flex items-center justify-between p-6 rounded-2xl border-2 text-xl font-medium text-left transition-colors ${bgColor} ${borderColor} shadow-sm text-black`}
                                disabled={isSubmitted || isProcessing}
                            >
                                <span>{option.text}</span>
                                {icon}
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            <div className="mt-8 w-full flex flex-col items-center space-y-4">
                <button
                    onClick={handleVoiceAnswer}
                    disabled={isSubmitted || isProcessing}
                    className={`flex items-center space-x-2 px-6 py-4 rounded-full font-bold shadow-md transition-all ${isRecording
                        ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                        : 'bg-purple-500 hover:bg-purple-600 text-white hover:scale-105'
                        }`}
                >
                    {isProcessing ? (
                        <Loader2 className="animate-spin" size={24} />
                    ) : isRecording ? (
                        <Square size={24} />
                    ) : (
                        <Mic size={24} />
                    )}
                    <span>
                        {isProcessing ? 'AI 思考中...' : isRecording ? '停止錄音' : '用語音回答'}
                    </span>
                </button>

                {voiceTranscript && (
                    <p className="text-gray-500 italic">"{voiceTranscript}"</p>
                )}
            </div>

            {isSubmitted && aiFeedback && (
                <div className="mt-6 text-xl font-bold text-center animate-pulse text-purple-700 bg-purple-50 px-4 py-2 rounded-lg">
                    🤖: {aiFeedback}
                </div>
            )}
        </div>
    );
}
