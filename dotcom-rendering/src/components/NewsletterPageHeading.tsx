import { css } from '@emotion/react';
import { from, headline, palette, space } from '@guardian/source-foundations';
import {
	LinkButton,
	SvgChevronRightSingle,
} from '@guardian/source-react-components';
import { Section } from './Section';

export interface NewslettersListProps {
	mmaUrl?: string;
	newsletterCount: number;
}

// To align the heading content with the carousel below
// from desktop
const contentWrapperStyle = css`
	${from.leftCol} {
		padding-left: 10px;
	}
`;

const headlineStyle = css`
	display: inline-flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	padding: 1px ${space[1]}px;
	border: 1px dashed ${palette.neutral[7]};
	margin-bottom: ${space[2]}px;
	margin-top: ${space[2]}px;
	${headline.medium()}
`;

const subtitleStyle = css`
	${headline.xxsmall()}
`;

const manageLinkContainer = css`
	display: flex;
	justify-content: flex-start;
	margin-top: ${space[2]}px;
	margin-bottom: ${space[2]}px;

	${from.leftCol} {
		margin-top: 0;
		justify-content: flex-end;
	}
`;

const linkStyle = css`
	color: ${palette.brand[500]};
`;

export const NewslettersPageHeading = ({
	mmaUrl,
	newsletterCount,
}: NewslettersListProps) => {
	return (
		<Section
			element="header"
			padSides={true}
			stretchRight={true}
			verticalMargins={false}
			leftColSize="wide"
			padContent={false}
		>
			<div css={contentWrapperStyle}>
				<h1 css={headlineStyle}>
					<span>Newsletters</span>
				</h1>
				<p css={subtitleStyle}>
					Choose from {newsletterCount} available newsletters
				</p>

				{!!mmaUrl && (
					<div css={manageLinkContainer}>
						<LinkButton
							href={`${mmaUrl}/email-prefs`}
							size={'xsmall'}
							priority="subdued"
							icon={<SvgChevronRightSingle size="small" />}
							iconSide="right"
							cssOverrides={linkStyle}
						>
							Manage my newsletters
						</LinkButton>
					</div>
				)}
			</div>
		</Section>
	);
};
