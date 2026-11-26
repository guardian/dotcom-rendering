import type {
	HTMLAttributes,
	FocusEvent as ReactFocusEvent,
	RefObject,
} from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

type SuccessDismissal = Pick<
	HTMLAttributes<HTMLElement>,
	'onMouseEnter' | 'onMouseLeave' | 'onFocusCapture' | 'onBlurCapture'
> & {
	isDismissing: boolean;
	dismiss: () => void;
};

export const useSuccessDismissal = ({
	isSuccess,
	bannerRef,
	onClose,
	durationMs,
}: {
	isSuccess: boolean;
	bannerRef: RefObject<HTMLElement>;
	onClose: (() => void) | undefined;
	durationMs: number;
}): SuccessDismissal => {
	const [isDismissing, setIsDismissing] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [isFocused, setIsFocused] = useState(false);
	const remainingMs = useRef(7000);
	const closeRef = useRef(onClose);

	useEffect(() => {
		closeRef.current = onClose;
	}, [onClose]);

	const dismiss = useCallback(() => setIsDismissing(true), []);

	useEffect(() => {
		if (!isSuccess || isDismissing || isHovered || isFocused) return;
		const startedAt = Date.now();
		const timeout = window.setTimeout(dismiss, remainingMs.current);
		return () => {
			window.clearTimeout(timeout);
			remainingMs.current = Math.max(
				0,
				remainingMs.current - (Date.now() - startedAt),
			);
		};
	}, [dismiss, isSuccess, isDismissing, isHovered, isFocused]);

	useEffect(() => {
		if (!isSuccess || isDismissing) return;
		const handleScroll = (event: Event) => {
			if (
				event.target instanceof Node &&
				bannerRef.current?.contains(event.target) === true
			) {
				return;
			}
			dismiss();
		};
		window.addEventListener('scroll', handleScroll, true);
		return () => window.removeEventListener('scroll', handleScroll, true);
	}, [bannerRef, dismiss, isSuccess, isDismissing]);

	useEffect(() => {
		if (!isDismissing) return;
		const reducedMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)',
		).matches;
		const timeout = window.setTimeout(
			() => closeRef.current?.(),
			reducedMotion ? 0 : durationMs,
		);
		return () => window.clearTimeout(timeout);
	}, [durationMs, isDismissing]);

	return {
		isDismissing,
		dismiss,
		onMouseEnter: () => setIsHovered(true),
		onMouseLeave: () => setIsHovered(false),
		onFocusCapture: (event: ReactFocusEvent<HTMLElement>) =>
			setIsFocused(event.target !== event.currentTarget),
		onBlurCapture: (event: ReactFocusEvent<HTMLElement>) =>
			setIsFocused(event.currentTarget.contains(event.relatedTarget)),
	};
};
