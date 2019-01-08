import React, { Component } from 'react';
import { css } from 'emotion';
import { palette } from '@guardian/pasteup/palette';
import ShareIcon from '@guardian/pasteup/icons/share.svg';
import { screenReaderOnly } from '@guardian/pasteup/mixins';
import { textSans } from '@guardian/pasteup/typography';
import { from, wide, leftCol } from '@guardian/pasteup/breakpoints';
import { integerCommas } from '@frontend/lib/formatters';
import { reportError } from '@frontend/web/client/reportError';

const shareCount = css`
    ${textSans(6)};
    font-weight: bold;
    color: ${palette.neutral[46]};

    ${leftCol} {
        border-top: 1px solid ${palette.neutral[86]};
        width: 100%;
        padding-top: 6px;
    }

    ${wide} {
        flex: 1;
        border: 0;
        padding-top: 0;
        text-align: right;
    }
`;

const shareCountContainer = css`
    ${leftCol} {
        display: inline-block;
    }
`;

const shareCountHeader = css`
    position: relative;
    height: 15px;
    margin: 0;
`;

const shareCountIcon = css`
    position: absolute;
    top: 0;
    right: 0;
    fill: ${palette.neutral[46]};
`;

const countFull = css`
    display: block;

    ${from.leftCol.until.wide} {
        display: none;
    }
`;

const countShort = css`
    display: none;

    ${from.leftCol.until.wide} {
        display: block;
    }
`;

interface Props {
    config: ConfigType;
    pageId: string;
}

export class ShareCount extends Component<Props, { shareCount?: number }> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        const { config, pageId } = this.props;
        const url = `${config.ajaxUrl}/sharecount/${pageId}.json`;

        fetch(url)
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
            })
            .then(data => {
                this.setState({
                    shareCount: data.share_count,
                });
            })
            .catch(err => {
                reportError(err, {
                    feature: 'share-count',
                });
            });
    }

    public render() {
        if (!this.state.shareCount) {
            return null;
        }

        const displayCount = parseInt(this.state.shareCount.toFixed(0), 10);
        const formattedDisplayCount = integerCommas(displayCount);
        const shortDisplayCount =
            displayCount > 10000
                ? `${Math.round(displayCount / 1000)}k`
                : displayCount;

        return (
            <div className={shareCount}>
                <div className={shareCountContainer}>
                    <h3 className={shareCountHeader}>
                        <ShareIcon className={shareCountIcon} />
                        <span
                            className={css`
                                ${screenReaderOnly};
                            `}
                        >
                            Shares
                        </span>
                    </h3>
                    <div data-testid={'countFull'} className={countFull}>
                        {formattedDisplayCount}
                    </div>
                    <div data-testid={'countShort'} className={countShort}>
                        {shortDisplayCount}
                    </div>
                </div>
            </div>
        );
    }
}
