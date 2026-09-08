import { css } from '@emotion/react';
import {
	space,
	textSans14,
	textSansBold14,
} from '@guardian/source/foundations';
import { useEffect, useRef } from 'react';
import type { PuzzleItem } from '../types/puzzlesPage';

type Props = {
	archives: PuzzleItem[];
};

const getArchiveUrl = (item: PuzzleItem): string | undefined => {
	if (item.variant === 'archive-page' && item.slug) {
		return `/puzzles/${item.slug}/archive`;
	}
	if (
		item?.url?.startsWith('/puzzles') ||
		/^https?:\/\//.test(item.url ?? '')
	) {
		return item.url;
	}
	return undefined;
};

const wrapperStyles = css`
	position: relative;
	display: inline-block;
	margin-top: ${space[3]}px;
`;

const summaryStyles = css`
	display: inline-flex;
	min-height: 32px;
	align-items: center;
	gap: ${space[2]}px;
	padding: 0 ${space[2]}px;
	border: 1px solid #121212;
	border-radius: 18px;
	background: #ffffff;
	color: #121212;
	cursor: pointer;
	list-style: none;
	${textSansBold14};

	::-webkit-details-marker {
		display: none;
	}

	:focus-visible {
		outline: 3px solid #0077b6;
		outline-offset: 2px;
	}
`;

const menuStyles = css`
	position: absolute;
	z-index: 20;
	top: calc(100% + ${space[1]}px);
	left: 0;
	min-width: 220px;
	margin: 0;
	padding: ${space[1]}px 0;
	border: 1px solid #707070;
	background: #ffffff;
	box-shadow: 0 2px 8px rgb(0 0 0 / 20%);
	list-style: none;
`;

const linkStyles = css`
	display: block;
	padding: ${space[2]}px ${space[3]}px;
	color: #121212;
	text-decoration: none;
	${textSans14};

	:hover,
	:focus-visible {
		background: #e5e5e5;
		text-decoration: underline;
	}
`;

export const PuzzlesArchiveMenu = ({ archives }: Props) => {
	const detailsRef = useRef<HTMLDetailsElement>(null);
	const summaryRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const close = (event: MouseEvent | KeyboardEvent) => {
			if (!detailsRef.current?.open) return;
			if (event instanceof KeyboardEvent && event.key !== 'Escape') {
				return;
			}
			if (
				event instanceof MouseEvent &&
				detailsRef.current?.contains(event.target as Node)
			) {
				return;
			}
			if (detailsRef.current) detailsRef.current.open = false;
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
		return url ? [{ archive, url }] : [];
	});
	if (validArchives.length < 2) return null;

	return (
		<details css={wrapperStyles} ref={detailsRef}>
			<summary css={summaryStyles} ref={summaryRef}>
				Puzzle archives <span aria-hidden="true">⌄</span>
			</summary>
			<ul aria-label="Puzzle archives" css={menuStyles}>
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
