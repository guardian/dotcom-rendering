/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { css } from '@emotion/react';

import { border, background } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
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
};

const roleTextSize = (role: RoleType) => {
	switch (role) {
		case 'immersive':
		case 'inline':
		case 'showcase': {
			return textSans.medium({ lineHeight: 'regular' });
		}
		case 'halfWidth':
		case 'supporting':
		case 'thumbnail': {
			return textSans.small({ lineHeight: 'regular' });
		}
	}
};

const roleHeadlineSize = (role: RoleType) => {
	switch (role) {
		case 'immersive':
		case 'inline':
		case 'showcase': {
			return textSans.large({
				fontWeight: 'bold',
				lineHeight: 'regular',
			});
		}
		case 'halfWidth':
		case 'supporting':
		case 'thumbnail': {
			return textSans.medium({
				fontWeight: 'bold',
				lineHeight: 'regular',
			});
		}
	}
};

const roleButtonSize = (role: RoleType) => {
	switch (role) {
		case 'immersive':
		case 'inline':
		case 'showcase': {
			return 'default';
		}
		case 'halfWidth':
		case 'supporting':
			return 'small';
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
	isMainMedia,
}: {
	isTracking: boolean;
	isOverlayClicked: boolean;
	isMainMedia?: boolean;
}) => {
	if (isMainMedia || !isTracking) {
		return false;
	}
	if (isOverlayClicked) {
		return false;
	}
	return true;
};

export const ClickToView = ({
	children,
	role = 'inline',
	onAccept,
	isTracking,
	isMainMedia,
	source,
	sourceDomain = 'unknown',
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
			isMainMedia,
		})
	) {
		return (
			<div
				css={css`
					width: 100%;
					background: ${background.secondary};
					border: 1px solid ${border.secondary};
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					padding: ${space[1]}px ${space[6]}px ${space[3]}px;
					margin-bottom: ${space[3]}px;
				`}
				data-component={`click-to-view:${sourceDomain}`}
			>
				<div
					css={css`
						${roleHeadlineSize(role)}
						margin-bottom: ${space[1]}px;
					`}
				>
					{source
						? `Allow ${source} content?`
						: 'Allow content provided by a third party?'}
				</div>
				<p
					css={css`
						${textSize}
					`}
				>
					{source ? (
						<>
							This article includes content provided by {source}.
							We ask for your permission before anything is
							loaded, as they may be using cookies and other
							technologies. To view this content,{' '}
							<strong>
								click &apos;Allow and continue&apos;
							</strong>
							.
						</>
					) : (
						<>
							This article includes content hosted on{' '}
							{sourceDomain}. We ask for your permission before
							anything is loaded, as the provider may be using
							cookies and other technologies. To view this
							content,{' '}
							<strong>
								click &apos;Allow and continue&apos;
							</strong>
							.
						</>
					)}
				</p>
				<div
					css={css`
						margin-top: ${space[5]}px;
					`}
				>
					<Button
						priority="primary"
						size={roleButtonSize(role)}
						icon={<SvgCheckmark />}
						iconSide="left"
						onClick={() => handleClick()}
						data-cy="click-to-view-button"
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
