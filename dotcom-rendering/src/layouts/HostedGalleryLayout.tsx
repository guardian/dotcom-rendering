import { RenderingTarget } from 'src/types/renderingTarget';

interface Props {
	renderingTarget: RenderingTarget;
}

interface WebProps extends Props {
	renderingTarget: 'Web';
}

interface AppProps extends Props {
	renderingTarget: 'Apps';
}

export const HostedGalleryLayout = (props: WebProps | AppProps) => {
	return <div>Hosted gallery</div>;
};
