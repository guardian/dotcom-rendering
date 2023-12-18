import type { ArticleFormat } from '@guardian/libs';
import { submitComponentEvent } from '../../client/ophan/ophan';
import { useConfig } from '../ConfigContext';
import { Body } from '../ExpandableAtom/Body';
import { Container } from '../ExpandableAtom/Container';
import { Footer } from '../ExpandableAtom/Footer';

export type GuideAtomProps = {
	id: string;
	title: string;
	image?: string;
	html: string;
	credit?: string;
	format: ArticleFormat;
	expandForStorybook?: boolean;
	likeHandler?: () => void;
	dislikeHandler?: () => void;
	expandCallback?: () => void;
};

export const GuideAtom = ({
	id,
	title,
	image,
	html,
	credit,
	format,
	expandForStorybook,
	likeHandler,
	dislikeHandler,
	expandCallback,
}: GuideAtomProps): JSX.Element => {
	const { renderingTarget } = useConfig();

	return (
		<Container
			id={id}
			title={title}
			atomType="guide"
			atomTypeTitle="Quick Guide"
			expandForStorybook={expandForStorybook}
			expandCallback={
				expandCallback ??
				(() =>
					submitComponentEvent(
						{
							component: {
								componentType: 'GUIDE_ATOM',
								id,
								products: [],
								labels: [],
							},
							action: 'EXPAND',
						},
						renderingTarget,
					))
			}
		>
			<Body html={html} image={image} credit={credit} />
			<Footer
				format={format}
				dislikeHandler={
					dislikeHandler ??
					(() =>
						submitComponentEvent(
							{
								component: {
									componentType: 'GUIDE_ATOM',
									id,
									products: [],
									labels: [],
								},
								action: 'DISLIKE',
							},
							renderingTarget,
						))
				}
				likeHandler={
					likeHandler ??
					(() =>
						submitComponentEvent(
							{
								component: {
									componentType: 'GUIDE_ATOM',
									id,
									products: [],
									labels: [],
								},
								action: 'LIKE',
							},
							renderingTarget,
						))
				}
			></Footer>
		</Container>
	);
};
