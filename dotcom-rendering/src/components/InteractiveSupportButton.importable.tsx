import { css, ThemeProvider } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import {
	buttonThemeReaderRevenue,
	LinkButton,
	SvgArrowRightStraight,
} from '@guardian/source-react-components';
import { shouldHideSupportMessaging } from '../lib/contributions';
import type { EditionId } from '../lib/edition';
import { nestedOphanComponents } from '../lib/ophan-helpers';
import { Hide } from './Hide';

type InteractiveSupportButtonProps = {
	editionId: EditionId;
	subscribeUrl: string;
};

const PositionButton = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			margin-top: ${space[1]}px;
			margin-left: ${space[2]}px;
		`}
	>
		{children}
	</div>
);

export const InteractiveSupportButton = ({
	editionId,
	subscribeUrl,
}: InteractiveSupportButtonProps) => {
	const hideSupportMessaging = shouldHideSupportMessaging();

	if (!hideSupportMessaging) {
		return (
			<Hide when="above" breakpoint="tablet">
				<ThemeProvider theme={buttonThemeReaderRevenue}>
					<PositionButton>
						<LinkButton
							priority="primary"
							size="small"
							iconSide="right"
							icon={<SvgArrowRightStraight />}
							data-link-name={nestedOphanComponents(
								'nav2',
								'support-cta',
							)}
							data-edition={editionId}
							href={subscribeUrl}
						>
							Support us
						</LinkButton>
					</PositionButton>
				</ThemeProvider>
			</Hide>
		);
	}
	return null;
};
