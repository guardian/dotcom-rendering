import { css } from 'emotion';

type Props = {
	children: React.ReactNode;
	isFullCardImage?: boolean;
};

export const HeadlineWrapper = ({ children, isFullCardImage }: Props) => (
	<div
		className={css`
			padding-bottom: ${isFullCardImage ? 0 : 8}px;
			padding-left: ${isFullCardImage ? 0 : 5}px;
			padding-right: 5px;
		`}
	>
		{children}
	</div>
);
