import { css } from '@emotion/react';
import {
	headlineBold20,
	space,
	textSans15,
} from '@guardian/source/foundations';
import { palette } from '../palette';

interface Props {
	id: string;
	title: string;
	html: string;
}

const Container = ({
	id,
	children,
}: {
	id: string;
	children: React.ReactNode;
}) => {
	return (
		<div
			data-atom-id={id}
			data-atom-type="explainer"
			css={css`
				padding-bottom: ${space[1]}px;
				padding-left: ${space[2]}px;
				padding-right: ${space[2]}px;
				border-top: 1px solid ${palette('--explainer-atom-accent')};
				color: ${palette('--explainer-atom-accent')};
				background: ${palette('--explainer-atom-background')};
				p {
					margin-top: ${space[3]}px;
					margin-bottom: ${space[3]}px;
				}
				i {
					font-style: italic;
				}
			`}
		>
			{children}
		</div>
	);
};

const Title = ({ title }: { title: string }) => (
	<h3
		css={css`
			${headlineBold20};
			margin-top: ${space[2]}px;
		`}
	>
		{title}
	</h3>
);

const Body = ({ html }: { html: string }) => (
	<div
		css={css`
			${textSans15};
			/**
			 * Typography preset styles should not be overridden.
			 * This has been done because the styles do not directly map to the new presets.
			 * Please speak to your team's designer and update this to use a more appropriate preset.
			 */
			font-weight: 300;
			line-height: 1.15;
		`}
		dangerouslySetInnerHTML={{
			__html: html,
		}}
	/>
);

export const ExplainerAtom = ({ id, title, html }: Props) => (
	<Container id={id}>
		<Title title={title} />
		<Body html={html} />
	</Container>
);
