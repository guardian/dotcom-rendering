// @flow

// export type PillarType = {
//     id: string,
//     label: string,
//     href: string,
// };

// export type LinkType = {
//     label: string,
//     href: string,
//     mobileOnly?: boolean,
// };

// export type MainMenuColumnType = {
//     id: string,
//     label?: string,
//     href?: string,
//     links: Array<LinkType>,
//     isPillar: boolean,
// };

// export const pillarsConfig: Array<PillarType> = [
//     {
//         id: 'news',
//         label: 'News',
//         href: 'https://www.theguardian.com/uk',
//     },
//     {
//         id: 'opinion',
//         label: 'Opinion',
//         href: 'https://www.theguardian.com/uk/commentisfree',
//     },
//     {
//         id: 'sport',
//         label: 'Sport',
//         href: 'https://www.theguardian.com/uk/sport',
//     },
//     {
//         id: 'culture',
//         label: 'Culture',
//         href: 'https://www.theguardian.com/uk/culture',
//     },
//     {
//         id: 'lifestyle',
//         label: 'Lifestyle',
//         href: 'https://www.theguardian.com/uk/lifeandstyle',
//     },
// ];

// export const brandExtenstionsConfig: Array<LinkType> = [
//     {
//         label: 'Jobs',
//         href: 'https://jobs.theguardian.com?INTCMP=jobs_uk_web_newheader',
//     },
//     {
//         label: 'Dating',
//         href:
//             'https://soulmates.theguardian.com?INTCMP=soulmates_uk_web_newheader',
//     },
//     {
//         label: 'Holidays',
//         href:
//             'https://holidays.theguardian.com?INTCMP=holidays_uk_web_newheader',
//     },
//     {
//         label: 'Masterclasses',
//         href:
//             'https://membership.theguardian.com/masterclasses?INTCMP=masterclasses_uk_web_newheader',
//     },
//     {
//         label: 'Digital Archive',
//         href: 'https://theguardian.newspapers.com',
//     },
// ];

