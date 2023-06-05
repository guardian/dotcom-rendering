import type { AmpExperiments } from '../server/AMPExperimentCache.amp';

type Props = {
	experimentsData?: AmpExperiments;
};
export const AmpExperimentComponent = ({ experimentsData }: Props) => {
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
