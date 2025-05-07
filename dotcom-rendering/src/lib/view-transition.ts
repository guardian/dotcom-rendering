import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { SHA256 } from 'crypto-js';

function sha256Hash(message: string) {
	return SHA256(message).toString();
}

export const viewTransitionStyles = (
	prefix: string,
	stringToHash: string | undefined,
): SerializedStyles => {
	const name = `${prefix}-${sha256Hash(
		stringToHash ?? global.crypto.randomUUID(),
	)}`;
	return css`
		view-transition-name: ${name};
	`;
};
