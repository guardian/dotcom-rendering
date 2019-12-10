import React from 'react';

import { Section } from '@frontend/web/components/Section';
import { Flex } from '@frontend/web/components/Flex';
import { LeftColumn } from '@frontend/web/components/LeftColumn';
import { ArticleContainer } from '@frontend/web/components/ArticleContainer';

import { Card } from './Card';
import { UL } from './components/UL';
import { LI } from './components/LI';
import { imageUrls } from './Card.mocks';

/* tslint:disable */
export default {
    component: Card,
    title: 'Components/Card',
    parameters: {
        viewport: {
            // This has the effect of turning off the viewports addon by default
            defaultViewport: 'doesNotExist',
        },
    },
};
/* tslint:enable */

export const News = () => (
    <Section>
        <Flex>
            <LeftColumn showRightBorder={false}>
                <></>
            </LeftColumn>
            <ArticleContainer>
                <UL direction="row" bottomMargin={true}>
                    <LI percentage="75%" showDivider={false} padSides={true}>
                        <Card
                            {...{
                                linkTo:
                                    '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                pillar: 'news',
                                headline: {
                                    designType: 'Article',
                                    headlineText:
                                        'The Knights Who Say Ni demand a sacrifice',
                                    size: 'large',
                                    pillar: 'news',
                                    kicker: {
                                        text: 'Monty Python',
                                        pillar: 'news',
                                    },
                                },
                                trailImage: {
                                    url: imageUrls[0],
                                    position: 'right',
                                    size: 'large',
                                },
                                standfirst:
                                    "I have to push the pram a lot. I'm not a witch. Shut up! The nose? And this isn't my nose. This is a false one. You don't vote for kings.",
                            }}
                        />
                    </LI>
                    <LI percentage="25%" showDivider={true} padSides={true}>
                        <Card
                            {...{
                                linkTo:
                                    '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                pillar: 'news',
                                headline: {
                                    designType: 'Article',
                                    headlineText: "Yes. We're all individuals",
                                    size: 'large',
                                    pillar: 'news',
                                    kicker: {
                                        text: 'Brian',
                                        pillar: 'news',
                                    },
                                },
                                trailImage: {
                                    url: imageUrls[5],
                                    position: 'top',
                                    size: 'small',
                                },
                                standfirst:
                                    "Well, obviously it's not meant to be taken literally. It refers to any manufacturer of dairy products",
                            }}
                        />
                    </LI>
                </UL>
                <UL direction="row">
                    <LI percentage="50%" padSides={true}>
                        <Card
                            {...{
                                linkTo:
                                    '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                pillar: 'culture',
                                headline: {
                                    designType: 'Article',
                                    headlineText:
                                        "You can't expect to wield supreme power just 'cause some watery tart threw a sword at you",
                                    pillar: 'news',
                                    kicker: {
                                        text: 'Holy Grail',
                                        pillar: 'culture',
                                    },
                                },
                                trailImage: {
                                    url: imageUrls[3],
                                    position: 'top',
                                    size: 'medium',
                                },
                                standfirst:
                                    'The swallow may fly south with the sun, and the house martin or the plover may seek warmer climes in winter, yet these are not strangers to our land. Burn her anyway!',
                            }}
                        />
                    </LI>
                    <LI percentage="25%" showDivider={true} padSides={true}>
                        <UL direction="column">
                            <LI bottomMargin={true} stretch={true}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'news',
                                        headline: {
                                            designType: 'Article',
                                            headlineText:
                                                'Go and boil your bottoms, sons of a silly person!',
                                            pillar: 'news',
                                            kicker: {
                                                text: 'Monty Python',
                                                pillar: 'news',
                                            },
                                        },
                                        trailImage: {
                                            url: imageUrls[6],
                                            position: 'top',
                                            size: 'small',
                                        },
                                    }}
                                />
                            </LI>
                            <LI bottomMargin={true} stretch={true}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'news',
                                        headline: {
                                            designType: 'Article',
                                            headlineText:
                                                'Listen. Strange women lying in ponds distributing swords is no basis for a system of government',
                                            pillar: 'news',
                                            size: 'small',
                                        },
                                    }}
                                />
                            </LI>
                            <LI bottomMargin={false} stretch={true}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'news',
                                        headline: {
                                            designType: 'Article',
                                            headlineText:
                                                'Supreme executive power derives from a mandate from the masses, not from some farcical aquatic ceremony',
                                            pillar: 'news',
                                            size: 'small',
                                            kicker: {
                                                text: 'Monty Python',
                                                pillar: 'news',
                                            },
                                        },
                                    }}
                                />
                            </LI>
                        </UL>
                    </LI>
                    <LI percentage="25%" showDivider={true} padSides={true}>
                        <UL direction="column">
                            <LI bottomMargin={true} stretch={true}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'sport',
                                        headline: {
                                            designType: 'Article',
                                            headlineText:
                                                'Are you suggesting that coconuts migrate?',
                                            pillar: 'news',
                                            size: 'small',
                                            kicker: {
                                                text: 'Run Away!',
                                                pillar: 'sport',
                                            },
                                        },
                                    }}
                                />
                            </LI>
                            <LI bottomMargin={true} stretch={true}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'news',
                                        headline: {
                                            designType: 'Article',
                                            headlineText:
                                                "On second thoughts, let's not go there. It is a silly place",
                                            pillar: 'news',
                                            size: 'small',
                                            kicker: {
                                                text: 'Monty Python!',
                                                pillar: 'news',
                                            },
                                        },
                                    }}
                                />
                            </LI>
                            <LI bottomMargin={true} stretch={true}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'news',
                                        headline: {
                                            designType: 'Article',
                                            headlineText:
                                                'Let us ride to Camelot',
                                            pillar: 'news',
                                            size: 'small',
                                            kicker: {
                                                text: 'Monty Python!',
                                                pillar: 'news',
                                            },
                                        },
                                    }}
                                />
                            </LI>
                            <LI bottomMargin={true} stretch={true}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'news',
                                        headline: {
                                            designType: 'Article',
                                            headlineText:
                                                "Where'd you get the coconuts?",
                                            pillar: 'news',
                                            size: 'small',
                                            kicker: {
                                                text: 'Monty Python!',
                                                pillar: 'news',
                                            },
                                        },
                                    }}
                                />
                            </LI>
                            <LI bottomMargin={true} stretch={true}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'lifestyle',
                                        headline: {
                                            designType: 'Article',
                                            headlineText:
                                                'Now, look here, my good man',
                                            pillar: 'news',
                                            size: 'small',
                                            kicker: {
                                                text: 'Terry Gillingham',
                                                pillar: 'lifestyle',
                                            },
                                        },
                                    }}
                                />
                            </LI>
                            <LI bottomMargin={false} stretch={true}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'news',
                                        headline: {
                                            designType: 'Article',
                                            headlineText:
                                                "We shall say 'Ni' again to you, if you do not appease us",
                                            pillar: 'news',
                                            size: 'small',
                                            kicker: {
                                                text: 'Monty Python',
                                                pillar: 'news',
                                            },
                                        },
                                    }}
                                />
                            </LI>
                        </UL>
                    </LI>
                </UL>
            </ArticleContainer>
        </Flex>
    </Section>
);
News.story = { name: 'News' };

