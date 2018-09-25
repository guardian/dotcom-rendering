import React, { Component, createRef } from 'react';
import { css } from 'react-emotion';
import { palette } from '@guardian/pasteup/palette';
import { serif } from '@guardian/pasteup/fonts';
import {
    desktop,
    tablet,
    mobileMedium,
    mobileLandscape,
} from '@guardian/pasteup/breakpoints';

const wrapperExpanded = css``;

const wrapperCollapsed = css`
    ${wrapperExpanded};
    height: 36px;
    overflow: hidden;

    ${tablet} {
        height: 42px;
    }
`;

const subnav = css`
    list-style: none;
    padding: 0 5px;

    ${tablet} {
        padding: 0 15px;
    }

    li {
        float: left;
        line-height: 42px;
    }
`;

const subnavExpanded = css`
    ${subnav};
`;

const subnavCollapsed = css`
    ${subnav};
    max-width: calc(100% - 60px);

    ${mobileLandscape} {
        max-width: calc(100% - 70px);
    }
`;

const fontStyle = css`
    font-family: ${serif.headline};
    font-weight: 500;
    color: ${palette.neutral[7]};
    padding: 0 5px;
    font-size: 14px;
    height: 36px;
    line-height: 36px;

    ${mobileMedium} {
        font-size: 15px;
    }

    ${tablet} {
        font-size: 16px;
        height: 42px;
        line-height: 42px;
    }
`;

const linkStyle = css`
    ${fontStyle};
    float: left;
    text-decoration: none;

    :hover {
        text-decoration: underline;
    }
`;

const moreStyle = css`
    ${fontStyle};

    cursor: pointer;
    border: none;
    background-color: transparent;
    color: ${palette.neutral[46]};

    :hover {
        color: ${palette.news.main};
    }

    ${desktop} {
        display: none;
    }
`;

const parentLinkStyle = css`
    ${linkStyle};
    font-weight: 700;
`;

const parentStyle = css`
    :after {
        content: '';
        display: inline-block;
        width: 0;
        height: 0;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-left: 10px solid ${palette.neutral[7]};
        margin-left: 2px;
    }
`;

interface Props {
    parent?: LinkType;
    links: LinkType[];
}

export default class Subnav extends Component<
    Props,
    {
        showMore: boolean;
        isExpanded: boolean;
        noJS: boolean;
    }
> {
    private boundToggle: () => void;
    private ulRef: React.RefObject<HTMLUListElement>;

    constructor(props: Props) {
        super(props);
        this.state = { showMore: false, isExpanded: false, noJS: true };
        this.boundToggle = this.toggle.bind(this);
        this.ulRef = createRef();
    }

    public componentDidMount() {
        // If componentDidMount runs we know client-side JS is enabled
        this.setState({
            noJS: false,
            showMore: this.shouldShowMore(),
        });
    }

    public toggle() {
        this.setState(prevState => ({
            isExpanded: !prevState.isExpanded,
        }));
    }

    public shouldShowMore() {
        // get ul ref
        const ul = this.ulRef.current;
        if (!ul) {
            return false;
        }

        const lis = ul.querySelectorAll('li');
        const lastLi = lis[lis.length - 1];

        const ulTop = ul.getBoundingClientRect().top;
        const liTop = lastLi.getBoundingClientRect().top;

        return ulTop !== liTop;
    }

    public render() {
        const { parent, links } = this.props;

        let lis = [];

        if (parent) {
            const parentLink = (
                <li key={parent.url} className={parentStyle}>
                    <a className={parentLinkStyle} href={parent.url}>
                        {parent.title}
                    </a>
                </li>
            );

            lis.unshift(parentLink);
        }

        lis = lis.concat(
            links.map(link => (
                <li key={link.url}>
                    <a className={linkStyle} href={link.url}>
                        {link.title}
                    </a>
                </li>
            )),
        );

        let el;

        if (this.state.noJS || !this.state.showMore) {
            el = (
                <div className={wrapperCollapsed}>
                    <ul ref={this.ulRef} className={subnavExpanded}>
                        {lis}
                    </ul>
                </div>
            );
        } else if (this.state.isExpanded) {
            el = (
                <div className={wrapperExpanded}>
                    <ul ref={this.ulRef} className={subnavExpanded}>
                        {lis}
                    </ul>
                    <button onClick={this.boundToggle} className={moreStyle}>
                        Less
                    </button>
                </div>
            );
        } else {
            el = (
                <div className={wrapperCollapsed}>
                    <ul ref={this.ulRef} className={subnavCollapsed}>
                        {lis}
                    </ul>
                    <button onClick={this.boundToggle} className={moreStyle}>
                        More
                    </button>
                </div>
            );
        }

        return el;
    }
}
