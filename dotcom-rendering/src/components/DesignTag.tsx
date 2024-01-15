import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { headline, space, until } from '@guardian/source-foundations';
import { LinkButton } from '@guardian/source-react-components';
import { palette } from '../palette';

const tagStyles = css`
	background-color: ${palette('--design-tag-background')};
	color: ${palette('--design-tag-text')};
	display: inline-block;
	padding: 2px 0 4px 0;
	${headline.xxsmall({ fontWeight: 'bold' })}
	line-height: 115%;
	box-shadow:
		6px 0 0 ${palette('--design-tag-background')},
		-6px 0 0 ${palette('--design-tag-background')};
	box-decoration-break: clone;
	${until.tablet} {
		${headline.xxxsmall({ fontWeight: 'bold' })}
	}
`;

const Margins = ({
	children,
	format,
}: {
	children: React.ReactNode;
	format: ArticleFormat;
}) => {
	switch (format.design) {
		case ArticleDesign.Interview:
			return (
				<div
					css={css`
						margin-left: 6px;
						margin-top: ${space[1]}px;
					`}
				>
					{children}
				</div>
			);
		default:
			return (
				<div
					css={css`
						margin-left: 6px;
						margin-top: 5px;
						${until.tablet} {
							margin-top: ${space[2]}px;
							margin-bottom: ${space[1]}px;
						}
					`}
				>
					{children}
				</div>
			);
	}
};

const Tag = ({ children }: { children: React.ReactNode }) => (
	<div css={tagStyles}>{children}</div>
);

const TagLink = ({
	children,
	href,
}: {
	children: React.ReactNode;
	href: string;
}) => {
	return (
		<LinkButton
			priority="subdued"
			href={href}
			cssOverrides={css`
				/* The following styles turn off those provided by LinkButton */
				color: inherit;
				text-decoration: none;
				text-underline-offset: inherit;
				/* stylelint-disable-next-line property-disallowed-list */
				font-family: inherit;
				font-size: inherit;
				line-height: inherit;

				:hover {
					color: inherit;
					text-decoration: underline;
				}
				min-height: initial;
				height: initial;
			`}
		>
			{children}
		</LinkButton>
	);
};

export const DesignTag = ({ format }: { format: ArticleFormat }) => {
	switch (format.design) {
		case ArticleDesign.Analysis:
			return (
				<Margins format={format}>
					<Tag>
						<TagLink href="/tone/analysis">Analysis</TagLink>
					</Tag>
				</Margins>
			);
		case ArticleDesign.Explainer:
			return (
				<Margins format={format}>
					<Tag>
						<TagLink href="/tone/explainers">Explainer</TagLink>
					</Tag>
				</Margins>
			);
		case ArticleDesign.Interview:
			return (
				<Margins format={format}>
					<Tag>
						<TagLink href="/tone/interview">Interview</TagLink>
					</Tag>
				</Margins>
			);
		case ArticleDesign.Letter:
			return (
				<Margins format={format}>
					<Tag>
						<TagLink href="/tone/letters">Letters</TagLink>
					</Tag>
				</Margins>
			);
		case ArticleDesign.Obituary:
			return (
				<Margins format={format}>
					<Tag>
						<TagLink href="/tone/obituaries">Obituary</TagLink>
					</Tag>
				</Margins>
			);
		case ArticleDesign.Review:
			return (
				<Margins format={format}>
					<Tag>
						<TagLink href="/tone/reviews">Review</TagLink>
					</Tag>
				</Margins>
			);
		case ArticleDesign.Timeline:
			return (
				<Margins format={format}>
					<Tag>
						<TagLink href="/tone/timelines">Timeline</TagLink>
					</Tag>
				</Margins>
			);
		case ArticleDesign.Profile:
			return (
				<Margins format={format}>
					<Tag>
						<TagLink href="/tone/profiles">Profile</TagLink>
					</Tag>
				</Margins>
			);
		default:
			return null;
	}
};
