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
	width?: number;
	height?: number;
	onAccept?: Function;
	isTracking: boolean;
	source?: string;
	sourceDomain: string;
};

const Container = ({
	children,
	width,
	height,
}: {
	children: React.ReactNode;
	width?: number;
	height?: number;
}) => {
	const widthStyle = width
		? css`
				width: ${width}px;
		  `
		: null;
	const heightStyle = width
		? css`
				height: ${height}px;
		  `
		: null;
	return (
		<div
			className={css`
				${widthStyle};
				${heightStyle};
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
	width,
}: {
	children: React.ReactNode;
	width?: number;
}) => (
	<div
		className={css`
			${width && width > 300 ? headline.xsmall() : headline.xxsmall()}
		`}
	>
		{children}
	</div>
);

const Body = ({
	children,
	width,
}: {
	children: React.ReactNode;
	width?: number;
}) => (
	<div
		className={css`
			${width && width > 300 ? textSans.small() : textSans.xsmall()}
			a {
				${width && width > 300 ? textSans.small() : textSans.xsmall()}
			}
		`}
	>
		{children}
	</div>
);

export const ClickToView = ({
	children,
	width,
	height,
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

	if (isTracking && showOverlay) {
		if (source) {
			headlineText = `Allow ${source} content?`;
			body = (
				<div>
					<p>
						This article includes content provided by {source}. We
						ask for your permission berfore anyting is loaded, as
						they may be using cookies and other technologies.
					</p>
					<p>
						To view this content, click &apos;Allow and
						continue&apos;
					</p>
				</div>
			);
		} else {
			headlineText = 'Allow content provided by a thrid party?';
			body = (
				<div>
					<p>
						This article includes content hosted on {sourceDomain}.
						We ask for your permission berfore anyting is loaded, as
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
							<Headline width={width}>{headlineText}</Headline>
							<Body width={width}>{body}</Body>
						</Top>
						<Bottom>
							<Button
								priority="primary"
								size={width && width > 300 ? 'small' : 'xsmall'}
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
