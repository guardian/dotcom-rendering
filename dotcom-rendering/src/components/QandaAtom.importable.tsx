import { submitComponentEvent } from '../client/ophan/ophan';
import { Body } from './ExpandableAtom/Body';
import { Container } from './ExpandableAtom/Container';
import { Footer } from './ExpandableAtom/Footer';
import { useConfig } from './ConfigContext';

export type QandaAtomProps = {
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
export const QandaAtom = ({
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
}: QandaAtomProps): JSX.Element => {
	const { renderingTarget } = useConfig();

	return (
		<Container
			id={id}
			title={title}
			atomType="qanda"
			atomTypeTitle="Q&A"
			format={format}
			expandForStorybook={expandForStorybook}
			expandCallback={
				expandCallback ??
				(() =>
					submitComponentEvent(
						{
							component: {
								componentType: 'QANDA_ATOM',
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
			<Body html={html} image={image} credit={credit} format={format} />
			<Footer
				format={format}
				dislikeHandler={
					dislikeHandler ??
					(() =>
						submitComponentEvent(
							{
								component: {
									componentType: 'QANDA_ATOM',
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
									componentType: 'QANDA_ATOM',
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
