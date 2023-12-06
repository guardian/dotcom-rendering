// ----- Imports ----- //

import { EmbedTracksType } from '@guardian/content-api-models/v1/embedTracksType';
import type { Option } from '../../../vendor/@guardian/types/index';
import {
	fromNullable,
	map,
	none,
	some,
	withDefault,
} from '../../../vendor/@guardian/types/index';
import ClickToView from 'components/ClickToView';
import EmbedComponent from 'components/Embed';
import { EmbedKind } from 'embed';
import type {
	EmailSignup,
	Embed,
	Generic,
	GenericFields,
	Instagram,
	Spotify,
	TikTok,
	YouTube,
} from 'embed';
import { pipe, resultFromNullable, resultMap2, resultMap3 } from 'lib';
import { createElement as h } from 'react';
import type { FC, ReactElement } from 'react';
import { Result } from 'result';

// ----- Component ----- //

interface Props {
	embed: Embed;
	editions: boolean;
}

const genericDivProps = (embed: Generic | TikTok): Record<string, string> => ({
	...withDefault({})(
		map<string, Record<string, string>>((alt) => {
			return { alt };
		})(embed.alt),
	),
	html: embed.html,
	height: embed.height.toString(),
	...(embed.mandatory && { mandatory: 'true' }),
	...pipe(
		embed.source,
		map((source) => ({ source })),
		withDefault<Record<string, string>>({}),
	),
	...pipe(
		embed.sourceDomain,
		map((sourceDomain) => ({ sourceDomain })),
		withDefault<Record<string, string>>({}),
	),
	...(embed.tracking && { tracking: embed.tracking.toString() }),
});

const embedToDivProps = (embed: Embed): Record<string, string> => {
	switch (embed.kind) {
		case EmbedKind.Spotify:
			return {
				kind: EmbedKind.Spotify,
				src: embed.src,
				width: embed.width.toString(),
				height: embed.height.toString(),
				...(embed.tracking && { tracking: embed.tracking.toString() }),
			};
		case EmbedKind.YouTube:
			return {
				kind: EmbedKind.YouTube,
				id: embed.id,
				width: embed.width.toString(),
				height: embed.height.toString(),
				...(embed.tracking && { tracking: embed.tracking.toString() }),
			};
		case EmbedKind.Generic: {
			return {
				kind: EmbedKind.Generic,
				...genericDivProps(embed),
			};
		}
		case EmbedKind.EmailSignup: {
			return {
				kind: EmbedKind.EmailSignup,
				...withDefault({})(
					map<string, Record<string, string>>((alt) => {
						return { alt };
					})(embed.alt),
				),
				...withDefault({})(
					map<string, Record<string, string>>((caption) => {
						return { caption };
					})(embed.caption),
				),
				src: embed.src,
				...(embed.tracking && { tracking: embed.tracking.toString() }),
				...pipe(
					embed.source,
					map((source) => ({ source })),
					withDefault<Record<string, string>>({}),
				),
				...pipe(
					embed.sourceDomain,
					map((sourceDomain) => ({ sourceDomain })),
					withDefault<Record<string, string>>({}),
				),
			};
		}
		case EmbedKind.TikTok: {
			return {
				kind: EmbedKind.TikTok,
				...genericDivProps(embed),
			};
		}
		case EmbedKind.Instagram: {
			return {
				kind: EmbedKind.Instagram,
				id: embed.id,
				...pipe(
					embed.caption,
					map((caption) => ({ caption: caption })),
					withDefault<Record<string, string>>({}),
				),
				...(embed.tracking && { tracking: embed.tracking.toString() }),
			};
		}
	}
};

