// ----- Imports ----- //

import { css } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
import HeaderImageCaption, { captionId } from 'components/headerImageCaption';
import Img from 'components/img';
import { MainMediaKind } from 'headerMedia';
import type { Item } from 'item';
import { maybeRender } from 'lib';
import type { FC } from 'react';

// ----- Component ----- //

const styles = css`
	margin: 0 0 ${remSpace[2]} 0;
	position: relative;
`;

const imgStyles = css`
	display: block;
	width: 100%;
`;

interface Props {
	item: Item;
}

const HeaderImage: FC<Props> = ({ item }) =>
	maybeRender(item.mainMedia, (media) => {
		if (media.kind === MainMediaKind.Image) {
			const {
				image,
				image: { nativeCaption, credit },
			} = media;
			return (
				<figure css={styles} aria-labelledby={captionId}>
					<Img
						image={image}
						sizes={`calc(100vw - (${remSpace[4]} * 2)`}
						format={item}
						className={imgStyles}
					/>
					<HeaderImageCaption
						caption={nativeCaption}
						credit={credit}
					/>
				</figure>
			);
		}

		return null;
	});

// ----- Exports ----- //

export default HeaderImage;
