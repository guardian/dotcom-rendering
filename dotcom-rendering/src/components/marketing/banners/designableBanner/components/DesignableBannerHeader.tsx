/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/0a2439b701586a7a2cc60dce10b4d96cf7a828db/packages/modules/src/modules/banners/designableBanner/components/DesignableBannerHeader.tsx
 */
import { css } from '@emotion/react';
import {
	from,
	headlineMedium17,
	headlineMedium28,
	headlineMedium34,
	headlineMedium42,
	neutral,
	space,
	until,
} from '@guardian/source/foundations';
import type { Image } from '@guardian/support-dotcom-components/dist/shared/types';
import {
	removeMediaRulePrefix,
	useMatchMedia,
} from '../../../../../lib/useMatchMedia';
import type { HeaderSettings } from '../settings';
import { DesignableBannerVisual } from './DesignableBannerVisual';

interface DesignableBannerHeaderProps {
	heading: JSX.Element | JSX.Element[] | null;
	mobileHeading: JSX.Element | JSX.Element[] | null;
	headerSettings: HeaderSettings | undefined;
	headlineSize: 'small' | 'medium' | 'large';
	isInABTestVariant: boolean;
	isCollapsed: boolean;
}

export function DesignableBannerHeader({
	heading,
	mobileHeading,
	headerSettings,
	headlineSize,
	isInABTestVariant = false,
	isCollapsed = false,
}: DesignableBannerHeaderProps): JSX.Element {
	const isTabletOrAbove = useMatchMedia(removeMediaRulePrefix(from.tablet));
	const styles = getStyles(
		headerSettings,
		headlineSize,
		isInABTestVariant,
		isCollapsed,
	);

	const resolveImage = (settings: Image) => {
		return (
			<DesignableBannerVisual settings={settings} isHeaderImage={true} />
		);
	};

	const resolveCopy = () => {
		return (
			<h2>
				{isTabletOrAbove && !isInABTestVariant && !isCollapsed
					? heading
					: mobileHeading}
			</h2>
		);
	};

	return (
		<div css={styles.container}>
			<header css={styles.header}>
				{headerSettings?.headerImage &&
					resolveImage(headerSettings.headerImage)}
				{(heading ?? mobileHeading) && resolveCopy()}
			</header>
		</div>
	);
}

const getStyles = (
	headerSettings: HeaderSettings | undefined,
	headlineSize: 'small' | 'medium' | 'large',
	isInABTestVariant: boolean,
	isCollapsed: boolean,
) => {
	const color = headerSettings?.textColour ?? neutral[0];
	const copyTopMargin = headerSettings?.headerImage ? space[1] : space[1];
	const containerMargin = headerSettings?.headerImage ? `${space[6]}px` : '0';

	const mobileHeadlineSize =
		headlineSize === 'small'
			? `${headlineMedium17}`
			: `${headlineMedium28}`;

	const phabletHeadline =
		isInABTestVariant && isCollapsed
			? `${mobileHeadlineSize}`
			: `${headlineMedium34}`;

	const leftColHeadline =
		isInABTestVariant && isCollapsed
			? `${mobileHeadlineSize}`
			: `${headlineMedium42}`;

	return {
		container: css`
			position: relative;
			margin-bottom: ${containerMargin};
		`,
		header: css`
			h2 {
				color: ${color};
				margin: ${copyTopMargin}px 0 ${space[2]}px 0;

				${until.phablet} {
					${mobileHeadlineSize};
				}

				${from.phablet} {
					${phabletHeadline};
				}

				${from.leftCol} {
					${leftColHeadline};
				}
			}
		`,
	};
};
