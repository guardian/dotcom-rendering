import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import type { ArticleFormat } from '../lib/articleFormat';
import { slugify } from '../model/enhance-H2s';
import type { MiniProfile as MiniProfileModel } from '../types/content';
import { Bio } from './Bio';
import { EndNote } from './EndNote';
import { Heading } from './Heading';
import { headingLineStyles } from './KeyTakeaway';
import { subheadingStyles } from './Subheading';

const miniProfileStyles = css`
	padding-top: 8px;
`;

const headingMarginStyle = css`
	margin-bottom: ${space[2]}px;
`;

const sectionedTitleStyle = css`
	font-size: 1.5rem;
`;

interface MiniProfileProps {
	miniProfile: MiniProfileModel;
	format: ArticleFormat;
	children: React.ReactNode;
	sectioned: boolean;
}

export const MiniProfile = ({
	miniProfile,
	format,
	children,
	sectioned,
}: MiniProfileProps) => {
	return (
		<>
			<li css={miniProfileStyles} data-spacefinder-role="nested">
				<hr css={headingLineStyles} />
				<Heading
					id={slugify(miniProfile.title)}
					css={[subheadingStyles(format), headingMarginStyle]}
					level={sectioned ? 3 : 2}
				>
					<span css={sectioned && sectionedTitleStyle}>
						{miniProfile.title}
					</span>
				</Heading>
				<Bio html={miniProfile.bio} />
				{children}
				{miniProfile.endNote ? (
					<EndNote text={miniProfile.endNote} />
				) : null}
			</li>
		</>
	);
};
