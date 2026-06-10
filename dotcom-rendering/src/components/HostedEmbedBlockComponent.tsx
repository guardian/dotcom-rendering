import { parseHtml } from '../lib/domUtils';

type Props = {
	html: string;
	alt: string;
	width?: number;
	height?: number;
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
	width: widthProp,
	height: heightProp,
}: Props) => {
	const iframeFromEmbed =
		parseHtml(html).querySelector<HTMLIFrameElement>('iframe');

	const height = heightProp ?? getIframeDimension(iframeFromEmbed, 'height');
	const width = widthProp ?? getIframeDimension(iframeFromEmbed, 'width');

	return (
		<iframe
			title={alt}
			srcDoc={html}
			width={width ?? '100%'}
			height={height ?? '349px'}
		/>
	);
};
