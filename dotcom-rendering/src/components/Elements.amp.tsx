import { isNonNullable } from '@guardian/libs';
import { NotRenderableInDCR } from '../lib/errors/not-renderable-in-dcr';
import type { Switches } from '../types/config';
import type { FEElement } from '../types/content';
import type { TagType } from '../types/tag';
import { AudioAtomBlockComponent } from './AudioAtomBlockComponent.amp';
import { CommentBlockComponent } from './CommentBlockComponent.amp';
import { ContentAtomBlockComponent } from './ContentAtomBlockComponent.amp';
import { EmbedBlockComponent } from './EmbedBlockComponent.amp';
import { Expandable } from './Expandable.amp';
import { GuVideoBlockComponent } from './GuVideoBlockComponent.amp';
import { ImageBlockComponent } from './ImageBlockComponent.amp';
import { InteractiveAtomBlockComponent } from './InteractiveAtomBlockComponent.amp';
import { InteractiveBlockComponent } from './InteractiveBlockComponent.amp';
import { PullquoteBlockComponent } from './PullquoteBlockComponent.amp';
import { RichLinkBlockComponent } from './RichLinkBlockComponent.amp';
import { SoundcloudBlockComponent } from './SoundcloudBlockComponent.amp';
import { SubheadingBlockComponent } from './SubheadingBlockComponent.amp';
import { TextBlockComponent } from './TextBlockComponent.amp';
import { TimelineBlockComponent } from './TimelineBlockComponent.amp';
import { TwitterBlockComponent } from './TwitterBlockComponent.amp';
import { VideoVimeoBlockComponent } from './VideoVimeoBlockComponent.amp';
import { VideoYoutubeBlockComponent } from './VideoYoutubeBlockComponent.amp';
import { YoutubeBlockComponent } from './YoutubeBlockComponent.amp';

/**
 * Elements we support on AMP -
 *
 * Elements with isMandatory property should only be included if we render
 * them when isMandatory is true
 */
const AMP_SUPPORTED_ELEMENTS = [
	'model.dotcomrendering.pageElements.AudioAtomBlockElement',
	'model.dotcomrendering.pageElements.BlockquoteBlockElement',
	'model.dotcomrendering.pageElements.ChartAtomBlockElement',
	'model.dotcomrendering.pageElements.CommentBlockElement',
	'model.dotcomrendering.pageElements.ContentAtomBlockElement',
	'model.dotcomrendering.pageElements.DisclaimerBlockElement',
	// We do not support EmbedBlockElement's when they are mandatory
	// 'model.dotcomrendering.pageElements.EmbedBlockElement',
	'model.dotcomrendering.pageElements.GenericAtomBlockElement',
	'model.dotcomrendering.pageElements.GuideAtomBlockElement',
	'model.dotcomrendering.pageElements.GuVideoBlockElement',
	'model.dotcomrendering.pageElements.ImageBlockElement',
	'model.dotcomrendering.pageElements.InteractiveAtomBlockElement',
	// We do not support InteractiveBlockElement's when they are mandatory
	// 'model.dotcomrendering.pageElements.InteractiveBlockElement',
	'model.dotcomrendering.pageElements.ProfileAtomBlockElement',
	'model.dotcomrendering.pageElements.PullquoteBlockElement',
	'model.dotcomrendering.pageElements.QABlockElement',
	'model.dotcomrendering.pageElements.RichLinkBlockElement',
	'model.dotcomrendering.pageElements.SoundcloudBlockElement',
	'model.dotcomrendering.pageElements.SubheadingBlockElement',
	'model.dotcomrendering.pageElements.TextBlockElement',
	'model.dotcomrendering.pageElements.TimelineBlockElement',
	'model.dotcomrendering.pageElements.TweetBlockElement',
	'model.dotcomrendering.pageElements.VideoVimeoBlockElement',
	'model.dotcomrendering.pageElements.VideoYoutubeBlockElement',
	'model.dotcomrendering.pageElements.YoutubeBlockElement',
];