export const InDepth = () => (
    <Section>
        <Flex>
            <LeftColumn showRightBorder={false}>
                <></>
            </LeftColumn>
            <ArticleContainer>
                <UL direction="row">
                    <LI percentage="50%" padSides={true}>
                        <UL direction="column">
                            <LI bottomMargin={true} stretch={true}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'sport',
                                        headline: {
                                            designType: 'Article',
                                            headlineText:
                                                "We shall say 'Ni' again to you, if you do not appease us",
                                            size: 'medium',
                                            pillar: 'news',
                                            kicker: {
                                                text: 'Holy Grail',
                                                pillar: 'sport',
                                            },
                                        },
                                        trailImage: {
                                            url: imageUrls[5],
                                            position: 'left',
                                            size: 'small',
                                        },
                                    }}
                                />
                            </LI>
                            <LI bottomMargin={true} stretch={true}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'sport',
                                        headline: {
                                            designType: 'Article',
                                            headlineText:
                                                'Now, look here, my good man',
                                            size: 'small',
                                            pillar: 'news',
                                            kicker: {
                                                text: 'Holy Grail',
                                                pillar: 'sport',
                                            },
                                        },
                                        trailImage: {
                                            url: imageUrls[6],
                                            position: 'left',
                                            size: 'small',
                                        },
                                    }}
                                />
                            </LI>
                            <LI bottomMargin={true} stretch={true}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'sport',
                                        headline: {
                                            designType: 'Article',
                                            headlineText:
                                                "Where'd you get the coconuts",
                                            size: 'small',
                                            pillar: 'news',
                                            kicker: {
                                                text: 'Holy Grail',
                                                pillar: 'sport',
                                            },
                                        },
                                        trailImage: {
                                            url: imageUrls[3],
                                            position: 'left',
                                            size: 'small',
                                        },
                                    }}
                                />
                            </LI>
                            <LI bottomMargin={true} stretch={true}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'sport',
                                        headline: {
                                            designType: 'Article',
                                            headlineText:
                                                'Let us ride to Camelot!',
                                            size: 'small',
                                            pillar: 'news',
                                            kicker: {
                                                text: 'Holy Grail',
                                                pillar: 'sport',
                                            },
                                        },
                                        trailImage: {
                                            url: imageUrls[2],
                                            position: 'left',
                                            size: 'small',
                                        },
                                    }}
                                />
                            </LI>
                            <LI bottomMargin={false} stretch={true}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'sport',
                                        headline: {
                                            designType: 'Article',
                                            headlineText:
                                                'How do you know she is a witch? Burn her!',
                                            size: 'small',
                                            pillar: 'news',
                                            kicker: {
                                                text: 'Holy Grail',
                                                pillar: 'sport',
                                            },
                                        },
                                        trailImage: {
                                            url: imageUrls[1],
                                            position: 'left',
                                            size: 'small',
                                        },
                                    }}
                                />
                            </LI>
                        </UL>
                    </LI>
                    <LI percentage="50%" showDivider={true} padSides={true}>
                        <Card
                            {...{
                                linkTo:
                                    '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                pillar: 'news',
                                headline: {
                                    designType: 'Article',
                                    headlineText:
                                        "Go and boil your bottoms, sons of a silly person!'",
                                    size: 'large',
                                    pillar: 'news',
                                    kicker: {
                                        text: 'Monty Python',
                                        pillar: 'sport',
                                    },
                                },
                                trailImage: {
                                    url: imageUrls[0],
                                    position: 'top',
                                    size: 'large',
                                },
                            }}
                        />
                    </LI>
                </UL>
            </ArticleContainer>
        </Flex>
    </Section>
);
InDepth.story = { name: 'In Depth' };

