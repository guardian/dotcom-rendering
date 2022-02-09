import { AudioAtomBlockComponent } from './elements/AudioAtomBlockComponent';
import { CommentBlockComponent } from './elements/CommentBlockComponent';
import { ContentAtomBlockComponent } from './elements/ContentAtomBlockComponent';
import { DisclaimerBlockComponent } from './elements/DisclaimerBlockComponent';
import { EmbedBlockComponent } from './elements/EmbedBlockComponent';
import { Expandable } from './Expandable';
import { GuVideoBlockComponent } from './elements/GuVideoBlockComponent';
import { ImageBlockComponent } from './elements/ImageBlockComponent';
import { InteractiveAtomBlockComponent } from './elements/InteractiveAtomBlockComponent';
import { InteractiveBlockComponent } from './elements/InteractiveBlockComponent';
import { PullquoteBlockComponent } from './elements/PullquoteBlockComponent';
import { RichLinkBlockComponent } from './elements/RichLinkBlockComponent';
import { SoundcloudBlockComponent } from './elements/SoundcloudBlockComponent';
import { SubheadingBlockComponent } from './elements/SubheadingBlockComponent';
import { TextBlockComponent } from './elements/TextBlockComponent';
import { TimelineBlockComponent } from './elements/TimelineBlockComponent';
import { TwitterBlockComponent } from './elements/TwitterBlockComponent';
import { VideoVimeoBlockComponent } from './elements/VideoVimeoBlockComponent';
import { VideoYoutubeBlockComponent } from './elements/VideoYoutubeBlockComponent';
import { YoutubeBlockComponent } from './elements/YoutubeBlockComponent';

import { enhance } from '../lib/enhance';
import { NotRenderableInDCR } from '../../lib/errors/not-renderable-in-dcr';

export const Elements = (
	elements: CAPIElement[],
	pillar: ArticlePillar,
	isImmersive: boolean,
	adTargeting?: AdTargeting,
): JSX.Element[] => {
	const cleanedElements = enhance(elements);
	const output = cleanedElements.map((element, i) => {
		switch (element._type) {
			case 'model.dotcomrendering.pageElements.AudioAtomBlockElement':
				return <AudioAtomBlockComponent element={element} />;
			case 'model.dotcomrendering.pageElements.BlockquoteBlockElement':
				return (
					<TextBlockComponent
						key={i}
						html={element.html}
						pillar={pillar}
					/>
				);
			case 'model.dotcomrendering.pageElements.ChartAtomBlockElement':
				return <InteractiveAtomBlockComponent url={element.url} />;
			case 'model.dotcomrendering.pageElements.CommentBlockElement':
				return <CommentBlockComponent key={i} element={element} />;
			case 'model.dotcomrendering.pageElements.ContentAtomBlockElement':
				return <ContentAtomBlockComponent element={element} />;
			case 'model.dotcomrendering.pageElements.DisclaimerBlockElement':
				return (
					<DisclaimerBlockComponent
						key={i}
						html={element.html}
						pillar={pillar}
					/>
				);
			case 'model.dotcomrendering.pageElements.EmbedBlockElement':
				return <EmbedBlockComponent key={i} element={element} />;
			case 'model.dotcomrendering.pageElements.GenericAtomBlockElement':
				return <InteractiveAtomBlockComponent url={element.url} />;
			case 'model.dotcomrendering.pageElements.GuideAtomBlockElement':
				return (
					<Expandable
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
						key={i}
						element={element}
						pillar={pillar}
					/>
				);
			case 'model.dotcomrendering.pageElements.ImageBlockElement':
				return (
					<ImageBlockComponent
						key={i}
						element={element}
						pillar={pillar}
					/>
				);
			case 'model.dotcomrendering.pageElements.InteractiveAtomBlockElement':
				return (
					<InteractiveAtomBlockComponent
						url={element.url}
						html={element.html}
						placeholderUrl={element.placeholderUrl}
					/>
				); // element.placeholderUrl
			case 'model.dotcomrendering.pageElements.InteractiveBlockElement': // Plain Interactive Embeds
				return (
					<InteractiveBlockComponent
						url={element.url}
						isMandatory={element.isMandatory}
					/>
				);
			case 'model.dotcomrendering.pageElements.ProfileAtomBlockElement':
				return (
					<Expandable
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
						key={i}
						html={element.html}
						pillar={pillar}
					/>
				);
			case 'model.dotcomrendering.pageElements.QABlockElement':
				return (
					<Expandable
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
						key={i}
						element={element}
						pillar={pillar}
					/>
				);
			case 'model.dotcomrendering.pageElements.SoundcloudBlockElement':
				return <SoundcloudBlockComponent key={i} element={element} />;
			case 'model.dotcomrendering.pageElements.SubheadingBlockElement':
				return (
					<SubheadingBlockComponent
						key={i}
						html={element.html}
						pillar={pillar}
						isImmersive={isImmersive}
					/>
				);
			case 'model.dotcomrendering.pageElements.TextBlockElement':
				return (
					<TextBlockComponent
						key={i}
						html={element.html}
						pillar={pillar}
					/>
				);
			case 'model.dotcomrendering.pageElements.TimelineBlockElement':
				return (
					<TimelineBlockComponent
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
						key={i}
						element={element}
						pillar={pillar}
					/>
				);
			case 'model.dotcomrendering.pageElements.VideoVimeoBlockElement':
				return (
					<VideoVimeoBlockComponent
						key={i}
						element={element}
						pillar={pillar}
					/>
				);
			case 'model.dotcomrendering.pageElements.VideoYoutubeBlockElement':
				return (
					<VideoYoutubeBlockComponent
						key={i}
						element={element}
						pillar={pillar}
					/>
				);
			case 'model.dotcomrendering.pageElements.YoutubeBlockElement':
				return (
					<YoutubeBlockComponent
						element={element}
						pillar={pillar}
						adTargeting={adTargeting}
					/>
				);
			default:
				// eslint-disable-next-line no-console
				console.log('Unsupported Element', JSON.stringify(element));
				if ((element as { isMandatory?: boolean }).isMandatory) {
					throw new NotRenderableInDCR();
				}
				return null;
		}
	});

	return output.filter((el) => el !== null) as JSX.Element[];
};
