import Link from 'next/link';
import Image from 'next/image';
import { Book } from '@/types/game';
import { motion } from 'framer-motion';

interface BookCardProps {
    book: Book;
}

export function BookCard({ book }: BookCardProps) {
    return (
        <Link href={`/books/${book.id}`}>
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex flex-col items-center bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer border-4 border-transparent hover:border-yellow-400 transition-colors"
            >
                <div className="relative w-full aspect-[3/4] bg-gray-200">
                    {/* Placeholder for image if not exists, or real image */}
                    {book.coverImage ? (
                        <div className="relative w-full h-full">
                            <Image
                                src={book.coverImage}
                                alt={book.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover"
                            />
                        </div>
                    ) : (
                        <div className="w-full h-full bg-blue-100 flex items-center justify-center text-gray-400">
                            <span className="text-4xl">📖</span>
                        </div>
                    )}
                </div>
                <div className="p-4 w-full bg-yellow-50 text-center">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-yellow-600">
                        {book.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                        {book.description}
                    </p>
                </div>
            </motion.div>
        </Link>
    );
}
