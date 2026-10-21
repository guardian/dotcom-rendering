import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { type CrosswordProps } from '@guardian/react-crossword';
import { palette, space } from '@guardian/source/foundations';
import { LinkButton } from '@guardian/source/react-components';
import { palette as themePalette } from '../palette';
import { PrintButton } from './PrintButton.island';

const crosswordLinkStyles = css`
	margin: ${space[2]}px 0;
`;

export const CrosswordLinks = ({
	crossword,
	isPuzzlesHubV1 = false,
}: {
	crossword: CrosswordProps['data'];
	isPuzzlesHubV1?: boolean;
}) => {
	return (
		isUndefined(crossword.pdf) || (
			<div css={crosswordLinkStyles}>
				{isPuzzlesHubV1 ? (
					<PrintButton href={crossword.pdf} />
				) : (
					<LinkButton
						href={crossword.pdf}
						size="small"
						priority="tertiary"
						target="_blank"
						rel="noreferrer"
						// TODO: add to palette and replace CSS override if possible
						theme={{
							textTertiary: themePalette(
								'--standfirst-link-text',
							),
							borderTertiary: themePalette(
								'--standfirst-link-text',
							),
							backgroundTertiaryHover: themePalette(
								'--standfirst-link-text',
							),
						}}
						cssOverrides={css`
							:hover {
								color: ${palette.neutral[100]};
							}
						`}
					>
						PDF version
					</LinkButton>
				)}
			</div>
		)
	);
};
