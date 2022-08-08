import { css } from '@emotion/react';
import { from, until } from '@guardian/source-foundations';

type Props = {
	children: React.ReactNode;
};

const containerStyles = css`
	display: flex;
	flex-direction: row-reverse;

	margin-right: 10px;
	${until.tablet} {
		margin-top: 5px;
	}
	${from.tablet} {
		margin-top: 50px;
	}
`;

const sizingStyles = css`
	/* Below 980 */
	${until.desktop} {
		height: 108px;
		width: 108px;
	}
	/* Below 740 */
	${until.tablet} {
		height: 73px;
		width: 73px;
	}
	/* Otherwise */
	height: 132px;
	width: 132px;
`;

export const AvatarContainer = ({ children }: Props) => {
	return (
		<div css={containerStyles}>
			<div css={sizingStyles}>{children}</div>
		</div>
	);
};
