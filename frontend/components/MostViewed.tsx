import React, { Component } from 'react';
import { css } from 'react-emotion';
import { headline, textEgyptian } from '@guardian/pasteup/fonts';
import palette from '@guardian/pasteup/palette';
import { desktop } from '@guardian/pasteup/breakpoints';
import { BigNumber } from '@guardian/guui';

const heading = css`
    font-family: ${headline};
    color: ${palette.neutral[1]};
    font-size: 20px;
    line-height: 1.2;
    font-weight: 900;
    margin-top: 27px;
    margin-bottom: 1px;
`;

const listItem = css`
    column-fill: balance;
    ${desktop} {
        column-width: 600px;
    }
    height: 100%;
    display: inline-block;
    width: 100%;
    padding-top: 3px;
    padding-bottom: 0;
    min-height: 288px;
`;

const numberStyled = css`
    float: left;
`;

const headlineStyle = css`
    margin-left: 70px;
`;

const headlineBody = css`
    color: ${palette.neutral[2]};
    font-family: ${textEgyptian};
`;

type Trails = Array<{ url: string; linkText: string }>;

export default class MostViewed extends Component<{}, { trails: Trails }> {
    constructor(props: {}) {
        super(props);
        this.state = {
            trails: [],
        };
    }

    public componentDidMount() {
        fetch('https://api.nextgen.guardianapps.co.uk/most-read-geo.json?guui')
            .then(resp => resp.json())
            .then(({ trails }) => {
                this.setState({
                    trails,
                });
            });
    }

    public render() {
        return (
            <div>
                <h2 className={heading}>Most Viewed</h2>
                <ul>
                    {this.state.trails.map((trail, i) => (
                        <li className={listItem} key={trail.url}>
                            <span className={numberStyled}>
                                <BigNumber index={i + 1} />
                            </span>

                            <h2 className={headlineStyle}>
                                <a className={headlineBody} href={trail.url}>
                                    {trail.linkText}
                                </a>
                            </h2>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