// export const columnsConfig: Array<MainMenuColumnType> = [
//     {
//         id: 'news',
//         label: 'News',
//         isPillar: true,
//         links: [
//             {
//                 label: 'UK news',
//                 href: 'https://www.theguardian.com/uk-news',
//             },
//             {
//                 label: 'World news',
//                 href: 'https://www.theguardian.com/world',
//             },
//             {
//                 label: 'Business',
//                 href: 'https://www.theguardian.com/uk/business',
//             },
//             {
//                 label: 'World Cup 2018',
//                 href: 'https://www.theguardian.com/football/world-cup-2018',
//             },
//             {
//                 label: 'Football',
//                 href: 'https://www.theguardian.com/football',
//             },
//             {
//                 label: 'UK politics',
//                 href: 'https://www.theguardian.com/politics',
//             },
//             {
//                 label: 'Environment',
//                 href: 'https://www.theguardian.com/uk/environment',
//             },
//             {
//                 label: 'Education',
//                 href: 'https://www.theguardian.com/education',
//             },
//             {
//                 label: 'Science',
//                 href: 'https://www.theguardian.com/science',
//             },
//             {
//                 label: 'Tech',
//                 href: 'https://www.theguardian.com/uk/technology',
//             },
//             {
//                 label: 'Global development',
//                 href: 'https://www.theguardian.com/global-development',
//             },
//             {
//                 label: 'Cities',
//                 href: 'https://www.theguardian.com/cities',
//             },
//             {
//                 label: 'Obituaries',
//                 href: 'https://www.theguardian.com/tone/obituaries',
//             },
//         ],
//     },
//     {
//         id: 'opinion',
//         label: 'Opinion',
//         isPillar: true,
//         links: [
//             {
//                 label: 'The Guardian view',
//                 href: 'https://www.theguardian.com/profile/editorial',
//             },
//             {
//                 label: 'Columnists',
//                 href: 'https://www.theguardian.com/index/contributors',
//             },
//             {
//                 label: 'Cartoons',
//                 href: 'https://www.theguardian.com/cartoons/archive',
//             },
//             {
//                 label: 'Opinion videos',
//                 href:
//                     'https://www.theguardian.com/commentisfree/series/comment-is-free-weekly',
//             },
//             {
//                 label: 'Letters',
//                 href: 'https://www.theguardian.com/tone/letters',
//             },
//         ],
//     },
//     {
//         id: 'sport',
//         label: 'Sport',
//         isPillar: true,
//         links: [
//             {
//                 label: 'World Cup 2018',
//                 href: 'https://www.theguardian.com/football/world-cup-2018',
//             },
//             {
//                 label: 'Football',
//                 href: 'https://www.theguardian.com/football',
//             },
//             {
//                 label: 'Rugby union',
//                 href: 'https://www.theguardian.com/sport/rugby-union',
//             },
//             {
//                 label: 'Cricket',
//                 href: 'https://www.theguardian.com/sport/cricket',
//             },
//             {
//                 label: 'Tennis',
//                 href: 'https://www.theguardian.com/sport/tennis',
//             },
//             {
//                 label: 'Cycling',
//                 href: 'https://www.theguardian.com/sport/cycling',
//             },
//             {
//                 label: 'F1',
//                 href: 'https://www.theguardian.com/sport/formulaone',
//             },
//             {
//                 label: 'Golf',
//                 href: 'https://www.theguardian.com/sport/golf',
//             },
//             {
//                 label: 'Boxing',
//                 href: 'https://www.theguardian.com/sport/boxing',
//             },
//             {
//                 label: 'Rugby league',
//                 href: 'https://www.theguardian.com/sport/rugbyleague',
//             },
//             {
//                 label: 'Racing',
//                 href: 'https://www.theguardian.com/sport/horse-racing',
//             },
//             {
//                 label: 'US sports',
//                 href: 'https://www.theguardian.com/sport/us-sport',
//             },
//         ],
//     },
//     {
//         id: 'culture',
//         label: 'Culture',
//         isPillar: true,
//         links: [
//             {
//                 label: 'Film',
//                 href: 'https://www.theguardian.com/uk/film',
//             },
//             {
//                 label: 'Music',
//                 href: 'https://www.theguardian.com/music',
//             },
//             {
//                 label: 'TV & radio',
//                 href: 'https://www.theguardian.com/uk/tv-and-radio',
//             },
//             {
//                 label: 'Books',
//                 href: 'https://www.theguardian.com/books',
//             },
//             {
//                 label: 'Art & design',
//                 href: 'https://www.theguardian.com/artanddesign',
//             },
//             {
//                 label: 'Stage',
//                 href: 'https://www.theguardian.com/stage',
//             },
//             {
//                 label: 'Games',
//                 href: 'https://www.theguardian.com/games',
//             },
//             {
//                 label: 'Classical',
//                 href:
//                     'https://www.theguardian.com/music/classicalmusicandopera',
//             },
//         ],
//     },
//     {
//         id: 'lifestyle',
//         label: 'Lifestyle',
//         isPillar: true,
//         links: [
//             {
//                 label: 'Fashion',
//                 href: 'https://www.theguardian.com/fashion',
//             },
//             {
//                 label: 'Food',
//                 href: 'https://www.theguardian.com/lifeandstyle/food-and-drink',
//             },
//             {
//                 label: 'Recipes',
//                 href: 'https://www.theguardian.com/tone/recipes',
//             },
//             {
//                 label: 'Travel',
//                 href: 'https://www.theguardian.com/uk/travel',
//             },
//             {
//                 label: 'Health & fitness',
//                 href:
//                     'https://www.theguardian.com/lifeandstyle/health-and-wellbeing',
//             },
//             {
//                 label: 'Women',
//                 href: 'https://www.theguardian.com/lifeandstyle/women',
//             },
//             {
//                 label: 'Love & sex',
//                 href: 'https://www.theguardian.com/lifeandstyle/love-and-sex',
//             },
//             {
//                 label: 'Beauty',
//                 href: 'https://www.theguardian.com/fashion/beauty',
//             },
//             {
//                 label: 'Home & garden',
//                 href:
//                     'https://www.theguardian.com/lifeandstyle/home-and-garden',
//             },
//             {
//                 label: 'Money',
//                 href: 'https://www.theguardian.com/uk/money',
//             },
//             {
//                 label: 'Cars',
//                 href: 'https://www.theguardian.com/technology/motoring',
//             },
//         ],
//     },
//     {
//         id: 'more',
//         isPillar: false,
//         links: [
//             {
//                 label: 'Video',
//                 href: 'https://www.theguardian.com/video',
//             },
//             {
//                 label: 'Podcasts',
//                 href: 'https://www.theguardian.com/podcasts',
//             },
//             {
//                 label: 'Pictures',
//                 href: 'https://www.theguardian.com/inpictures',
//             },
//             {
//                 label: 'Newsletters',
//                 href: 'https://www.theguardian.com/email-newsletters',
//             },
//             {
//                 label: "Today's paper",
//                 href: 'https://www.theguardian.com/theguardian',
//             },
//             {
//                 label: 'Inside the Guardian',
//                 href: 'https://www.theguardian.com/membership',
//             },
//             {
//                 label: 'The Observer',
//                 href: 'https://www.theguardian.com/observer',
//             },
//             {
//                 label: 'Digital archive',
//                 href: 'https://theguardian.newspapers.com',
//             },
//             {
//                 label: 'Professional networks',
//                 href: 'https://www.theguardian.com/guardian-professional',
//             },
//             {
//                 label: 'Crosswords',
//                 href: 'https://www.theguardian.com/crosswords',
//             },
//             {
//                 label: 'Guardian Masterclasses',
//                 href: 'https://www.theguardian.com/guardian-masterclasses',
//             },
//         ],
//     },
// ];
