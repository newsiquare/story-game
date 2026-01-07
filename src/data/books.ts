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
        description: '傑克用乳牛換了一顆神奇的豆子，長出了通往天空的藤蔓...',
        coverImage: '/images/jack/cover.webp',
        scenes: [
            {
                id: 'jack-1',
                storyText: '從前有個男孩叫傑克，他用家裡的乳牛換了一顆神奇的豆子。',
                imageUrl: '/images/jack/scene1.webp',
                question: {
                    id: 'q-jack-1',
                    text: '傑克用什麼換了豆子？',
                    options: [
                        { id: 'a', text: '黃金' },
                        { id: 'b', text: '乳牛' },
                        { id: 'c', text: '小羊' },
                    ],
                    correctOptionId: 'b',
                    feedbackCorrect: '答對了！是一隻乳牛喔！',
                    feedbackIncorrect: '不對喔，想想看，家裡原本養的是什麼？',
                }
            },
            {
                id: 'jack-2',
                storyText: '第二天早上，豆子長成了巨大的藤蔓，直通雲霄！',
                imageUrl: '/images/jack/scene2.webp'
            }
        ],
    },
    {
        id: 'book-3',
        title: '小紅帽',
        description: '小紅帽要去看望奶奶，但是在森林裡遇見了大野狼。',
        coverImage: '/images/red/cover.webp',
        scenes: [
            {
                id: 'red-1',
                storyText: '有一天，媽媽叫小紅帽送點心去給生病的奶奶。',
                imageUrl: '/images/red/scene1.webp',
                question: {
                    id: 'q-red-1',
                    text: '小紅帽要去哪裡？',
                    options: [
                        { id: 'a', text: '去上學' },
                        { id: 'b', text: '去公園玩' },
                        { id: 'c', text: '去奶奶家' }
                    ],
                    correctOptionId: 'c',
                    feedbackCorrect: '沒錯！她要送點心去奶奶家。',
                    feedbackIncorrect: '她是提著籃子要出門喔，想想看要去哪裡？'
                }
            }
        ]
    },
    {
        id: 'book-4',
        title: '醜小鴨',
        description: '一隻長得不一樣的小鴨子，經歷了許多困難，最後變成了天鵝。',
        coverImage: '/images/duck/cover.webp',
        scenes: [
            {
                id: 'duck-1',
                storyText: '鴨媽媽孵出了一隻特別大的蛋，生出了一隻長得灰灰的醜小鴨。',
                imageUrl: '/images/duck/scene1.webp'
            }
        ]
    },
    {
        id: 'book-5',
        title: '龜兔賽跑',
        description: '驕傲的兔子和勤勞的烏龜比賽跑步，誰會贏呢？',
        coverImage: '/images/race/cover.webp',
        scenes: [
            {
                id: 'race-1',
                storyText: '兔子嘲笑烏龜爬得慢，於是他們決定來比賽跑步。',
                imageUrl: '/images/race/scene1.webp',
                question: {
                    id: 'q-race-1',
                    text: '誰嘲笑烏龜爬得慢？',
                    options: [
                        { id: 'a', text: '兔子' },
                        { id: 'b', text: '獅子' },
                        { id: 'c', text: '大象' }
                    ],
                    correctOptionId: 'a',
                    feedbackCorrect: '對的，是驕傲的兔子。',
                    feedbackIncorrect: '不是喔，是跑得很快的那種動物。'
                }
            }
        ]
    },
];

