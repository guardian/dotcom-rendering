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

export const NewslettersPageHeading = ({
	mmaUrl,
	newsletterCount,
}: NewslettersListProps) => {
	return (
		<Section
			element="header"
			fullWidth={false}
			padBottom={false}
			padSides={false}
			stretchRight={true}
		>
			<div>
				<div
					css={css`
						display: inline-flex;
						flex-direction: row;
						justify-content: flex-start;
						align-items: center;
						padding: 1px ${space[1]}px;
						border: 1px dashed ${palette.neutral[7]};
						margin-bottom: ${space[2]}px;
					`}
				>
					<h1
						css={css`
							${headline.medium()}
						`}
					>
						Newsletters
					</h1>
				</div>
			</div>
			<div
				css={css`
					${headline.xxsmall()}
				`}
			>
				Choose from {newsletterCount} available newsletters
			</div>

			{!!mmaUrl && (
				<div
					css={css`
						display: flex;
						justify-content: flex-start;

						${from.leftCol} {
							justify-content: flex-end;
						}
					`}
				>
					<LinkButton
						href={`${mmaUrl}/email-prefs`}
						size={'xsmall'}
						priority="subdued"
						icon={<SvgChevronRightSingle size="small" />}
						iconSide="right"
						cssOverrides={css`
							margin-bottom: ${space[2]}px;
							color: ${palette.brand[500]};
						`}
					>
						Manage my newsletters
					</LinkButton>
				</div>
			)}
		</Section>
	);
};
