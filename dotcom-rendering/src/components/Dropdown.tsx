import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { OphanComponent } from '@guardian/libs';
import {
	border,
	brandAlt,
	brandText,
	from,
	neutral,
	news,
	palette,
	text,
	textSans,
	until,
	visuallyHidden,
} from '@guardian/source-foundations';
import { useEffect, useMemo, useState } from 'react';
import { submitComponentEvent } from '../client/ophan/ophan';
import { getZIndex } from '../lib/getZIndex';
import { linkNotificationCount } from '../lib/linkNotificationCount';
import type { Notification } from '../lib/notification';
import { useIsInView } from '../lib/useIsInView';
import { useOnce } from '../lib/useOnce';

const NOTIFICATION_COMPONENT_TYPE = 'RETENTION_HEADER';
export interface DropdownLinkType {
	id: string;
	url: string;
	title: string;
	isActive?: boolean;
	dataLinkName: string;
	notifications?: Notification[];
}

interface Props {
	id: string;
	label: string;
	links: DropdownLinkType[];
	dataLinkName: string;
	cssOverrides?: SerializedStyles;
	children?: React.ReactNode;
}

const ulStyles = css`
	${getZIndex('dropdown')}
	list-style: none;
	/* https://developer.mozilla.org/en-US/docs/Web/CSS/list-style#accessibility_concerns */
	/* Needs double escape char: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#es2018_revision_of_illegal_escape_sequences */
	li::before {
		content: '\\200B'; /* Zero width space */
		display: block;
		height: 0;
		width: 0;
	}
	background-color: white;
	padding: 6px 0;
	box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);

	${until.tablet} {
		position: fixed;
		border-radius: 0;
		top: 32px;
		left: 0;
		right: 0;
		width: auto;
		max-height: calc(100% - 50px);
		overflow: auto;
	}

	${from.tablet} {
		position: absolute;
		top: 100%;
		width: 200px;
		border-radius: 3px;
	}
`;

const liStyles = css`
	position: relative;
`;

const displayBlock = css`
	display: block;
`;

const displayNone = css`
	display: none;
`;

const linkStyles = css`
	${textSans.small()};
	color: ${text.anchorSecondary};
	position: relative;
	transition: color 80ms ease-out;
	margin: -1px 0 0 0;
	text-decoration: none;
	display: block;
	padding: 10px 18px 15px 30px;

	:hover {
		background-color: ${neutral[93]};
		text-decoration: none;
	}

	:focus {
		text-decoration: underline;
	}

	:before {
		content: '';
		border-top: 1px solid ${border.secondary};
		display: block;
		position: absolute;
		top: 0px;
		left: 30px;
		right: 0px;
	}
`;

const linkActive = css`
	font-weight: bold;

	:after {
		content: '';
		border: 2px solid ${news[400]};
		border-top: 0px;
		border-right: 0px;
		position: absolute;
		top: 19px;
		left: 12px;
		width: 10px;
		height: 4px;
		transform: rotate(-45deg);
	}
`;

const linkFirst = css`
	:before {
		content: none;
	}
`;

const buttonStyles = css`
	${textSans.medium()};
	display: block;
	cursor: pointer;
	background: none;
	border: none;
	/* Design System: The buttons should be components that handle their own layout using primitives  */
	line-height: 1.2;
	color: ${brandText.primary};
	transition: color 80ms ease-out;
	padding: 0px 10px 6px 5px;
	margin: 1px 0 0;
	text-decoration: none;
	position: relative;

	:hover {
		color: ${brandAlt[400]};

		:after {
			transform: translateY(0) rotate(45deg);
		}
	}

	:after {
		content: '';
		display: inline-block;
		width: 5px;
		height: 5px;
		transform: translateY(-2px) rotate(45deg);
		border: 1px solid currentColor;
		border-left: transparent;
		border-top: transparent;
		margin-left: 5px;
		vertical-align: middle;
		transition: transform 250ms ease-out;
	}
`;

const buttonExpanded = css`
	:hover:after {
		transform: translateY(-1px) rotate(-135deg);
	}
	:after {
		transform: translateY(1px) rotate(-135deg);
	}
`;

