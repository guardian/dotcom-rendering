import { css } from "@emotion/react";
import {
	neutral,
	from,
	space,
	headline,
	body,
} from "@guardian/source-foundations";
import { FirstPublished } from "./FirstPublished";

type BlockContributor = {
	name: string;
	imageUrl?: string;
};

type Props = {
	id: string;
	children: React.ReactNode;
	borderColour: string;
	blockTitle?: string;
	blockFirstPublished?: number;
	blockLink: string;
	isLiveUpdate?: boolean;
	contributors?: BlockContributor[];
	avatarBackgroundColor?: string;
};

const LEFT_MARGIN_DESKTOP = 60;
const SIDE_MARGIN = space[5];
const SIDE_MARGIN_MOBILE = 10;

const Header = ({ children }: { children: React.ReactNode }) => {
	return (
		<header
			css={css`
				padding-right: ${space[3]}px;
				display: flex;
				flex-direction: column;
			`}
		>
			{children}
		</header>
	);
};

const BlockTitle = ({ title }: { title: string }) => {
	return (
		<h2
			css={css`
				${headline.xxsmall({ fontWeight: "bold" })}
				margin-bottom: ${space[2]}px;
			`}
		>
			{title}
		</h2>
	);
};

const BlockByline = ({
	name,
	imageUrl,
	avatarBackgroundColor,
}: {
	name: string;
	imageUrl?: string;
	avatarBackgroundColor?: string;
}) => {
	return (
		<div
			css={css`
				display: flex;
				flex-direction: row;
				padding-bottom: ${space[1]}px;
			`}
		>
			{imageUrl && (
				<div style={{ width: "36px", height: "36px" }}>
					<img
						src={imageUrl}
						alt={name}
						css={css`
							border-radius: 100%;
							object-fit: cover;
							height: 100%;
							width: 100%;
							background-color: ${avatarBackgroundColor};
						`}
					/>
				</div>
			)}
			<span
				css={css`
					${body.medium()}
					display: flex;
					align-items: center;
					padding-left: ${imageUrl ? space[1] : 0}px;
				`}
			>
				{name}
			</span>
		</div>
	);
};

const LiveBlockContainer = ({
	id,
	children,
	borderColour,
	blockTitle,
	blockFirstPublished,
	blockLink,
	isLiveUpdate,
	contributors,
	avatarBackgroundColor,
}: Props) => {
	return (
		<article
			id={`block-${id}`}
			key={id}
			/**
			 *   Classnames
			 *   ----------
			 * - 'block' is used by Spacefinder as a possible candidate before which it can insert an inline ad
			 * - 'pending' is used to mark blocks that have been inserted as part of a live update. We use this
			 *    to animate the reveal as well as for enhancing twitter embeds
			 */
			className={`block ${isLiveUpdate && "pending"}`}
			css={css`
				padding: ${space[2]}px ${SIDE_MARGIN_MOBILE}px;
				margin-bottom: ${space[3]}px;
				background: ${neutral[100]};
				border-top: 1px solid ${borderColour};
				${from.tablet} {
					padding: ${space[2]}px ${SIDE_MARGIN}px;
					padding-left: ${LEFT_MARGIN_DESKTOP}px;
				}
				border-bottom: 1px solid ${neutral[86]};
			`}
		>
			<Header>
				{blockFirstPublished && (
					<FirstPublished
						firstPublished={blockFirstPublished}
						blockLink={blockLink}
					/>
				)}
				{blockTitle ? <BlockTitle title={blockTitle} /> : null}
				{contributors &&
					contributors.map((contributor) => (
						<BlockByline
							name={contributor.name}
							imageUrl={contributor.imageUrl}
							avatarBackgroundColor={avatarBackgroundColor}
						/>
					))}
			</Header>
			{children}
		</article>
	);
};

export default LiveBlockContainer;
