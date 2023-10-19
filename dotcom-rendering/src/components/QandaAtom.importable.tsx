import { submitComponentEvent } from '../client/ophan/ophan';
import { Body } from './ExpandableAtom/Body';
import { Container } from './ExpandableAtom/Container';
import { Footer } from './ExpandableAtom/Footer';

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
}: QandaAtomProps): JSX.Element => (
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
				submitComponentEvent({
					component: {
						componentType: 'QANDA_ATOM',
						id,
						products: [],
						labels: [],
					},
					action: 'EXPAND',
				}))
		}
	>
		<Body html={html} image={image} credit={credit} format={format} />
		<Footer
			format={format}
			dislikeHandler={
				dislikeHandler ??
				(() =>
					submitComponentEvent({
						component: {
							componentType: 'QANDA_ATOM',
							id,
							products: [],
							labels: [],
						},
						action: 'DISLIKE',
					}))
			}
			likeHandler={
				likeHandler ??
				(() =>
					submitComponentEvent({
						component: {
							componentType: 'QANDA_ATOM',
							id,
							products: [],
							labels: [],
						},
						action: 'LIKE',
					}))
			}
		></Footer>
	</Container>
);
