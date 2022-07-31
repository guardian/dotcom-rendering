import { decideTrail } from '../lib/decideTrail';
import { Carousel } from './Carousel.importable';
import { ElementContainer } from './ElementContainer';
import { FetchOnwardsData } from './FetchOnwardsData.importable';
import { Island } from './Island';

export const Onwards = ({
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
					<ElementContainer key={onwardsType}>
						<Island deferUntil="visible">
							<Carousel
								heading={heading}
								trails={trails.map(decideTrail)}
								onwardsType={onwardsType}
								format={format}
							/>
						</Island>
					</ElementContainer>
				);
			}

			if (url) {
				return (
					<ElementContainer key={onwardsType}>
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
					</ElementContainer>
				);
			}

			return null;
		})}
	</>
);
