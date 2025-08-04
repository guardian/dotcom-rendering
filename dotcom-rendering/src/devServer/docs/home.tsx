import {
	articleBold17Object,
	headlineBold20Object,
	palette,
	space,
	until,
} from '@guardian/source/foundations';
import {
	LinkButton,
	SvgArrowRightStraight,
	TextInput,
} from '@guardian/source/react-components';
import { formatToString } from '../../lib/articleFormat';
import type { Article as ArticleModel } from '../../types/article';
import type { Block } from '../../types/blocks';
import type { FEElement } from '../../types/content';
import type { RenderingTarget } from '../../types/renderingTarget';

export const Home = ({ articles }: { articles: ArticleModel[] }) => (
	<>
		<Form />
		{articles.map((article) => (
			<ArticleInfo article={article} key={article.frontendData.webURL} />
		))}
	</>
);

const Form = () => (
	<form method="GET" css={{ paddingBottom: space[9] }}>
		<TextInput
			type="url"
			name="dotcomURL"
			id="dotcomURL"
			placeholder="https://www.theguardian.com"
			label="Dotcom URL"
		/>
	</form>
);

const ArticleInfo = ({ article }: { article: ArticleModel }) => (
	<details open={true}>
		<summary css={headlineBold20Object}>
			{article.frontendData.webTitle}
		</summary>
		<ArticleLinks url={new URL(article.frontendData.webURL)} />
		<dl
			css={{
				marginTop: space[2],
				dt: articleBold17Object,
			}}
		>
			<dt>Format</dt>
			<dd>{formatToString(article)}</dd>
			<dt>Main Media</dt>
			<dd>{mainMediaElement(article.frontendData.mainMediaElements)}</dd>
			<dt>Body</dt>
			<dd>{bodyElements(article.frontendData.blocks)}</dd>
		</dl>
	</details>
);

const ArticleLinks = ({ url }: { url: URL }) => (
	<div css={{ paddingTop: space[2] }}>
		<StageLinks stage="DEV" url={url} />
		<StageLinks stage="CODE" url={url} />
		<StageLinks stage="PROD" url={url} />
	</div>
);

const mainMediaElement = (elements: FEElement[]): string => {
	const element = elements[0];

	return element !== undefined ? elementToString(element) : 'none';
};

const bodyElements = (blocks: Block[]): string =>
	blocks
		.flatMap((block) => block.elements)
		.map(elementToString)
		.reduce(mergeText, [])
		.join(', ');

const elementToString = (element: FEElement): string => {
	const role = 'role' in element ? ` (${element.role})` : '';
	const elem = element._type.split('.').at(-1)?.replace('BlockElement', '');

	return `${elem}${role}`;
};

const mergeText = (elems: string[], elem: string) => {
	if (elem === 'Text' && elems.at(-1) === 'Text') {
		return elems;
	}

	return [...elems, elem];
};

const StageLinks = ({ stage, url }: { stage: Stage; url: URL }) => (
	<div
		css={{
			display: 'inline-flex',
			flexDirection: 'column',
			gap: space[2],
			paddingRight: space[2],
			paddingTop: space[2],
			paddingBottom: space[2],
			[until.mobileLandscape]: {
				width: '100%',
			},
			a: {
				color: stageTextColour(stage),
				display: 'flex',
				justifyContent: 'space-between',
			},
		}}
	>
		<LinkButton
			href={buildUrl('Apps', stage, url).href}
			icon={<SvgArrowRightStraight />}
			iconSide="right"
			theme={{ backgroundPrimary: stageColour(stage) }}
			size="small"
		>
			📱 Apps {stage}
		</LinkButton>
		<LinkButton
			href={buildUrl('Web', stage, url).href}
			icon={<SvgArrowRightStraight />}
			iconSide="right"
			theme={{ backgroundPrimary: stageColour(stage) }}
			size="small"
		>
			🌍 Dotcom {stage}
		</LinkButton>
	</div>
);

type Stage = 'DEV' | 'CODE' | 'PROD';

const buildUrl = (target: RenderingTarget, stage: Stage, url: URL) => {
	switch (stage) {
		case 'PROD': {
			const builtUrl = new URL(url.pathname, prodOrigin);
			builtUrl.search = params(target).toString();

			return builtUrl;
		}
		case 'CODE': {
			const builtUrl = new URL(url.pathname, codeOrigin);
			builtUrl.search = params(target).toString();

			return builtUrl;
		}
		case 'DEV':
			return new URL(`${devPath(target)}/${url.toString()}`, devOrigin);
	}
};

const stageTextColour = (stage: Stage) => {
	switch (stage) {
		case 'DEV':
			return palette.neutral[7];
		case 'CODE':
		case 'PROD':
			return palette.neutral[100];
	}
};

const stageColour = (stage: Stage) => {
	switch (stage) {
		case 'DEV':
			return palette.brandAlt[400];
		case 'CODE':
			return palette.success[400];
		case 'PROD':
			return palette.brand[400];
	}
};

const devOrigin = 'http://localhost:3030';
const codeOrigin = 'https://m.code.dev-theguardian.com';
const prodOrigin = 'https://www.theguardian.com';

const params = (target: RenderingTarget): URLSearchParams =>
	new URLSearchParams(target === 'Apps' ? { dcr: 'apps' } : undefined);

const devPath = (target: RenderingTarget): string => {
	switch (target) {
		case 'Web':
			return '/Article';
		case 'Apps':
			return '/AppsArticle';
	}
};
