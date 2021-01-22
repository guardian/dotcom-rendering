import React from 'react';
import { css } from 'emotion';

import { space } from '@guardian/src-foundations';
import { headline, body } from '@guardian/src-foundations/typography';

import { pillarPalette } from '@root/src/lib/pillars';
import { WitnessWrapper } from '@frontend/web/components/WitnessWrapper';

type Props = {
	caption: string;
	title: string;
	authorName: string;
	dateCreated: string;
	alt: string;
	pillar: Theme;
};

const captionStyles = css`
	margin-top: ${space[3]}px;
`;

const titleStyles = (pillar: Theme) => css`
	margin-bottom: ${space[2]}px;
	color: ${pillarPalette[pillar].main};
	${headline.xxxsmall()}
`;

export const WitnessImageBlockComponent = ({
	caption,
	title,
	authorName,
	dateCreated,
	alt,
	pillar,
}: Props) => (
	<WitnessWrapper
		authorName={authorName}
		dateCreated={dateCreated}
		pillar={pillar}
	>
		<>
			<img
				className={css`
					width: 100%;
				`}
				src="https://gu-witness.s3.amazonaws.com/image/1440505256168e17c87ce879c40d3f575b6625340fb7c-mediumoriginalaspectdouble.jpg"
				alt={alt}
				itemProp="contentURL"
			/>
			<figcaption className={captionStyles}>
				<h3 className={titleStyles(pillar)} itemProp="name">
					{title}
				</h3>
				<div itemProp="description">
					<p
						className={css`
							${body.medium()}
						`}
					>
						{caption}
					</p>
				</div>
			</figcaption>
		</>
	</WitnessWrapper>
);
