import { css, Global } from '@emotion/react';
import { brandAlt, focusHalo, neutral } from '@guardian/source-foundations';
import type { ReactNode } from 'react';
import { StrictMode } from 'react';
import { AlreadyVisited } from './AlreadyVisited.importable';
import { CoreVitals } from './CoreVitals.importable';
import { FocusStyles } from './FocusStyles.importable';
import { Island } from './Island';
import { ReaderRevenueDev } from './ReaderRevenueDev.importable';
import { SkipTo } from './SkipTo';

type Props = {
	children: ReactNode;
};

/**
 * @description
 * Article is a high level wrapper for stand alone pages on Dotcom. Sets strict mode and some globals
 *
 * @param {Props} props
 * @param {ReactChild} props.children
 * */
export const StandAlonePage = ({ children }: Props) => {
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

			<Island clientOnly={true} deferUntil="idle">
				<ReaderRevenueDev shouldHideReaderRevenue={true} />
			</Island>

			{children}
		</StrictMode>
	);
};
