import { css } from '@emotion/react';
import { palette, textSans } from '@guardian/source-foundations';
import type { CommentBlockElement } from '../types/content';

const wrapper = css`
	overflow: hidden;
	position: relative;
	margin-bottom: 12px;
	padding-top: 12px;
	${textSans.medium()};
	padding-left: 20px;
	border-left: 8px solid ${palette.neutral[86]};
	clear: left;
`;

const avatar = css`
	float: left;
	margin-right: 20px;
	margin-bottom: 12px;
`;

const metaLink = css`
	border-bottom: 1px solid ${palette.neutral[86]};
	color: ${palette.news[400]};
	text-decoration: none;
	${textSans.xxsmall()};
`;

const bodyCSS = css`
	clear: left;

	p {
		${textSans.medium()};
		font-weight: 300;
		margin-top: 0;
		margin-bottom: 8px;
	}
`;

type Props = {
	element: CommentBlockElement;
};

export const CommentBlockComponent = ({ element }: Props) => (
	<div css={wrapper}>
		<amp-img
			class={avatar}
			layout="fixed"
			width="40"
			height="40"
			src={element.avatarURL}
		/>
		<div>
			<a css={metaLink} href={element.profileURL}>
				{element.profileName}
			</a>
		</div>

		<div>
			<a css={metaLink} href={element.permalink}>
				{element.dateTime}
			</a>
		</div>

		<div css={bodyCSS} dangerouslySetInnerHTML={{ __html: element.body }} />
	</div>
);
