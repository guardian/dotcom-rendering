import React from 'react';
import { css, cx } from 'react-emotion';

import { serif } from '@guardian/pasteup/fonts';
import { palette } from '@guardian/pasteup/palette';
import {
    mobileLandscape,
    tablet,
    mobileMedium,
    until,
} from '@guardian/pasteup/breakpoints';

import { getCookie } from '@frontend/web/lib/cookie';
import { AsyncClientComponent } from '@frontend/web/components/lib/AsyncClientComponent';

const message = css`
    color: ${palette.neutral[97]};
    font-family: ${serif.headline};
    font-size: 13px;
    font-weight: 700;
    text-align: center;
    line-height: 1.2;
    padding: 6px 20px 3px;
    position: relative;

    ${tablet} {
        font-size: 14px;
    }
`;

const link = css`
    color: red;
`;

const hiddenUntilTablet = css`
    ${until.tablet} {
        display: none;
    }
`;

const hiddenFromTablet = css`
    ${tablet} {
        display: none;
    }
`;

const hidden = css`
    display: none;
`;

const ReaderRevenueLinks: React.SFC<{
    edition: Edition;
    urls: {
        subscribe: string;
        support: string;
        contribute: string;
    };
}> = ({ edition, urls }) => {
    console.log('*****', edition);
    return (
        <AsyncClientComponent f={shouldShow}>
            {({ data }) => (
                <>
                    {data && (
                        <>
                            <div className={message}>Support The Guardian</div>
                            <a
                                className={cx(link, hiddenUntilTablet)}
                                href={urls.contribute}
                            >
                                Contribute
                            </a>
                            <a
                                className={cx(link, hiddenUntilTablet)}
                                href={urls.subscribe}
                            >
                                Subscribe
                            </a>
                            <a
                                className={cx(link, hiddenFromTablet, {
                                    [hidden]: edition !== 'UK',
                                })}
                                href={urls.support}
                            >
                                Support us
                            </a>
                            <a
                                className={cx(link, hiddenFromTablet, {
                                    [hidden]: edition === 'UK',
                                })}
                                href={urls.contribute}
                            >
                                Contribute
                            </a>
                        </>
                    )}
                </>
            )}
        </AsyncClientComponent>
    );
};

const shouldShow: () => Promise<boolean> = () =>
    Promise.resolve(!(isRecentContributor() || isPayingMember()));

const isRecentContributor: () => boolean = () => {
    const value = getCookie('gu.contributions.contrib-timestamp');

    if (!value) {
        return false;
    }

    const now = new Date().getTime();
    const lastContribution = new Date(value).getTime();
    const diffDays = Math.ceil((now - lastContribution) / (1000 * 3600 * 24));

    return diffDays <= 180;
};

const isPayingMember: () => boolean = () => {
    return getCookie('gu_paying_member') === 'true';
};

export default ReaderRevenueLinks;
