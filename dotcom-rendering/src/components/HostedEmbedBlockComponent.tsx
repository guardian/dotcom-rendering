import { parseHtml } from '../lib/domUtils';

type Props = {
	html: string;
	alt: string;
	height?: number;
	width?: number;
};

const getIframeDimension = (
	iframe: HTMLIFrameElement | null,
	attr: 'height' | 'width',
): number | undefined => {
	const attrValue = iframe?.getAttribute(attr);
	const styleValue = iframe?.style[attr];
	return parseInt(attrValue ?? styleValue ?? '', 10) || undefined;
};

export const HostedEmbedBlockComponent = ({
	html,
	alt,
	height: heightProp,
	width: widthProp,
}: Props) => {
	const iframe = parseHtml(html).querySelector<HTMLIFrameElement>('iframe');

	const height = heightProp ?? getIframeDimension(iframe, 'height');
	const width = widthProp ?? getIframeDimension(iframe, 'width');

	if (height === undefined) return null;

	return (
		<iframe
			title={alt}
			srcDoc={html}
			width={width ?? '100%'}
			height={height}
		/>
	);
};
