import React from 'react';
import { css } from 'emotion';

import { ArticleModel } from '@frontend/amp/pages/Article';
import { MainMedia } from '@frontend/amp/components/MainMedia';
import { Byline } from '@frontend/amp/components/Byline';
import { TopMetaExtras } from '@frontend/amp/components/TopMetaExtras';
import { Standfirst } from '@frontend/amp/components/Standfirst';
import { PaidForBand } from '@frontend/amp/components/PaidForBand';

import { palette } from '@guardian/pasteup/palette';
import { headline, body } from '@guardian/pasteup/typography';

// TODO typography styling needs to be reviewed -> TextSans?
const headerStyle = css`
    ${headline(6)};
    font-weight: 500;
    padding-bottom: 24px;
    padding-top: 3px;
    color: ${palette.neutral[7]};
`;

const bylineStyle = (pillar: Pillar) => css`
    ${headline(2)};
    color: ${palette.neutral[7]};
    padding-bottom: 8px;
    font-style: italic;

    a {
        font-weight: 700;
        color: ${palette.neutral[7]};
        text-decoration: none;
        font-style: normal;
    }
`;

const paidForLogoLabelStyle = css`
    ${body(1)};
`;

const PaidForByLogo: React.FC<{
    branding: Branding;
}> = ({ branding }) => {
    const { logo, sponsorName } = branding;
    return (
        <div>
            <div className={paidForLogoLabelStyle}>Paid for by</div>
            {/* tslint:disable-next-line: react-a11y-anchors */}
            <a
                href={logo.link}
                data-sponsor={sponsorName.toLowerCase()}
                rel="nofollow"
            >
                <amp-img
                    src={logo.src}
                    width="280px"
                    height="180px"
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
                <MainMedia
                    key={i}
                    element={element}
                    pillar={articleData.pillar}
                />
            ))}

            <Headline headlineText={articleData.headline} />

            {!!branding && <PaidForByLogo branding={branding} />}

            <Standfirst
                text={articleData.standfirst}
                pillar={articleData.pillar}
            />

            <Byline
                byline={articleData.author.byline}
                tags={articleData.tags}
                pillar={articleData.pillar}
                guardianBaseURL={articleData.guardianBaseURL}
                className={bylineStyle(articleData.pillar)}
            />

            <TopMetaExtras
                sharingUrls={articleData.sharingUrls}
                pillar={articleData.pillar} // pillar  defualt / none == black for paid?
                ageWarning={articleData.ageWarning}
                webPublicationDate={articleData.webPublicationDateDisplay}
                twitterHandle={articleData.author.twitterHandle}
            />
        </header>
    );
};
