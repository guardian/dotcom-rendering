/**
 * Takes a base64 string and converts it to a [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob).
 *
 * @param base64 Base64 string to convert to a Blob.
 * @param contentType Optional content type for the Blob.
 * @returns Blob
 */
export function base64ToBlob(base64: string, contentType = ''): Blob {
	const buffer = Buffer.from(base64, 'base64');
	const byteArrays = [];

	for (let i = 0; i < buffer.length; i += 512) {
		const slice = buffer.subarray(i, i + 512);
		byteArrays.push(slice);
	}

	const blob = new Blob(byteArrays, { type: contentType });
	return blob;
}
