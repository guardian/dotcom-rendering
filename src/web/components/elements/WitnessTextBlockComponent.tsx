import React from 'react';
import { css } from 'emotion';

import { space } from '@guardian/src-foundations';
import { headline, body } from '@guardian/src-foundations/typography';

import { pillarPalette } from '@root/src/lib/pillars';
import { WitnessWrapper } from '@frontend/web/components/WitnessWrapper';

type Props = {
	title: string;
	authorName: string;
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
	authorName,
	dateCreated,
	description,
	pillar,
}: Props) => (
	<WitnessWrapper
		authorName={authorName}
		dateCreated={dateCreated}
		pillar={pillar}
	>
		<>
			<h3
				className={titleStyles(pillar)}
				itemProp="name"
				dangerouslySetInnerHTML={{ __html: title }}
			/>
			<div itemProp="text">
				<p
					className={css`
						${body.medium()}
					`}
					dangerouslySetInnerHTML={{ __html: description }}
				/>
			</div>
		</>
	</WitnessWrapper>
);
