import React from 'react';
import type { AmpExperiments } from '../server/ampExperimentCache';

export const AmpExperimentComponent: React.FC<{
	experimentsData?: AmpExperiments;
}> = ({ experimentsData }) => {
	return (
		<amp-experiment>
			<script
				type="application/json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(experimentsData),
				}}
			/>
		</amp-experiment>
	);
};
