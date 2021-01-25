import React from 'react';
import { css } from 'emotion';

import { space } from '@guardian/src-foundations';
import { headline, body } from '@guardian/src-foundations/typography';

import { pillarPalette } from '@root/src/lib/pillars';
import { WitnessWrapper } from '@frontend/web/components/WitnessWrapper';

type Props = {
	assets: WitnessAssetType[];
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
	assets,
	caption,
	title,
	authorName,
	dateCreated,
	alt,
	pillar,
}: Props) => {
	// witness images seem to always use `mediumoriginalaspectdouble`, but in case that isn't found we use the 1st
	// asset in the list
	const bestImgSource =
		assets.find(
			(asset) => asset.typeData.name === 'mediumoriginalaspectdouble',
		) || assets[0];
	return (
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
					src={bestImgSource && bestImgSource.file}
					alt={alt}
					itemProp="contentURL"
				/>
				<figcaption className={captionStyles}>
					<h3
						className={titleStyles(pillar)}
						itemProp="name"
						dangerouslySetInnerHTML={{ __html: title }}
					/>
					<div itemProp="description">
						<p
							className={css`
								${body.medium()}
							`}
							dangerouslySetInnerHTML={{ __html: caption }}
						/>
					</div>
				</figcaption>
			</>
		</WitnessWrapper>
	);
};
