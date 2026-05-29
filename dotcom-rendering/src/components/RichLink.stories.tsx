import { allModes } from '../../.storybook/modes';
import preview from '../../.storybook/preview';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '../lib/articleFormat';
import { palette } from '../palette';
import { Figure } from './Figure';
import { RichLink } from './RichLink';
import { Section as SectionComponent } from './Section';

const someContributor =
	'https://uploads.guim.co.uk/2017/10/09/Oliver-Wainwright,-L.png';

const someImageData = {
	thumbnailUrl:
		'https://i.guim.co.uk/img/media/268d42accabbe8168fdbdee51ad31ab2f156b211/137_0_2088_1253/master/2088.jpg?width=460&quality=85&auto=format&fit=max&s=cf5abc39fb2af7a56b10306df21ab8e6',
	altText: 'What a lovely arch in this image',
	width: '1600',
	height: '900',
};

const meta = preview.meta({
	component: RichLink,
	title: 'Components/RichLink',
});

const mockFormatNews = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
};
const mockFormatCulture = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.Culture,
};
const mockFormatSport = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.Sport,
};
const mockFormatLifestyle = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.Lifestyle,
};
const mockFormatOpinion = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.Opinion,
};

export const Article = meta.story({
	args: {
		richLinkIndex: 1,
		cardStyle: 'news',
		imageData: someImageData,
		headlineText: 'Rich link headline',
		contentType: 'article',
		url: '',
		linkFormat: mockFormatCulture,
		format: mockFormatCulture,
		tags: [],
		sponsorName: '',
	},
	render: (args) => {
		return (
			<SectionComponent
				showTopBorder={false}
				centralBorder="full"
				showSideBorders={false}
			>
				<Figure
					format={args.format}
					isMainMedia={false}
					role="richLink"
				>
					<RichLink {...args} />
				</Figure>
			</SectionComponent>
		);
	},
	parameters: {
		chromatic: {
			modes: { horizontal: allModes.splitHorizontal },
		},
	},
});

export const Network = meta.story({
	args: {
		richLinkIndex: 1,
		cardStyle: 'special-report',
		imageData: someImageData,
		headlineText: 'Rich link headline',
		contentType: 'network',
		url: '',
		linkFormat: mockFormatCulture,
		format: mockFormatCulture,
		tags: [],
		sponsorName: '',
	},

	render: (args) => {
		return (
			<SectionComponent
				showTopBorder={false}
				centralBorder="full"
				showSideBorders={false}
			>
				<Figure
					format={mockFormatNews}
					isMainMedia={false}
					role="richLink"
				>
					<RichLink {...args} />
				</Figure>
			</SectionComponent>
		);
	},

	parameters: {
		chromatic: {
			modes: { horizontal: allModes.splitHorizontal },
		},
	},

	globals: {
		viewport: {
			value: 'mobileMedium',
			isRotated: false,
		},
	},
});

export const Section = meta.story({
	args: {
		richLinkIndex: 1,
		cardStyle: 'live',
		imageData: someImageData,
		headlineText: 'Rich link headline',
		contentType: 'section',
		url: '',
		linkFormat: mockFormatSport,
		format: mockFormatSport,
		tags: [],
		sponsorName: '',
	},
	render: (args) => {
		return (
			<SectionComponent
				showTopBorder={false}
				centralBorder="full"
				showSideBorders={false}
			>
				<Figure
					format={mockFormatNews}
					isMainMedia={false}
					role="richLink"
				>
					<RichLink {...args} />
				</Figure>
			</SectionComponent>
		);
	},
	parameters: {
		chromatic: { modes: { horizontal: allModes.splitHorizontal } },
	},
});

export const Inline = meta.story({
	args: {
		richLinkIndex: 1,
		cardStyle: 'external',
		imageData: someImageData,
		headlineText: 'Rich link when inline',
		contentType: 'section',
		url: '',
		linkFormat: mockFormatLifestyle,
		format: mockFormatLifestyle,
		tags: [],
		sponsorName: '',
	},
	render: (args) => {
		return (
			<SectionComponent
				showTopBorder={false}
				centralBorder="full"
				showSideBorders={false}
			>
				<Figure
					format={mockFormatNews}
					isMainMedia={false}
					role="inline"
				>
					<RichLink {...args} />
				</Figure>
			</SectionComponent>
		);
	},
	parameters: {
		chromatic: {
			modes: { horizontal: allModes.splitHorizontal },
		},
	},
});

