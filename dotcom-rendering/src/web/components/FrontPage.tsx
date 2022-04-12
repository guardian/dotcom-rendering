import { StrictMode } from 'react';
import { Global, css } from '@emotion/react';
import { focusHalo, brandAlt, neutral } from '@guardian/source-foundations';
import { SkipTo } from './SkipTo';
import { Island } from './Island';
import { FocusStyles } from './FocusStyles.importable';
import { AlreadyVisited } from './AlreadyVisited.importable';
import { CoreVitals } from './CoreVitals.importable';
import { FrontLayout } from '../layouts/FrontLayout';

type Props = {
	front: DCRFrontType;
	NAV: NavType;
};

/**
 * @description
 * Article is a high level wrapper for pages on Dotcom. Sets strict mode and some globals
 *
 * @param {Props} props
 * @param {DCRFrontType} props.front - The article JSON data
 * @param {NAVType} props.NAV - The article JSON data
 * */
export const FrontPage = ({ front, NAV }: Props) => {
	return (
		<StrictMode>
			<Global
				styles={css`
					/* Crude but effective mechanism. Specific components may need to improve on this behaviour. */
					/* The not(.src...) selector is to work with Source's FocusStyleManager. */
					*:focus {
						${focusHalo}
					}
					::selection {
						background: ${brandAlt[400]};
						color: ${neutral[7]};
					}
				`}
			/>
			<SkipTo id="maincontent" label="Skip to main content" />
			<SkipTo id="navigation" label="Skip to navigation" />
			<Island clientOnly={true} deferUntil="idle">
				<AlreadyVisited />
			</Island>
			<Island clientOnly={true} deferUntil="idle">
				<FocusStyles />
			</Island>
			<Island clientOnly={true} deferUntil="idle">
				<CoreVitals />
			</Island>
			<FrontLayout front={front} NAV={NAV} />
		</StrictMode>
	);
};
