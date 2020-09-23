import React, { useRef, useState, useEffect } from 'react';
import {
    SvgChevronLeftSingle,
    SvgChevronRightSingle,
} from '@guardian/src-icons';
import { css } from 'emotion';
import { headline } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';
import { palette, space } from '@guardian/src-foundations';
import libDebounce from 'lodash/debounce';
import { LeftColumn } from '@frontend/web/components/LeftColumn';
import { formatAttrString } from '@frontend/web/lib/formatAttrString';
import { CardAge } from '../Card/components/CardAge';

const navIconStyle = css`
    display: inline-block;

    svg {
        height: 32px;
        fill: ${palette.neutral[46]};
    }
`;

const wrapperStyle = css`
    display: flex;
    justify-content: space-between;
    overflow: hidden;
`;

const containerStyles = css`
    display: flex;
    flex-direction: column;
    overflow: hidden;

    margin-top: 6px;
    ${from.leftCol} {
        margin-top: 26px;
    }

    margin-bottom: 60px;

    margin-left: 0px;
    margin-right: 0px;

    ${from.tablet} {
        /* Shrink the container to remove the leading and
       trailing side margins from the list of cards */
        margin-left: -10px;
        margin-right: -10px;
    }

    ${from.leftCol} {
        margin-left: 0px;
        margin-right: -10px;
    }

    ${from.wide} {
        margin-right: 70px;
        margin-top: 8px;
    }
`;

const carouselStyle = css`
    height: 227px;
    display: flex;

    scroll-snap-type: x mandatory;
    /* scroll-behavior: smooth; */

    position: relative; /* must set position for offset(Left) calculations of children to be relative to this box */

    overflow-x: scroll; /* Scrollbar is less intrusive visually on non-desktop devices typically */
    ${from.tablet} {
        overflow: hidden;
    }

    ${from.tablet} {
        margin-left: 10px;
    }
`;

const cardWrapperStyle = css`
    position: relative;
    width: 258px;
    flex-shrink: 0;
    margin: 0 ${space[2]}px;

    scroll-snap-align: start;
`;

const cardWrapperFirstStyle = css`
    ${cardWrapperStyle};
    margin-left: 0;
`;

// TODO image ratio is wrong from source. We could wrap in a div and use
// absolute positioning to fix this?
const cardImageStyle = css`
    position: absolute;
    top: 0;
    left: 0;
    width: 258px;
    height: 181px;
`;

const headlineWrapperStyle = css`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 176px;
    background-color: ${palette.neutral[97]};
    min-height: 107px;
    padding: ${space[1]}px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const headlineWrapperFirstStyle = css`
    ${headlineWrapperStyle};

    background-color: ${palette.news.dark};
    color: white;
`;

const headlineStyle = css`
    ${headline.xxxsmall()};
    a {
        text-decoration: none;
        color: ${palette.neutral[7]};
    }

    margin-bottom: ${space[1]}px;
`;

const headlineFirstStyle = css`
    ${headlineStyle};

    a {
        color: ${palette.neutral[100]};
    }
`;

const dotsStyle = css`
    margin-bottom: ${space[2]}px;

    ${from.tablet} {
        margin-left: 10px;
    }
`;

const dotStyle = css`
    display: inline-block;
    height: ${space[3]}px;
    width: ${space[3]}px;
    background-color: ${palette.neutral[93]};
    border-radius: 50%;
    margin-right: ${space[1]}px;
`;

const dotActiveStyle = css`
    ${dotStyle};
    background-color: ${palette.news.main};
`;

const buttonStyle = css`
    border: none;
    background: none;
    cursor: pointer;
    margin: 0;
    padding: 0;
`;

const verticalLine = css`
    width: 1px;
    background-color: ${palette.neutral[86]};
    flex-shrink: 0;
`;

const navRowStyles = css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    ${from.tablet} {
        padding-right: 10px;
    }

    ${from.tablet} {
        margin-left: 10px;
    }
`;

const linkStyles = css`
    text-decoration: none;
    color: ${palette.text.anchorSecondary};

    :hover {
        text-decoration: underline;
    }
`;

const headerStyles = css`
    ${headline.xsmall({ fontWeight: 'bold' })};
    color: ${palette.text.primary};
    padding-bottom: 14px;
    padding-top: 6px;
`;

const titleStyle = css`
    color: ${palette.news.main};
`;