export const Related = () => (
    <Section>
        <Flex>
            <LeftColumn showRightBorder={false}>
                <></>
            </LeftColumn>
            <ArticleContainer>
                <UL direction="row" bottomMargin={true}>
                    <LI padSides={true}>
                        <Card
                            {...{
                                linkTo:
                                    '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                pillar: 'sport',
                                headline: {
                                    designType: 'Article',
                                    headlineText:
                                        "We shall say 'Ni' again to you, if you do not appease us",
                                    size: 'medium',
                                    pillar: 'news',
                                    kicker: {
                                        text: 'Holy Grail',
                                        pillar: 'sport',
                                    },
                                },
                                webPublicationDate: '2019-11-11T09:45:30.000Z',
                                trailImage: {
                                    url: imageUrls[5],
                                    position: 'top',
                                    size: 'small',
                                },
                            }}
                        />
                    </LI>
                    <LI padSides={true} showDivider={true}>
                        <Card
                            {...{
                                linkTo:
                                    '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                pillar: 'sport',
                                headline: {
                                    designType: 'Article',
                                    headlineText: 'Now, look here, my good man',
                                    size: 'medium',
                                    pillar: 'sport',
                                    kicker: {
                                        text: 'Holy Grail',
                                        pillar: 'sport',
                                    },
                                },
                                webPublicationDate: '2019-11-11T09:45:30.000Z',
                                trailImage: {
                                    url: imageUrls[6],
                                    position: 'top',
                                    size: 'small',
                                },
                            }}
                        />
                    </LI>
                    <LI padSides={true} showDivider={true}>
                        <Card
                            {...{
                                linkTo:
                                    '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                pillar: 'sport',
                                headline: {
                                    designType: 'Article',
                                    headlineText:
                                        "Where'd you get the coconuts",
                                    size: 'medium',
                                    pillar: 'sport',
                                    kicker: {
                                        text: 'Holy Grail',
                                        pillar: 'sport',
                                    },
                                },
                                webPublicationDate: '2019-11-11T09:45:30.000Z',
                                trailImage: {
                                    url: imageUrls[4],
                                    position: 'top',
                                    size: 'small',
                                },
                            }}
                        />
                    </LI>
                </UL>
                <UL direction="row">
                    <LI padSides={true}>
                        <Card
                            {...{
                                linkTo:
                                    '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                pillar: 'news',
                                headline: {
                                    designType: 'Article',
                                    headlineText:
                                        'Go and boil your bottoms, sons of a silly person!',
                                    size: 'small',
                                    pillar: 'news',
                                    kicker: {
                                        text: 'Monty Python',
                                        pillar: 'news',
                                    },
                                },
                                webPublicationDate: '2019-11-11T09:45:30.000Z',
                            }}
                        />
                    </LI>
                    <LI padSides={true} showDivider={true}>
                        <Card
                            {...{
                                linkTo:
                                    '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                pillar: 'sport',
                                headline: {
                                    designType: 'Article',
                                    headlineText: 'Let us ride to Camelot!',
                                    size: 'small',
                                    pillar: 'news',
                                    kicker: {
                                        text: 'Monty Python',
                                        pillar: 'news',
                                    },
                                },
                                webPublicationDate: '2019-11-11T09:45:30.000Z',
                            }}
                        />
                    </LI>
                    <LI padSides={true} showDivider={true}>
                        <Card
                            {...{
                                linkTo:
                                    '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                pillar: 'culture',
                                headline: {
                                    designType: 'Interview',
                                    headlineText: 'Let us ride to Camelot!',
                                    size: 'small',
                                    pillar: 'culture',
                                    kicker: {
                                        text: 'Monty Python',
                                        pillar: 'culture',
                                    },
                                },
                                webPublicationDate: '2019-11-11T09:45:30.000Z',
                            }}
                        />
                    </LI>
                    <LI padSides={true} showDivider={true}>
                        <Card
                            {...{
                                linkTo:
                                    '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                pillar: 'lifestyle',
                                headline: {
                                    designType: 'Feature',
                                    headlineText:
                                        'How do you know she is a witch? Burn her!',
                                    size: 'small',
                                    pillar: 'lifestyle',
                                    kicker: {
                                        text: 'Holy Grail',
                                        pillar: 'lifestyle',
                                    },
                                },
                                webPublicationDate: '2019-11-11T09:45:30.000Z',
                            }}
                        />
                    </LI>
                </UL>
            </ArticleContainer>
        </Flex>
    </Section>
);
Related.story = { name: 'Related Stories' };

