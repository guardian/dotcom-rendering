import { css } from '@emotion/react';
import { isString, Pillar, timeAgo } from '@guardian/libs';
import {
	brandBackground,
	brandBorder,
	palette,
} from '@guardian/source-foundations';
import type { RequestHandler } from 'express';
import type QueryString from 'qs';
import { ConfigProvider } from '../components/ConfigContext';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Island } from '../components/Island';
import { RelativeTime } from '../components/RelativeTime.importable';
import { Section } from '../components/Section';
import { generateScriptTags, getPathFromManifest } from '../lib/assets';
import { renderToStringWithEmotion } from '../lib/emotion';
import { polyfillIO } from '../lib/polyfill.io';
import { createGuardian } from '../model/guardian';
import { htmlPageTemplate } from './htmlPageTemplate';
import { makePrefetchHeader } from './lib/header';

export const HydrationLayout = ({
	manipulation,
	count,
}: {
	count: number;
	manipulation: 'preact' | 'dom';
}) => {
	const urls = {
		contribute: '',
		subscribe: '',
		support: '',
		supporter: '',
	};

	return (
		<>
			<div data-print-layout="hide" id="bannerandheader">
				<>
					{
						<Section
							fullWidth={true}
							shouldCenter={false}
							showTopBorder={false}
							showSideBorders={false}
							padSides={false}
							backgroundColour={brandBackground.primary}
							element="header"
							hasPageSkin={false}
							hasPageSkinContentSelfConstrain={true}
						>
							<Header
								editionId={'INT'}
								idUrl={''}
								mmaUrl={''}
								discussionApiUrl={''}
								urls={urls}
								remoteHeader={false}
								contributionsServiceUrl={''}
								idApiUrl={''}
								headerTopBarSearchCapiSwitch={false}
								hasPageSkin={false}
							/>
						</Section>
					}
				</>
			</div>
			<main data-layout="HydrationLayout" id="maincontent">
				<h3>Current manipulation mode “{manipulation}”</h3>
				<p>
					Change to <a href="?manipulation=dom">DOM</a> or{' '}
					<a href="?manipulation=preact">Preact</a>
				</p>
				<ul
					css={css`
						display: grid;
						grid-template-columns: repeat(6, 1fr);
						gap: 2rem;

						& > li {
							background-color: ${palette.neutral[93]};
							text-align: center;
							height: 2rem;
							width: 6rem;
							overflow: hidden;
						}
					`}
				>
					{Array.from({ length: count }, (_, i) =>
						(i + 1).toLocaleString(),
					).map((key, index) => {
						const now = Date.now();
						const then = now - index * 600;

						return manipulation === 'dom' ? (
							<li key={key}>
								<time
									dateTime={new Date(then).toISOString()}
									data-relativeformat="med"
								>
									{timeAgo(then)}
								</time>
							</li>
						) : (
							<li>
								<Island
									key={key}
									priority="enhancement"
									defer={{ until: 'visible' }}
								>
									<RelativeTime then={then} now={now} />
								</Island>
							</li>
						);
					})}
				</ul>
			</main>

			<Section
				fullWidth={true}
				data-print-layout="hide"
				padSides={false}
				backgroundColour={brandBackground.primary}
				borderColour={brandBorder.primary}
				showSideBorders={false}
				showTopBorder={false}
				element="footer"
			>
				<Footer
					pageFooter={{ footerLinks: [] }}
					selectedPillar={Pillar.News}
					pillars={[]}
					urls={urls}
					editionId={'INT'}
					contributionsServiceUrl={''}
				/>
			</Section>
		</>
	);
};

const renderHydration = (
	query: QueryString.ParsedQs,
): { html: string; prefetchScripts: string[] } => {
	const manipulation = query.manipulation === 'dom' ? 'dom' : 'preact';
	const count = isString(query.count) ? parseInt(query.count, 10) : 10_000;

	const { html, extractedCss } = renderToStringWithEmotion(
		<ConfigProvider value={{ renderingTarget: 'Web' }}>
			<HydrationLayout manipulation={manipulation} count={count} />
		</ConfigProvider>,
	);

	const build = 'web.islands';

	/**
	 * The highest priority scripts.
	 * These scripts have a considerable impact on site performance.
	 * Only scripts critical to application execution may go in here.
	 * Please talk to the dotcom platform team before adding more.
	 * Scripts will be executed in the order they appear in this array
	 */
	const prefetchScripts = [
		polyfillIO,
		getPathFromManifest(build, 'frameworks.js'),
		getPathFromManifest(build, 'index.js'),
	].filter(isString);

	const scriptTags = generateScriptTags([...prefetchScripts]);

	return {
		html: htmlPageTemplate({
			html,
			css: extractedCss,
			title: 'Hydration test',
			description: 'Test to compare impact of hydration',
			scriptTags,
			guardian: createGuardian({
				stage: 'DEV',
				frontendAssetsFullURL: '',
				revisionNumber: '',
				sentryPublicApiKey: '',
				sentryHost: '',
				keywordIds: '',
				dfpAccountId: '',
				adUnit: '',
				ajaxUrl: '',
				googletagUrl: '',
				switches: {},
				abTests: {},
				editionId: 'INT',
			}),
			keywords: '',
			offerHttp3: true,
			renderingTarget: 'Web',
			hasPageSkin: false,
			weAreHiring: false,
		}),
		prefetchScripts,
	};
};

export const handleHydrationTest: RequestHandler = ({ query }, res) => {
	const { html, prefetchScripts } = renderHydration(query);

	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};
