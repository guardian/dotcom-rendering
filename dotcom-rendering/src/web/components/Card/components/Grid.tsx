const splitGridAreas = (grid: GridElement[]): string[] => {
	const res: string[] = [];
	let i = 0;

	while (i < grid.length) {
		let slice = '';

		if (grid[i].totalNumberOfAreasInSlice === 4) {
			let index = 4;

			while (index > 0) {
				slice = slice.concat('card-' + grid[i].cardAreaValue);
				if (index !== 1) slice = slice.concat(' ');

				i++;
				index--;
			}

			res.push(slice);
		} else {
			let index = 3;

			while (index > 0) {
				slice = slice.concat('card-' + grid[i].cardAreaValue);
				if (index !== 1) slice = slice.concat(' ');
				i++;
				index--;
			}
			res.push(slice);
		}
	}
	return res;
};

type GridElement = {
	cardAreaValue: string;
	totalNumberOfAreasInSlice: number;
};

const SLICE_OF_4 = 4;
const SLICE_OF_3 = 3;

export const getTemplateAreas = (
	percentages: CardPercentageType[][],
): string[] => {
	const grid: GridElement[] = [];
	let cardArea = 1;

	percentages.forEach((row) => {
		row.forEach((percentage) => {
			switch (percentage) {
				case '25%': {
					grid.push({
						cardAreaValue: cardArea.toString(),
						totalNumberOfAreasInSlice: SLICE_OF_4,
					});
					break;
				}
				case '33.333%': {
					grid.push({
						cardAreaValue: cardArea.toString(),
						totalNumberOfAreasInSlice: SLICE_OF_3,
					});
					break;
				}
				case '50%': {
					let areasInSlice = 2;
					while (areasInSlice > 0) {
						grid.push({
							cardAreaValue: cardArea.toString(),
							totalNumberOfAreasInSlice: SLICE_OF_4,
						});
						areasInSlice--;
					}
					break;
				}
				case '66.666%': {
					let areasInSlice = 2;
					while (areasInSlice > 0) {
						grid.push({
							cardAreaValue: cardArea.toString(),
							totalNumberOfAreasInSlice: SLICE_OF_3,
						});
						areasInSlice--;
					}
					break;
				}
				case '75%': {
					let areasInSlice = 3;
					while (areasInSlice > 0) {
						grid.push({
							cardAreaValue: cardArea.toString(),
							totalNumberOfAreasInSlice: SLICE_OF_4,
						});
						areasInSlice--;
					}
					break;
				}
				case '100%':
					{
						let areasInSlice = 4;
						while (areasInSlice > 0) {
							grid.push({
								cardAreaValue: cardArea.toString(),
								totalNumberOfAreasInSlice: SLICE_OF_4,
							});
							areasInSlice--;
						}
					}
					break;
			}

			cardArea += 1;
		});
	});

	return splitGridAreas(grid);
};
