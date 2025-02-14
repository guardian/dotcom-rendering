import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { Figure } from './Figure';
import { RichLink } from './RichLink';

/** article URLs contain a part that looks like “2022/nov/25” */
const ARTICLE_URL = /\/\d{4}\/[a-z]{3}\/\d{2}\//;

type PreviewContent = {
	webTitle: string;
	fields: {
		thumbnail: string;
	};
};

const format = {
	theme: Pillar.News,
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
};

export const Preview = () => {
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [data, setData] = useState<PreviewContent | null>(null);

	useEffect(() => {
		document.addEventListener('visibilitychange', () => {
			if (document.visibilityState === 'hidden') {
				setData(null);
			}
		});
		const allAnchors = document.querySelectorAll(
			'a[data-link-name="in body link"]',
		);

		for (const anchor of allAnchors) {
			anchor.addEventListener('mouseenter', (e) => {
				const mouseEvent = e as MouseEvent;

				setPosition({ x: mouseEvent.x, y: mouseEvent.y });

				const articlePath = anchor
					.getAttribute('href')
					?.split('https://www.theguardian.com/')[1];

				const isArticle = ARTICLE_URL.test(articlePath ?? '');

				if (articlePath !== undefined && isArticle) {
					fetch('http://localhost:3030/Preview?url=' + articlePath)
						.then((res) => res.json())
						.then((responseData) => {
							// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument -- ToDo: parse the response
							setData(responseData.response.content);
						})
						.catch((err) => {
							console.error(err);
						});
				}
			});
			anchor.addEventListener('mouseleave', () => {
				setData(null);
			});
		}
	}, []);

	if (data === null) {
		return null;
	}

	const preview = css`
		position: fixed;
		top: ${position.y}px;
		left: ${position.x + 10}px;
		z-index: 1000;
	`;

	return (
		<div css={preview}>
			<Figure format={format} isMainMedia={false} role="richLink">
				<RichLink
					cardStyle="news"
					richLinkIndex={1}
					imageData={{
						thumbnailUrl: data.fields.thumbnail,
						altText: '',
						width: '500',
						height: '300',
					}}
					headlineText={data.webTitle}
					url=""
					linkFormat={format}
					tags={[]}
					sponsorName=""
					contentType="article"
					format={format}
				/>
			</Figure>
		</div>
	);
};
