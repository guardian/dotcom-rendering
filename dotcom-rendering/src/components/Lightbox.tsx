import type { ArticleFormat } from '../lib/articleFormat';
import type { ImageForAppsLightbox } from '../model/appsLightboxImages';
import type { Switches } from '../types/config';
import type { ImageForLightbox } from '../types/content';
import type { RenderingTarget } from '../types/renderingTarget';
import { AppsLightboxImageStore } from './AppsLightboxImageStore.importable';
import { Island } from './Island';
import { LightboxHash } from './LightboxHash.importable';
import { LightboxLayout } from './LightboxLayout.importable';
import { TagType } from '../types/tag';

interface BaseProps {
	format: ArticleFormat;
	renderingTarget: RenderingTarget;
	switches: Switches;
	path: string;
	tags: TagType[]
}

interface WebProps extends BaseProps {
	renderingTarget: 'Web';
	lightboxImages: ImageForLightbox[];
}

interface AppProps extends BaseProps {
	renderingTarget: 'Apps';
	lightboxImages: ImageForAppsLightbox[];
}

export const Lightbox = ({
	format,
	lightboxImages,
	renderingTarget,
	switches,
	path,
	tags
}: WebProps | AppProps) => {
	switch (renderingTarget) {
		case 'Web':
			if (
				switches.lightbox === undefined ||
				!switches.lightbox ||
				lightboxImages.length === 0
			) {
				return null;
			}

			return (
				<>
					<Island priority="feature" defer={{ until: 'hash' }}>
						<LightboxLayout
							format={format}
							images={lightboxImages}
							path={path}
							tags={tags}
						/>
					</Island>
					<Island priority="feature" defer={{ until: 'idle' }}>
						<LightboxHash />
					</Island>
				</>
			);
		case 'Apps':
			return (
				<Island priority="feature" defer={{ until: 'idle' }}>
					<AppsLightboxImageStore images={lightboxImages} />
				</Island>
			);
	}
};
