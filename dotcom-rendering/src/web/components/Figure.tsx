import { css } from '@emotion/react';

import { from, until, space } from '@guardian/source-foundations';

type Props = {
	children: React.ReactNode;
	isMainMedia: boolean;
	role?: RoleType | 'richLink';
	id?: string;
	isNumberedListTitle?: boolean;
	className?: string;
	type?: CAPIElement['_type'];
};

const roleCss = {
	inline: css`
		margin-top: ${space[3]}px;
		margin-bottom: ${space[3]}px;
	`,

	supporting: css`
		clear: left;
		margin-top: ${space[3]}px;
		margin-bottom: ${space[3]}px;
		${from.tablet} {
			position: relative;
			float: left;
			width: 300px;
			margin-right: 20px;
			line-height: 0;
			margin-top: ${space[2]}px;
		}
		${from.leftCol} {
			margin-left: -160px;
		}
		${from.wide} {
			width: 380px;
			margin-left: -240px;
		}
	`,

	immersive: css`
		margin-top: ${space[3]}px;
		margin-bottom: ${space[3]}px;
		${until.tablet} {
			margin-left: -20px;
			margin-right: -20px;
		}
		${until.mobileLandscape} {
			margin-left: -10px;
			margin-right: -10px;
		}
		${from.tablet} {
			margin-left: -20px;
			margin-right: -100px;
		}
		${from.desktop} {
			margin-left: -20px;
			margin-right: -340px;
		}
		${from.leftCol} {
			margin-left: -160px;
			margin-right: -320px;
		}
		${from.wide} {
			margin-left: -240px;
			margin-right: -400px;
		}
	`,

	showcase: css`
		margin-top: ${space[3]}px;
		margin-bottom: ${space[3]}px;
		position: relative;
		${from.leftCol} {
			margin-left: -160px;
		}
		${from.wide} {
			margin-left: -240px;
		}
	`,

	thumbnail: css`
		margin-top: ${space[2]}px;
		margin-bottom: ${space[2]}px;
		float: left;
		clear: left;
		width: 120px;
		margin-right: 20px;
		${from.tablet} {
			width: 140px;
		}
		${from.wide} {
			margin-left: -240px;
		}
		${from.leftCol} {
			position: relative;
			margin-left: -160px;
		}
	`,

	// This is a special use case where we want RichLinks to appear wider when in the left col
	richLink: css`
		margin-bottom: ${space[1]}px;
		float: left;
		clear: left;
		width: 140px;
		margin-right: 20px;
		${from.tablet} {
			width: 140px;
		}
		${from.leftCol} {
			position: relative;
			margin-left: -160px;
			width: 140px;
		}
		${from.wide} {
			margin-left: -240px;
			width: 220px;
		}
	`,

	halfWidth: css`
		margin-top: ${space[3]}px;
		margin-bottom: ${space[3]}px;
		width: 50%;
		float: left;
		clear: left;
		margin-right: 16px;
	`,
};

// Used for vast majority of layouts.
export const defaultRoleStyles = (role: RoleType | 'richLink') => {
	switch (role) {
		case 'inline':
			return roleCss.inline;
		case 'supporting':
			return roleCss.supporting;
		case 'immersive':
			return roleCss.immersive;
		case 'showcase':
			return roleCss.showcase;
		case 'thumbnail':
			return roleCss.thumbnail;
		case 'richLink':
			return roleCss.richLink;
		case 'halfWidth':
			return roleCss.halfWidth;
		default:
			return roleCss.inline;
	}
};

const mainMediaFigureStyles = css`
	height: 100%;
`;

export const Figure = ({
	role = 'inline',
	children,
	id,
	isMainMedia,
	isNumberedListTitle = false,
	className = '',
	type,
}: Props) => {
	if (isMainMedia) {
		// Don't add in-body styles for main media elements
		// TODO: If we want to support other element types having role position, such
		// as showcase twitter embeds, then we should remove the role positioning which
		// currently lives in ImageComponent and hoist it up to here, the same as we're
		// doing using decidePosition for in-body elements
		return (
			<figure id={id} key={id} css={mainMediaFigureStyles}>
				{children}
			</figure>
		);
	}

	// TODO: isNumberedListTitle is not used
	// TODO: Any usage of data-spacefinder-component can be replaced with data-spacefinder-type
	//       Once this has been done we can remove this attribute
	// See 001-commercial-selectors.md for details on `data-spacefinder-component`
	let spacefinderComponent: 'rich-link' | 'numbered-list-title' | undefined;
	if (role === 'richLink') {
		spacefinderComponent = 'rich-link';
	} else if (isNumberedListTitle) {
		spacefinderComponent = 'numbered-list-title';
	}

	return (
		<figure
			id={id}
			css={defaultRoleStyles(role)}
			data-spacefinder-component={spacefinderComponent}
			data-spacefinder-role={role}
			data-spacefinder-type={type}
			className={className}
		>
			{children}
		</figure>
	);
};
