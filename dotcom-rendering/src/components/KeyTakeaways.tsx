import { KeyTakeaway } from '../types/content';
import { RenderArticleElement } from '../lib/renderElement';
import { ServerSideTests, Switches } from '../types/config';
import { EditionId } from '../lib/edition';
import { ArticleFormat } from '@guardian/libs';

interface CommonProps {
	format: ArticleFormat;
	ajaxUrl: string;
	host: string;
	pageId: string;
	isAdFreeUser: boolean;
	isSensitive: boolean;
	abTests: ServerSideTests;
	switches: Switches;
	editionId: EditionId;
}

interface KeyTakeawaysProps extends CommonProps {
	keyTakeaways: KeyTakeaway[];
}

interface KeyTakeawayProps extends CommonProps {
	keyTakeaway: KeyTakeaway;
}

const KeyTakeawayComponent = ({
	keyTakeaway,
	format,
	ajaxUrl,
	host,
	pageId,
	isAdFreeUser,
	isSensitive,
	switches,
	abTests,
	editionId,
}: KeyTakeawayProps) => {
	return (
		<>
			<h2>{keyTakeaway.title}</h2>
			{keyTakeaway.body.map((element, index) => (
				<RenderArticleElement
					// eslint-disable-next-line react/no-array-index-key -- This is only rendered once so we can safely use index to suppress the warning
					key={index}
					format={format}
					element={element}
					ajaxUrl={ajaxUrl}
					host={host}
					index={index}
					isMainMedia={index === 0}
					pageId={pageId}
					webTitle={keyTakeaway.title}
					isAdFreeUser={isAdFreeUser}
					isSensitive={isSensitive}
					switches={switches}
					abTests={abTests}
					editionId={editionId}
				/>
			))}
		</>
	);
};

export const KeyTakeaways = ({
	keyTakeaways,
	format,
	ajaxUrl,
	host,
	pageId,
	isAdFreeUser,
	isSensitive,
	switches,
	abTests,
	editionId,
}: KeyTakeawaysProps) => {
	return (
		<>
			{keyTakeaways.map((keyTakeaway) => (
				<KeyTakeawayComponent
					keyTakeaway={keyTakeaway}
					format={format}
					ajaxUrl={ajaxUrl}
					host={host}
					pageId={pageId}
					isAdFreeUser={isAdFreeUser}
					isSensitive={isSensitive}
					switches={switches}
					abTests={abTests}
					editionId={editionId}
				/>
			))}
		</>
	);
};
