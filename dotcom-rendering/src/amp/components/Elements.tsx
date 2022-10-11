import { NotRenderableInDCR } from '../../lib/errors/not-renderable-in-dcr';
import { enhance } from '../lib/enhance';
import { AudioAtomBlockComponent } from './elements/AudioAtomBlockComponent';
import { CommentBlockComponent } from './elements/CommentBlockComponent';
import { ContentAtomBlockComponent } from './elements/ContentAtomBlockComponent';
import { DisclaimerBlockComponent } from './elements/DisclaimerBlockComponent';
import { EmbedBlockComponentAMP } from './elements/EmbedBlockComponentAMP';
import { GuVideoBlockComponent } from './elements/GuVideoBlockComponent';
import { ImageBlockComponent } from './elements/ImageBlockComponent';
import { InteractiveAtomBlockComponent } from './elements/InteractiveAtomBlockComponent';
import { InteractiveBlockComponentAMP } from './elements/InteractiveBlockComponentAMP';
import { PullquoteBlockComponent } from './elements/PullquoteBlockComponent';
import { RichLinkBlockComponent } from './elements/RichLinkBlockComponent';
import { SoundcloudBlockComponent } from './elements/SoundcloudBlockComponent';
import { SubheadingBlockComponent } from './elements/SubheadingBlockComponent';
import { TextBlockComponent } from './elements/TextBlockComponent';
import { TimelineBlockComponent } from './elements/TimelineBlockComponent';
import { TwitterBlockComponent } from './elements/TwitterBlockComponent';
import { VideoVimeoBlockComponent } from './elements/VideoVimeoBlockComponent';
import { VideoYoutubeBlockComponent } from './elements/VideoYoutubeBlockComponent';
import { YoutubeBlockComponentAMP } from './elements/YoutubeBlockComponentAMP';
import { Expandable } from './Expandable';

export const isAmpSupported = (elements: CAPIElement[]): boolean => {
	// Elements that are supported & rendered when mandatory
	const supportedElements = [
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

	return elements.every((element) => {
		console.log(element._type);
		if (
			element._type ===
			'model.dotcomrendering.pageElements.InteractiveBlockElement'
		) {
			console.log(element.isMandatory);
		}
		if ((element as { isMandatory?: boolean }).isMandatory) {
			console.log('isMandatory');
			return supportedElements.includes(element._type);
		}
		return true;
	});
};

export const Elements = (
	elements: CAPIElement[],
	pillar: ArticleTheme,
	isImmersive: boolean,
	adTargeting?: AdTargeting,
	// eslint-disable-next-line @typescript-eslint/ban-types -- the type signature is helpful
): JSX.Element[] => {
	const cleanedElements = enhance(elements);
	const output = cleanedElements.map((element) => {
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
				return (
					<ContentAtomBlockComponent
						key={element.elementId}
						element={element}
					/>
				);
			case 'model.dotcomrendering.pageElements.DisclaimerBlockElement':
				return (
					<DisclaimerBlockComponent
						key={element.elementId}
						html={element.html}
						pillar={pillar}
					/>
				);
			case 'model.dotcomrendering.pageElements.EmbedBlockElement':
				return (
					<EmbedBlockComponentAMP
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
					<InteractiveBlockComponentAMP
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
					<YoutubeBlockComponentAMP
						key={element.elementId}
						element={element}
						pillar={pillar}
						adTargeting={adTargeting}
					/>
				);
			default:
				console.log('Unsupported Element', JSON.stringify(element));
				if ((element as { isMandatory?: boolean }).isMandatory) {
					throw new NotRenderableInDCR();
				}
				return null;
		}
	});

	return output.filter(
		// eslint-disable-next-line @typescript-eslint/ban-types -- it’s a type predicate
		(el: JSX.Element | null): el is JSX.Element => el !== null,
	);
};
