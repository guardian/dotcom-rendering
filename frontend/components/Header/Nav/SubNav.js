// @flow

import { Component, createRef } from 'react';
import { css } from 'react-emotion';
import palette from '@guardian/pasteup/palette';
import { egyptian } from '@guardian/pasteup/fonts';
import { desktop } from '@guardian/pasteup/breakpoints';

import type { LinkType } from './__config__';

const wrapperExpanded = css`
    padding: 0 16px;
`;

const wrapperCollapsed = css`
    ${wrapperExpanded};
    height: 42px;
    overflow: hidden;
`;

const subnav = css`
    list-style: none;

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
    max-width: calc(100% - 70px);
`;

const fontStyle = css`
    font-family: ${egyptian};
    font-weight: 400;
    color: ${palette.neutral[1]};
    padding: 0 6px;
    font-size: 16px;
    height: 42px;
    line-height: 42px;
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
    color: ${palette.neutral[3]};

    :hover {
        color: ${palette.red.medium};
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
        border-left: 10px solid ${palette.neutral[1]};
        margin-left: 2px;
    }
`;

type Props = {
    parent?: LinkType,
    links: Array<LinkType>,
};

export default class Subnav extends Component<
    Props,
    {
        showMore: boolean,
        isExpanded: boolean,
        noJS: boolean,
    },
> {
    constructor(props: Props) {
        super(props);
        this.state = { showMore: false, isExpanded: false, noJS: true };
        this.toggle_ = this.toggle.bind(this);
    }

    componentDidMount() {
        // If componentDidMount runs we know client-side JS is enabled
        // eslint-disable-next-line react/no-did-mount-set-state
        this.setState({
            noJS: false,
            showMore: this.shouldShowMore(),
        });
    }

    ulRef = createRef();

    toggle_: () => void;

    toggle() {
        this.setState(prevState => ({
            isExpanded: !prevState.isExpanded,
        }));
    }

    shouldShowMore() {
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

    render() {
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
                    <button onClick={this.toggle_} className={moreStyle}>
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
                    <button onClick={this.toggle_} className={moreStyle}>
                        More
                    </button>
                </div>
            );
        }

        return el;
    }
}