const divElementPropsToEmbedComponentProps = (
	container: Element,
): Result<string, EmbedComponentInClickToViewProps> => {
	const parseTrackingParam = (param?: string): EmbedTracksType => {
		switch (param) {
			case '0':
				return EmbedTracksType.UNKNOWN;
			case '1':
				return EmbedTracksType.TRACKS;
			case '2':
				return EmbedTracksType.DOES_NOT_TRACK;
			default:
				return EmbedTracksType.DOES_NOT_TRACK;
		}
	};

	const requiredStringParam = (
		container: Record<string, string | undefined>,
		parameterName: string,
	): Result<string, string> => {
		return resultFromNullable(
			`I can't find a '${parameterName}' field for this embed`,
		)(container[parameterName]);
	};

	const requiredNumberParam = (
		container: Record<string, string | undefined>,
		parameterName: string,
	): Result<string, number> =>
		requiredStringParam(container, parameterName).flatMap(
			(value: string) => {
				const parsedValue = Number.parseInt(value);

				if (Number.isNaN(parsedValue)) {
					return Result.err(`${value} is not a integer`);
				}

				return Result.ok(parsedValue);
			},
		);

	const requiredBooleanParam = (
		container: Record<string, string | undefined>,
		parameterName: string,
	): Result<string, boolean> =>
		requiredStringParam(container, parameterName).flatMap(
			(value: string) => {
				if (value === 'true') {
					return Result.ok(true);
				}
				if (value === 'false') {
					return Result.ok(false);
				}

				return Result.err(`${value} is not a valid boolean value`);
			},
		);

	const getDataAttributesFromElement = (
		container: Element,
	): Result<string, Record<string, string | undefined>> => {
		if (container instanceof HTMLElement) {
			return Result.ok({ ...container.dataset });
		} else {
			return Result.err(
				'Embed wrapper Element does not have a dataset field',
			);
		}
	};

	const parseEmbedKind = (
		kindValue: string | undefined,
	): Result<string, EmbedKind> => {
		if (kindValue && kindValue in EmbedKind) {
			return Result.ok(kindValue as EmbedKind);
		}

		return Result.err(`'${kindValue ?? 'undefined'}' is not an EmbedKind`);
	};

	type ElementProps = Record<string, string | undefined>;

	const parseGenericFields = (
		elementProps: ElementProps,
	): Result<string, GenericFields> =>
		resultMap2(
			(html: string, height: number): GenericFields => ({
				alt: fromNullable(elementProps['alt']),
				html,
				height,
				mandatory: elementProps['mandatory'] === 'true',
				source: fromNullable(elementProps['source']),
				sourceDomain: fromNullable(elementProps['sourceDomain']),
				tracking: parseTrackingParam(elementProps['tracking']),
			}),
		)(requiredStringParam(elementProps, 'html'))(
			requiredNumberParam(elementProps, 'height'),
		);
	const dataAttributesToEmbed = (
		elementProps: Record<string, string | undefined>,
	): Result<string, Embed> =>
		parseEmbedKind(elementProps['kind']).flatMap(
			(embedKind: EmbedKind): Result<string, Embed> => {
				switch (embedKind) {
					case EmbedKind.Spotify:
						return resultMap3(
							(
								src: string,
								width: number,
								height: number,
							): Spotify => ({
								kind: EmbedKind.Spotify,
								src,
								width,
								height,
								tracking: parseTrackingParam(
									elementProps['tracking'],
								),
							}),
						)(requiredStringParam(elementProps, 'src'))(
							requiredNumberParam(elementProps, 'width'),
						)(requiredNumberParam(elementProps, 'height'));
					case EmbedKind.YouTube:
						return resultMap3(
							(
								id: string,
								width: number,
								height: number,
							): YouTube => ({
								kind: EmbedKind.YouTube,
								id,
								width,
								height,
								tracking: parseTrackingParam(
									elementProps['tracking'],
								),
							}),
						)(requiredStringParam(elementProps, 'id'))(
							requiredNumberParam(elementProps, 'width'),
						)(requiredNumberParam(elementProps, 'height'));
					case EmbedKind.Instagram: {
						return requiredStringParam(elementProps, 'id').map(
							(id: string): Instagram => ({
								kind: EmbedKind.Instagram,
								id,
								caption: fromNullable(elementProps['caption']),
								tracking: parseTrackingParam(
									elementProps['tracking'],
								),
							}),
						);
					}
					case EmbedKind.Generic: {
						return parseGenericFields(elementProps).map(
							(genericFields: GenericFields): Generic => ({
								kind: EmbedKind.Generic,
								...genericFields,
							}),
						);
					}
					case EmbedKind.TikTok: {
						return parseGenericFields(elementProps).map(
							(genericFields: GenericFields): TikTok => ({
								kind: EmbedKind.TikTok,
								...genericFields,
							}),
						);
					}
					case EmbedKind.EmailSignup: {
						return requiredStringParam(elementProps, 'src').map(
							(src: string): EmailSignup => ({
								kind: EmbedKind.EmailSignup,
								src,
								alt: fromNullable(elementProps['alt']),
								caption: fromNullable(elementProps['caption']),
								tracking: parseTrackingParam(
									elementProps['tracking'],
								),
								source: fromNullable(elementProps['source']),
								sourceDomain: fromNullable(
									elementProps['sourceDomain'],
								),
							}),
						);
					}
				}
			},
		);

	return getDataAttributesFromElement(container).flatMap((dataAttributes) =>
		resultMap2((editions: boolean, embed: Embed) => {
			const sourceDetails = getSourceDetailsForEmbed(embed);
			return { editions, embed, sourceDetails };
		})(requiredBooleanParam(dataAttributes, 'editions'))(
			dataAttributesToEmbed(dataAttributes),
		),
	);
};

