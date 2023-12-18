import type { ArticleFormat } from '@guardian/libs';
import { submitComponentEvent } from '../client/ophan/ophan';
import { useConfig } from './ConfigContext';
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
	const { renderingTarget } = useConfig();

	return (
		<Container
			id={id}
			title={title}
			atomType="profile"
			atomTypeTitle="Profile"
			expandForStorybook={expandForStorybook}
			expandCallback={
				expandCallback ??
				(() =>
					submitComponentEvent(
						{
							component: {
								componentType: 'PROFILE_ATOM',
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
									componentType: 'PROFILE_ATOM',
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
									componentType: 'PROFILE_ATOM',
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
