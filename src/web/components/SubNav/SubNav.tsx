import React, { Component, createRef } from 'react';

import { GuardianLines } from '@frontend/web/components/GuardianLines';

import { Inner } from './Inner';

interface Props {
    subnav: {
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
        const { subnav, pillar, currentNavLink } = this.props;

        if (!subnav) {
            return null;
        }

        const { showMore, isExpanded } = this.state;
        const collapseWrapper = !showMore || !isExpanded;
        const expandSubNav = !showMore || isExpanded;

        return (
            <div>
                <Inner
                    links={subnav.links}
                    pillar={pillar}
                    parent={subnav.parent}
                    showMore={showMore}
                    isExpanded={isExpanded}
                    collapseWrapper={collapseWrapper}
                    expandSubNav={expandSubNav}
                    ulRef={this.ulRef}
                    toggle={this.toggle}
                    currentNavLink={currentNavLink}
                />
                <GuardianLines pillar={pillar} />
            </div>
        );
    }
}
