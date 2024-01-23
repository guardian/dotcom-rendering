import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { from, space, until } from '@guardian/source-foundations';
import type { FEElement, RoleType } from '../types/content';

type Props = {
	children: React.ReactNode;
	format: ArticleFormat;
	isMainMedia: boolean;
	role?: RoleType | 'richLink';
	id?: string;
	className?: string;
	type?: FEElement['_type'];
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
		width: 8.75rem;
		margin-right: 20px;

		/*
		 Acts as until.mobileMedium but accounts for font scaling. On small screens and/or
		 at certain font sizes, the RichLink will change to a full width version
		*/
		@media (max-width: 23.4rem) {
			width: 100%;
			box-sizing: border-box;

			img,
			.avatar {
				display: none;
			}
		}

		${from.tablet} {
			width: 140px;
		}
		${from.leftCol} {
			position: absolute;
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
export const defaultRoleStyles = (
	role: RoleType | 'richLink',
	format: ArticleFormat,
) => {
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
			switch (format.design) {
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog:
					// In blogs we don't want to use negative left margins
					return css`
						${roleCss.thumbnail}
						/* It's important we use the media query here to ensure we override the default values */
						${from.leftCol} {
							margin-left: 0px;
						}
					`;
				default:
					return roleCss.thumbnail;
			}
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
	format,
	children,
	id,
	isMainMedia,
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

	return (
		<figure
			id={id}
			css={defaultRoleStyles(role, format)}
			data-spacefinder-role={role}
			data-spacefinder-type={type}
			className={className}
		>
			{children}
		</figure>
	);
};
