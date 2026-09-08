import { css } from '@emotion/react';
import { from, palette, space, textSans14 } from '@guardian/source/foundations';
import { useEffect, useRef } from 'react';
import type { PuzzleItem } from '../types/puzzlesPage';

type Props = {
	archives: PuzzleItem[];
	label?: string;
};

const getArchiveUrl = (item: PuzzleItem): string | undefined => {
	const slug = item.slug;
	if (
		item.variant === 'archive-page' &&
		slug !== undefined &&
		slug.length > 0
	) {
		return `/puzzles/${slug}/archive`;
	}
	const url = item.url;
	if (
		url !== undefined &&
		(url.startsWith('/puzzles') || /^https?:\/\//.test(url))
	) {
		return url;
	}
	return undefined;
};

const wrapperStyles = css`
	position: relative;
	display: block;
	width: max-content;
	margin-top: ${space[1]}px;
	margin-left: auto;

	${from.tablet} {
		margin-left: 0;
	}

	&[open] .archive-arrow {
		transform: rotate(90deg);
	}
`;

const summaryStyles = css`
	display: inline-flex;
	min-height: 44px;
	align-items: center;
	gap: ${space[2]}px;
	padding: 0;
	border: 0;
	background: ${palette.neutral[100]};
	color: ${palette.neutral[7]};
	cursor: pointer;
	list-style: none;
	${textSans14};

	::-webkit-details-marker {
		display: none;
	}

	:focus-visible {
		outline: none;
		text-decoration: underline;
		text-decoration-thickness: 2px;
	}
`;

const arrowStyles = css`
	display: inline-block;
	transition: transform 0.1s ease-out;
`;

const menuStyles = css`
	position: absolute;
	z-index: 20;
	top: calc(100% + ${space[1]}px);
	left: 0;
	min-width: 256px;
	margin: 0;
	padding: 0;
	border: 1px solid ${palette.neutral[86]};
	background: ${palette.neutral[100]};
	list-style: none;
`;

const linkStyles = css`
	display: flex;
	min-height: 60px;
	align-items: center;
	padding: 0 ${space[5]}px;
	border-bottom: 1px solid ${palette.neutral[86]};
	color: ${palette.neutral[7]};
	text-decoration: none;
	${textSans14};

	:hover,
	:focus-visible {
		background: ${palette.neutral[93]};
		text-decoration: underline;
	}

	li:last-child & {
		border-bottom: 0;
	}
`;

export const PuzzlesArchiveMenu = ({
	archives,
	label = 'Puzzle archives',
}: Props) => {
	const detailsRef = useRef<HTMLDetailsElement>(null);
	const summaryRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const close = (event: MouseEvent | KeyboardEvent) => {
			const details = detailsRef.current;
			if (details?.open !== true) {
				return;
			}
			if (event instanceof KeyboardEvent && event.key !== 'Escape') {
				return;
			}
			if (
				event instanceof MouseEvent &&
				details.contains(event.target as Node)
			) {
				return;
			}
			details.open = false;
			if (event instanceof KeyboardEvent) summaryRef.current?.focus();
		};
		document.addEventListener('mousedown', close);
		document.addEventListener('keydown', close);
		return () => {
			document.removeEventListener('mousedown', close);
			document.removeEventListener('keydown', close);
		};
	}, []);

	const validArchives = archives.flatMap((archive) => {
		const url = getArchiveUrl(archive);
		return url !== undefined ? [{ archive, url }] : [];
	});
	if (validArchives.length < 2) {
		return null;
	}

	return (
		<details css={wrapperStyles} ref={detailsRef}>
			<summary css={summaryStyles} ref={summaryRef}>
				{label}{' '}
				<span
					aria-hidden="true"
					className="archive-arrow"
					css={arrowStyles}
				>
					{'>'}
				</span>
			</summary>
			<ul aria-label={label} css={menuStyles}>
				{validArchives.map(({ archive, url }) => (
					<li key={archive.id}>
						<a
							css={linkStyles}
							href={url}
							{...(/^https?:\/\//.test(url)
								? {
										rel: 'noopener noreferrer',
										target: '_blank',
									}
								: {})}
						>
							{archive.title}
						</a>
					</li>
				))}
			</ul>
		</details>
	);
};
