import React from 'react';

import { Section } from '@frontend/web/components/Section';
import { Flex } from '@frontend/web/components/Flex';
import { ArticleLeft } from '@frontend/web/components/ArticleLeft';
import { ArticleContainer } from '@frontend/web/components/ArticleContainer';
import { UL } from '@frontend/web/components/UL';
import { LI } from '@frontend/web/components/LI';

import { Cards } from './Cards';
import { imageElements } from './Cards.mocks';

/* tslint:disable */
export default {
    component: Cards,
    title: 'Components/Cards',
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
            <ArticleLeft showRightBorder={false}>
                <></>
            </ArticleLeft>
            <ArticleContainer>
                <UL direction="row">
                    <LI percentage="75%">
                        <Cards
                            direction="row"
                            cards={[
                                {
                                    linkTo:
                                        '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                    pillar: 'news',
                                    headlineString:
                                        'The Knights Who Say Ni demand a sacrifice',
                                    standfirst:
                                        "I have to push the pram a lot. I'm not a witch. Shut up! The nose? And this isn't my nose. This is a false one. You don't vote for kings.",
                                    kicker: {
                                        text: 'Monty Python',
                                        pillar: 'news',
                                    },
                                    headlineSize: 'xsmall',
                                    image: {
                                        element: imageElements[0],
                                        position: 'right',
                                        size: 'large',
                                    },
                                },
                            ]}
                        />
                    </LI>
                    <LI percentage="25%">
                        <Cards
                            direction="row"
                            cards={[
                                {
                                    linkTo:
                                        '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                    pillar: 'news',
                                    headlineString:
                                        "Yes. We're all individuals",
                                    kicker: {
                                        text: 'Brian',
                                        pillar: 'news',
                                    },
                                    image: {
                                        element: imageElements[5],
                                        position: 'top',
                                        size: 'small',
                                    },
                                    standfirst:
                                        "Well, obviously it's not meant to be taken literally. It refers to any manufacturer of dairy products",
                                },
                            ]}
                        />
                    </LI>
                </UL>
                <UL direction="row">
                    <LI percentage="50%">
                        <Cards
                            direction="column"
                            cards={[
                                {
                                    linkTo:
                                        '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                    pillar: 'culture',
                                    headlineString:
                                        "You can't expect to wield supreme power just 'cause some watery tart threw a sword at you",
                                    kicker: {
                                        text: 'Holy Grail',
                                        pillar: 'culture',
                                    },
                                    image: {
                                        element: imageElements[3],
                                        position: 'top',
                                        size: 'medium',
                                    },
                                    standfirst:
                                        'The swallow may fly south with the sun, and the house martin or the plover may seek warmer climes in winter, yet these are not strangers to our land. Burn her anyway!',
                                },
                            ]}
                        />
                    </LI>
                    <LI percentage="25%">
                        <Cards
                            direction="column"
                            cards={[
                                {
                                    linkTo:
                                        '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                    pillar: 'news',
                                    headlineString:
                                        'Go and boil your bottoms, sons of a silly person!',
                                    kicker: {
                                        text: 'Monty Python',
                                        pillar: 'news',
                                    },
                                    image: {
                                        element: imageElements[6],
                                        position: 'top',
                                        size: 'small',
                                    },
                                },
                                {
                                    linkTo:
                                        '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                    pillar: 'news',
                                    headlineString:
                                        'Listen. Strange women lying in ponds distributing swords is no basis for a system of government',
                                    headlineSize: 'tiny',
                                },
                                {
                                    linkTo:
                                        '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                    pillar: 'news',
                                    headlineString:
                                        'Supreme executive power derives from a mandate from the masses, not from some farcical aquatic ceremony',
                                    headlineSize: 'tiny',
                                    kicker: {
                                        text: 'Monty Python',
                                        pillar: 'news',
                                    },
                                },
                            ]}
                        />
                    </LI>
                    <LI percentage="25%">
                        <Cards
                            direction="column"
                            cards={[
                                {
                                    linkTo:
                                        '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                    pillar: 'sport',
                                    headlineString:
                                        'Are you suggesting that coconuts migrate?',
                                    headlineSize: 'tiny',
                                    kicker: {
                                        text: 'Run Away!',
                                        pillar: 'sport',
                                    },
                                },
                                {
                                    linkTo:
                                        '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                    pillar: 'news',
                                    headlineString:
                                        "On second thoughts, let's not go there. It is a silly place",
                                    headlineSize: 'tiny',
                                    kicker: {
                                        text: 'Monty Python',
                                        pillar: 'news',
                                    },
                                },
                                {
                                    linkTo:
                                        '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                    pillar: 'news',
                                    headlineString: 'Let us ride to Camelot',
                                    headlineSize: 'tiny',
                                    kicker: {
                                        text: 'Monty Python',
                                        pillar: 'news',
                                    },
                                },
                                {
                                    linkTo:
                                        '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                    pillar: 'news',
                                    headlineString:
                                        "Where'd you get the coconuts?",
                                    headlineSize: 'tiny',
                                    kicker: {
                                        text: 'Monty Python',
                                        pillar: 'news',
                                    },
                                },
                                {
                                    linkTo:
                                        '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                    pillar: 'lifestyle',
                                    headlineString:
                                        'Now, look here, my good man',
                                    headlineSize: 'tiny',
                                    kicker: {
                                        text: 'Terry Gillingham',
                                        pillar: 'lifestyle',
                                    },
                                },
                                {
                                    linkTo:
                                        '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                    pillar: 'news',
                                    headlineString:
                                        "We shall say 'Ni' again to you, if you do not appease us",
                                    headlineSize: 'tiny',
                                    kicker: {
                                        text: 'Monty Python',
                                        pillar: 'news',
                                    },
                                },
                            ]}
                        />
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
            <ArticleLeft showRightBorder={false}>
                <></>
            </ArticleLeft>
            <ArticleContainer>
                <UL direction="row">
                    <LI percentage="50%">
                        <Cards
                            direction="column"
                            cards={[
                                {
                                    linkTo:
                                        '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                    pillar: 'sport',
                                    headlineString:
                                        "We shall say 'Ni' again to you, if you do not appease us",
                                    headlineSize: 'tiny',
                                    kicker: {
                                        text: 'Holy Grail',
                                        pillar: 'sport',
                                    },
                                    image: {
                                        element: imageElements[5],
                                        position: 'left',
                                        size: 'small',
                                    },
                                },
                                {
                                    linkTo:
                                        '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                    pillar: 'sport',
                                    headlineString:
                                        'Now, look here, my good man',
                                    headlineSize: 'tiny',
                                    kicker: {
                                        text: 'Holy Grail',
                                        pillar: 'sport',
                                    },
                                    image: {
                                        element: imageElements[6],
                                        position: 'left',
                                        size: 'small',
                                    },
                                },
                                {
                                    linkTo:
                                        '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                    pillar: 'sport',
                                    headlineString:
                                        "Where'd you get the coconuts",
                                    headlineSize: 'tiny',
                                    kicker: {
                                        text: 'Holy Grail',
                                        pillar: 'sport',
                                    },
                                    image: {
                                        element: imageElements[3],
                                        position: 'left',
                                        size: 'small',
                                    },
                                },
                                {
                                    linkTo:
                                        '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                    pillar: 'sport',
                                    headlineString: 'Let us ride to Camelot!',
                                    headlineSize: 'tiny',
                                    kicker: {
                                        text: 'Holy Grail',
                                        pillar: 'sport',
                                    },
                                    image: {
                                        element: imageElements[2],
                                        position: 'left',
                                        size: 'small',
                                    },
                                },
                                {
                                    linkTo:
                                        '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                    pillar: 'sport',
                                    headlineString:
                                        'How do you know she is a witch? Burn her!',
                                    headlineSize: 'tiny',
                                    kicker: {
                                        text: 'Holy Grail',
                                        pillar: 'sport',
                                    },
                                    image: {
                                        element: imageElements[1],
                                        position: 'left',
                                        size: 'small',
                                    },
                                },
                            ]}
                        />
                    </LI>
                    <LI percentage="50%">
                        <Cards
                            direction="column"
                            cards={[
                                {
                                    linkTo:
                                        '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                    pillar: 'news',
                                    headlineString:
                                        'Go and boil your bottoms, sons of a silly person!',
                                    headlineSize: 'xsmall',
                                    kicker: {
                                        text: 'Monty Python',
                                        pillar: 'news',
                                    },
                                    image: {
                                        element: imageElements[0],
                                        position: 'top',
                                        size: 'large',
                                    },
                                },
                            ]}
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
            <ArticleLeft showRightBorder={false}>
                <></>
            </ArticleLeft>
            <ArticleContainer>
                <Cards
                    direction="row"
                    cards={[
                        {
                            linkTo:
                                '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                            pillar: 'sport',
                            headlineString:
                                "We shall say 'Ni' again to you, if you do not appease us",
                            headlineSize: 'xxsmall',

                            webPublicationDate: '2019-11-11T09:45:30.000Z',
                            kicker: {
                                text: 'Holy Grail',
                                pillar: 'sport',
                            },
                            image: {
                                element: imageElements[5],
                                position: 'top',
                                size: 'small',
                            },
                        },
                        {
                            linkTo:
                                '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                            pillar: 'sport',
                            headlineString: 'Now, look here, my good man',
                            headlineSize: 'xxsmall',

                            webPublicationDate: '2019-11-11T09:45:30.000Z',
                            kicker: {
                                text: 'Holy Grail',
                                pillar: 'sport',
                            },
                            image: {
                                element: imageElements[6],
                                position: 'top',
                                size: 'small',
                            },
                        },
                        {
                            linkTo:
                                '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                            pillar: 'sport',
                            headlineString: "Where'd you get the coconuts",
                            headlineSize: 'xxsmall',

                            webPublicationDate: '2019-11-11T09:45:30.000Z',
                            kicker: {
                                text: 'Holy Grail',
                                pillar: 'sport',
                            },
                            image: {
                                element: imageElements[4],
                                position: 'top',
                                size: 'small',
                            },
                        },
                    ]}
                />
                <UL direction="row">
                    <Cards
                        direction="row"
                        cards={[
                            {
                                linkTo:
                                    '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                pillar: 'news',
                                headlineString:
                                    'Go and boil your bottoms, sons of a silly person!',
                                headlineSize: 'tiny',

                                webPublicationDate: '2019-11-11T09:45:30.000Z',
                                kicker: {
                                    text: 'Monty Python',
                                    pillar: 'news',
                                },
                            },
                            {
                                linkTo:
                                    '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                pillar: 'sport',
                                headlineString: 'Let us ride to Camelot!',
                                headlineSize: 'tiny',

                                webPublicationDate: '2019-11-11T09:45:30.000Z',
                                kicker: {
                                    text: 'Holy Grail',
                                    pillar: 'sport',
                                },
                            },
                            {
                                linkTo:
                                    '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                pillar: 'sport',
                                headlineString: 'Let us ride to Camelot!',
                                headlineSize: 'tiny',

                                webPublicationDate: '2019-11-11T09:45:30.000Z',
                                kicker: {
                                    text: 'Holy Grail',
                                    pillar: 'sport',
                                },
                            },
                            {
                                linkTo:
                                    '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                pillar: 'sport',
                                headlineString:
                                    'How do you know she is a witch? Burn her!',
                                headlineSize: 'tiny',

                                webPublicationDate: '2019-11-11T09:45:30.000Z',
                                kicker: {
                                    text: 'Holy Grail',
                                    pillar: 'sport',
                                },
                            },
                        ]}
                    />
                </UL>
            </ArticleContainer>
        </Flex>
    </Section>
);
Related.story = { name: 'Related Stories' };

