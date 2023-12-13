import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { space } from '@guardian/source-foundations';
import { SvgCheckmark } from '@guardian/source-react-components';
import type { StoryObj } from '@storybook/react';
import { splitTheme } from '../../../.storybook/decorators/splitThemeDecorator';
import type { StoryProps } from '../../../.storybook/decorators/splitThemeDecorator';
import { PillarButton } from './PillarButton';
import { Row } from './Row';

const Space = ({ amount }: { amount: 1 | 2 | 3 | 4 | 5 | 6 | 9 | 12 | 24 }) => (
	<div
		css={css`
			width: ${space[amount]}px;
		`}
	/>
);

export default { component: PillarButton, title: 'Discussion/PillarButton' };

const makeFormatForPillar = (pillar: Pillar): ArticleFormat => ({
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: pillar,
});

const formats = [
	makeFormatForPillar(Pillar.Lifestyle),
	makeFormatForPillar(Pillar.Sport),
	makeFormatForPillar(Pillar.News),
	makeFormatForPillar(Pillar.Opinion),
	makeFormatForPillar(Pillar.Culture),
];

export const EachPillar: StoryObj = ({ format }: StoryProps) => (
	<Row>
		<PillarButton
			onClick={() => {
				alert('Clicked!');
			}}
			format={format}
			linkName=""
		>
			Lifestyle
		</PillarButton>
	</Row>
);
EachPillar.storyName = 'with each pillar';
EachPillar.decorators = [splitTheme(formats)];

export const EachSize: StoryObj = ({ format }: StoryProps) => (
	<Row>
		<PillarButton
			onClick={() => {
				alert('Clicked!');
			}}
			format={format}
			linkName=""
			size="xsmall"
		>
			X Small
		</PillarButton>
		<Space amount={2} />
		<PillarButton
			onClick={() => {
				alert('Clicked!');
			}}
			format={format}
			linkName=""
			size="small"
		>
			Small
		</PillarButton>
		<Space amount={2} />
		<PillarButton
			onClick={() => {
				alert('Clicked!');
			}}
			format={format}
			linkName=""
			size="default"
		>
			Default
		</PillarButton>
	</Row>
);
EachSize.storyName = 'with each size';
EachSize.decorators = [splitTheme(formats)];

export const IconLeft: StoryObj = ({ format }: StoryProps) => (
	<PillarButton
		onClick={() => {
			alert('Clicked!');
		}}
		format={format}
		icon={<SvgCheckmark />}
		iconSide="left"
		linkName="left"
	>
		Left
	</PillarButton>
);
IconLeft.storyName = 'with an icon on the left';
IconLeft.decorators = [splitTheme(formats)];

export const IconRight: StoryObj = ({ format }: StoryProps) => (
	<PillarButton
		onClick={() => {
			alert('Clicked!');
		}}
		format={format}
		icon={<SvgCheckmark />}
		iconSide="right"
		linkName=""
	>
		Right
	</PillarButton>
);
IconRight.decorators = [splitTheme(formats)];

export const Secondary: StoryObj = ({ format }: StoryProps) => (
	<Row>
		<PillarButton
			onClick={() => {
				alert('Clicked!');
			}}
			format={format}
			priority="secondary"
			linkName=""
		>
			Button
		</PillarButton>
	</Row>
);
Secondary.storyName = 'with secondary priority';
Secondary.decorators = [splitTheme(formats)];

export const Subdued: StoryObj = ({ format }: StoryProps) => (
	<Row>
		<PillarButton
			onClick={() => {
				alert('Clicked!');
			}}
			format={format}
			priority="subdued"
			linkName=""
		>
			Button
		</PillarButton>
	</Row>
);
Subdued.storyName = 'with subdued priority';
Subdued.decorators = [splitTheme(formats)];
