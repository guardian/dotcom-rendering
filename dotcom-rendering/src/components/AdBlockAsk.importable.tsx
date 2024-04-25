import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { headline, textSans } from '@guardian/source-foundations';
import { palette } from '@guardian/source-foundations/cjs/source-foundations/src/colour/palette';
import { assertUnreachable } from '../lib/assert-unreachable';
import { useAdblockAsk } from '../lib/useAdBlockAsk';
import ArrowRightIcon from '../static/icons/arrow-right.svg';

type AdBlockAskSize = 'leaderboard' | 'mpu';

const linkStyles = css`
	background: ${palette.brandAlt[400]};
	border-radius: 16px;
	box-sizing: border-box;
	color: ${palette.neutral[7]};
	${textSans.medium()};
	font-weight: 700;
	text-decoration: none;

	float: left;
	line-height: 18px;
	position: relative;
	height: 32px;
	padding: 6px 34px 0 12px;

	svg {
		fill: currentColor;
		position: absolute;
		right: 3px;
		top: 50%;
		height: 32px;
		width: 32px;
		transform: translate(0, -50%);
		transition: transform 0.3s ease-in-out;
	}

	:hover svg {
		transform: translate(3px, -50%);
	}
`;

const adBlockAskH2Styles = css`
	${headline.xsmall()}
	color: ${palette.brandAlt[400]};
	font-weight: bold;
`;

const adBlockAskTextStyles: Record<AdBlockAskSize, SerializedStyles> = {
	leaderboard: css`
		margin-top: 8px;
		${textSans.xsmall()};
		color: ${palette.neutral[100]};
	`,
	mpu: css`
		margin-top: 16px;
		${textSans.small()};
		color: ${palette.neutral[100]};
	`,
};

const HandsLogo = ({ styles }: { styles: SerializedStyles }) => {
	// TODO: Get the asset origin for CODE/PROD
	const assetOrigin = '/';
	const src = `${assetOrigin}static/frontend/logos/hands.png`;
	return <img src={src} alt="Guardian logo held up by hands" css={styles} />;
};

const SupportButton = ({ href }: { href: string }) => (
	<a css={linkStyles} href={href}>
		Support us <ArrowRightIcon />
	</a>
);

export const Copy = ({ size }: { size: AdBlockAskSize }) => {
	return (
		<>
			<h2 css={adBlockAskH2Styles}>Using an adblocker?</h2>
			<p css={adBlockAskTextStyles[size]}>
				We value your readership - but we lose vital revenue by not
				being able to show you ads. With no billionaire owner
				bankrolling our reporting, could you support us? It’s quick and
				any amount helps. Thanks!
			</p>
		</>
	);
};

export const AdBlockAskLeaderboard = ({
	supportButtonHref,
}: {
	supportButtonHref: string;
}) => {
	return (
		<div
			css={css`
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 728px;
				height: 114px;
				background-color: ${palette.sport[300]};
				margin: 0 auto;
			`}
		>
			<HandsLogo
				styles={css`
					flex: 0 0 auto;
					margin: auto 8px -6px 8px;
					width: 81px;
					height: 48px;
				`}
			/>
			<div
				css={css`
					border-left: 1px solid rgba(255, 255, 255, 0.2);
					padding-left: 8px;
					padding-top: 8px;
					margin-right: 12px;
					margin-bottom: 12px;
				`}
			>
				<Copy size="leaderboard" />
			</div>
			<div
				css={css`
					width: auto;
					flex: 0 0 auto;
					margin: auto 12px 12px 0;
					position: relative;
				`}
			>
				<SupportButton href={supportButtonHref} />
			</div>
		</div>
	);
};

export const AdBlockAskMPU = ({
	supportButtonHref,
}: {
	supportButtonHref: string;
}) => {
	return (
		<div
			css={css`
				width: 300px;
				height: 274px;
				background-color: ${palette.sport[300]};
				padding: 12px;
				position: relative;
			`}
		>
			<Copy size="mpu" />
			<div
				css={css`
					margin-top: 56px;
				`}
			>
				<SupportButton href={supportButtonHref} />
			</div>
			<div>
				<HandsLogo
					styles={css`
						width: 128px;
						height: 68px;
						background-position: right bottom;
						position: absolute;
						bottom: 0;
						right: 0;
					`}
				/>
			</div>
		</div>
	);
};

type Props = {
	size: AdBlockAskSize;
	slotId: `dfp-ad--${string}`;
	shouldHideReaderRevenue: boolean;
	isPaidContent: boolean;
};

export const AdBlockAsk = ({
	size,
	slotId,
	shouldHideReaderRevenue,
	isPaidContent,
}: Props) => {
	const showAdBlockAsk = useAdblockAsk({
		slotId,
		shouldHideReaderRevenue,
		isPaidContent,
	});

	if (!showAdBlockAsk) {
		return null;
	}

	const supportButtonHref = `https://support.theguardian.com/contribute?${new URLSearchParams(
		{
			utm_campaign: 'shady_pie',
			utm_source: 'GUARDIAN_WEB',
			utm_medium: 'ACQUISITIONS_OTHER',
			utm_content: 'shady_pie',
			utm_term: 'control',
		},
	).toString()}`;

	switch (size) {
		case 'leaderboard': {
			return (
				<AdBlockAskLeaderboard supportButtonHref={supportButtonHref} />
			);
		}
		case 'mpu': {
			return <AdBlockAskMPU supportButtonHref={supportButtonHref} />;
		}
		default: {
			return assertUnreachable(size);
		}
	}
};
