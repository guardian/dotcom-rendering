import { css } from '@emotion/react';
import { Lines } from '@guardian/src-ed-lines';
import { decidePalette } from 'src/web/lib/decidePalette';
import { headline } from '@guardian/src-foundations/typography';

type Props = {
	format: Format;
	byline: string;
	authors: AuthorType[];
	primaryDateline: string;
	secondaryDateline: string;
};

const bylineStyle = (nameColour: string) => css`
	color: ${nameColour};
	${headline.xxxsmall()}
	font-weight: 700;
`;

const dateStyle = (nameColour: string) => css`
	color: ${nameColour};
`;

const ContributorLink: React.FC<{
	contributor: string;
	contributorTagId: string;
}> = ({ contributor, contributorTagId }) => (
	<a
		rel="author"
		data-link-name="auto tag link"
		href={`//www.theguardian.com/${contributorTagId}`}
	>
		{contributor}
	</a>
);

export const ArticleMeta = ({
	format,
	byline,
	authors,
	primaryDateline,
	secondaryDateline,
}: Props) => {
	return (
		<div>
			<Lines count={4} effect="straight" />
			{byline && (
				<p css={bylineStyle(decidePalette(format).text.byline)}>
					{byline}
				</p>
			)}
			<details>
				<summary css={dateStyle(decidePalette(format).text.subMeta)}>
					{primaryDateline}
				</summary>
				<p css={dateStyle(decidePalette(format).text.subMeta)}>
					{secondaryDateline}
				</p>
			</details>
		</div>
	);
};
