import React from 'react';
import { css } from 'emotion';

import { ArticleModel } from '@frontend/amp/pages/Article';
import { MainMedia } from '@frontend/amp/components/MainMedia';
import { Byline } from '@frontend/amp/components/Byline';
import { TopMetaExtras } from '@frontend/amp/components/TopMetaExtras';
import { Standfirst } from '@frontend/amp/components/Standfirst';
import { PaidForBand } from '@frontend/amp/components/PaidForBand';

import { palette } from '@guardian/pasteup/palette';
import { textSans, body } from '@guardian/pasteup/typography';

const headerStyle = css`
    ${textSans(8)};
    font-weight: 400;
    padding-top: 3px;
    padding-bottom: 40px;
    color: ${palette.neutral[7]};
`;

const bylineStyle = css`
    ${body(2)};
    color: ${palette.neutral[7]};
    padding-bottom: 8px;
    font-style: italic;

    a {
        font-weight: 700;
        color: ${palette.neutral[7]};
        text-decoration: none;
        font-style: normal;
    }
    a:hover {
        text-decoration: underline;
    }
`;

const paidForLogoLabelStyle = css`
    ${textSans(2)};
    font-weight: 700;
    margin-bottom: 6px;
    color: ${palette.neutral[46]};
`;
const paidForLogoStyle = css`
    border-top: 1px solid ${palette.neutral[60]};
    padding-top: 4px;
    margin-top: 3px;
    margin-bottom: 12px;
`;

const PaidForByLogo: React.FC<{
    branding: Branding;
}> = ({ branding }) => {
    const { logo, sponsorName } = branding;

    return (
        <div className={paidForLogoStyle}>
            <div className={paidForLogoLabelStyle}>Paid for by</div>
            {/* tslint:disable-next-line: react-a11y-anchors */}
            <a
                href={logo.link}
                data-sponsor={sponsorName.toLowerCase()}
                rel="nofollow"
            >
                <amp-img
                    src={logo.src}
                    width={`140px`}
                    height={`90px`}
                    alt={sponsorName}
                />
            </a>
        </div>
    );
};

const Headline: React.FC<{
    headlineText: string;
}> = ({ headlineText }) => <h1 className={headerStyle}>{headlineText}</h1>;

export const TopMetaPaidContent: React.FC<{
    articleData: ArticleModel;
}> = ({ articleData }) => {
    const branding =
        articleData.commercialProperties[articleData.editionId].branding;

    return (
        <header>
            <PaidForBand />

            {articleData.mainMediaElements.map((element, i) => (
                <MainMedia key={i} element={element} pillar="labs" />
            ))}

            <Headline headlineText={articleData.headline} />

            {!!branding && <PaidForByLogo branding={branding} />}

            <Standfirst text={articleData.standfirst} pillar="labs" />

            <Byline
                byline={articleData.author.byline}
                tags={articleData.tags}
                guardianBaseURL={articleData.guardianBaseURL}
                className={bylineStyle}
            />

            <TopMetaExtras
                sharingUrls={articleData.sharingUrls}
                pillar="labs" // pillar  defualt / none == black for paid?
                ageWarning={articleData.ageWarning}
                webPublicationDate={articleData.webPublicationDateDisplay}
                twitterHandle={articleData.author.twitterHandle}
            />
        </header>
    );
};
