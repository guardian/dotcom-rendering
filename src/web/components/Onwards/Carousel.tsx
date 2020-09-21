import React, { useRef, useState, useEffect } from 'react';
import {
    SvgChevronLeftSingle,
    SvgChevronRightSingle,
} from '@guardian/src-icons';
import { css } from 'emotion';
import { headline } from '@guardian/src-foundations/typography';
import { until } from '@guardian/src-foundations/mq';
import { palette, space, border } from '@guardian/src-foundations';
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
        fill: ${palette.neutral[46]};
    }
`;

const headerOuterStyle = css`
    border-top: 1px solid ${border.primary};
    padding-top: ${space[2]}px;
`;

const headerInnerStyle = css`
    display: flex;
    justify-content: space-between;
`;

const headingStyle = css`
    ${headline.xxsmall({ fontWeight: 'bold' })};
    ${until.desktop} {
        ${headline.xxxsmall({ fontWeight: 'bold' })};
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
`;

const verticalLine = css`
    width: 1px;
    background-color: ${palette.neutral[86]};
    flex-shrink: 0;
`;

const interleave = <A,>(arr: A[], separator: A): A[] => {
    return arr.map((elem) => [elem, separator]).flat();
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

export const Carousel: React.FC<Props> = ({ heading, trails }: Props) => {
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
        const scrolled = current.scrollLeft || 0;

        const active = getItems()
            .filter(notPresentation)
            .findIndex((el) => el.offsetLeft >= scrolled);

        return Math.max(0, active);
    };

    const getSetIndex = () => {
        setIndex(getIndex());
    };

    const prev = () => {
        const { current } = carouselRef;
        if (current === null) return;
        const scrolled = current.scrollLeft || 0;

        const offsets = getItems()
            .filter(notPresentation)
            .map((el) => el.offsetLeft);

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

        const offsets = getItems()
            .filter(notPresentation)
            .map((el) => el.offsetLeft);

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
        <div>
            <div className={headerOuterStyle}>
                <div className={headerInnerStyle}>
                    <h3 className={headingStyle}>{heading}</h3>
                    <div className={navIconStyle}>
                        <button onClick={prev} className={buttonStyle}>
                            <SvgChevronLeftSingle />
                        </button>
                        <button onClick={next} className={buttonStyle}>
                            <SvgChevronRightSingle />
                        </button>
                    </div>
                </div>
            </div>

            <div className={dotsStyle}>
                {trails.map((value, i) => (
                    <span className={i === index ? dotActiveStyle : dotStyle} />
                ))}
            </div>
            <div className={carouselStyle} ref={carouselRef}>
                {interleave(
                    cards,
                    <div role="presentation" className={verticalLine} />,
                )}
            </div>
        </div>
    );
};
