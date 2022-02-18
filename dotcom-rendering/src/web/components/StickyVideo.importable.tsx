import { css } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import { getZIndex } from '../lib/getZIndex';
import { useStickyElementHeight } from '../lib/useStickyElementHeight';
import { useStickyElementMargin } from '../lib/useStickyElementMargin';
import { useStickyObserver } from '../lib/useStickyObserver';
import { StickyVideoButton } from './StickyVideoButton';

const stickyStyles = (right: number) => css`
	@keyframes fade-in-up {
		from {
			transform: translateY(100%);
			opacity: 0;
		}

		to {
			transform: translateY(0%);
			opacity: 1;
		}
	}

	position: fixed;
	right: ${right - 15}px;
	bottom: 20px;
	width: 300px;
	height: 169px;
	${getZIndex('sticky-video')};
	animation: fade-in-up 1s ease forwards;

	figcaption {
		display: none;
	}
`;

const containerStyles = (height: number) => css`
	height: ${height}px;
	position: relative;
`;

interface Props {
	isPlaying: boolean;
	children: React.ReactNode;
}

export const StickyVideo = ({ isPlaying, children }: Props) => {
	const heightRef = useRef<HTMLDivElement>(null);
	const marginRef = useRef<HTMLDivElement>(null);

	const [isSticky, setIsSticky] = useState(false);
	const [height] = useStickyElementHeight(heightRef);
	const [right] = useStickyElementMargin(marginRef);
	const [isIntersecting, setRef] = useStickyObserver({
		threshold: 0.1,
	});

	useEffect(() => {
		setIsSticky(isIntersecting && isPlaying);
	}, [isIntersecting, isPlaying]);

	return (
		<div css={containerStyles(height)} ref={marginRef}>
			<div ref={setRef}>
				<div ref={heightRef} css={isSticky && stickyStyles(right)}>
					{isPlaying && (
						<StickyVideoButton
							onClick={() => {
								setIsSticky(!isSticky);
							}}
							isSticky={isSticky}
						/>
					)}
					{children}
				</div>
			</div>
		</div>
	);
};