export const Spotlight = () => (
    <Section>
        <Flex>
            <ArticleLeft showRightBorder={false}>
                <></>
            </ArticleLeft>
            <ArticleContainer>
                <Cards
                    direction="row"
                    cards={[
                        {
                            linkTo:
                                '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                            pillar: 'sport',
                            headlineString:
                                "We shall say 'Ni' again to you, if you do not appease us",
                            headlineSize: 'xsmall',

                            webPublicationDate: '2019-11-11T09:45:30.000Z',
                            kicker: {
                                text: 'Holy Grail',
                                pillar: 'sport',
                            },
                            image: {
                                element: imageElements[0],
                                position: 'right',
                                size: 'jumbo',
                            },
                        },
                    ]}
                />
            </ArticleContainer>
        </Flex>
    </Section>
);
Spotlight.story = { name: 'Spotlight' };

export const Quad = () => (
    <Section>
        <Flex>
            <ArticleLeft showRightBorder={false}>
                <></>
            </ArticleLeft>
            <ArticleContainer>
                <Cards
                    direction="row"
                    cards={[
                        {
                            linkTo:
                                '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                            pillar: 'news',
                            headlineString:
                                "We shall say 'Ni' again to you, if you do not appease us",
                            headlineSize: 'xxsmall',

                            webPublicationDate: '2019-11-11T09:45:30.000Z',
                            kicker: {
                                text: 'Holy Grail',
                                pillar: 'news',
                            },
                            image: {
                                element: imageElements[0],
                                position: 'top',
                                size: 'medium',
                            },
                        },
                        {
                            linkTo:
                                '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                            pillar: 'news',
                            headlineString:
                                "We shall say 'Ni' again to you, if you do not appease us",
                            headlineSize: 'xxsmall',

                            webPublicationDate: '2019-11-11T09:45:30.000Z',
                            kicker: {
                                text: 'Holy Grail',
                                pillar: 'news',
                            },
                            image: {
                                element: imageElements[0],
                                position: 'top',
                                size: 'medium',
                            },
                        },
                        {
                            linkTo:
                                '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                            pillar: 'news',
                            headlineString:
                                "We shall say 'Ni' again to you, if you do not appease us",
                            headlineSize: 'xxsmall',

                            webPublicationDate: '2019-11-11T09:45:30.000Z',
                            kicker: {
                                text: 'Holy Grail',
                                pillar: 'news',
                            },
                            image: {
                                element: imageElements[0],
                                position: 'top',
                                size: 'medium',
                            },
                        },
                        {
                            linkTo:
                                '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                            pillar: 'news',
                            headlineString:
                                "We shall say 'Ni' again to you, if you do not appease us",
                            headlineSize: 'xxsmall',

                            webPublicationDate: '2019-11-11T09:45:30.000Z',
                            kicker: {
                                text: 'Holy Grail',
                                pillar: 'news',
                            },
                            image: {
                                element: imageElements[0],
                                position: 'top',
                                size: 'medium',
                            },
                        },
                    ]}
                />
            </ArticleContainer>
        </Flex>
    </Section>
);
Quad.story = { name: 'Four with image top' };
