import { ClassNames } from '@emotion/react';
import { text } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { regionClasses } from '../lib/region-classes';
import { RegionalAdProps, RegionalAd } from './Ad';

// This CSS should be imported and added to global styles in amp/server/document.tsx to add the Advertisement label to the sticky
export const stickyAdLabelCss = `
amp-sticky-ad:before {
	content: 'Advertisement';
	display: block;
	${textSans.xsmall()};
	font-family: 'Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif;
	padding: 3px 10px 0;
	color: ${text.supporting};
	text-align: right;
	line-height: 1;
	font-size: 0.75rem;
}`;

export const StickyAd = ({
	adRegion,
	edition,
	section,
	contentType,
	config,
	commercialProperties,
}: RegionalAdProps) => {
	return (
		<ClassNames>
			{({ css, cx }) => (
				<div
					className={cx(
						css`
							${regionClasses[adRegion].styles}
						`,
					)}
				>
					<amp-sticky-ad layout="nodisplay">
						<RegionalAd
							isSticky={true}
							adRegion={adRegion}
							edition={edition}
							section={section}
							contentType={contentType}
							config={config}
							commercialProperties={commercialProperties}
						/>
					</amp-sticky-ad>
				</div>
			)}
		</ClassNames>
	);
};
