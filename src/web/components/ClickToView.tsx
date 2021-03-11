/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { css } from 'emotion';

import { border, background } from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { Button } from '@guardian/src-button';
import { SvgCheckmark } from '@guardian/src-icons';
import { space } from '@guardian/src-foundations';

type Props = {
	children: React.ReactNode;
	role?: RoleType;
	onAccept?: () => void;
	isTracking: boolean;
	isMainMedia?: boolean;
	source?: string;
	sourceDomain?: string;
	abTests: CAPIType['config']['abTests'];
};

const roleTextSize = (role: RoleType) => {
	switch (role) {
		case 'immersive':
		case 'inline':
		case 'showcase': {
			return textSans.medium();
		}
		case 'halfWidth':
		case 'supporting':
		case 'thumbnail': {
			return textSans.small();
		}
	}
};

const roleHeadlineSize = (role: RoleType) => {
	switch (role) {
		case 'immersive':
		case 'inline':
		case 'showcase': {
			return headline.xsmall();
		}
		case 'halfWidth':
		case 'supporting':
		case 'thumbnail': {
			return headline.xxsmall();
		}
	}
};

const roleButtonSize = (role: RoleType) => {
	switch (role) {
		case 'immersive':
		case 'inline':
		case 'showcase': {
			return 'small';
		}
		case 'halfWidth':
		case 'supporting':
		case 'thumbnail': {
			return 'xsmall';
		}
	}
};

const roleButtonText = (role: RoleType) => {
	switch (role) {
		case 'immersive':
		case 'inline':
		case 'showcase':
		case 'halfWidth':
		case 'supporting': {
			return 'Allow and continue';
		}
		case 'thumbnail': {
			return 'Allow';
		}
	}
};

const shouldDisplayOverlay = ({
	isTracking,
	isOverlayClicked,
	isInABTestVariant,
	isMainMedia,
}: {
	isTracking: boolean;
	isOverlayClicked: boolean;
	isInABTestVariant: boolean;
	isMainMedia?: boolean;
}) => {
	if (isMainMedia || !isTracking) {
		return false;
	}
	if (isOverlayClicked) {
		return false;
	}
	return isInABTestVariant;
};

const isInABTestVariant = (abTestConfig: CAPIType['config']['abTests']) => {
	return abTestConfig.clickToViewVariant === 'variant';
};

export const ClickToView = ({
	children,
	role = 'inline',
	onAccept,
	isTracking,
	isMainMedia,
	source,
	sourceDomain = 'unknown',
	abTests,
}: Props) => {
	const [isOverlayClicked, setIsOverlayClicked] = useState<boolean>(false);

	const handleClick = () => {
		setIsOverlayClicked(true);
		if (onAccept) {
			setTimeout(() => onAccept());
		}
	};

	const textSize = roleTextSize(role);

	if (
		shouldDisplayOverlay({
			isTracking,
			isOverlayClicked,
			isInABTestVariant: isInABTestVariant(abTests),
			isMainMedia,
		})
	) {
		return (
			<div
				className={css`
					width: 100%;
					background: ${background.secondary};
					border: 1px solid ${border.primary};
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					padding: ${space[3]}px;
					margin-bottom: 8px;
				`}
				data-component={`click-to-view:${sourceDomain}`}
			>
				<div
					className={css`
						${roleHeadlineSize(role)}
						margin-bottom: 8px;
					`}
				>
					{source
						? `Allow ${source} content?`
						: 'Allow content provided by a third party?'}
				</div>
				<div
					className={css`
						${textSize}
						a {
							${textSize}
						}
						p {
							margin-bottom: 8px;
						}
					`}
				>
					{source ? (
						<>
							<p>
								This article includes content provided by{' '}
								{source}. We ask for your permission before
								anything is loaded, as they may be using cookies
								and other technologies.
							</p>
							<p>
								To view this content, click &apos;Allow and
								continue&apos;.
							</p>
						</>
					) : (
						<>
							<p>
								This article includes content hosted on{' '}
								{sourceDomain}. We ask for your permission
								before anything is loaded, as the provider may
								be using cookies and other technologies.
							</p>
							<p>
								To view this content, click &apos;Allow and
								continue&apos;.
							</p>
						</>
					)}
				</div>
				<div>
					<Button
						priority="primary"
						size={roleButtonSize(role)}
						icon={<SvgCheckmark />}
						iconSide="left"
						onClick={() => handleClick()}
						data-link-name="allow-button"
					>
						{roleButtonText(role)}
					</Button>
				</div>
			</div>
		);
	}
	return <>{children}</>;
};
