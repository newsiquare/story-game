'use client';

import { useState, use, useEffect } from 'react';
import { books } from '@/data/books';
import { notFound } from 'next/navigation';
import { SceneDisplay } from '@/components/SceneDisplay';
import { QuestionPanel } from '@/components/QuestionPanel';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

type Mode = 'READING' | 'QUESTION';

export default function BookPage({ params }: { params: Promise<{ id: string }> }) {
    // Unwrap params using React.use() for latest Next.js support 
    const { id } = use(params);

    const book = books.find((b) => b.id === id);

    const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
    const [mode, setMode] = useState<Mode>('READING');

    if (!book) {
        notFound();
    }

    const currentScene = book.scenes[currentSceneIndex];
    const isLastScene = currentSceneIndex === book.scenes.length - 1;

    // Handler for navigation
    const handleNext = () => {
        if (currentScene.question && mode === 'READING') {
            setMode('QUESTION');
        } else {
            if (currentSceneIndex < book.scenes.length - 1) {
                setCurrentSceneIndex((prev) => prev + 1);
                setMode('READING');
            }
        }
    };

    const handlePrev = () => {
        if (mode === 'QUESTION') {
            setMode('READING');
        } else if (currentSceneIndex > 0) {
            setCurrentSceneIndex((prev) => prev - 1);
        }
    };

    const handleQuestionAnswer = (isCorrect: boolean) => {
        if (isCorrect) {
            // Wait a bit for the user to hear feedback, then move on
            setTimeout(() => {
                if (currentSceneIndex < book.scenes.length - 1) {
                    setCurrentSceneIndex((prev) => prev + 1);
                    setMode('READING');
                } else {
                    // End of book logic
                    alert('恭喜你讀完了整本故事！');
                }
            }, 2000);
        }
    };

    return (
        <main className="min-h-screen bg-amber-50 p-4 md:p-8 flex flex-col items-center">
            <header className="w-full max-w-5xl flex justify-between items-center mb-6">
                <Link href="/" className="text-amber-800 font-bold hover:underline">
                    🏠 回首頁
                </Link>
                <h1 className="text-2xl font-bold text-amber-900">{book.title}</h1>
                <div className="w-10"></div> {/* Spacer */}
            </header>

            <div className="w-full max-w-5xl flex-1 flex justify-center items-center relative">
                <AnimatePresence mode="wait">
                    {mode === 'READING' ? (
                        <motion.div
                            key="scene"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="w-full"
                        >
                            <SceneDisplay
                                scene={currentScene}
                                onNext={handleNext}
                                onPrev={handlePrev}
                                showNext={true} // Always show next, it either goes to question or next scene
                                showPrev={currentSceneIndex > 0}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="question"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="w-full"
                        >
                            {currentScene.question && (
                                <QuestionPanel
                                    question={currentScene.question}
                                    onAnswer={handleQuestionAnswer}
                                />
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="mt-8 text-center text-amber-800/50 text-sm">
                頁碼: {currentSceneIndex + 1} / {book.scenes.length}
            </div>
        </main>
    );
}
