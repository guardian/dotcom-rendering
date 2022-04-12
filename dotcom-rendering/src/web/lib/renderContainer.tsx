import { ContainerLayout } from '../components/ContainerLayout';
import { DynamicFast } from '../components/DynamicFast';
import { FixedLargeSlowXIV } from '../components/FixedLargeSlowXIV';

type Props = {
	trails: DCRFrontCard[];
	containerType: DCRContainerType;
};

const renderContainer = ({ trails, containerType }: Props) => {
	switch (containerType) {
		case 'dynamic/fast':
			return <DynamicFast trails={trails} />;
		case 'fixed/large/slow-XIV':
			return <FixedLargeSlowXIV trails={trails} />;
		default:
			// TODO: This default allows us to render fronts in-development where we might
			// not support all the container types, but it should be removed / re-investigated
			// before fronts are released
			return <DynamicFast trails={trails} />;
	}
};

export const renderFrontContainer = ({
	collection,
	showTopBorder,
}: {
	collection: DCRCollectionType;
	showTopBorder: boolean;
}) => {
	// TODO: We also need to support treats containers
	// Backfills should be added to the end of any curated content
	const trails = collection.curated.concat(collection.backfill);
	// There are some containers that have zero trails. We don't want to render these
	if (trails.length === 0) return null;

	const element = renderContainer({
		trails,
		containerType: collection.collectionType,
	});

	return (
		<ContainerLayout
			title={collection.displayName}
			showTopBorder={showTopBorder}
			sideBorders={true}
			padContent={false}
			centralBorder="partial"
		>
			{element}
		</ContainerLayout>
	);
};