export const Title = ({ title, url }: { title: string; url?: string }) => (
    <>
        {url ? (
            <a className={linkStyles} href={url}>
                <h2 className={headerStyles}>
                    From <span className={titleStyle}>{title}</span>
                </h2>
            </a>
        ) : (
            <h2 className={headerStyles}>
                From <span className={titleStyle}>{title}</span>
            </h2>
        )}
    </>
);

const interleave = <A,>(arr: A[], separator: A): A[] => {
    const separated = arr.map((elem) => [elem, separator]).flat();
    if (separated.length > 0) separated.pop(); // remove separator at end
    return separated;
};

type CardProps = {
    trail: TrailType;
    isFirst?: boolean;
};

const Card: React.FC<CardProps> = ({ trail, isFirst }: CardProps) => (
    <div className={isFirst ? cardWrapperFirstStyle : cardWrapperStyle}>
        <img
            className={cardImageStyle}
            src={trail.image}
            alt=""
            role="presentation"
        />
        <div
            className={
                isFirst ? headlineWrapperFirstStyle : headlineWrapperStyle
            }
        >
            <h4 className={isFirst ? headlineFirstStyle : headlineStyle}>
                <a href={trail.url}>{trail.headline}</a>
            </h4>
            <CardAge
                webPublicationDate={trail.webPublicationDate}
                showClock={true}
                pillar="news"
                designType={isFirst ? 'Live' : 'Article'}
            />
        </div>
    </div>
);

export const Carousel: React.FC<OnwardsType> = ({
    heading,
    trails,
    url,
    ophanComponentName,
}: OnwardsType) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(0); // TODO update based on (debounced) scroll or next/prev

    const notPresentation = (el: HTMLElement): boolean =>
        el.getAttribute('role') !== 'presentation';

    const getItems = (): HTMLElement[] => {
        const { current } = carouselRef;
        if (current === null) return [];

        return Array.from(current.children) as HTMLElement[];
    };

    const getIndex = (): number => {
        const { current } = carouselRef;
        if (current === null) return 0;

        const offsets = getItems()
            .filter(notPresentation)
            .map((el) => el.offsetLeft);

        const scrolled = (current.scrollLeft || 0) + offsets[0];
        const active = offsets.findIndex((el) => el >= scrolled);

        return Math.max(0, active);
    };

    const getSetIndex = () => {
        setIndex(getIndex());
    };

    const prev = () => {
        const { current } = carouselRef;
        if (current === null) return;

        const offsets = getItems()
            .filter(notPresentation)
            .map((el) => el.offsetLeft);

        const scrolled = (current.scrollLeft || 0) + offsets[0];

        const nextOffset = offsets
            .reverse()
            .find((offset) => offset < scrolled);

        if (nextOffset) {
            current.scrollTo({ left: nextOffset });
        } else {
            current.scrollTo({ left: 0 });
        }

        getSetIndex();
    };

    const next = () => {
        const { current } = carouselRef;
        if (current === null) return;

        const offsets = getItems()
            .filter(notPresentation)
            .map((el) => el.offsetLeft);

        const scrolled = (current.scrollLeft || 0) + offsets[0];
        const nextOffset = offsets.find((offset) => offset > scrolled);

        if (nextOffset) {
            current.scrollTo({ left: nextOffset });
        }

        getSetIndex();
    };

    useEffect(() => {
        if (carouselRef.current) {
            carouselRef.current.addEventListener(
                'scroll',
                libDebounce(getSetIndex, 100),
            );
        }
    });

    const cards = trails.map((trail, i) => (
        <Card trail={trail} isFirst={i === 0} />
    ));

    return (
        <div className={wrapperStyle}>
            <LeftColumn showRightBorder={false} showPartialRightBorder={true}>
                <div />
            </LeftColumn>
            <div
                className={containerStyles}
                data-component={ophanComponentName}
                data-link={formatAttrString(heading)}
            >
                <div className={navRowStyles}>
                    <Title title={heading} url={url} />

                    <div className={navIconStyle}>
                        <button onClick={prev} className={buttonStyle}>
                            <SvgChevronLeftSingle />
                        </button>
                        <button onClick={next} className={buttonStyle}>
                            <SvgChevronRightSingle />
                        </button>
                    </div>
                </div>

                <div className={dotsStyle}>
                    {trails.map((value, i) => (
                        <span
                            className={i === index ? dotActiveStyle : dotStyle}
                        />
                    ))}
                </div>

                <div className={carouselStyle} ref={carouselRef}>
                    {interleave(
                        cards,
                        <div role="presentation" className={verticalLine} />,
                    )}
                </div>
            </div>
        </div>
    );
};
