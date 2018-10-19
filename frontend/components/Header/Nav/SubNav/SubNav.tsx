import React, { Component, createRef } from 'react';
import { css } from 'react-emotion';
import { palette } from '@guardian/pasteup/palette';

import { Container } from '@guardian/guui';
import { Inner } from './Inner';

const subnavWrapper = css`
    background-color: white;
    border-top: 0.0625rem solid ${palette.neutral[86]};
`;

interface Props {
    subnav?: {
        parent?: LinkType;
        links: LinkType[];
    };
    pillar: Pillar;
}

export default class Subnav extends Component<
    Props,
    {
        showMore: boolean;
        isExpanded: boolean;
    }
> {
    private boundToggle: () => void;
    private ulRef: React.RefObject<HTMLUListElement>;

    constructor(props: Props) {
        super(props);
        this.state = { showMore: false, isExpanded: false };
        // More should not be shown without JS
        this.boundToggle = this.toggle.bind(this);
        this.ulRef = createRef();
    }

    public componentDidMount() {
        // If componentDidMount runs we know client-side JS is enabled
        this.setState({
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
        if (!this.props.subnav) return null;
        const { showMore, isExpanded } = this.state;
        const collapseWrapper = !showMore || !isExpanded;
        const expandSubNav = !showMore || isExpanded;

        return (
            <div className={subnavWrapper}>
                <Container>
                    <Inner
                        links={this.props.subnav.links}
                        pillar={this.props.pillar}
                        parent={this.props.subnav.parent}
                        showMore={showMore}
                        isExpanded={isExpanded}
                        collapseWrapper={collapseWrapper}
                        expandSubNav={expandSubNav}
                        ulRef={this.ulRef}
                        toggle={this.boundToggle}
                    />
                </Container>
            </div>
        );
    }
}
