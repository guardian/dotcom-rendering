import { css } from '@emotion/react';
import { ArticlePillar } from '@guardian/libs';
import { space } from '@guardian/source-foundations';
import { SvgCheckmark } from '@guardian/source-react-components';
import { Row } from '../Row/Row';
import { PillarButton } from './PillarButton';

const Space = ({ amount }: { amount: 1 | 2 | 3 | 4 | 5 | 6 | 9 | 12 | 24 }) => (
	<div
		css={css`
			width: ${space[amount]}px;
		`}
	/>
);

export default { component: PillarButton, title: 'Discussion/PillarButton' };

export const EachPillar = () => (
	<Row>
		<PillarButton
			onClick={() => {
				alert('Clicked!');
			}}
			pillar={ArticlePillar.Lifestyle}
			linkName=""
		>
			Lifestyle
		</PillarButton>
		<Space amount={2} />
		<PillarButton
			onClick={() => {
				alert('Clicked!');
			}}
			pillar={ArticlePillar.Sport}
			linkName=""
		>
			Sport
		</PillarButton>
		<Space amount={2} />
		<PillarButton
			onClick={() => {
				alert('Clicked!');
			}}
			pillar={ArticlePillar.News}
			linkName=""
		>
			News
		</PillarButton>
		<Space amount={2} />
		<PillarButton
			onClick={() => {
				alert('Clicked!');
			}}
			pillar={ArticlePillar.Opinion}
			linkName=""
		>
			Opinion
		</PillarButton>
		<Space amount={2} />
		<PillarButton
			onClick={() => {
				alert('Clicked!');
			}}
			pillar={ArticlePillar.Culture}
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
			pillar={ArticlePillar.News}
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
			pillar={ArticlePillar.News}
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
			pillar={ArticlePillar.News}
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
		pillar={ArticlePillar.Lifestyle}
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
		pillar={ArticlePillar.Sport}
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
			pillar={ArticlePillar.Lifestyle}
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
			pillar={ArticlePillar.Sport}
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
			pillar={ArticlePillar.News}
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
			pillar={ArticlePillar.Opinion}
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
			pillar={ArticlePillar.Culture}
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
			pillar={ArticlePillar.Lifestyle}
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
			pillar={ArticlePillar.Sport}
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
			pillar={ArticlePillar.News}
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
			pillar={ArticlePillar.Opinion}
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
			pillar={ArticlePillar.Culture}
			priority="subdued"
			linkName=""
		>
			Culture
		</PillarButton>
	</Row>
);
Subdued.storyName = 'with subdued priority';
