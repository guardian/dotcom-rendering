/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { css } from 'emotion';

import { border, background } from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { Button } from '@guardian/src-button';
import { Link } from '@guardian/src-link';
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
		`}
	>
		{children}
	</div>
);

const Outer = ({ children }: { children: React.ReactNode }) => (
	<div
		className={css`
			background: ${background.primary};
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
								The colourful beak is very large
							</Headline>
							<Body width={width}>
								Quaerat quaerat ex nihil autem consequatur.
								Velit rerum at ad dignissimos aut excepturi
								ratione excepturi. Quaerat ipsam natus totam et
								aut distinctio eaque voluptatem.
								<Link href="https://theguardian.com">
									{' '}
									Quaerat ipsam
								</Link>
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
								Click to view
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