export const ImageContent = meta.story({
	args: {
		richLinkIndex: 1,
		cardStyle: 'dead',
		imageData: someImageData,
		headlineText: 'Rich link headline',
		contentType: 'imageContent',
		url: '',
		linkFormat: mockFormatNews,
		format: mockFormatNews,
		tags: [],
		sponsorName: '',
	},

	render: (args) => {
		return (
			<SectionComponent
				showTopBorder={false}
				centralBorder="full"
				showSideBorders={false}
			>
				<Figure
					format={mockFormatNews}
					isMainMedia={false}
					role="richLink"
				>
					<RichLink {...args} />
				</Figure>
			</SectionComponent>
		);
	},

	parameters: {
		chromatic: {
			modes: { horizontal: allModes.splitHorizontal },
		},
	},

	globals: {
		viewport: {
			value: 'desktop',
			isRotated: false,
		},
	},
});

export const Interactive = meta.story({
	args: {
		richLinkIndex: 1,
		cardStyle: 'feature',
		imageData: someImageData,
		headlineText: 'Rich link headline',
		contentType: 'interactive',
		url: '',
		linkFormat: mockFormatLifestyle,
		format: mockFormatLifestyle,
		tags: [],
		sponsorName: '',
	},

	render: (args) => {
		return (
			<SectionComponent
				showTopBorder={false}
				centralBorder="full"
				showSideBorders={false}
			>
				<Figure
					format={mockFormatNews}
					isMainMedia={false}
					role="richLink"
				>
					<RichLink {...args} />
				</Figure>
			</SectionComponent>
		);
	},

	parameters: {
		chromatic: {
			modes: { horizontal: allModes.splitHorizontal },
		},
	},

	globals: {
		viewport: {
			value: 'leftCol',
			isRotated: false,
		},
	},
});

export const Gallery = meta.story({
	args: {
		richLinkIndex: 1,
		cardStyle: 'comment',
		imageData: someImageData,
		headlineText: 'Rich link headline',
		contentType: 'gallery',
		url: '',
		linkFormat: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: ArticleSpecial.Labs,
		},
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: ArticleSpecial.Labs,
		},
		tags: [],
		sponsorName: '',
		contributorImage: someContributor,
	},

	render: (args) => {
		return (
			<SectionComponent
				showTopBorder={false}
				centralBorder="full"
				showSideBorders={false}
			>
				<Figure
					format={mockFormatNews}
					isMainMedia={false}
					role="richLink"
				>
					<RichLink {...args} />
				</Figure>
			</SectionComponent>
		);
	},

	parameters: {
		chromatic: {
			modes: { horizontal: allModes.splitHorizontal },
		},
	},

	globals: {
		viewport: {
			value: 'leftCol',
			isRotated: false,
		},
	},
});

export const Video = meta.story({
	args: {
		richLinkIndex: 1,
		cardStyle: 'comment',
		imageData: someImageData,
		headlineText: 'Rich link headline',
		contentType: 'video',
		url: '',
		linkFormat: mockFormatNews,
		format: mockFormatNews,
		tags: [],
		sponsorName: '',
		contributorImage: someContributor,
	},

	render: (args) => {
		return (
			<SectionComponent
				showTopBorder={false}
				centralBorder="full"
				showSideBorders={false}
			>
				<Figure
					format={mockFormatNews}
					isMainMedia={false}
					role="richLink"
				>
					<RichLink {...args} />
				</Figure>
			</SectionComponent>
		);
	},

	parameters: {
		chromatic: {
			modes: { horizontal: allModes.splitHorizontal },
		},
	},

	globals: {
		viewport: {
			value: 'mobileMedium',
			isRotated: false,
		},
	},
});

export const Audio = meta.story({
	args: {
		richLinkIndex: 1,
		cardStyle: 'podcast',
		imageData: someImageData,
		headlineText: 'Rich link headline',
		contentType: 'audio',
		url: '',
		linkFormat: mockFormatCulture,
		format: mockFormatCulture,
		tags: [],
		sponsorName: '',
	},
	render: (args) => {
		return (
			<SectionComponent
				showTopBorder={false}
				centralBorder="full"
				showSideBorders={false}
			>
				<Figure
					format={mockFormatNews}
					isMainMedia={false}
					role="richLink"
				>
					<RichLink {...args} />
				</Figure>
			</SectionComponent>
		);
	},
	parameters: {
		chromatic: { modes: { horizontal: allModes.splitHorizontal } },
	},
});

