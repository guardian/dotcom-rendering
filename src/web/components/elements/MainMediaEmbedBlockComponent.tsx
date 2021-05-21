import { css } from 'emotion';

type Props = {
	title: string;
	srcDoc: string;
};

export const MainMediaEmbedBlockComponent = ({ title, srcDoc }: Props) => (
	<iframe
		className={css`
			width: 100%;
			height: 100vh;
		`}
		title={title}
		srcDoc={srcDoc}
	/>
);
