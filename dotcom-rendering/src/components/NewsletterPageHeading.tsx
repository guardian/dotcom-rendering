import { css } from '@emotion/react';
import { from, headline, palette, space } from '@guardian/source-foundations';
import {
	LinkButton,
	SvgChevronRightSingle,
} from '@guardian/source-react-components';
import { Flex } from './Flex';
import { Section } from './Section';

export interface NewslettersListProps {
	headingText: string;
	mmaUrl?: string;
	newsletterCount: number;
}

export const NewslettersPageHeading = ({
	headingText,
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
			<h1
				css={css`
					${headline.medium()}
				`}
			>
				{headingText}
			</h1>
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