export const LiveBlog = meta.story({
	args: {
		richLinkIndex: 1,
		cardStyle: 'media',
		imageData: someImageData,
		headlineText: 'Rich link headline',
		contentType: 'liveBlog',
		url: '',
		linkFormat: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.LiveBlog,
			theme: Pillar.Sport,
		},
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.LiveBlog,
			theme: Pillar.Sport,
		},
		tags: [],
		sponsorName: '',
	},

	render: (args) => {
		return (
			<SectionComponent
				showTopBorder={false}
				centralBorder="full"
				showSideBorders={false}
			>
				<Figure
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.LiveBlog,
						theme: Pillar.News,
					}}
					isMainMedia={false}
					role="richLink"
				>
					<RichLink {...args} />
				</Figure>
			</SectionComponent>
		);
	},

	parameters: {
		chromatic: {
			modes: { horizontal: allModes.splitHorizontal },
		},
	},

	globals: {
		viewport: {
			value: 'mobileMedium',
			isRotated: false,
		},
	},
});

export const Tag = meta.story({
	args: {
		richLinkIndex: 1,
		cardStyle: 'analysis',
		imageData: someImageData,
		headlineText: 'Rich link headline',
		contentType: 'tag',
		url: '',
		linkFormat: mockFormatCulture,
		format: mockFormatCulture,
		tags: [],
		sponsorName: '',
	},
	render: (args) => {
		return (
			<SectionComponent
				showTopBorder={false}
				centralBorder="full"
				showSideBorders={false}
			>
				<Figure
					format={mockFormatNews}
					isMainMedia={false}
					role="richLink"
				>
					<RichLink {...args} />
				</Figure>
			</SectionComponent>
		);
	},
	parameters: {
		chromatic: { modes: { horizontal: allModes.splitHorizontal } },
	},
});

export const StarRating = meta.story({
	args: {
		richLinkIndex: 1,
		cardStyle: 'review',
		imageData: someImageData,
		headlineText: 'Rich link headline',
		contentType: 'index',
		url: '',
		linkFormat: mockFormatOpinion,
		format: mockFormatOpinion,
		sponsorName: '',
		starRating: 3,
		tags: [
			{
				id: '',
				type: 'Contributor',
				title: 'Contributor Name',
			},
		],
	},
	render: (args) => {
		return (
			<SectionComponent
				showTopBorder={false}
				centralBorder="full"
				showSideBorders={false}
			>
				<Figure
					format={mockFormatNews}
					isMainMedia={false}
					role="richLink"
				>
					<RichLink {...args} />
				</Figure>
			</SectionComponent>
		);
	},
	parameters: {
		chromatic: { modes: { horizontal: allModes.splitHorizontal } },
	},
});

export const SoleContributor = meta.story({
	args: {
		richLinkIndex: 1,
		cardStyle: 'comment',
		imageData: someImageData,
		headlineText: 'Rich link headline',
		contentType: 'index',
		url: '',
		linkFormat: mockFormatOpinion,
		format: mockFormatOpinion,
		sponsorName: '',
		contributorImage: someContributor,
		tags: [
			{
				id: '',
				type: 'Contributor',
				title: 'Sole Contributor',
			},
		],
	},
	render: (args) => {
		return (
			<SectionComponent
				showTopBorder={false}
				centralBorder="full"
				showSideBorders={false}
			>
				<Figure
					format={mockFormatNews}
					isMainMedia={false}
					role="richLink"
				>
					<RichLink {...args} />
				</Figure>
			</SectionComponent>
		);
	},
	parameters: {
		chromatic: { modes: { horizontal: allModes.splitHorizontal } },
	},
});

export const DoubleTrouble = meta.story({
	args: {
		richLinkIndex: 1,
		cardStyle: 'comment',
		imageData: someImageData,
		headlineText: 'Rich link headline',
		contentType: 'index',
		url: '',
		linkFormat: mockFormatOpinion,
		format: mockFormatOpinion,
		sponsorName: '',
		tags: [
			{
				id: '',
				type: 'Contributor',
				title: 'Jane First',
			},
			{
				id: '',
				type: 'Contributor',
				title: 'Joe Second',
			},
		],
		contributorImage: someContributor,
	},
	render: (args) => {
		return (
			<SectionComponent
				showTopBorder={false}
				centralBorder="full"
				showSideBorders={false}
			>
				<Figure
					format={mockFormatNews}
					isMainMedia={false}
					role="richLink"
				>
					<RichLink {...args} />
				</Figure>
			</SectionComponent>
		);
	},
	parameters: {
		chromatic: { modes: { horizontal: allModes.splitHorizontal } },
	},
});

export const Crossword = meta.story({
	args: {
		richLinkIndex: 1,
		cardStyle: 'letters',
		imageData: someImageData,
		headlineText: 'Rich link headline',
		contentType: 'crossword',
		url: '',
		linkFormat: mockFormatOpinion,
		format: mockFormatOpinion,
		tags: [],
		sponsorName: '',
	},
	render: (args) => {
		return (
			<SectionComponent
				showTopBorder={false}
				centralBorder="full"
				showSideBorders={false}
			>
				<Figure
					format={mockFormatNews}
					isMainMedia={false}
					role="richLink"
				>
					<RichLink {...args} />
				</Figure>
			</SectionComponent>
		);
	},
	parameters: {
		chromatic: { modes: { horizontal: allModes.splitHorizontal } },
	},
});

