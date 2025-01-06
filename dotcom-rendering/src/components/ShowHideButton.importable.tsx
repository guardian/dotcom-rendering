import { css } from '@emotion/react';
import { isObject, isString, storage } from '@guardian/libs';
import { space, textSans14 } from '@guardian/source/foundations';
import { Button } from '@guardian/source/react-components';
import { useEffect, useState } from 'react';
import { useIsSignedIn } from '../lib/useAuthStatus';
import { palette } from '../palette';

type Props = {
	sectionId: string;
};

const showHideButtonCss = css`
	button {
		${textSans14};
		margin-right: 10px;
		margin-bottom: ${space[2]}px;
		position: relative;
		align-items: bottom;
		text-decoration: none;
	}
`;

type ContainerStates = { [id: string]: string };

const isContainerStates = (item: unknown): item is ContainerStates => {
	if (!isObject(item)) return false;
	if (!Object.keys(item).every(isString)) return false;
	if (!Object.values(item).every(isString)) return false;
	return true;
};

const getContainerStates = (): ContainerStates => {
	const item = storage.local.get(`gu.prefs.container-states`);
	if (!isContainerStates(item)) return {};
	return item;
};

/**
 * Component to toggle the visibility of a front container. Used within FrontSection.
 **/
export const ShowHideButton = ({ sectionId }: Props) => {
	const [containerStates, setContainerStates] = useState<ContainerStates>({});
	const [isExpanded, setIsExpanded] = useState(true);
	const textShowHide = isExpanded ? 'Hide' : 'Show';
	const isSignedIn = useIsSignedIn();

	const toggleContainer = () => {
		const section: Element | null =
			window.document.getElementById(sectionId);

		if (isExpanded) {
			containerStates[sectionId] = 'closed';
			section?.classList.add('hidden');
		} else {
			containerStates[sectionId] = 'opened';
			section?.classList.remove('hidden');
		}

		storage.local.set(`gu.prefs.container-states`, containerStates);
	};

	useEffect(() => {
		const section: Element | null =
			window.document.getElementById(sectionId);

		setContainerStates(getContainerStates());

		const isClosed = containerStates[sectionId] === 'closed';
		setIsExpanded(!isClosed);

		isClosed
			? section?.classList.add('hidden')
			: section?.classList.remove('hidden');
	}, [containerStates, sectionId]);

	return (
		isSignedIn === true && (
			<div css={showHideButtonCss}>
				<Button
					priority="subdued"
					data-link-name={textShowHide}
					data-show-hide-button={sectionId}
					aria-controls={sectionId}
					aria-expanded={isExpanded}
					theme={{
						textSubdued: palette('--section-toggle-button'),
					}}
					onClick={toggleContainer}
				>
					{textShowHide}
				</Button>
			</div>
		)
	);
};
