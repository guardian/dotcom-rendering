import { css } from "@emotion/react";
import { neutral, from, space, remSpace, headline } from '@guardian/source-foundations';
import { FirstPublished } from './FirstPublished';

const LEFT_MARGIN_DESKTOP = 60;
const SIDE_MARGIN = space[5];
const SIDE_MARGIN_MOBILE = 10;

const Header = ({ children }: { children: React.ReactNode }) => {
	return (
		<header
			css={css`
				padding-right: ${remSpace[3]};
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
				${headline.xxsmall({ fontWeight: 'bold' })}
				margin-bottom: ${remSpace[2]};
			`}
		>
			{title}
		</h2>
	);
};

const LiveBlockContainer = ({
	id,
	children,
	borderColour,
	blockTitle,
	blockFirstPublished,
	blockLink,
}: {
	id: string;
	children: React.ReactNode;
	borderColour: string;
	blockTitle?: string;
	blockFirstPublished?: number;
	blockLink: string;
}) => {
	return (
		<article
			id={`block-${id}`}
			key={id}
			css={css`
				padding: ${remSpace[2]} ${SIDE_MARGIN_MOBILE}px;
				margin-bottom: ${remSpace[3]};
				background: ${neutral[100]};
				border-top: 1px solid ${borderColour};
				${from.tablet} {
					padding: ${remSpace[2]} ${SIDE_MARGIN}px;
					padding-left: ${LEFT_MARGIN_DESKTOP}px;
				}
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
			</Header>
			{children}
		</article>
	);
};

export default LiveBlockContainer;
