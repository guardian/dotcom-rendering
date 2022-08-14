import { decideTrail } from '../lib/decideTrail';
import { Carousel } from './Carousel.importable';
import { FetchOnwardsData } from './FetchOnwardsData.importable';
import { Island } from './Island';
import { Section } from './Section';

export const DecideOnwards = ({
	onwards,
	format,
}: {
	onwards: CAPIOnwardsType[];
	format: ArticleFormat;
}) => (
	<>
		{onwards.map(({ heading, trails, onwardsType, url }) => {
			if (trails.length > 0) {
				return (
					<Section
						fullWidth={true}
						key={onwardsType}
						showTopBorder={false}
					>
						<Island deferUntil="visible">
							<Carousel
								heading={heading}
								trails={trails.map(decideTrail)}
								onwardsType={onwardsType}
								format={format}
							/>
						</Island>
					</Section>
				);
			}

			if (url) {
				return (
					<Section
						fullWidth={true}
						key={onwardsType}
						showTopBorder={false}
					>
						<Island
							clientOnly={true}
							deferUntil="visible"
							placeholderHeight={600}
						>
							<FetchOnwardsData
								url={url}
								limit={8}
								onwardsType={onwardsType}
								format={format}
							/>
						</Island>
					</Section>
				);
			}

			return null;
		})}
	</>
);
