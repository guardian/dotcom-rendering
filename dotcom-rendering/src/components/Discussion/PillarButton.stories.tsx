import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { space } from '@guardian/source-foundations';
import { SvgCheckmark } from '@guardian/source-react-components';
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

const formats = {
	lifestyle: makeFormatForPillar(Pillar.Lifestyle),
	sport: makeFormatForPillar(Pillar.Sport),
	news: makeFormatForPillar(Pillar.News),
	opinion: makeFormatForPillar(Pillar.Opinion),
	culture: makeFormatForPillar(Pillar.Culture),
} as const;

export const EachPillar = () => (
	<Row>
		<PillarButton
			onClick={() => {
				alert('Clicked!');
			}}
			format={formats.lifestyle}
			linkName=""
		>
			Lifestyle
		</PillarButton>
		<Space amount={2} />
		<PillarButton
			onClick={() => {
				alert('Clicked!');
			}}
			format={formats.sport}
			linkName=""
		>
			Sport
		</PillarButton>
		<Space amount={2} />
		<PillarButton
			onClick={() => {
				alert('Clicked!');
			}}
			format={formats.news}
			linkName=""
		>
			News
		</PillarButton>
		<Space amount={2} />
		<PillarButton
			onClick={() => {
				alert('Clicked!');
			}}
			format={formats.opinion}
			linkName=""
		>
			Opinion
		</PillarButton>
		<Space amount={2} />
		<PillarButton
			onClick={() => {
				alert('Clicked!');
			}}
			format={formats.culture}
			linkName=""
		>
			Culture
		</PillarButton>
	</Row>
);
EachPillar.storyName = 'with each pillar';

export const EachSize = () => (
	<Row>
		<PillarButton
			onClick={() => {
				alert('Clicked!');
			}}
			format={formats.news}
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
			format={formats.news}
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
			format={formats.news}
			linkName=""
			size="default"
		>
			Default
		</PillarButton>
	</Row>
);
EachSize.storyName = 'with each size';

export const IconLeft = () => (
	<PillarButton
		onClick={() => {
			alert('Clicked!');
		}}
		format={formats.lifestyle}
		icon={<SvgCheckmark />}
		iconSide="left"
		linkName="left"
	>
		Left
	</PillarButton>
);
IconLeft.storyName = 'with an icon on the left';

export const IconRight = () => (
	<PillarButton
		onClick={() => {
			alert('Clicked!');
		}}
		format={formats.sport}
		icon={<SvgCheckmark />}
		iconSide="right"
		linkName=""
	>
		Right
	</PillarButton>
);

export const Secondary = () => (
	<Row>
		<PillarButton
			onClick={() => {
				alert('Clicked!');
			}}
			format={formats.lifestyle}
			priority="secondary"
			linkName=""
		>
			Lifestyle
		</PillarButton>
		<Space amount={2} />
		<PillarButton
			onClick={() => {
				alert('Clicked!');
			}}
			format={formats.sport}
			priority="secondary"
			linkName=""
		>
			Sport
		</PillarButton>
		<Space amount={2} />
		<PillarButton
			onClick={() => {
				alert('Clicked!');
			}}
			format={formats.news}
			priority="secondary"
			linkName=""
		>
			News
		</PillarButton>
		<Space amount={2} />
		<PillarButton
			onClick={() => {
				alert('Clicked!');
			}}
			format={formats.opinion}
			priority="secondary"
			linkName=""
		>
			Opinion
		</PillarButton>
		<Space amount={2} />
		<PillarButton
			onClick={() => {
				alert('Clicked!');
			}}
			format={formats.culture}
			priority="secondary"
			linkName=""
		>
			Culture
		</PillarButton>
	</Row>
);
Secondary.storyName = 'with secondary priority';

export const Subdued = () => (
	<Row>
		<PillarButton
			onClick={() => {
				alert('Clicked!');
			}}
			format={formats.lifestyle}
			priority="subdued"
			linkName=""
		>
			Lifestyle
		</PillarButton>
		<Space amount={2} />
		<PillarButton
			onClick={() => {
				alert('Clicked!');
			}}
			format={formats.sport}
			priority="subdued"
			linkName=""
		>
			Sport
		</PillarButton>
		<Space amount={2} />
		<PillarButton
			onClick={() => {
				alert('Clicked!');
			}}
			format={formats.news}
			priority="subdued"
			linkName=""
		>
			News
		</PillarButton>
		<Space amount={2} />
		<PillarButton
			onClick={() => {
				alert('Clicked!');
			}}
			format={formats.opinion}
			priority="subdued"
			linkName=""
		>
			Opinion
		</PillarButton>
		<Space amount={2} />
		<PillarButton
			onClick={() => {
				alert('Clicked!');
			}}
			format={formats.culture}
			priority="subdued"
			linkName=""
		>
			Culture
		</PillarButton>
	</Row>
);
Subdued.storyName = 'with subdued priority';
