import { ClassNames } from '@emotion/react';
import { ShowMoreButton } from './ShowMoreButton.amp';

// We look in the html field of the atom for a hint for the height of the atom
// We look for an html comment <!-- MobileHeight: 100 --> and if we find it use
// that value for the CSS height of the atom otherwise we use a default height
//
// 150px default height is a fairly safe arbitrary number to avoid excessive
// whitespace but give top-of-page atoms the chance to avoid resizing (or at
// least show a good portion of the atom)

const defaultInteractiveAtomHeight = 150;

// Using the MobileHeight comment is ok (lets be very aware we're creating a
// loosely-defined contract between interactive atoms and AMP here, that should
// really be in CAPI)

const heightRegex = /<!-- MobileHeight: (.*) -->/;

//  The value of <!-- MobileHeight: value --> should be the height of an
//  interactive atom at the widest mobile breakpoint to give a guesstimate to
//  AMP for a reasonable height
//
// It should only be used on interactive atoms that are at the top of articles,
// as it only matters when the bottom of the interactive atom is within the
// viewport (otherwise AMP will auto-resize)
//
// Placeholder images must always exist for atoms that require using the
// MobileHeight comment, otherwise the atom will not show on AMP
//
// Full page interactives should always have both

const getHeight = (html?: string): number => {
	if (html) {
		const getHeightFromComment = heightRegex.exec(html);
		if (
			getHeightFromComment &&
			typeof Number(getHeightFromComment[1]) === 'number'
		) {
			return Number(getHeightFromComment[1]); // Returns [ '<!-- MobileHeight: 100 -->', '100', index: 4, input: 'test<!-- MobileHeight: 100 -->', groups: undefined ]
		}
	}

	return defaultInteractiveAtomHeight;
};

type Props = {
	url: string;
	html?: string;
	placeholderUrl?: string;
};

export const InteractiveAtomBlockComponent = ({
	url,
	placeholderUrl,
	html,
}: Props) => {
	// On Dot Com, Interactive Atoms are sometimes used to modify the page
	// around them. CSS, JS but no HTML can exist in an atom, and because we just
	// add it to the page, it can modify the world around it.
	// We can't do that on AMP, so if the html field of an interactive atom is an
	// empty string then we just want to walk away from it.
	if (html === '') {
		return null;
	}

	return (
		<ClassNames>
			{({ css }) => {
				const styles = (height: number) => css`
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
						class={styles(getHeight(html))}
						src={url}
						layout="responsive"
						sandbox="allow-scripts allow-same-origin allow-top-navigation-by-user-activation allow-popups"
						height="1"
						width="1"
						resizable=""
						data-testid="atom-embed-url"
					>
						{!!placeholderUrl && (
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
