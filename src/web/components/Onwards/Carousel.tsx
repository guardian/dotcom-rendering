import React, { useRef, useState, useEffect } from 'react';
import {
    SvgChevronLeftSingle,
    SvgChevronRightSingle,
} from '@guardian/src-icons';
import { css } from 'emotion';
import { headline } from '@guardian/src-foundations/typography';
import { neutral } from '@guardian/src-foundations/palette';
import { until } from '@guardian/src-foundations/mq';
import { palette, space } from '@guardian/src-foundations';
import libDebounce from 'lodash/debounce';
import { CardAge } from '../Card/components/CardAge';

type Props = {
    heading: string;
    trails: TrailType[];
};

const navIconStyle = css`
    display: inline-block;

    svg {
        height: 24px;
        fill: ${neutral};
    }
`;

const headerRowStyle = css`
    display: flex;
    justify-content: space-between;
`;

const headingStyle = css`
    ${headline.xxsmall()};
    ${until.desktop} {
        ${headline.xxxsmall()};
    }
`;

const carouselStyle = css`
    width: 100%;
    height: 227px;
    display: flex;

    scroll-snap-type: x mandatory;
    /* scroll-behavior: smooth; */
    overflow-x: scroll;
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
    min-height: 103px;
    padding: ${space[1]}px;
`;

const headlineStyle = css`
    ${headline.xxxsmall()};
    a {
        text-decoration: none;
    }
`;

const dotsStyle = css``;

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
    background-color: ${palette.news[400]};
`;

export const Carousel: React.FC<Props> = ({ heading, trails }: Props) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(0); // TODO update based on (debounced) scroll or next/prev

    const getItems = (): HTMLElement[] => {
        const { current } = carouselRef;
        if (current === null) return [];

        return Array.from(current.children) as HTMLElement[];
    };

    const getIndex = (): number => {
        const { current } = carouselRef;
        if (current === null) return 0;
        const scrolled = current.scrollLeft || 0;

        const active = getItems().findIndex((el) => el.offsetLeft >= scrolled);
        return Math.max(0, active);
    };

    const getSetIndex = () => {
        setIndex(getIndex());
    };

    const prev = () => {
        const { current } = carouselRef;
        if (current === null) return;
        const scrolled = current.scrollLeft || 0;

        const offsets = getItems().map((el) => el.offsetLeft);
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
        const scrolled = current.scrollLeft || 0;

        const offsets = getItems().map((el) => el.offsetLeft);
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

    return (
        <div>
            <div className={headerRowStyle}>
                <h3 className={headingStyle}>{heading}</h3>
                <div className={navIconStyle}>
                    <button onClick={prev}>
                        <SvgChevronLeftSingle />
                    </button>
                    <button onClick={next}>
                        <SvgChevronRightSingle />
                    </button>
                </div>
            </div>
            <div className={dotsStyle}>
                {trails.map((value, i) => (
                    <span className={i === index ? dotActiveStyle : dotStyle} />
                ))}
            </div>
            <div className={carouselStyle} ref={carouselRef}>
                {trails.map((trail, i) => (
                    <div
                        className={
                            i === 0 ? cardWrapperFirstStyle : cardWrapperStyle
                        }
                    >
                        <img
                            className={cardImageStyle}
                            src={trail.image}
                            alt=""
                            role="presentation"
                        />
                        <div className={headlineWrapperStyle}>
                            <h4 className={headlineStyle}>
                                <a href={trail.url}>{trail.headline}</a>
                            </h4>
                            <CardAge
                                webPublicationDate={trail.webPublicationDate}
                                showClock={true}
                                pillar="news"
                                designType="Article"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
