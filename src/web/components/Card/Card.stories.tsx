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
                                designType: 'Article',
                                headlineText:
                                    'The Knights Who Say Ni demand a sacrifice',
                                headlineSize: 'large',
                                kickerText: 'Monty Python',

                                imageUrl: imageUrls[0],
                                imagePosition: 'right',
                                imageSize: 'large',
                                standfirst:
                                    "I have to push the pram a lot. I'm not a witch. Shut up! The nose? And this isn't my nose. This is a false one. You don't vote for kings.",
                            }}
                        />
                    </LI>
                    <LI
                        percentage="25%"
                        showDivider={true}
                        showTopMarginWhenStacked={true}
                        padSides={true}
                    >
                        <Card
                            {...{
                                linkTo:
                                    '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                pillar: 'news',
                                designType: 'Article',
                                headlineText: "Yes. We're all individuals",
                                headlineSize: 'large',
                                kickerText: 'Brian',

                                imageUrl: imageUrls[5],
                                imagePosition: 'top',
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
                                designType: 'Article',
                                headlineText:
                                    "You can't expect to wield supreme power just 'cause some watery tart threw a sword at you",
                                kickerText: 'Holy Grail',

                                imageUrl: imageUrls[3],
                                imagePosition: 'top',
                                standfirst:
                                    'The swallow may fly south with the sun, and the house martin or the plover may seek warmer climes in winter, yet these are not strangers to our land. Burn her anyway!',
                            }}
                        />
                    </LI>
                    <LI
                        percentage="25%"
                        showDivider={true}
                        showTopMarginWhenStacked={true}
                        padSides={true}
                    >
                        <UL direction="column">
                            <LI bottomMargin={true} stretch={true}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'news',
                                        designType: 'Article',
                                        headlineText:
                                            'Go and boil your bottoms, sons of a silly person!',
                                        kickerText: 'Monty Python',
                                        imageUrl: imageUrls[6],
                                        imagePosition: 'top',
                                    }}
                                />
                            </LI>
                            <LI bottomMargin={true} stretch={true}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'news',
                                        designType: 'Article',
                                        headlineText:
                                            'Listen. Strange women lying in ponds distributing swords is no basis for a system of government',
                                        headlineSize: 'small',
                                    }}
                                />
                            </LI>
                            <LI bottomMargin={false} stretch={true}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'news',
                                        designType: 'Article',
                                        headlineText:
                                            'Supreme executive power derives from a mandate from the masses, not from some farcical aquatic ceremony',
                                        headlineSize: 'small',
                                        kickerText: 'Monty Python',
                                    }}
                                />
                            </LI>
                        </UL>
                    </LI>
                    <LI
                        percentage="25%"
                        showDivider={true}
                        showTopMarginWhenStacked={true}
                        padSides={true}
                    >
                        <UL direction="column">
                            <LI bottomMargin={true} stretch={true}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'sport',
                                        designType: 'Article',
                                        headlineText:
                                            'Are you suggesting that coconuts migrate?',
                                        headlineSize: 'small',
                                        kickerText: 'Run Away!',
                                    }}
                                />
                            </LI>
                            <LI bottomMargin={true} stretch={true}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'news',
                                        designType: 'Article',
                                        headlineText:
                                            "On second thoughts, let's not go there. It is a silly place",
                                        headlineSize: 'small',
                                        kickerText: 'Monty Python!',
                                    }}
                                />
                            </LI>
                            <LI bottomMargin={true} stretch={true}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'news',
                                        designType: 'Article',
                                        headlineText: 'Let us ride to Camelot',
                                        headlineSize: 'small',
                                        kickerText: 'Monty Python!',
                                    }}
                                />
                            </LI>
                            <LI bottomMargin={true} stretch={true}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'news',
                                        designType: 'Article',
                                        headlineText:
                                            "Where'd you get the coconuts?",
                                        headlineSize: 'small',
                                        kickerText: 'Monty Python!',
                                    }}
                                />
                            </LI>
                            <LI bottomMargin={true} stretch={true}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'lifestyle',
                                        designType: 'Article',
                                        headlineText:
                                            'Now, look here, my good man',
                                        headlineSize: 'small',
                                        kickerText: 'Terry Gillingham',
                                    }}
                                />
                            </LI>
                            <LI bottomMargin={false} stretch={true}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'news',
                                        designType: 'Article',
                                        headlineText:
                                            "We shall say 'Ni' again to you, if you do not appease us",
                                        headlineSize: 'small',
                                        kickerText: 'Monty Python',
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
                                        designType: 'Article',
                                        headlineText:
                                            "We shall say 'Ni' again to you, if you do not appease us",
                                        headlineSize: 'medium',
                                        kickerText: 'Holy Grail',
                                        imageUrl: imageUrls[5],
                                        imagePosition: 'left',
                                        imageSize: 'small',
                                    }}
                                />
                            </LI>
                            <LI bottomMargin={true} stretch={true}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'sport',
                                        designType: 'Article',
                                        headlineText:
                                            'Now, look here, my good man',
                                        headlineSize: 'small',
                                        kickerText: 'Holy Grail',
                                        imageUrl: imageUrls[6],
                                        imagePosition: 'left',
                                        imageSize: 'small',
                                    }}
                                />
                            </LI>
                            <LI bottomMargin={true} stretch={true}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'sport',
                                        designType: 'Article',
                                        headlineText:
                                            "Where'd you get the coconuts",
                                        headlineSize: 'small',
                                        kickerText: 'Holy Grail',
                                        imageUrl: imageUrls[3],
                                        imagePosition: 'left',
                                        imageSize: 'small',
                                    }}
                                />
                            </LI>
                            <LI bottomMargin={true} stretch={true}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'sport',
                                        designType: 'Article',
                                        headlineText: 'Let us ride to Camelot!',
                                        headlineSize: 'small',
                                        kickerText: 'Holy Grail',
                                        imageUrl: imageUrls[2],
                                        imagePosition: 'left',
                                        imageSize: 'small',
                                    }}
                                />
                            </LI>
                            <LI bottomMargin={false} stretch={true}>
                                <Card
                                    {...{
                                        linkTo:
                                            '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                        pillar: 'sport',
                                        designType: 'Article',
                                        headlineText:
                                            'How do you know she is a witch? Burn her!',
                                        headlineSize: 'small',
                                        kickerText: 'Holy Grail',
                                        imageUrl: imageUrls[1],
                                        imagePosition: 'left',
                                        imageSize: 'small',
                                    }}
                                />
                            </LI>
                        </UL>
                    </LI>
                    <LI
                        percentage="50%"
                        showDivider={true}
                        showTopMarginWhenStacked={true}
                        padSides={true}
                    >
                        <Card
                            {...{
                                linkTo:
                                    '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                pillar: 'news',
                                designType: 'Article',
                                headlineText:
                                    "Go and boil your bottoms, sons of a silly person!'",
                                headlineSize: 'large',
                                kickerText: 'Monty Python',
                                imageUrl: imageUrls[0],
                                imagePosition: 'top',
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
                                designType: 'Article',
                                headlineText:
                                    "We shall say 'Ni' again to you, if you do not appease us",
                                headlineSize: 'medium',
                                kickerText: 'Holy Grail',
                                webPublicationDate: '2019-11-11T09:45:30.000Z',
                                imageUrl: imageUrls[5],
                                imagePosition: 'top',
                            }}
                        />
                    </LI>
                    <LI
                        padSides={true}
                        showDivider={true}
                        showTopMarginWhenStacked={true}
                    >
                        <Card
                            {...{
                                linkTo:
                                    '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                pillar: 'sport',
                                designType: 'Article',
                                headlineText: 'Now, look here, my good man',
                                headlineSize: 'medium',
                                kickerText: 'Holy Grail',
                                webPublicationDate: '2019-11-11T09:45:30.000Z',
                                imageUrl: imageUrls[6],
                                imagePosition: 'top',
                            }}
                        />
                    </LI>
                    <LI
                        padSides={true}
                        showDivider={true}
                        showTopMarginWhenStacked={true}
                    >
                        <Card
                            {...{
                                linkTo:
                                    '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                pillar: 'sport',
                                designType: 'Article',
                                headlineText: "Where'd you get the coconuts",
                                headlineSize: 'medium',
                                kickerText: 'Holy Grail',
                                webPublicationDate: '2019-11-11T09:45:30.000Z',
                                imageUrl: imageUrls[4],
                                imagePosition: 'top',
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
                                designType: 'Article',
                                headlineText:
                                    'Go and boil your bottoms, sons of a silly person!',
                                headlineSize: 'small',
                                kickerText: 'Monty Python',
                                webPublicationDate: '2019-11-11T09:45:30.000Z',
                            }}
                        />
                    </LI>
                    <LI
                        padSides={true}
                        showDivider={true}
                        showTopMarginWhenStacked={true}
                    >
                        <Card
                            {...{
                                linkTo:
                                    '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                pillar: 'sport',
                                designType: 'Article',
                                headlineText: 'Let us ride to Camelot!',
                                headlineSize: 'small',
                                kickerText: 'Monty Python',
                                webPublicationDate: '2019-11-11T09:45:30.000Z',
                            }}
                        />
                    </LI>
                    <LI
                        padSides={true}
                        showDivider={true}
                        showTopMarginWhenStacked={true}
                    >
                        <Card
                            {...{
                                linkTo:
                                    '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                pillar: 'culture',
                                designType: 'Interview',
                                headlineText: 'Let us ride to Camelot!',
                                headlineSize: 'small',
                                kickerText: 'Monty Python',
                                webPublicationDate: '2019-11-11T09:45:30.000Z',
                            }}
                        />
                    </LI>
                    <LI
                        padSides={true}
                        showDivider={true}
                        showTopMarginWhenStacked={true}
                    >
                        <Card
                            {...{
                                linkTo:
                                    '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                pillar: 'lifestyle',
                                designType: 'Feature',
                                headlineText:
                                    'How do you know she is a witch? Burn her!',
                                headlineSize: 'small',
                                kickerText: 'Holy Grail',
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
                        designType: 'Feature',
                        headlineText:
                            "We shall say 'Ni' again to you, if you do not appease us",
                        headlineSize: 'large',
                        kickerText: 'Holy Grail',
                        webPublicationDate: '2019-11-11T09:45:30.000Z',
                        imageUrl: imageUrls[0],
                        imagePosition: 'right',
                        imageSize: 'jumbo',
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
                                designType: 'Comment',
                                headlineText:
                                    "We shall say 'Ni' again to you, if you do not appease us",
                                headlineSize: 'medium',
                                showQuotes: true,
                                byline: 'George Monbiot',
                                kickerText: 'Holy Grail',
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
                    <LI
                        padSides={true}
                        showDivider={true}
                        showTopMarginWhenStacked={true}
                    >
                        <Card
                            {...{
                                linkTo:
                                    '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                pillar: 'opinion',
                                designType: 'Article',
                                headlineText:
                                    "We shall say 'Ni' again to you, if you do not appease us",
                                headlineSize: 'medium',
                                webPublicationDate: '2019-11-11T09:45:30.000Z',
                                imageUrl: imageUrls[0],
                                imagePosition: 'top',
                                showClock: true,
                            }}
                        />
                    </LI>
                    <LI
                        padSides={true}
                        showDivider={true}
                        showTopMarginWhenStacked={true}
                    >
                        <Card
                            {...{
                                linkTo:
                                    '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                pillar: 'news',
                                designType: 'Article',
                                headlineText:
                                    "We shall say 'Ni' again to you, if you do not appease us",
                                headlineSize: 'medium',
                                kickerText: 'Holy Grail',
                                webPublicationDate: '2019-11-11T09:45:30.000Z',
                                imageUrl: imageUrls[0],
                                imagePosition: 'top',
                                showClock: true,
                            }}
                        />
                    </LI>
                    <LI
                        padSides={true}
                        showDivider={true}
                        showTopMarginWhenStacked={true}
                    >
                        <Card
                            {...{
                                linkTo:
                                    '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                designType: 'Article',
                                pillar: 'news',
                                headlineText:
                                    "We shall say 'Ni' again to you, if you do not appease us",
                                headlineSize: 'medium',
                                kickerText: 'Holy Grail',
                                webPublicationDate: '2019-11-11T09:45:30.000Z',
                                imageUrl: imageUrls[0],
                                imagePosition: 'top',
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

export const Media = () => (
    <Section>
        <Flex>
            <LeftColumn showRightBorder={false}>
                <></>
            </LeftColumn>
            <ArticleContainer>
                <UL direction="row">
                    <LI
                        padSides={true}
                        showDivider={true}
                        showTopMarginWhenStacked={true}
                    >
                        <Card
                            {...{
                                linkTo:
                                    '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                pillar: 'culture',
                                designType: 'Media',
                                headlineText:
                                    "We shall say 'Ni' again to you, if you do not appease us",
                                headlineSize: 'medium',
                                webPublicationDate: '2019-11-11T09:45:30.000Z',
                                imageUrl: imageUrls[0],
                                imagePosition: 'top',
                                showClock: true,
                                mediaType: 'Photo',
                            }}
                        />
                    </LI>
                    <LI
                        padSides={true}
                        showDivider={true}
                        showTopMarginWhenStacked={true}
                    >
                        <Card
                            {...{
                                linkTo:
                                    '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                pillar: 'news',
                                designType: 'Media',
                                headlineText:
                                    "We shall say 'Ni' again to you, if you do not appease us",
                                headlineSize: 'medium',
                                kickerText: 'Holy Grail',
                                webPublicationDate: '2019-11-11T09:45:30.000Z',
                                imageUrl: imageUrls[0],
                                imagePosition: 'top',
                                showClock: true,
                                mediaType: 'Audio',
                                mediaDuration: 35999,
                            }}
                        />
                    </LI>
                    <LI
                        padSides={true}
                        showDivider={true}
                        showTopMarginWhenStacked={true}
                    >
                        <Card
                            {...{
                                linkTo:
                                    '/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse',
                                pillar: 'sport',
                                designType: 'Media',
                                headlineText:
                                    "We shall say 'Ni' again to you, if you do not appease us",
                                headlineSize: 'medium',
                                kickerText: 'Holy Grail',
                                webPublicationDate: '2019-11-11T09:45:30.000Z',
                                imageUrl: imageUrls[0],
                                imagePosition: 'top',
                                showClock: true,
                                mediaType: 'Video',
                                mediaDuration: 59,
                            }}
                        />
                    </LI>
                </UL>
            </ArticleContainer>
        </Flex>
    </Section>
);
Media.story = { name: 'Media' };
