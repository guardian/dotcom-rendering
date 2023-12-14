import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import type { Meta, StoryObj } from '@storybook/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { ExplainerAtom as ExplainerAtomComponent } from './ExplainerAtom';

const html =
	'<p>Cranes lean in, waiting for an all-clear<br>that will not come.&nbsp;</p><p>Forehead pressed to glass,<br>phone at my ear, I learn</p><p>to sail on your voice<br>over a sadness of building sites,&nbsp;</p><p>past King’s Cross, St Pancras,<br>to the place where you are.</p><p>You say nothing<br>is too far, mothers</p><p>will find their daughters,<br>strangers will be neighbours,</p><p>even saviours<br>will have names.</p><p>You are all flame<br>in a red dress.&nbsp;&nbsp;</p><p>Petals brush my face.<br>You say at last</p><p>the cherry blossom<br>has arrived</p><p>as if that is what<br>we were really waiting for.</p>';

const italicsHTML =
	'<p>first it was the magic porridge pot<br>absent from the colony of books<br>when I’d gone home&nbsp; &nbsp; &nbsp;back to my bedroom<br>hungry for what I missed of my childhood</p><p>weeks later&nbsp; &nbsp; &nbsp;<i>the enormous turnip</i><br> and then <i>the three billy goats gruff</i><br>cantered off &nbsp; &nbsp; &nbsp;and no-one noticed<br> the small black swarm of letters that hung<br>&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;in the air like dust&nbsp; &nbsp; &nbsp;and then were gone</p><p>at first people seemed to remember<br> the stories&nbsp; &nbsp; &nbsp;but then they started<br>forgetting &nbsp; &nbsp; &nbsp;<i>how big had the turnip been?<br>had there really been a turnip? </i></p><p>and then there was no turnip&nbsp; &nbsp; &nbsp;no goats<br> in the field &nbsp; &nbsp; &nbsp;and all the shelves were empty<br>and all the streets silent </p><p>* </p><p>when I was a boy &nbsp; &nbsp; &nbsp;mum placed in my hand<br>a ladybird that contained an entire<br>treasure island&nbsp; &nbsp; &nbsp;now&nbsp; &nbsp; &nbsp;back at my house<br>one page flaps at the back of the bookcase </p><p>I hold it&nbsp; &nbsp; &nbsp;its simple intricacy<br> its worlds within worlds&nbsp; &nbsp; &nbsp;as it stops moving<br>and dissolves to tissue&nbsp; &nbsp; &nbsp;and becomes<br> a ghost of itself&nbsp; &nbsp; &nbsp;in my small hands&nbsp;</p><p><br></p>';

const meta: Meta<typeof ExplainerAtomComponent> = {
	title: 'Components/Explainer Atom',
	component: ExplainerAtomComponent,
};

type Story = StoryObj<typeof ExplainerAtomComponent>;

export const ExplainerAtom: Story = {
	args: {
		id: 'abc123',
		title: 'Cranes Lean In by Imtiaz Dharker',
		html,
	},
	decorators: [
		splitTheme([
			{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: Pillar.News,
			},
		]),
	],
};

export const ExplainerAtomWithItalics: Story = {
	args: {
		id: 'abc123',
		title: 'Cranes Lean In by Imtiaz Dharker',
		html: italicsHTML,
	},
	decorators: [
		splitTheme([
			{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: Pillar.News,
			},
		]),
	],
};

export default meta;