export const isAmpSupported = ({
	format,
	tags,
	elements,
	switches,
	main,
}: {
	format: FEFormat;
	tags: TagType[];
	elements: FEElement[];
	switches: Switches;
	main: string;
}): boolean => {
	if (format.design === 'InteractiveDesign') {
		const hasAmpInteractiveTag = tags.some(
			(tag) => tag.id === 'tracking/platformfunctional/ampinteractive',
		);
		if (!hasAmpInteractiveTag) return false;
	}

	if (tags.some((tag) => tag.id === 'type/article')) {
		const isSwitchedOn = switches.ampArticleSwitch;
		const hasQuizTag = tags.some((tag) => tag.id === 'tone/quizzes');
		// Some Labs pages have quiz atoms but are not tagged as quizzes
		const hasQuizAtoms = elements.find(
			(element) =>
				element._type ===
				'model.dotcomrendering.pageElements.QuizAtomBlockElement',
		);
		if (!isSwitchedOn || hasQuizTag || hasQuizAtoms || elements.length == 0)
			return false;
	}

	if (format.design === 'LiveBlogDesign') {
		const isSwitchedOn = switches.ampLiveblogSwitch;
		if (!isSwitchedOn) return false;
	}

	if (main.includes('guardiannewsandmedia.formstack.com')) {
		return false;
	}

	// <amp-youtube> does not support rendering Playlists, only normal videos.
	if (
		elements.find(
			(element) =>
				element._type ===
					'model.dotcomrendering.pageElements.VideoYoutubeBlockElement' &&
				(element.originalUrl || element.url).includes('/playlist'),
		)
	) {
		return false;
	}

	return elements.every((element) => {
		if ((element as { isMandatory?: boolean }).isMandatory) {
			return AMP_SUPPORTED_ELEMENTS.includes(element._type);
		}
		return true;
	});
};

