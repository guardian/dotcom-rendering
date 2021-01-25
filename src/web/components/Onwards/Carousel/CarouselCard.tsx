import React from 'react';
import { Card } from '@frontend/web/components/Card/Card';
import { LI } from '@frontend/web/components/Card/components/LI';

type CarouselCardProps = {
	trail: TrailType;
};

export const CarouselCard: React.FC<CarouselCardProps> = ({
	trail,
}: CarouselCardProps) => {
	const {
		pillar,
		design,
		url: linkTo,
		image: imageUrl,
		headline: headlineText,
		webPublicationDate,
		kickerText,
	} = trail;
	return (
		<LI stretch={true} percentage="100%" showDivider={true} padSides={true}>
			<Card
				linkTo={linkTo}
				pillar={pillar}
				design={design}
				headlineText={headlineText}
				webPublicationDate={webPublicationDate}
				kickerText={kickerText || ''}
				imageUrl={imageUrl || ''}
				showClock={true}
				alwaysVertical={true}
				minWidthInPixels={258}
			/>
		</LI>
	);
};
