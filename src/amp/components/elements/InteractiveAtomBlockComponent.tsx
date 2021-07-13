import React from 'react';
import { ClassNames } from '@emotion/react';

import { ShowMoreButton } from '@root/src/amp/components/ShowMoreButton';

// We look in the html field of the atom for a hint for the height of the atom
// We look for an html comment <!-- MobileHeight: 100 --> and if we find it use
// that value for the CSS height of the atom otherwise we use a default height
//
// 150px default height is a fairly safe arbitrary number to avoid excessive
// whitespace but give top-of-page atoms the chance to avoid resizing (or at
// least show a good portion of the atom)

// const defaultInteractiveAtomHeight = 150;

export const InteractiveAtomBlockComponent: React.FunctionComponent<{
	url: string;
	html?: string;
	placeholderUrl?: string;
	height?: number;
}> = ({ url, placeholderUrl, html, height }) => {
	// On Dot Com, Interactive Atoms are sometimes used to modify the page
	// around them. CSS, JS but no HTML can exist in an atom, and because we just
	// add it to the page, it can modify the world around it.
	// We can't do that on AMP, so if the html field of an interactive atom is an
	// empty string then we just want to walk away from it.
	if (html === '') {
		return null;
	}
	console.log('height in InteractiveAtomBlockComponent: ', height);

	return (
		<ClassNames>
			{({ css }) => {
				const styles = css`
					height: ${height}px;
					width: 100%;
					margin-top: 16px;
					margin-bottom: 12px;
				`;

				const showMore = css`
					&[overflow] {
						position: absolute;
						bottom: 0;
						left: 0;
						right: 0;
					}
				`;

				return (
					<amp-iframe
						class={styles}
						src={url}
						layout="responsive"
						sandbox="allow-scripts allow-same-origin allow-top-navigation-by-user-activation allow-popups"
						height="1"
						width="1"
						resizable=""
						data-cy="atom-embed-url"
					>
						{placeholderUrl && (
							<amp-img
								placeholder={true}
								layout="fill"
								src={placeholderUrl}
							/>
						)}
						<div overflow="" className={showMore}>
							<ShowMoreButton />
						</div>
					</amp-iframe>
				);
			}}
		</ClassNames>
	);
};
