/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { css } from 'emotion';

import { border, background } from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { Button } from '@guardian/src-button';
import { SvgCheckmark } from '@guardian/src-icons';
import { space } from '@guardian/src-foundations';

import { Lines } from '@guardian/src-ed-lines';

type Props = {
	children: React.ReactNode;
	width: number;
	height: number;
	onAccept: Function;
};

const Container = ({
	children,
	width,
	height,
}: {
	children: React.ReactNode;
	width: number;
	height: number;
}) => (
	<div
		className={css`
			width: ${width}px;
			height: ${height}px;
			background: ${background.secondary};
		`}
	>
		{children}
	</div>
);

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
	width: number;
}) => (
	<div
		className={css`
			${width > 300 ? headline.xsmall() : headline.xxsmall()}
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
	width: number;
}) => (
	<div
		className={css`
			${width > 300 ? textSans.small() : textSans.xsmall()}
			a {
				${width > 300 ? textSans.small() : textSans.xsmall()}
			}
		`}
	>
		{children}
	</div>
);

export const ClickToView = ({ children, width, height, onAccept }: Props) => {
	const [showOverlay, setShowOverlay] = useState<boolean>(true);

	const handleClick = () => {
		setShowOverlay(false);
		onAccept();
	};

	if (showOverlay) {
		return (
			<Container width={width} height={height}>
				<Outer>
					<Inner>
						<Top>
							<Headline width={width}>
								Allow content provided by a third party?
							</Headline>
							<Body width={width}>
								<p>
									This article includes content hosted on
									other.com. We ask for your permission before
									anything is loaded, as the provider may be
									using cookies and other technologies.
								</p>
								<p>
									To view this content, click
									&apos;Allow&apos;.
								</p>
							</Body>
						</Top>
						<Bottom>
							<Button
								priority="primary"
								size={width > 300 ? 'small' : 'xsmall'}
								icon={<SvgCheckmark />}
								iconSide="left"
								onClick={() => handleClick()}
							>
								Allow
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
