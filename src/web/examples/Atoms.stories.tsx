/* eslint-disable jsx-a11y/aria-role */
import React from 'react';
import { InteractiveAtom } from '@guardian/atoms-rendering';
import { Figure } from '@frontend/web/components/Figure';
import { TextBlockComponent } from '@frontend/web/components/elements/TextBlockComponent';
import { Pillar, Design, Display } from '@guardian/types';
import { css } from 'emotion';

export default {
	component: InteractiveAtom,
	title: 'Examples/Interactive Atom With Roles',
};

const InteractiveAtomBlockElement = {
	css:
		'@font-face{font-family:"Guardian Headline Full";src:url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Light.woff2) format("woff2"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Light.woff) format("woff"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Light.ttf) format("truetype");font-weight:300;font-style:normal}@font-face{font-family:"Guardian Headline Full";src:url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-LightItalic.woff2) format("woff2"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-LightItalic.woff) format("woff"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-LightItalic.ttf) format("truetype");font-weight:300;font-style:italic}@font-face{font-family:"Guardian Headline Full";src:url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Regular.woff2) format("woff2"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Regular.woff) format("woff"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Regular.ttf) format("truetype");font-weight:400;font-style:normal}@font-face{font-family:"Guardian Headline Full";src:url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-RegularItalic.woff2) format("woff2"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-RegularItalic.woff) format("woff"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-RegularItalic.ttf) format("truetype");font-weight:400;font-style:italic}@font-face{font-family:"Guardian Headline Full";src:url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Medium.woff2) format("woff2"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Medium.woff) format("woff"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Medium.ttf) format("truetype");font-weight:500;font-style:normal}@font-face{font-family:"Guardian Headline Full";src:url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-MediumItalic.woff2) format("woff2"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-MediumItalic.woff) format("woff"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-MediumItalic.ttf) format("truetype");font-weight:500;font-style:italic}@font-face{font-family:"Guardian Headline Full";src:url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Semibold.woff2) format("woff2"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Semibold.woff) format("woff"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Semibold.ttf) format("truetype");font-weight:600;font-style:normal}@font-face{font-family:"Guardian Headline Full";src:url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-SemiboldItalic.woff2) format("woff2"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-SemiboldItalic.woff) format("woff"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-SemiboldItalic.ttf) format("truetype");font-weight:600;font-style:italic}@font-face{font-family:"Guardian Headline Full";src:url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Bold.woff2) format("woff2"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Bold.woff) format("woff"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Bold.ttf) format("truetype");font-weight:700;font-style:normal}@font-face{font-family:"Guardian Headline Full";src:url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-BoldItalic.woff2) format("woff2"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-BoldItalic.woff) format("woff"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-BoldItalic.ttf) format("truetype");font-weight:700;font-style:italic}@font-face{font-family:"Guardian Headline Full";src:url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Black.woff2) format("woff2"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Black.woff) format("woff"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Black.ttf) format("truetype");font-weight:900;font-style:normal}@font-face{font-family:"Guardian Headline Full";src:url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-BlackItalic.woff2) format("woff2"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-BlackItalic.woff) format("woff"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-BlackItalic.ttf) format("truetype");font-weight:900;font-style:italic}@font-face{font-family:"Guardian Titlepiece";src:url(https://interactive.guim.co.uk/fonts/garnett/GTGuardianTitlepiece-Bold.woff2) format("woff2"),url(https://interactive.guim.co.uk/fonts/garnett/GTGuardianTitlepiece-Bold.woff) format("woff"),url(https://interactive.guim.co.uk/fonts/garnett/GTGuardianTitlepiece-Bold.ttf) format("truetype");font-weight:700;font-style:normal}.interactive-atom{margin:0;padding:0;padding-top:20px;padding-bottom:20px}.interactive-wrapper{max-width:860px}#gv-svg-col-chart.tests-chart{overflow:visible}.cases-last-number{font-size:13px;line-height:18px;font-family:"Guardian Text Sans Web","Helvetica Neue",Helvetica,Arial,"Lucida Grande",sans-serif;font-size:24px;font-weight:bolder;fill:#880105}@media (min-width:28.125em){.cases-last-number{font-size:14px}}.cases-last-number--white{fill:none;stroke:#fff;stroke-opacity:.75;stroke-width:3}.area-label-text{fill:#000}#y-hilite-label{font-size:13px;line-height:18px;font-family:"Guardian Text Sans Web","Helvetica Neue",Helvetica,Arial,"Lucida Grande",sans-serif;font-size:26px;font-weight:400;fill:#929297}@media (min-width:28.125em){#y-hilite-label{font-size:13px}}.cases-last-number-white{stroke:#fff;-webkit-text-stroke-width:1px;-webkit-text-stroke-color:#fff}.gv-shadow-text{stroke:1px solid #fff}.x.axis .tick line,.y.axis .tick line{color:#dcdcdc;stroke-width:1px}.x.axis text,.y.axis text{font-family:\'Guardian Text Sans Web\',Arial,sans-serif;font-weight:400;line-height:20px;text-align:left;fill:#929297;font-style:normal;font-size:24px}@media (min-width:28.125em){.x.axis text,.y.axis text{font-size:14px}}.gv-key-label{line-height:18px;font-family:"Guardian Text Sans Web","Helvetica Neue",Helvetica,Arial,"Lucida Grande",sans-serif;color:#999;font-size:20px}@media (min-width:28.125em){.gv-key-label{font-size:12px}}.gv-headline{font-size:20px;line-height:24px;font-family:"Guardian Headline","Guardian Egyptian Web","Guardian Headline Full",Georgia,serif;font-weight:900;margin-bottom:24px}.timestamp{font-size:16px;line-height:20px;font-family:"Guardian Text Egyptian Web",Georgia,serif;margin-bottom:12px;font-weight:300}.chart-target-label{width:120px;position:absolute;top:90px;left:18px;font-size:13px;line-height:18px;font-family:"Guardian Text Sans Web","Helvetica Neue",Helvetica,Arial,"Lucida Grande",sans-serif;font-size:13px;font-weight:400;fill:#929297}@media (min-width:28.125em){.chart-target-label{width:175px;line-height:18px;font-size:14px;top:120px;left:37px}}.text-label--white{fill:none;stroke:#fff;stroke-opacity:.75;stroke-width:3}.text-label{font-size:13px;line-height:18px;font-family:"Guardian Text Sans Web","Helvetica Neue",Helvetica,Arial,"Lucida Grande",sans-serif;font-size:22px;font-weight:bolder}@media (min-width:28.125em){.text-label{font-size:14px}}.text-label .label-head{font-family:"Guardian Headline","Guardian Egyptian Web","Guardian Headline Full",Georgia,serif;font-size:26px}@media (min-width:28.125em){.text-label .label-head{font-size:18px}}.text-label .label-head .black{fill:#000}.gv-choropleth-wrapper,.interactive-wrapper{padding:6px 0 12px 0;border:1px solid #dbdbdb;border-left-width:0;border-right-width:0}.source{padding:6px 0 6px 0;margin:0;font-family:\'Guardian Text Sans Web\',Arial,sans-serif;font-size:12px;line-height:15px;color:#767676;display:inline-block;width:100%}.gv-headline{font-size:16px;line-height:20px;font-family:"Guardian Headline","Guardian Egyptian Web","Guardian Headline Full",Georgia,serif;font-weight:400;font-weight:700;margin-bottom:6px}@media (min-width:30em){.gv-headline{font-size:20px;line-height:24px;font-family:"Guardian Headline","Guardian Egyptian Web","Guardian Headline Full",Georgia,serif;font-weight:400;font-weight:700}}.interactive-atom{margin:0;padding:0}.gv-headline{font-size:16px;line-height:20px;font-family:"Guardian Headline","Guardian Egyptian Web","Guardian Headline Full",Georgia,serif;font-weight:400;font-weight:700;margin-bottom:6px}@media (min-width:30em){.gv-headline{font-size:20px;line-height:24px;font-family:"Guardian Headline","Guardian Egyptian Web","Guardian Headline Full",Georgia,serif;font-weight:400;font-weight:700}}.gv-subhead{font-size:14px;line-height:20px;font-family:"Guardian Text Sans Web","Helvetica Neue",Helvetica,Arial,"Lucida Grande",sans-serif;margin-bottom:12px;color:#676767}.gv-sourceline{font-size:13px;line-height:18px;font-family:"Guardian Text Sans Web","Helvetica Neue",Helvetica,Arial,"Lucida Grande",sans-serif;color:#676767}.interactive-wrapper-country-embed{width:100%}',
	_type: 'model.dotcomrendering.pageElements.InteractiveAtomBlockElement',
	js:
		'!function(n){var r={};function o(e){if(r[e])return r[e].exports;var t=r[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,o),t.l=!0,t.exports}o.m=n,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=449)}({449:function(e,t,n){e.exports=n(450)},450:function(e,t){var n=document.createElement("script");n.src="https://interactive.guim.co.uk/atoms/2020/08/uk-coronavirus-dashboard-v2/column-chart-cases/v/1617301231839/app.js",document.body.appendChild(n),setTimeout(function(){var e,t;window.resize&&(e=document.querySelector("html"),t=document.querySelector("body"),e.style.overflow="hidden",e.style.margin="0px",e.style.padding="0px",t.style.overflow="hidden",t.style.margin="0px",t.style.padding="0px",window.resize())},100)}});',
	html:
		'<div class="interactive-wrapper">\n    <div class="gv-headline">UK: new coronavirus cases per day</div>\n    <div class="gv-subhead"></div>\n    <svg id="gv-svg-col-chart" viewBox="0,0,600,400" style="overflow: visible"></svg>\n    <div class="source">\n        Line shows daily average of new cases in a given week. \n        Cases assigned to date of publication.\n        Data: data.gov.uk, updated <span id="gv-col-timestamp"></span>\n    </div>\n</div>\n\n',
	id: 'interactives/2020/05/distanced-tube/default',
	url:
		'http://localhost:9000/embed/atom/interactive/interactives%2F2020%2F05%2Fdistanced-tube%2Fdefault',
};

