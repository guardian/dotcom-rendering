import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { space } from '@guardian/source-foundations';
import { SvgCheckmark } from '@guardian/source-react-components';
import { splitTheme } from '../../../.storybook/decorators/splitThemeDecorator';
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

export const EachPillar = () => (
	<PillarButton
		onClick={() => {
			alert('Clicked!');
		}}
		linkName=""
	>
		Button
	</PillarButton>
);
EachPillar.storyName = 'with each pillar';
EachPillar.decorators = [splitTheme(formats)];

export const EachSize = () => (
	<Row>
		<PillarButton
			onClick={() => {
				alert('Clicked!');
			}}
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
			linkName=""
			size="default"
		>
			Default
		</PillarButton>
	</Row>
);
EachSize.storyName = 'with each size';
EachSize.decorators = [splitTheme(formats)];

export const IconLeft = () => (
	<PillarButton
		onClick={() => {
			alert('Clicked!');
		}}
		icon={<SvgCheckmark />}
		iconSide="left"
		linkName="left"
	>
		Button
	</PillarButton>
);
IconLeft.storyName = 'with an icon on the left';
IconLeft.decorators = [splitTheme(formats)];

export const IconRight = () => (
	<PillarButton
		onClick={() => {
			alert('Clicked!');
		}}
		icon={<SvgCheckmark />}
		iconSide="right"
		linkName=""
	>
		Button
	</PillarButton>
);
IconRight.decorators = [splitTheme(formats)];

export const Secondary = () => (
	<PillarButton
		onClick={() => {
			alert('Clicked!');
		}}
		priority="secondary"
		linkName=""
	>
		Button
	</PillarButton>
);
Secondary.storyName = 'with secondary priority';
Secondary.decorators = [splitTheme(formats)];

export const Subdued = () => (
	<PillarButton
		onClick={() => {
			alert('Clicked!');
		}}
		priority="subdued"
		linkName=""
	>
		Button
	</PillarButton>
);
Subdued.storyName = 'with subdued priority';
Subdued.decorators = [splitTheme(formats)];
