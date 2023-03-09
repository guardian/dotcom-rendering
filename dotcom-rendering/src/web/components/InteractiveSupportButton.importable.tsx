import {Hide} from "./Hide";
import {css, ThemeProvider} from "@emotion/react";
import {buttonThemeReaderRevenue} from "@guardian/source-react-components";
import {
	LinkButton,
	SvgArrowRightStraight,
} from '@guardian/source-react-components';
import { space} from "@guardian/source-foundations";
import {
	HIDE_SUPPORT_MESSAGING_COOKIE, isRecentOneOffContributor, RECURRING_CONTRIBUTOR_COOKIE,
	shouldHideSupportMessaging,
	shouldShowSupportMessaging
} from "../lib/contributions";
import {getCookie,} from "@guardian/libs";
import {EditionId} from "../lib/edition";

type InteractiveSupportButtonProps={editionId:EditionId,subscribeUrl:string};

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


export const InteractiveSupportButton =  ({editionId,subscribeUrl} : InteractiveSupportButtonProps) => {
	// useEffect(() => {
	//
	// });

	const hideSupportMessaging = shouldHideSupportMessaging();


	console.log("shouldShowSupportMessaging()", shouldShowSupportMessaging())
	console.log("isRecurringContributor(isSignedIn)",getCookie({ name: RECURRING_CONTRIBUTOR_COOKIE }) === 'true')
	console.log("isRecentOneOffContributor()", isRecentOneOffContributor())
	console.log("hideSupportMessaging", hideSupportMessaging)
	console.log("GEtCookie",getCookie({ name: HIDE_SUPPORT_MESSAGING_COOKIE }))



	if (!hideSupportMessaging) {
		return (
			<Hide when="above" breakpoint="tablet">
				<ThemeProvider theme={buttonThemeReaderRevenue}>
					<PositionButton>
						<LinkButton
							priority="primary"
							size="small"
							iconSide="right"
							icon={<SvgArrowRightStraight/>}
							data-link-name="nav2 : support-cta"
							data-edition={editionId}
							href={subscribeUrl}
						>
							Support us
						</LinkButton>
					</PositionButton>
				</ThemeProvider>
			</Hide>
		)
	}
	return null;

};
