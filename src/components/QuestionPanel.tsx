import { Question } from '@/types/game';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Mic } from 'lucide-react';
import { useState } from 'react';

interface QuestionPanelProps {
    question: Question;
    onAnswer: (isCorrect: boolean) => void;
}

export function QuestionPanel({ question, onAnswer }: QuestionPanelProps) {
    const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleOptionClick = (optionId: string) => {
        if (isSubmitted) return;
        setSelectedOptionId(optionId);
        setIsSubmitted(true);

        const isCorrect = optionId === question.correctOptionId;
        // Delay slightly to show selection animation before proceeding (in real app)
        // Here we just call onAnswer immediately or after a short delay
        setTimeout(() => {
            onAnswer(isCorrect);
        }, 1500);
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
                                className={`flex items-center justify-between p-6 rounded-2xl border-2 text-xl font-medium text-left transition-colors ${bgColor} ${borderColor} shadow-sm`}
                                disabled={isSubmitted}
                            >
                                <span>{option.text}</span>
                                {icon}
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            <div className="mt-8 w-full flex justify-center">
                <button className="flex items-center space-x-2 px-6 py-4 bg-purple-500 text-white rounded-full font-bold shadow-md hover:bg-purple-600 transition-transform hover:scale-105">
                    <Mic size={24} />
                    <span>用語音回答</span>
                </button>
            </div>

            {isSubmitted && (
                <div className="mt-6 text-xl font-bold text-center animate-pulse">
                    {selectedOptionId === question.correctOptionId ? (
                        <span className="text-green-600">{question.feedbackCorrect}</span>
                    ) : (
                        <span className="text-red-500">{question.feedbackIncorrect}</span>
                    )}
                </div>
            )}
        </div>
    );
}