export const Spotlight = () => (
    <Section>
        <Flex>
            <LeftColumn showRightBorder={false}>
                <></>
            </LeftColumn>
            <ArticleContainer>
                <Card
                    {...{
                        linkTo:
                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                        pillar: 'sport',
                        headline: {
                            designType: 'Feature',
                            headlineText:
                                "We shall say 'Ni' again to you, if you do not appease us",
                            size: 'large',
                            pillar: 'sport',
                            kicker: {
                                text: 'Holy Grail',
                                pillar: 'sport',
                            },
                        },
                        webPublicationDate: '2019-11-11T09:45:30.000Z',
                        trailImage: {
                            url: imageUrls[0],
                            position: 'right',
                            size: 'jumbo',
                        },
                    }}
                />
            </ArticleContainer>
        </Flex>
    </Section>
);
Spotlight.story = { name: 'Spotlight' };

export const Quad = () => (
    <Section>
        <Flex>
            <LeftColumn showRightBorder={false}>
                <></>
            </LeftColumn>
            <ArticleContainer>
                <UL direction="row">
                    <LI padSides={true}>
                        <Card
                            {...{
                                linkTo:
                                    '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                pillar: 'opinion',
                                headline: {
                                    designType: 'Comment',
                                    headlineText:
                                        "We shall say 'Ni' again to you, if you do not appease us",
                                    size: 'medium',
                                    pillar: 'opinion',
                                    kicker: {
                                        text: 'Holy Grail',
                                        pillar: 'opinion',
                                    },
                                    showQuotes: true,
                                    byline: 'George Monbiot',
                                },
                                webPublicationDate: '2019-11-11T09:45:30.000Z',
                                avatar: {
                                    src:
                                        'https://i.guim.co.uk/img/uploads/2017/10/06/George-Monbiot,-L.png?width=173&quality=85&auto=format&fit=max&s=be5b0d3f3aa55682e4930057fc3929a3',
                                    alt: 'Avatar alt text',
                                },
                                showClock: true,
                            }}
                        />
                    </LI>
                    <LI padSides={true} showDivider={true}>
                        <Card
                            {...{
                                linkTo:
                                    '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                pillar: 'opinion',
                                headline: {
                                    designType: 'Comment',
                                    headlineText:
                                        "We shall say 'Ni' again to you, if you do not appease us",
                                    size: 'medium',
                                    pillar: 'opinion',
                                    showQuotes: true,
                                },
                                webPublicationDate: '2019-11-11T09:45:30.000Z',
                                trailImage: {
                                    url: imageUrls[0],
                                    position: 'top',
                                    size: 'medium',
                                },
                                showClock: true,
                            }}
                        />
                    </LI>
                    <LI padSides={true} showDivider={true}>
                        <Card
                            {...{
                                linkTo:
                                    '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                pillar: 'news',
                                headline: {
                                    designType: 'Article',
                                    headlineText:
                                        "We shall say 'Ni' again to you, if you do not appease us",
                                    size: 'medium',
                                    pillar: 'news',
                                    kicker: {
                                        text: 'Holy Grail',
                                        pillar: 'news',
                                    },
                                },
                                webPublicationDate: '2019-11-11T09:45:30.000Z',
                                trailImage: {
                                    url: imageUrls[0],
                                    position: 'top',
                                    size: 'medium',
                                },
                                showClock: true,
                            }}
                        />
                    </LI>
                    <LI padSides={true} showDivider={true}>
                        <Card
                            {...{
                                linkTo:
                                    '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                pillar: 'news',
                                headline: {
                                    designType: 'Article',
                                    headlineText:
                                        "We shall say 'Ni' again to you, if you do not appease us",
                                    size: 'medium',
                                    pillar: 'news',
                                    kicker: {
                                        text: 'Holy Grail',
                                        pillar: 'news',
                                    },
                                },
                                webPublicationDate: '2019-11-11T09:45:30.000Z',
                                trailImage: {
                                    url: imageUrls[0],
                                    position: 'top',
                                    size: 'medium',
                                },
                                showClock: true,
                            }}
                        />
                    </LI>
                </UL>
            </ArticleContainer>
        </Flex>
    </Section>
);
Quad.story = { name: 'Four with image top' };
