'use client';

import { books } from '@/data/books';
import { BookCard } from '@/components/BookCard';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-300 to-sky-100 p-8">
      <header className="max-w-5xl mx-auto text-center mb-12 pt-10">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-md mb-4 tracking-wider">
          童話故事屋 🏰
        </h1>
        <p className="text-xl text-white drop-shadow font-medium">
          選一本繪本，開始你的冒險吧！
        </p>
      </header>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      <footer className="mt-20 text-center text-sky-800 opacity-60">
        <p>© 2024 AI Picture Book Game</p>
      </footer>
    </main>
  );
}