const textHtml =
	'<p>US and British intelligence agencies have successfully cracked much of the online encryption relied upon by hundreds of millions of people to protect the privacy of their personal data, online transactions and emails, according to top-secret documents revealed by former contractor Edward Snowden.</p>';

const SomeText = () => (
	<TextBlockComponent
		html={textHtml}
		format={{
			theme: Pillar.News,
			design: Design.Article,
			display: Display.Standard,
		}}
		isFirstParagraph={false}
	/>
);

const Container = ({ children }: { children: React.ReactNode }) => (
	<div
		className={css`
			padding-left: 250px;
			padding-right: 20px;
		`}
	>
		{children}
	</div>
);

export const Basic = () => {
	const { id, html, js, css: atomCss } = InteractiveAtomBlockElement;
	return (
		<Container>
			<SomeText />
			<SomeText />
			<Figure>
				<InteractiveAtom id={id} html={html} js={js} css={atomCss} />
			</Figure>

			<SomeText />
			<SomeText />
		</Container>
	);
};

Basic.story = { name: 'with no role' };

export const Supporting = () => {
	const { id, html, js, css: atomCss } = InteractiveAtomBlockElement;
	return (
		<Container>
			<SomeText />
			<SomeText />
			<Figure role="supporting">
				<InteractiveAtom id={id} html={html} js={js} css={atomCss} />
			</Figure>

			<SomeText />
			<SomeText />
		</Container>
	);
};

Supporting.story = { name: 'with supporting role' };

export const Showcase = () => {
	const { id, html, js, css: atomCss } = InteractiveAtomBlockElement;
	return (
		<Container>
			<SomeText />
			<SomeText />
			<Figure role="showcase">
				<InteractiveAtom id={id} html={html} js={js} css={atomCss} />
			</Figure>
			<SomeText />
			<SomeText />
		</Container>
	);
};

Showcase.story = { name: 'with showcase role' };
