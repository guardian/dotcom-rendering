import { css } from '@emotion/react';
import { ArticleDisplay } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import { neutral, remSpace, textSans } from '@guardian/source-foundations';
import { OptionKind } from '@guardian/types';
import type { Option } from '@guardian/types';
import { Caption } from 'components/caption';
import type { Item } from 'item';
import { MainMediaKind } from 'mainMedia';
import type { MainMedia } from 'mainMedia';
import type { FC, ReactElement } from 'react';

interface Props {
	item: Item;
}

const captionHeadingStyles = css`
	${textSans.xsmall()}
	color: ${neutral[46]};
	margin: 0 0 ${remSpace[4]};
	margin-top: ${remSpace[4]};
	display: block;
`;

const buildCaption = (
	cap: Option<DocumentFragment>,
	format: ArticleFormat,
	credit: Option<string>,
): ReactElement | null => {
	if (cap.kind === OptionKind.Some && credit.kind === OptionKind.Some) {
		return (
			<p css={captionHeadingStyles}>
				<Caption caption={cap.value} format={format} /> {credit.value}
			</p>
		);
	} else if (
		cap.kind === OptionKind.Some &&
		credit.kind === OptionKind.None
	) {
		return (
			<p css={captionHeadingStyles}>
				<Caption caption={cap.value} format={format} />
			</p>
		);
	} else if (
		cap.kind === OptionKind.None &&
		credit.kind === OptionKind.Some
	) {
		return <p css={captionHeadingStyles}>{credit.value}</p>;
	}
	return null;
};

const caption =
	(format: ArticleFormat) =>
	(mainmedia: MainMedia): ReactElement | null => {
		switch (mainmedia.kind) {
			case MainMediaKind.Image:
				return buildCaption(
					mainmedia.image.caption,
					format,
					mainmedia.image.credit,
				);
			case MainMediaKind.Video:
			default:
				return null;
		}
	};

const ImmersiveCaption: FC<Props> = (props) => {
	if (props.item.display === ArticleDisplay.Immersive) {
		switch (props.item.mainMedia.kind) {
			case OptionKind.Some:
				return caption(props.item)(props.item.mainMedia.value);
			case OptionKind.None:
			default:
				return null;
		}
	}
	return null;
};

export default ImmersiveCaption;
