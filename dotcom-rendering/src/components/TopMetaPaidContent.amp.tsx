import { css } from '@emotion/react';
import { body, palette, text, textSans } from '@guardian/source-foundations';
import { getAgeWarning } from '../lib/age-warning';
import { getSoleContributor } from '../lib/byline';
import { getSharingUrls } from '../lib/sharing-urls';
import type { AMPArticleModel } from '../types/article.amp';
import type { Branding } from '../types/branding';
import { BrandingRegionContainer } from './Branding.amp';
import { Byline } from './Byline.amp';
import { MainMedia } from './MainMedia.amp';
import { PaidForBand } from './PaidForBand.amp';
import { Standfirst } from './Standfirst.amp';
import { TopMetaExtras } from './TopMetaExtras.amp';

const headerStyle = css`
	${textSans.xlarge()};
	font-weight: 400;
	padding-top: 3px;
	padding-bottom: 27px;
	color: ${palette.neutral[7]};
`;

const bylineStyle = css`
	${body.medium()};
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
	${textSans.small()};
	font-weight: 700;
	margin-bottom: 6px;
	color: ${text.supporting};
`;
const paidForLogoStyle = css`
	padding-top: 4px;
	margin-top: 3px;
	margin-bottom: 12px;
`;

type PaidForByLogoProps = {
	branding: Branding;
};

const PaidForByLogo = ({ branding }: PaidForByLogoProps) => {
	const { logo, sponsorName } = branding;

	return (
		<div css={paidForLogoStyle}>
			<div css={paidForLogoLabelStyle}>Paid for by</div>
			<a
				href={logo.link}
				data-sponsor={sponsorName.toLowerCase()}
				rel="nofollow"
				aria-label={`Visit the ${sponsorName} website`}
			>
				<amp-img
					src={logo.src}
					width="140px"
					height="90px"
					alt={sponsorName}
				/>
			</a>
		</div>
	);
};

type HeadlineProps = {
	headlineText: string;
};

const Headline = ({ headlineText }: HeadlineProps) => (
	<h1 css={headerStyle}>{headlineText}</h1>
);

type TopMetaPaidContentProps = {
	articleData: AMPArticleModel;
	pillar: ArticleTheme;
};

export const TopMetaPaidContent = ({
	articleData,
	pillar,
}: TopMetaPaidContentProps) => (
	<header>
		<PaidForBand />

		{articleData.mainMediaElements.map((element, i) => (
			<MainMedia key={i} element={element} pillar={pillar} />
		))}

		<Headline headlineText={articleData.headline} />

		<BrandingRegionContainer
			commercialProperties={articleData.commercialProperties}
		>
			{(branding) => <PaidForByLogo branding={branding} />}
		</BrandingRegionContainer>

		<Standfirst text={articleData.standfirst} pillar={pillar} />

		<div css={bylineStyle}>
			<Byline
				byline={articleData.byline}
				tags={articleData.tags}
				guardianBaseURL={articleData.guardianBaseURL}
			/>
		</div>

		<TopMetaExtras
			sharingUrls={getSharingUrls(
				articleData.pageId,
				articleData.webTitle,
			)}
			pillar={pillar}
			ageWarning={getAgeWarning(
				articleData.tags,
				articleData.webPublicationDateDeprecated,
			)}
			webPublicationDate={articleData.webPublicationDateDisplay}
			twitterHandle={
				getSoleContributor(articleData.tags, articleData.byline)
					?.twitterHandle
			}
		/>
	</header>
);
