import { useEffect } from 'react';

/**
 * This component is used exclusively for the Slim Homepage AB test to conditionally hide the "Deeply read" container.
 *
 * If the "Deeply read" container is taller than the combined height of the "Features" and "More features"
 * containers, hide the "Deeply read" container to prevent this absolute positioned component from
 * overlapping the container or advert below it.
 *
 * The intention is that for the duration of the AB test there will always be enough content in these
 * two containers to ensure that there is enough room for the "Deeply read" container, but this is added
 * as a safety net: it is better to remove the content than to leave it overlapping other content.
 *
 * @returns {JSX.Element} - A React fragment (renders nothing to the DOM directly).
 */
export const SlimHomepageAbTest = () => {
	useEffect(() => {
		const featuresContainer = document.getElementById('features');
		const moreFeaturesContainer = document.getElementById('more-features');
		const deeplyReadFrontRightContainer = document.getElementById(
			'deeply-read-front-right-container',
		);

		if (
			deeplyReadFrontRightContainer &&
			featuresContainer &&
			moreFeaturesContainer
		) {
			const deeplyReadHeight =
				deeplyReadFrontRightContainer.getBoundingClientRect().height;
			const featuresHeight =
				featuresContainer.getBoundingClientRect().height;
			const moreFeaturesHeight =
				moreFeaturesContainer.getBoundingClientRect().height;

			if (deeplyReadHeight > featuresHeight + moreFeaturesHeight) {
				deeplyReadFrontRightContainer.style.display = 'none';
			}
		}
	}, []);

	return <></>;
};
