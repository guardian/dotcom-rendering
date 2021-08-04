import React from 'react';

import { useAdBlockInUse } from '@root/src/web/lib/useAdBlockInUse';

type Props = {
	children: React.ReactNode;
};

/**
 * @description
 * WhenAdBlockInUse will render children if it detects that an ad blocker
 * is being used. It uses useAdBlockInUse which is a function that performs
 * detection checks and returns a promise.
 *
 * Sure, you could just use this custom hook directly but sometimes code is easier
 * to read and undertand when conditional rendering is done using composition
 *
 * @param {ReactNode} children - What gets rendered if an ad blocker is in use
 * */
export const WhenAdBlockInUse = ({ children }: Props) => {
	const adBlockerDetected = useAdBlockInUse();

	return adBlockerDetected ? <>{children}</> : null;
};
