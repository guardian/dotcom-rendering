import { useEffect, useRef, useState } from 'react';

type Props = { styles: string; html: string; js: string };

export const SecureSignupIframe = ({ styles, html, js }: Props) => {
	const iframeRef = useRef<HTMLIFrameElement>(null);

	const [iframeHeight, setIFrameHeight] = useState<number | undefined>(
		undefined,
	);

	useEffect(() => {
		const { current: iframe } = iframeRef;
		if (!iframe || !iframe.contentDocument) {
			return;
		}
		const iframeDocument = iframe.contentDocument;

		const handleClickInIFrame = (event: Event) => {
			console.log(event);
			event.preventDefault();
			setIFrameHeight(500);
		};

		const button = iframeDocument.querySelector('button');
		button?.addEventListener('click', handleClickInIFrame);
	}, []);

	const srcDoc = `
	<html>
		<head>
			${styles}
		</head>
		<body style="margin: 0;">${html}</body>
		<script>
		${js}
		</script>
	</html>`;

	return (
		<>
			<iframe
				ref={iframeRef}
				srcDoc={srcDoc}
				style={{ height: iframeHeight }}
			/>
		</>
	);
};