export const Survey = meta.story({
	args: {
		richLinkIndex: 1,
		cardStyle: 'external',
		imageData: someImageData,
		headlineText: 'Rich link headline',
		contentType: 'survey',
		url: '',
		linkFormat: mockFormatCulture,
		format: mockFormatCulture,
		tags: [],
		sponsorName: '',
	},
	render: (args) => {
		return (
			<SectionComponent
				showTopBorder={false}
				centralBorder="full"
				showSideBorders={false}
			>
				<Figure
					format={mockFormatNews}
					isMainMedia={false}
					role="richLink"
				>
					<RichLink {...args} />
				</Figure>
			</SectionComponent>
		);
	},
	parameters: {
		chromatic: { modes: { horizontal: allModes.splitHorizontal } },
	},
});

export const Signup = meta.story({
	args: {
		richLinkIndex: 1,
		cardStyle: 'comment',
		imageData: someImageData,
		headlineText: 'Rich link headline',
		contentType: 'signup',
		url: '',
		linkFormat: mockFormatCulture,
		format: mockFormatCulture,
		tags: [],
		sponsorName: '',
		contributorImage: someContributor,
	},
	render: (args) => {
		return (
			<SectionComponent
				showTopBorder={false}
				centralBorder="full"
				showSideBorders={false}
			>
				<Figure
					format={mockFormatNews}
					isMainMedia={false}
					role="richLink"
				>
					<RichLink {...args} />
				</Figure>
			</SectionComponent>
		);
	},
	parameters: {
		chromatic: { modes: { horizontal: allModes.splitHorizontal } },
	},
});

export const Userid = meta.story({
	args: {
		richLinkIndex: 1,
		cardStyle: 'editorial',
		imageData: someImageData,
		headlineText: 'Rich link headline',
		contentType: 'userid',
		url: '',
		linkFormat: mockFormatCulture,
		format: mockFormatCulture,
		tags: [],
		sponsorName: '',
	},
	render: (args) => {
		return (
			<SectionComponent
				showTopBorder={false}
				centralBorder="full"
				showSideBorders={false}
			>
				<Figure
					format={mockFormatNews}
					isMainMedia={false}
					role="richLink"
				>
					<RichLink {...args} />
				</Figure>
			</SectionComponent>
		);
	},
	parameters: {
		chromatic: { modes: { horizontal: allModes.splitHorizontal } },
	},
});

export const PaidFor = meta.story({
	args: {
		richLinkIndex: 1,
		cardStyle: 'news',
		imageData: someImageData,
		headlineText: 'Rich link headline',
		contentType: 'userid',
		url: '',
		linkFormat: mockFormatCulture,
		format: mockFormatCulture,
		tags: [
			{
				id: 'tone/advertisement-features',
				type: '',
				title: '',
			},
		],
		sponsorName: 'Sponsor name',
	},
	render: (args) => {
		return (
			<SectionComponent
				showTopBorder={false}
				centralBorder="full"
				showSideBorders={false}
			>
				<Figure
					format={mockFormatNews}
					isMainMedia={false}
					role="richLink"
				>
					<RichLink {...args} />
				</Figure>
			</SectionComponent>
		);
	},
	parameters: {
		chromatic: { modes: { horizontal: allModes.splitHorizontal } },
	},
});

export const Analysis = meta.story({
	args: {
		richLinkIndex: 1,
		cardStyle: 'news',
		imageData: someImageData,
		headlineText: 'Rich link headline',
		contentType: 'article',
		url: '',
		linkFormat: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Analysis,
			theme: Pillar.Culture,
		},
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Analysis,
			theme: Pillar.Culture,
		},
		tags: [],
		sponsorName: '',
	},
	render: (args) => {
		return (
			<div
				className="light"
				style={{ backgroundColor: palette('--article-background') }}
			>
				Analysis Articles have a different colour background, so rich
				links should too.
				<SectionComponent
					showTopBorder={false}
					centralBorder="full"
					showSideBorders={false}
				>
					<Figure
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Analysis,
							theme: Pillar.News,
						}}
						isMainMedia={false}
						role="richLink"
					>
						<RichLink {...args} />
					</Figure>
				</SectionComponent>
			</div>
		);
	},
	parameters: {
		chromatic: { modes: { horizontal: allModes.splitHorizontal } },
	},
});