const createEmbedComponentFromProps = (
	container: Element,
): Result<string, ReactElement> =>
	divElementPropsToEmbedComponentProps(container).flatMap(
		(embedComponentProps: EmbedComponentInClickToViewProps) =>
			resultFromNullable(
				`I can't construct a Component for embed of type ${embedComponentProps.embed.kind}`,
			)(h(EmbedComponentInClickToView, embedComponentProps)),
	);

type SourceDetails = { source: Option<string>; sourceDomain: Option<string> };

const getSourceDetailsForEmbed = (embed: Embed): SourceDetails => {
	switch (embed.kind) {
		case EmbedKind.YouTube:
			return {
				source: some('YouTube'),
				sourceDomain: some('www.youtube.com'),
			};
		case EmbedKind.Instagram:
			return {
				source: some('Instagram'),
				sourceDomain: some('www.instagram.com'),
			};
		case EmbedKind.Spotify:
			return {
				source: some('Spotify'),
				sourceDomain: some('www.spotify.com'),
			};
		case EmbedKind.Generic:
		case EmbedKind.TikTok:
		case EmbedKind.EmailSignup:
			return {
				source: embed.source,
				sourceDomain: embed.sourceDomain,
			};
	}
};

const isblockedEditionsEmbed = (embed: Embed): boolean =>
	embed.kind === EmbedKind.TikTok || embed.kind === EmbedKind.Instagram;

const renderOverlay = (embed: Embed, editions: boolean): boolean => {
	if (!editions) {
		return true;
	}
	if (isblockedEditionsEmbed(embed)) {
		return false;
	}
	return true;
};

interface EmbedComponentInClickToViewProps {
	embed: Embed;
	editions: boolean;
	sourceDetails: SourceDetails;
}

const EmbedComponentInClickToView: FC<EmbedComponentInClickToViewProps> = ({
	embed,
	editions,
	sourceDetails,
}) => {
	return renderOverlay(embed, editions)
		? h(ClickToView, {
				source: sourceDetails.source,
				sourceDomain: sourceDetails.sourceDomain,
				children: h(EmbedComponent, { embed, editions }),
				role: none,
				onAccept: none,
		  })
		: null;
};

/**
 * This converts the key values of an object into keys appropriate to be
 * used as the dataset of an element.
 *
 * The converted fields can be added as attributes to an element and
 * can then be read in their pre-converted form using the element.dataset
 * attribute.
 *
 * For more details see: https://docs.w3cub.com/dom/htmlelement/dataset
 */
const withDatasetKeyFormat = (
	dataSet: Record<string, string>,
): Record<string, string> => {
	return Object.entries(dataSet).reduce(
		(accumulatedObject, [currentKey, currentValue]) => {
			const newKey =
				'data-' +
				currentKey.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
			return { ...accumulatedObject, [newKey]: currentValue };
		},
		{},
	);
};

const EmbedComponentWrapper: FC<Props> = ({ embed, editions }: Props) => {
	if (
		embed.tracking === EmbedTracksType.TRACKS ||
		embed.tracking === EmbedTracksType.UNKNOWN
	) {
		const sourceDetails = getSourceDetailsForEmbed(embed);
		return h(
			'div',
			{
				...withDatasetKeyFormat(embedToDivProps(embed)),
				...withDatasetKeyFormat({
					editions: editions ? 'true' : 'false',
				}),
				className: 'js-click-to-view-container',
			},
			EmbedComponentInClickToView({ embed, editions, sourceDetails }),
		);
	} else {
		return h(EmbedComponent, { embed, editions });
	}
};

// ----- Exports ----- //
export default EmbedComponentWrapper;

export {
	createEmbedComponentFromProps,
	EmbedComponentInClickToView,
	SourceDetails,
};
