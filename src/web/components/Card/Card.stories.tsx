import React from 'react';

import { Section } from '@frontend/web/components/Section';
import { Flex } from '@frontend/web/components/Flex';
import { ArticleLeft } from '@frontend/web/components/ArticleLeft';
import { ArticleContainer } from '@frontend/web/components/ArticleContainer';

import { Card } from './Card';
import { UL } from './components/UL';
import { LI } from './components/LI';
import { imageElements } from './Card.mocks';

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
            <ArticleLeft showRightBorder={false}>
                <></>
            </ArticleLeft>
            <ArticleContainer>
                <UL direction="row" bottomMargin={true}>
                    <LI percentage="75%" showDivider={false} padSides={true}>
                        <Card
                            {...{
                                linkTo:
                                    '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                pillar: 'news',
                                headline: {
                                    headlineString:
                                        'The Knights Who Say Ni demand a sacrifice',
                                    size: 'xsmall',
                                    pillar: 'news',
                                    kicker: {
                                        text: 'Monty Python',
                                        pillar: 'news',
                                    },
                                },
                                trailImage: {
                                    element: imageElements[0],
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
                                    headlineString:
                                        "Yes. We're all individuals",
                                    size: 'xsmall',
                                    pillar: 'news',
                                    kicker: {
                                        text: 'Brian',
                                        pillar: 'news',
                                    },
                                },
                                trailImage: {
                                    element: imageElements[5],
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
                                    headlineString:
                                        "You can't expect to wield supreme power just 'cause some watery tart threw a sword at you",
                                    pillar: 'news',
                                    kicker: {
                                        text: 'Holy Grail',
                                        pillar: 'culture',
                                    },
                                },
                                trailImage: {
                                    element: imageElements[3],
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
                            <LI bottomMargin={true}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'news',
                                        headline: {
                                            headlineString:
                                                'Go and boil your bottoms, sons of a silly person!',
                                            pillar: 'news',
                                            kicker: {
                                                text: 'Monty Python',
                                                pillar: 'news',
                                            },
                                        },
                                        trailImage: {
                                            element: imageElements[6],
                                            position: 'top',
                                            size: 'small',
                                        },
                                    }}
                                />
                            </LI>
                            <LI bottomMargin={true}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'news',
                                        headline: {
                                            headlineString:
                                                'Listen. Strange women lying in ponds distributing swords is no basis for a system of government',
                                            pillar: 'news',
                                            size: 'xxxsmall',
                                        },
                                    }}
                                />
                            </LI>
                            <LI bottomMargin={false}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'news',
                                        headline: {
                                            headlineString:
                                                'Supreme executive power derives from a mandate from the masses, not from some farcical aquatic ceremony',
                                            pillar: 'news',
                                            size: 'xxxsmall',
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
                            <LI bottomMargin={true}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'sport',
                                        headline: {
                                            headlineString:
                                                'Are you suggesting that coconuts migrate?',
                                            pillar: 'news',
                                            size: 'xxxsmall',
                                            kicker: {
                                                text: 'Run Away!',
                                                pillar: 'sport',
                                            },
                                        },
                                    }}
                                />
                            </LI>
                            <LI bottomMargin={true}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'news',
                                        headline: {
                                            headlineString:
                                                "On second thoughts, let's not go there. It is a silly place",
                                            pillar: 'news',
                                            size: 'xxxsmall',
                                            kicker: {
                                                text: 'Monty Python!',
                                                pillar: 'news',
                                            },
                                        },
                                    }}
                                />
                            </LI>
                            <LI bottomMargin={true}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'news',
                                        headline: {
                                            headlineString:
                                                'Let us ride to Camelot',
                                            pillar: 'news',
                                            size: 'xxxsmall',
                                            kicker: {
                                                text: 'Monty Python!',
                                                pillar: 'news',
                                            },
                                        },
                                    }}
                                />
                            </LI>
                            <LI bottomMargin={true}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'news',
                                        headline: {
                                            headlineString:
                                                "Where'd you get the coconuts?",
                                            pillar: 'news',
                                            size: 'xxxsmall',
                                            kicker: {
                                                text: 'Monty Python!',
                                                pillar: 'news',
                                            },
                                        },
                                    }}
                                />
                            </LI>
                            <LI bottomMargin={true}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'lifestyle',
                                        headline: {
                                            headlineString:
                                                'Now, look here, my good man',
                                            pillar: 'news',
                                            size: 'xxxsmall',
                                            kicker: {
                                                text: 'Terry Gillingham',
                                                pillar: 'lifestyle',
                                            },
                                        },
                                    }}
                                />
                            </LI>
                            <LI bottomMargin={false}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'news',
                                        headline: {
                                            headlineString:
                                                "We shall say 'Ni' again to you, if you do not appease us",
                                            pillar: 'news',
                                            size: 'xxxsmall',
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
            <ArticleLeft showRightBorder={false}>
                <></>
            </ArticleLeft>
            <ArticleContainer>
                <UL direction="row">
                    <LI percentage="50%" padSides={true}>
                        <UL direction="column">
                            <LI bottomMargin={true}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'sport',
                                        headline: {
                                            headlineString:
                                                "We shall say 'Ni' again to you, if you do not appease us",
                                            size: 'xxsmall',
                                            pillar: 'news',
                                            kicker: {
                                                text: 'Holy Grail',
                                                pillar: 'sport',
                                            },
                                        },
                                        trailImage: {
                                            element: imageElements[5],
                                            position: 'left',
                                            size: 'small',
                                        },
                                    }}
                                />
                            </LI>
                            <LI bottomMargin={true}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'sport',
                                        headline: {
                                            headlineString:
                                                'Now, look here, my good man',
                                            size: 'xxxsmall',
                                            pillar: 'news',
                                            kicker: {
                                                text: 'Holy Grail',
                                                pillar: 'sport',
                                            },
                                        },
                                        trailImage: {
                                            element: imageElements[6],
                                            position: 'left',
                                            size: 'small',
                                        },
                                    }}
                                />
                            </LI>
                            <LI bottomMargin={true}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'sport',
                                        headline: {
                                            headlineString:
                                                "Where'd you get the coconuts",
                                            size: 'xxxsmall',
                                            pillar: 'news',
                                            kicker: {
                                                text: 'Holy Grail',
                                                pillar: 'sport',
                                            },
                                        },
                                        trailImage: {
                                            element: imageElements[3],
                                            position: 'left',
                                            size: 'small',
                                        },
                                    }}
                                />
                            </LI>
                            <LI bottomMargin={true}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'sport',
                                        headline: {
                                            headlineString:
                                                'Let us ride to Camelot!',
                                            size: 'xxxsmall',
                                            pillar: 'news',
                                            kicker: {
                                                text: 'Holy Grail',
                                                pillar: 'sport',
                                            },
                                        },
                                        trailImage: {
                                            element: imageElements[2],
                                            position: 'left',
                                            size: 'small',
                                        },
                                    }}
                                />
                            </LI>
                            <LI bottomMargin={false}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'sport',
                                        headline: {
                                            headlineString:
                                                'How do you know she is a witch? Burn her!',
                                            size: 'xxxsmall',
                                            pillar: 'news',
                                            kicker: {
                                                text: 'Holy Grail',
                                                pillar: 'sport',
                                            },
                                        },
                                        trailImage: {
                                            element: imageElements[1],
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
                                    headlineString:
                                        "Go and boil your bottoms, sons of a silly person!'",
                                    size: 'xsmall',
                                    pillar: 'news',
                                    kicker: {
                                        text: 'Monty Python',
                                        pillar: 'sport',
                                    },
                                },
                                trailImage: {
                                    element: imageElements[0],
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
            <ArticleLeft showRightBorder={false}>
                <></>
            </ArticleLeft>
            <ArticleContainer>
                <UL direction="row" bottomMargin={true}>
                    <LI padSides={true}>
                        <Card
                            {...{
                                linkTo:
                                    '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                pillar: 'sport',
                                headline: {
                                    headlineString:
                                        "We shall say 'Ni' again to you, if you do not appease us",
                                    size: 'xxsmall',
                                    pillar: 'news',
                                    kicker: {
                                        text: 'Holy Grail',
                                        pillar: 'sport',
                                    },
                                },
                                webPublicationDate: '2019-11-11T09:45:30.000Z',
                                trailImage: {
                                    element: imageElements[5],
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
                                    headlineString:
                                        'Now, look here, my good man',
                                    size: 'xxsmall',
                                    pillar: 'sport',
                                    kicker: {
                                        text: 'Holy Grail',
                                        pillar: 'sport',
                                    },
                                },
                                webPublicationDate: '2019-11-11T09:45:30.000Z',
                                trailImage: {
                                    element: imageElements[6],
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
                                    headlineString:
                                        "Where'd you get the coconuts",
                                    size: 'xxsmall',
                                    pillar: 'sport',
                                    kicker: {
                                        text: 'Holy Grail',
                                        pillar: 'sport',
                                    },
                                },
                                webPublicationDate: '2019-11-11T09:45:30.000Z',
                                trailImage: {
                                    element: imageElements[4],
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
                                    headlineString:
                                        'Go and boil your bottoms, sons of a silly person!',
                                    size: 'xxxsmall',
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
                                    headlineString: 'Let us ride to Camelot!',
                                    size: 'xxxsmall',
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
                                    headlineString: 'Let us ride to Camelot!',
                                    size: 'xxxsmall',
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
                                    headlineString:
                                        'How do you know she is a witch? Burn her!',
                                    size: 'xxxsmall',
                                    pillar: 'news',
                                    kicker: {
                                        text: 'Holy Grail',
                                        pillar: 'news',
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
            <ArticleLeft showRightBorder={false}>
                <></>
            </ArticleLeft>
            <ArticleContainer>
                <Card
                    {...{
                        linkTo:
                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                        pillar: 'sport',
                        headline: {
                            headlineString:
                                "We shall say 'Ni' again to you, if you do not appease us",
                            size: 'xsmall',
                            pillar: 'sport',
                            kicker: {
                                text: 'Holy Grail',
                                pillar: 'sport',
                            },
                        },
                        webPublicationDate: '2019-11-11T09:45:30.000Z',
                        trailImage: {
                            element: imageElements[0],
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
            <ArticleLeft showRightBorder={false}>
                <></>
            </ArticleLeft>
            <ArticleContainer>
                <UL direction="row">
                    <LI padSides={true}>
                        <Card
                            {...{
                                linkTo:
                                    '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                pillar: 'news',
                                headline: {
                                    headlineString:
                                        "We shall say 'Ni' again to you, if you do not appease us",
                                    size: 'xxsmall',
                                    pillar: 'news',
                                    kicker: {
                                        text: 'Holy Grail',
                                        pillar: 'news',
                                    },
                                },
                                webPublicationDate: '2019-11-11T09:45:30.000Z',
                                trailImage: {
                                    element: imageElements[0],
                                    position: 'top',
                                    size: 'medium',
                                },
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
                                    headlineString:
                                        "We shall say 'Ni' again to you, if you do not appease us",
                                    size: 'xxsmall',
                                    pillar: 'news',
                                    kicker: {
                                        text: 'Holy Grail',
                                        pillar: 'news',
                                    },
                                },
                                webPublicationDate: '2019-11-11T09:45:30.000Z',
                                trailImage: {
                                    element: imageElements[0],
                                    position: 'top',
                                    size: 'medium',
                                },
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
                                    headlineString:
                                        "We shall say 'Ni' again to you, if you do not appease us",
                                    size: 'xxsmall',
                                    pillar: 'news',
                                    kicker: {
                                        text: 'Holy Grail',
                                        pillar: 'news',
                                    },
                                },
                                webPublicationDate: '2019-11-11T09:45:30.000Z',
                                trailImage: {
                                    element: imageElements[0],
                                    position: 'top',
                                    size: 'medium',
                                },
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
                                    headlineString:
                                        "We shall say 'Ni' again to you, if you do not appease us",
                                    size: 'xxsmall',
                                    pillar: 'news',
                                    kicker: {
                                        text: 'Holy Grail',
                                        pillar: 'news',
                                    },
                                },
                                webPublicationDate: '2019-11-11T09:45:30.000Z',
                                trailImage: {
                                    element: imageElements[0],
                                    position: 'top',
                                    size: 'medium',
                                },
                            }}
                        />
                    </LI>
                </UL>
            </ArticleContainer>
        </Flex>
    </Section>
);
Quad.story = { name: 'Four with image top' };
