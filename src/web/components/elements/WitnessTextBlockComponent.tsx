import React from 'react';
import { css } from 'emotion';

import { space } from '@guardian/src-foundations';
import { headline, body } from '@guardian/src-foundations/typography';

import { pillarPalette } from '@root/src/lib/pillars';
import { WitnessWrapper } from '@frontend/web/components/WitnessWrapper';

type Props = {
	title: string;
	authorUsername: string;
	dateCreated: string;
	description: string;
	pillar: Theme;
};

const titleStyles = (pillar: Theme) => css`
	margin-bottom: ${space[2]}px;
	color: ${pillarPalette[pillar].main};
	${headline.xxxsmall()}
`;

export const WitnessTextBlockComponent = ({
	title,
	authorUsername,
	dateCreated,
	description,
	pillar,
}: Props) => (
	<WitnessWrapper
		authorName={authorUsername}
		dateCreated={dateCreated}
		pillar={pillar}
	>
		<>
			<h3 className={titleStyles(pillar)} itemProp="name">
				{title}
			</h3>
			<div itemProp="text">
				<p
					className={css`
						${body.medium()}
					`}
				>
					{description}
				</p>
			</div>
		</>
	</WitnessWrapper>
);