const notificationColor = palette.error[400];

const notificationBadgeStyles = (diameter: number) => css`
	background-color: ${notificationColor};
	color: ${palette.neutral[100]};
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	${textSans.xsmall()};
	line-height: 1;

	width: ${diameter}px;
	height: ${diameter}px;
	border-radius: ${diameter}px;
`;

const dropdownButtonNotificationBadgeStyles = css`
	position: absolute;
	top: 0;
	left: 0;
	margin-left: -10px;
	margin-top: -3px;
`;

const notificationTextStyles = css`
	${textSans.xxsmall()};
`;

const buildOphanComponentWithNotifications = (
	link: DropdownLinkType,
): OphanComponent | undefined => {
	// Only track if it has notifications
	if (link.notifications && link.notifications.length > 0) {
		return {
			componentType: NOTIFICATION_COMPONENT_TYPE,
			id: link.id,
			labels: link.notifications.map(
				(notification) => notification.ophanLabel,
			),
		};
	}
	return undefined;
};

const addTrackingToUrl = (
	url: string,
	ophanComponent: OphanComponent,
): string => {
	// Use the acquisitionData query param to send tracking to the destination
	const acquisitionData = encodeURIComponent(
		JSON.stringify({
			source: 'GUARDIAN_WEB',
			componentId: ophanComponent.id,
			componentType: ophanComponent.componentType,
			campaignCode: ophanComponent.id,
			referrerPageviewId: window.guardian.config.ophan.pageViewId,
			referrerUrl: window.location.origin + window.location.pathname,
			labels: ophanComponent.labels,
		}),
	);
	const prefix = url.includes('?') ? '&' : '?';
	return `${url}${prefix}acquisitionData=${acquisitionData}`;
};

const NotificationBadge = ({ diameter }: { diameter: number }) => {
	return (
		<div css={notificationBadgeStyles(diameter)}>
			<span>!</span>
		</div>
	);
};

type NotificationMessageProps = {
	notification: Notification;
};
const NotificationMessage = ({ notification }: NotificationMessageProps) => {
	const { message } = notification;

	return <div css={notificationTextStyles}>{message}</div>;
};

type DropdownLinkProps = {
	link: DropdownLinkType;
	index: number;
};
const DropdownLink = ({ link, index }: DropdownLinkProps) => {
	const ophanComponent = useMemo(
		() => buildOphanComponentWithNotifications(link),
		[link],
	);

	const [hasBeenSeen, setNode] = useIsInView({
		debounce: true,
	});
	const [hasSentViewEvent, setHasSentViewEvent] = useState<boolean>(false);

	// The following hooks, which send INSERT and VIEW events to Ophan,
	// intentionally only run when the link has notifications (which is why
	// link.notifications is part of the dependency array for both). In future
	// if we ever have notifications arriving from different sources at
	// different times, we'll need to revisit this logic (currently they only
	// come from Braze).
	useEffect(() => {
		if (
			hasBeenSeen &&
			ophanComponent &&
			link.notifications &&
			link.notifications.length > 0 &&
			!hasSentViewEvent
		) {
			setHasSentViewEvent(true);

			// For each notification for this link, log the impression back to
			// Braze separately
			for (const notification of link.notifications) {
				notification.logImpression?.();
			}

			void submitComponentEvent({
				component: ophanComponent,
				action: 'VIEW',
			});
		}
	}, [
		hasBeenSeen,
		ophanComponent,
		link.notifications,
		hasSentViewEvent,
		link.id,
	]);

	useOnce(() => {
		if (ophanComponent) {
			void submitComponentEvent({
				component: ophanComponent,
				action: 'INSERT',
			});
		}
	}, [ophanComponent]);

	const url = ophanComponent
		? addTrackingToUrl(link.url, ophanComponent)
		: link.url;

	const hasNotifications =
		link.notifications !== undefined && link.notifications.length > 0;

	return (
		<li css={liStyles} key={link.title} ref={setNode}>
			<a
				href={url}
				css={[
					linkStyles,
					!!link.isActive && linkActive,
					index === 0 && linkFirst,
				]}
				data-link-name={link.dataLinkName}
				onClick={() => {
					if (ophanComponent) {
						void submitComponentEvent({
							component: ophanComponent,
							action: 'CLICK',
						});
					}
				}}
			>
				{link.title}
				{link.notifications?.map((notification) => (
					<NotificationMessage
						notification={notification}
						key={notification.id}
					/>
				))}
			</a>

			{hasNotifications && (
				<div
					css={css`
						margin-top: 12px;
						margin-right: 8px;
					`}
				>
					<NotificationBadge diameter={22} />
				</div>
			)}
		</li>
	);
};

