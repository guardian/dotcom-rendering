/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { css } from 'emotion';

import { border, background } from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { Button } from '@guardian/src-button';
import { SvgCheckmark } from '@guardian/src-icons';
import { space } from '@guardian/src-foundations';

type CoreAPI = import('@guardian/ab-core/dist/types').CoreAPI;

type Props = {
	children: React.ReactNode;
	role?: RoleType;
	onAccept?: Function;
	isTracking: boolean;
	source?: string;
	sourceDomain?: string;
	isServerSide?: boolean;
	ab?: CoreAPI;
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

const shouldDisplayOverlay = (
	isServerSide: boolean,
	isTracking: boolean,
	isOverlayClicked: boolean,
	ab?: CoreAPI,
) => {
	if (!isTracking) {
		return false;
	}
	if (isOverlayClicked) {
		return false;
	}
	if (isServerSide) {
		return false;
	}
	return ab && ab.isUserInVariant('ClickToViewTest', 'manual');
};

export const ClickToView = ({
	children,
	role = 'inline',
	onAccept,
	isTracking,
	source,
	sourceDomain = 'unknown',
	isServerSide = true,
	ab,
}: Props) => {
	const [isOverlayClicked, setOverlayClicked] = useState<boolean>(false);

	const handleClick = () => {
		setOverlayClicked(true);
		if (onAccept) {
			setTimeout(() => onAccept());
		}
	};

	const textSize = roleTextSize(role);

	if (shouldDisplayOverlay(isServerSide, isTracking, isOverlayClicked, ab)) {
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
					>
						{roleButtonText(role)}
					</Button>
				</div>
			</div>
		);
	}
	return <>{children}</>;
};
