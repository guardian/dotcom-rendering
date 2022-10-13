/**
 * Generates a URL for calling the Fastly Image Optimiser.
 *
 * @see https://developer.fastly.com/reference/io/
 * @see https://github.com/guardian/fastly-image-service/blob/main/fastly-io_guim_co_uk/src/main/resources/varnish/main.vcl
 *
 */
export const generateImageURL = ({
	master,
	imageWidth,
	resolution,
}: {
	master: string;
	imageWidth: number;
	resolution: 'low' | 'high';
}): string => {
	const url = new URL(master);
	const [service] = url.hostname.split('.');

	const params = new URLSearchParams({
		width: imageWidth.toString(),
		// Why 45 and 85?
		// This numbers have been picked in 2018 as the right
		// balance between image fidelity and file size
		// https://github.com/guardian/fastly-image-service/pull/35
		...(resolution === 'high'
			? { quality: '45', dpr: '2' }
			: { quality: '85', dpr: '1' }),
		s: 'none',
	});

	return `https://i.guim.co.uk/img/${service}${
		url.pathname
	}?${params.toString()}`;
};
