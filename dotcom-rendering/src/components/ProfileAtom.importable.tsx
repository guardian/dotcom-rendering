import type { ArticleFormat } from '@guardian/libs';
import { submitComponentEvent } from '../client/ophan/ophan';
import { Body } from './ExpandableAtom/Body';
import { Container } from './ExpandableAtom/Container';
import { Footer } from './ExpandableAtom/Footer';

export interface ProfileAtomProps {
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
}
export const ProfileAtom = ({
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
}: ProfileAtomProps) => {
	return (
		<Container
			id={id}
			title={title}
			format={format}
			atomType="profile"
			atomTypeTitle="Profile"
			expandForStorybook={expandForStorybook}
			expandCallback={
				expandCallback ??
				(() =>
					submitComponentEvent({
						component: {
							componentType: 'PROFILE_ATOM',
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
								componentType: 'PROFILE_ATOM',
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
								componentType: 'PROFILE_ATOM',
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
};
