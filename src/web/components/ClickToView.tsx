/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { css } from 'emotion';

import { border, background } from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { Button } from '@guardian/src-button';
import { SvgCheckmark } from '@guardian/src-icons';
import { space } from '@guardian/src-foundations';

import { Lines } from '@guardian/src-ed-lines';

type Props = {
	children: React.ReactNode;
	role?: RoleType;
	onAccept?: Function;
	isTracking: boolean;
	source?: string;
	sourceDomain: string;
};

const overlayWidth = (role: RoleType) => {
	let width: string;

	switch (role) {
		default: {
			width = '100%';
		}
	}

	return width;
};

const roleTextSize = (role: RoleType) => {
	switch (role) {
		case 'immersive':
		case 'inline':
		case 'showcase': {
			return textSans.small();
		}
		case 'halfWidth':
		case 'supporting':
		case 'thumbnail': {
			return textSans.xsmall();
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

const Container = ({
	children,
	width,
	height,
}: {
	children: React.ReactNode;
	width: string;
	height?: string;
}) => {
	return (
		<div
			className={css`
				width: ${width};
				height: ${height};
			`}
		>
			{children}
		</div>
	);
};

const Outer = ({ children }: { children: React.ReactNode }) => (
	<div
		className={css`
			background: ${background.secondary};
			border: 1px solid ${border.primary};
			height: 100%;
		`}
	>
		{children}
	</div>
);

const Inner = ({ children }: { children: React.ReactNode }) => (
	<div
		className={css`
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: calc(100% - 16px);
			padding: ${space[3]}px;
		`}
	>
		{children}
	</div>
);

const Top = ({ children }: { children: React.ReactNode }) => (
	<div>{children}</div>
);

const Bottom = ({ children }: { children: React.ReactNode }) => (
	<div>{children}</div>
);

const Headline = ({
	children,
	role,
}: {
	children: React.ReactNode;
	role: RoleType;
}) => (
	<div
		className={css`
			${roleHeadlineSize(role)}
		`}
	>
		{children}
	</div>
);

const Body = ({
	children,
	role,
}: {
	children: React.ReactNode;
	role: RoleType;
}) => {
	const textSize = roleTextSize(role);
	return (
		<div
			className={css`
				${textSize}
				a {
					${textSize}
				}
			`}
		>
			{children}
		</div>
	);
};

export const ClickToView = ({
	children,
	role: roleProp,
	onAccept,
	isTracking,
	source,
	sourceDomain,
}: Props) => {
	const [showOverlay, setShowOverlay] = useState<boolean>(true);

	const handleClick = () => {
		setShowOverlay(false);
	};

	useEffect(() => {
		if (!showOverlay && onAccept) {
			onAccept();
		}
	});

	let headlineText;
	let body;

	const role: RoleType = roleProp || 'inline';

	const width = overlayWidth(role);

	const height = undefined;

	if (isTracking && showOverlay) {
		if (source) {
			headlineText = `Allow ${source} content?`;
			body = (
				<div>
					<p>
						This article includes content provided by {source}. We
						ask for your permission before anything is loaded, as
						they may be using cookies and other technologies.
					</p>
					<p>
						To view this content, click &apos;Allow and
						continue&apos;
					</p>
				</div>
			);
		} else {
			headlineText = 'Allow content provided by a third party?';
			body = (
				<div>
					<p>
						This article includes content hosted on {sourceDomain}.
						We ask for your permission before anything is loaded, as
						the provider may be using cookies and other
						technologies.
					</p>
					<p>
						To view this content, click &apos;Allow and
						continue&apos;
					</p>
				</div>
			);
		}

		return (
			<Container width={width} height={height}>
				<Outer>
					<Inner>
						<Top>
							<Headline role={role}>{headlineText}</Headline>
							<Body role={role}>{body}</Body>
						</Top>
						<Bottom>
							<Button
								priority="primary"
								size={roleButtonSize(role)}
								icon={<SvgCheckmark />}
								iconSide="left"
								onClick={() => handleClick()}
							>
								Allow and continue
							</Button>
						</Bottom>
					</Inner>
					<Lines />
				</Outer>
			</Container>
		);
	}

	return (
		<Container width={width} height={height}>
			{children}
		</Container>
	);
};