export const Elements = (
	elements: FEElement[],
	pillar: ArticleTheme,
	isImmersive: boolean,
	adTargeting?: AdTargeting,
): JSX.Element[] => {
	const output = elements.map((element) => {
		/**
		 * Addding something to this list?
		 *
		 * Please make sure you keep the 'AMP_SUPPORTED_ELEMENTS' array above
		 * up-to-date with any changes you make!
		 */
		switch (element._type) {
			case 'model.dotcomrendering.pageElements.AudioAtomBlockElement':
				return (
					<AudioAtomBlockComponent
						key={element.elementId}
						element={element}
					/>
				);
			case 'model.dotcomrendering.pageElements.BlockquoteBlockElement':
				return (
					<TextBlockComponent
						key={element.elementId}
						html={element.html}
						pillar={pillar}
					/>
				);
			case 'model.dotcomrendering.pageElements.ChartAtomBlockElement':
				return (
					<InteractiveAtomBlockComponent
						key={element.elementId}
						url={element.url}
					/>
				);
			case 'model.dotcomrendering.pageElements.CommentBlockElement':
				return (
					<CommentBlockComponent
						key={element.elementId}
						element={element}
					/>
				);
			case 'model.dotcomrendering.pageElements.ContentAtomBlockElement':
				return <ContentAtomBlockComponent key={element.elementId} />;
			case 'model.dotcomrendering.pageElements.EmbedBlockElement':
				return (
					<EmbedBlockComponent
						key={element.elementId}
						element={element}
					/>
				);
			case 'model.dotcomrendering.pageElements.GenericAtomBlockElement':
				return (
					<InteractiveAtomBlockComponent
						key={element.elementId}
						url={element.url}
					/>
				);
			case 'model.dotcomrendering.pageElements.GuideAtomBlockElement':
				return (
					<Expandable
						key={element.elementId}
						id={element.id}
						type={element.label}
						title={element.title}
						img={element.img}
						credit={element.credit}
						pillar={pillar}
					>
						<div
							dangerouslySetInnerHTML={{
								__html: element.html,
							}}
						/>
					</Expandable>
				);
			case 'model.dotcomrendering.pageElements.GuVideoBlockElement':
				return (
					<GuVideoBlockComponent
						key={element.elementId}
						element={element}
						pillar={pillar}
					/>
				);
			case 'model.dotcomrendering.pageElements.ImageBlockElement':
				return (
					<ImageBlockComponent
						key={element.elementId}
						element={element}
						pillar={pillar}
					/>
				);
			case 'model.dotcomrendering.pageElements.InteractiveAtomBlockElement':
				return (
					<InteractiveAtomBlockComponent
						key={element.elementId}
						url={element.url}
						html={element.html}
						placeholderUrl={element.placeholderUrl}
					/>
				); // element.placeholderUrl
			case 'model.dotcomrendering.pageElements.InteractiveBlockElement': // Plain Interactive Embeds
				return (
					<InteractiveBlockComponent
						key={element.elementId}
						url={element.url}
						isMandatory={element.isMandatory}
					/>
				);
			case 'model.dotcomrendering.pageElements.ProfileAtomBlockElement':
				return (
					<Expandable
						key={element.elementId}
						id={element.id}
						type={element.label}
						title={element.title}
						img={element.img}
						credit={element.credit}
						pillar={pillar}
					>
						<div
							dangerouslySetInnerHTML={{
								__html: element.html,
							}}
						/>
					</Expandable>
				);
			case 'model.dotcomrendering.pageElements.PullquoteBlockElement':
				return (
					<PullquoteBlockComponent
						key={element.elementId}
						html={element.html}
						pillar={pillar}
					/>
				);
			case 'model.dotcomrendering.pageElements.QABlockElement':
				return (
					<Expandable
						key={element.elementId}
						id={element.id}
						type="Q&A"
						title={element.title}
						img={element.img}
						credit={element.credit}
						pillar={pillar}
					>
						<div
							dangerouslySetInnerHTML={{
								__html: element.html,
							}}
						/>
					</Expandable>
				);
			case 'model.dotcomrendering.pageElements.RichLinkBlockElement':
				return (
					<RichLinkBlockComponent
						key={element.elementId}
						element={element}
						pillar={pillar}
					/>
				);
			case 'model.dotcomrendering.pageElements.SoundcloudBlockElement':
				return (
					<SoundcloudBlockComponent
						key={element.elementId}
						element={element}
					/>
				);
			case 'model.dotcomrendering.pageElements.SubheadingBlockElement':
				return (
					<SubheadingBlockComponent
						key={element.elementId}
						html={element.html}
						pillar={pillar}
						isImmersive={isImmersive}
					/>
				);
			case 'model.dotcomrendering.pageElements.TextBlockElement':
				return (
					<TextBlockComponent
						key={element.elementId}
						html={element.html}
						pillar={pillar}
					/>
				);
			case 'model.dotcomrendering.pageElements.TimelineBlockElement':
				return (
					<TimelineBlockComponent
						key={element.elementId}
						id={element.id}
						title={element.title}
						description={element.description}
						events={element.events}
						pillar={pillar}
					/>
				);
			case 'model.dotcomrendering.pageElements.TweetBlockElement':
				return (
					<TwitterBlockComponent
						key={element.elementId}
						element={element}
						pillar={pillar}
					/>
				);
			case 'model.dotcomrendering.pageElements.VideoVimeoBlockElement':
				return (
					<VideoVimeoBlockComponent
						key={element.elementId}
						element={element}
						pillar={pillar}
					/>
				);
			case 'model.dotcomrendering.pageElements.VideoYoutubeBlockElement':
				return (
					<VideoYoutubeBlockComponent
						key={element.elementId}
						element={element}
						pillar={pillar}
					/>
				);
			case 'model.dotcomrendering.pageElements.YoutubeBlockElement':
				return (
					<YoutubeBlockComponent
						key={element.elementId}
						element={element}
						pillar={pillar}
						adTargeting={adTargeting}
					/>
				);
			case 'model.dotcomrendering.pageElements.DisclaimerBlockElement':
				return <></>;
			default:
				console.log('Unsupported Element', JSON.stringify(element));
				if ((element as { isMandatory?: boolean }).isMandatory) {
					throw new NotRenderableInDCR();
				}
				return null;
		}
	});

	return output.filter(isNonNullable);
};
