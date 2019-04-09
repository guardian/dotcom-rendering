import React, { Component, createRef } from 'react';
import { css } from 'emotion';

import { Container } from '@guardian/guui';
import { palette } from '@guardian/pasteup/palette';
import { Inner } from './Inner';

const subnavWrapper = css`
    background-color: white;
`;

const multiLine = css`
    content: '';
    background-image: repeating-linear-gradient(
        to bottom,
        ${palette.neutral[86]},
        ${palette.neutral[86]} 1px,
        transparent 1px,
        transparent 4px
    );
    background-repeat: repeat-x;
    background-position: bottom;
    background-size: 1px 13px;
    background-color: ${palette.neutral[100]};
    content: '';
    clear: left;
    display: block;
    height: 13px;
`;

interface Props {
    subnav?: {
        parent?: LinkType;
        links: LinkType[];
    };
    pillar: Pillar;
    currentNavLink: string;
}

export class SubNav extends Component<
    Props,
    {
        showMore: boolean;
        isExpanded: boolean;
    }
> {
    private ulRef: React.RefObject<HTMLUListElement>;

    constructor(props: Props) {
        super(props);
        this.state = { showMore: false, isExpanded: false };
        // More should not be shown without JS
        this.ulRef = createRef();
    }

    public componentDidMount() {
        // If componentDidMount runs we know client-side JS is enabled
        this.setState({
            showMore: this.shouldShowMore(),
        });
    }

    public toggle = () => {
        this.setState(prevState => ({
            isExpanded: !prevState.isExpanded,
        }));
    };

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
        if (!this.props.subnav) return null;
        const { showMore, isExpanded } = this.state;
        const collapseWrapper = !showMore || !isExpanded;
        const expandSubNav = !showMore || isExpanded;

        return (
            <div className={subnavWrapper}>
                <Container borders={true}>
                    <Inner
                        links={this.props.subnav.links}
                        pillar={this.props.pillar}
                        parent={this.props.subnav.parent}
                        showMore={showMore}
                        isExpanded={isExpanded}
                        collapseWrapper={collapseWrapper}
                        expandSubNav={expandSubNav}
                        ulRef={this.ulRef}
                        toggle={this.toggle}
                        currentNavLink={this.props.currentNavLink}
                    />
                    <div className={multiLine} />
                </Container>
            </div>
        );
    }
}