export const Dropdown = ({
	id,
	label,
	links,
	dataLinkName,
	cssOverrides,
	children,
}: Props) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [noJS, setNoJS] = useState(true);

	useEffect(() => {
		// If hook runs we know client-side JS is enabled
		setNoJS(false);
	}, []);

	useEffect(() => {
		const dismissOnEsc = (event: KeyboardEvent) => {
			if (isExpanded && event.code === 'Escape') {
				setIsExpanded(false);
			}
		};

		document.addEventListener('keydown', dismissOnEsc, false);

		// Remove listener on unmount
		return () => document.removeEventListener('keydown', dismissOnEsc);
	}, [isExpanded]);

	useEffect(() => {
		const dismissOnClick = (event: MouseEvent) => {
			if (isExpanded) {
				event.stopPropagation();
				setIsExpanded(false);
			}
		};

		document.addEventListener('click', dismissOnClick, false);

		// Remove listener on unmount
		return () => document.removeEventListener('click', dismissOnClick);
	}, [isExpanded]);

	const handleToggle = () => setIsExpanded(!isExpanded);

	// needs to be unique to allow multiple dropdowns on same page
	const dropdownID = `dropbox-id-${id}`;
	const checkboxID = `checkbox-id-${id}`;

	const notificationCount = linkNotificationCount(links);

	return (
		<>
			{noJS ? (
				<div
					css={css`
						${`#${checkboxID}`} {
							/* Never show the input */
							${visuallyHidden}
						}
						${`#${dropdownID}`} {
							/* Hide caption by default */
							display: none;
						}
						/* stylelint-disable-next-line selector-type-no-unknown */
						${`#${checkboxID}`}:checked + ${`#${dropdownID}`} {
							/* Show the caption if the input is checked */
							display: block;
						}
					`}
				>
					<label
						htmlFor={checkboxID}
						css={[buttonStyles, cssOverrides]}
					>
						{label}
					</label>
					<input
						type="checkbox"
						id={checkboxID}
						aria-checked="false"
						tabIndex={-1}
					/>
					<ul id={dropdownID} css={[ulStyles, cssOverrides]}>
						{links.map((l, index) => (
							<li key={l.title}>
								<a
									href={l.url}
									css={[
										linkStyles,
										!!l.isActive && linkActive,
										index === 0 && linkFirst,
									]}
									data-link-name={l.dataLinkName}
								>
									{l.title}
								</a>
							</li>
						))}
					</ul>
				</div>
			) : (
				<>
					<button
						onClick={handleToggle}
						css={[
							buttonStyles,
							cssOverrides,
							isExpanded && buttonExpanded,
						]}
						aria-expanded={isExpanded ? 'true' : 'false'}
						data-link-name={dataLinkName}
						data-cy="dropdown-button"
						type="button"
					>
						{label}
						{notificationCount > 0 && (
							<div css={dropdownButtonNotificationBadgeStyles}>
								<NotificationBadge diameter={18} />
							</div>
						)}
					</button>
					<div css={isExpanded ? displayBlock : displayNone}>
						{/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- Children types are awkward but this should work */}
						{children ? (
							<>{children}</>
						) : (
							<ul
								css={[ulStyles, cssOverrides]}
								data-cy="dropdown-options"
							>
								{links.map((link, index) => (
									<DropdownLink
										key={link.id}
										link={link}
										index={index}
									/>
								))}
							</ul>
						)}
					</div>
				</>
			)}
		</>
	);
};
