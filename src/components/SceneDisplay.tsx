import { Scene } from '@/types/game';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import { useState } from 'react';

interface SceneDisplayProps {
    scene: Scene;
    onNext: () => void;
    onPrev: () => void;
    showNext: boolean;
    showPrev: boolean;
}

export function SceneDisplay({ scene, onNext, onPrev, showNext, showPrev }: SceneDisplayProps) {
    const [isPlaying, setIsPlaying] = useState(false);

    const playAudio = async () => {
        if (isPlaying) return;
        setIsPlaying(true);
        try {
            const response = await fetch('/api/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: scene.storyText }),
            });

            if (!response.ok) throw new Error('TTS failed');

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const audio = new Audio(url);

            audio.onended = () => setIsPlaying(false);
            audio.play();
        } catch (err) {
            console.error(err);
            setIsPlaying(false);
        }
    };

    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-6 bg-white rounded-3xl shadow-xl min-h-[600px]">
            <div className="relative w-full aspect-video bg-gray-100 rounded-2xl overflow-hidden mb-6 border-4 border-orange-200">
                {scene.imageUrl ? (
                    <div className="w-full h-full bg-orange-50 flex items-center justify-center">
                        {/* Image Placeholder */}
                        <span className="text-6xl">🖼️</span>
                    </div>
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                    </div>
                )}
            </div>

            <div className="flex-1 w-full text-center flex flex-col items-center justify-center space-y-4">
                <p className="text-2xl md:text-3xl font-medium text-gray-800 leading-relaxed font-serif">
                    {scene.storyText}
                </p>

                <button
                    onClick={playAudio}
                    disabled={isPlaying}
                    className={`flex items-center space-x-2 px-6 py-2 rounded-full transition-all ${isPlaying
                        ? 'bg-yellow-300 text-yellow-800 scale-105 shadow-inner'
                        : 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700 shadow-sm'
                        }`}
                >
                    <Volume2 size={24} className={isPlaying ? 'animate-pulse' : ''} />
                    <span>{isPlaying ? '播放中...' : '播放語音'}</span>
                </button>
            </div>

            <div className="w-full flex justify-between mt-8">
                <button
                    onClick={onPrev}
                    disabled={!showPrev}
                    className={`px-6 py-3 rounded-full font-bold text-lg transition-all ${showPrev
                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300 transform hover:scale-105'
                        : 'opacity-0 pointer-events-none'
                        }`}
                >
                    ⬅️ 上一頁
                </button>

                <button
                    onClick={onNext}
                    disabled={!showNext}
                    className={`px-8 py-3 rounded-full font-bold text-lg transition-all ${showNext
                        ? 'bg-green-500 text-white hover:bg-green-600 shadow-lg transform hover:scale-105'
                        : 'opacity-0 pointer-events-none'
                        }`}
                >
                    {scene.question ? '去回答問題 ➡️' : '下一頁 ➡️'}
                </button>
            </div>
        </div>
    );
}
