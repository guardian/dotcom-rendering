import { css } from '@emotion/react';
import { from, space } from '@guardian/source-foundations';
import { Button, SvgMinus, SvgPlus } from '@guardian/source-react-components';
import { useState } from 'react';
import { useApi } from '../lib/useApi';

const decideButtonText = ({
	showMore,
	loading,
	displayName,
}: {
	showMore: boolean;
	loading: boolean;
	displayName: string;
}) => {
	if (showMore && loading) return 'Loading';
	if (showMore) return 'Less';
	return `More ${displayName}`;
};

export const ShowMore = ({
	id,
	displayName,
	editionId,
}: {
	id: string;
	displayName: string;
	editionId: Edition;
}) => {
	const url = `https://api.nextgen.guardianapps.co.uk/${
		editionId === 'INT' ? 'international' : editionId.toLowerCase()
	}/show-more/${id}.json?dcr=true'`;
	const [showMore, setShow] = useState(false);
	const { data, loading } = useApi<{ userProfile: UserProfile }>(
		showMore ? url : undefined,
	);

	if (data) {
		console.log('TODO: Insert data into the DOM here');
	} else if (!showMore) {
		console.log('TODO: Remove the data from the DOM here');
	}

	return (
		<Button
			priority="tertiary"
			size="xsmall"
			icon={showMore && !loading ? <SvgMinus /> : <SvgPlus />}
			iconSide="left"
			onClick={() => setShow(!showMore)}
			cssOverrides={css`
				margin-top: ${space[3]}px;
				${from.tablet} {
					margin-left: 10px;
				}
			`}
		>
			{decideButtonText({ showMore, loading, displayName })}
		</Button>
	);
};
