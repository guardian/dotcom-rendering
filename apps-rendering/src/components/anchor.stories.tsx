// ----- Imports ----- //

import {
	getAllThemes,
	getThemeNameAsString,
} from '@guardian/common-rendering/src/fixtures/article';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { text, withKnobs } from '@storybook/addon-knobs';
import type { FC } from 'react';
import { selectPillar } from '../storybookHelpers';
import Anchor from './anchor';

// ----- Setup ----- //

const link = (): string => text('Link', 'https://theguardian.com');

const copy = (): string =>
	text('Copy', '“everything that was recommended was done”.');

// ----- Stories ----- //

const Default: FC = () => (
	<Anchor
		format={{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: selectPillar(ArticlePillar.News),
		}}
		href={link()}
	>
		{copy()}
	</Anchor>
);

const Liveblock: FC = () => {
	return (
		<>
			{getAllThemes({
				display: ArticleDisplay.Standard,
				design: ArticleDesign.DeadBlog,
			}).map((format) => (
				<div key={format.theme}>
					<p>{getThemeNameAsString(format)}</p>
					<Anchor
						format={{
							design: ArticleDesign.DeadBlog,
							display: ArticleDisplay.Standard,
							theme: format.theme,
						}}
						href={link()}
					>
						{copy()}
					</Anchor>
					<br />
					<br />
				</div>
			))}
		</>
	);
};

// ----- Exports ----- //

export default {
	component: Anchor,
	title: 'AR/Anchor',
	decorators: [withKnobs],
};

export { Default, Liveblock };
