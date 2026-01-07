import { Book } from '@/types/game';

export const books: Book[] = [
    {
        id: 'three-little-pigs',
        title: '三隻小豬',
        description: '三隻小豬蓋房子的故事，教導我們勤勞的重要性。',
        coverImage: '/images/pigs/cover.webp',
        scenes: [
            {
                id: 'scene-1',
                storyText: '從前有三隻小豬，因為長大了，豬媽媽叫他們要搬出去自己住。',
                imageUrl: '/images/pigs/scene1.webp',
                question: {
                    id: 'q1',
                    text: '為什麼豬媽媽要三隻小豬搬出去？',
                    options: [
                        { id: 'a', text: '因為家裡太擠了' },
                        { id: 'b', text: '因為他們長大了' },
                        { id: 'c', text: '因為沒有食物了' },
                    ],
                    correctOptionId: 'b',
                    feedbackCorrect: '太棒了！因為他們長大了，要學習獨立喔！',
                    feedbackIncorrect: '再聽一次喔，豬媽媽是說他們長大了。',
                },
            },
            // Placeholder for other 5 scenes
            {
                id: 'scene-2',
                storyText: '豬大哥很懶惰，隨便用稻草蓋了一間房子。',
                imageUrl: '/images/pigs/scene2.webp',
            },
            {
                id: 'scene-3',
                storyText: '豬二哥也很貪玩，用木頭蓋了一間房子。',
                imageUrl: '/images/pigs/scene3.webp',
            },
            {
                id: 'scene-4',
                storyText: '只有豬小弟很勤勞，辛苦地用磚頭蓋了一間堅固的房子。',
                imageUrl: '/images/pigs/scene4.webp',
            },
            {
                id: 'scene-5',
                storyText: '大野狼來了！吹垮了稻草屋和木頭屋，小豬們嚇得躲進磚頭屋。',
                imageUrl: '/images/pigs/scene5.webp',
            },
            {
                id: 'scene-6',
                storyText: '大野狼怎麼吹也吹不倒磚頭屋，最後只好灰溜溜地逃走了。',
                imageUrl: '/images/pigs/scene6.webp',
            }
        ],
    },
    {
        id: 'jack-beanstalk',
        title: '傑克與魔豆',
        description: '傑克用乳牛換了一顆神奇的豆子...',
        coverImage: '/images/jack/cover.webp',
        scenes: [], // Placeholder
    },
    // Placeholders for other 3 books
    { id: 'book-3', title: '小紅帽', description: '...', coverImage: '', scenes: [] },
    { id: 'book-4', title: '醜小鴨', description: '...', coverImage: '', scenes: [] },
    { id: 'book-5', title: '龜兔賽跑', description: '...', coverImage: '', scenes: [] },
];
