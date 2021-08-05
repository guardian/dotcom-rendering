import { bestFitImage, heightEstimate } from './image-fit';

test('chooses smallest image that is still greater than column width', () => {
	const images = [
		{
			weighting: 'inline' as Weighting,
			srcSet: [
				{
					src:
						'https://i.guim.co.uk/img/media/d78248012632672db90b7cbd766e6a8383542fc0/0_316_4366_2619/master/4366.jpg?width=620&quality=85&auto=format&fit=max&s=dedab549648a105a71696cadab62715f',
					width: 620,
				},
				{
					src:
						'https://i.guim.co.uk/img/media/d78248012632672db90b7cbd766e6a8383542fc0/0_316_4366_2619/master/4366.jpg?width=605&quality=85&auto=format&fit=max&s=8e367c059ef0a2ef00cc5c318a22c8a8',
					width: 605,
				},
				{
					src:
						'https://i.guim.co.uk/img/media/d78248012632672db90b7cbd766e6a8383542fc0/0_316_4366_2619/master/4366.jpg?width=445&quality=85&auto=format&fit=max&s=a73e2a4c64e72082284add1ac2bbd624',
					width: 445,
				},
			],
		},
		{
			weighting: 'thumbnail' as Weighting,
			srcSet: [
				{
					src:
						'https://i.guim.co.uk/img/media/d78248012632672db90b7cbd766e6a8383542fc0/0_316_4366_2619/master/4366.jpg?width=140&quality=85&auto=format&fit=max&s=92dec489a4ea25b8ba80f8b260ca0bb9',
					width: 140,
				},
				{
					src:
						'https://i.guim.co.uk/img/media/d78248012632672db90b7cbd766e6a8383542fc0/0_316_4366_2619/master/4366.jpg?width=120&quality=85&auto=format&fit=max&s=b0d93418512fb3213d356b148490ed48',
					width: 120,
				},
			],
		},
	];
	const bestFit = bestFitImage(images, 600);
	if (bestFit) {
		expect(bestFit.src).toBe(
			'https://i.guim.co.uk/img/media/d78248012632672db90b7cbd766e6a8383542fc0/0_316_4366_2619/master/4366.jpg?width=605&quality=85&auto=format&fit=max&s=8e367c059ef0a2ef00cc5c318a22c8a8',
		);
	}
});

test('if no image is greater than column width, just return the biggest available', async () => {
	const images = [
		{
			weighting: 'thumbnail' as Weighting,
			srcSet: [
				{
					src:
						'https://i.guim.co.uk/img/media/d78248012632672db90b7cbd766e6a8383542fc0/0_316_4366_2619/master/4366.jpg?width=140&quality=85&auto=format&fit=max&s=92dec489a4ea25b8ba80f8b260ca0bb9',
					width: 140,
				},
				{
					src:
						'https://i.guim.co.uk/img/media/d78248012632672db90b7cbd766e6a8383542fc0/0_316_4366_2619/master/4366.jpg?width=120&quality=85&auto=format&fit=max&s=b0d93418512fb3213d356b148490ed48',
					width: 120,
				},
			],
		},
	];
	const bestFit = bestFitImage(images, 600);
	expect(bestFit.src).toBe(
		'https://i.guim.co.uk/img/media/d78248012632672db90b7cbd766e6a8383542fc0/0_316_4366_2619/master/4366.jpg?width=140&quality=85&auto=format&fit=max&s=92dec489a4ea25b8ba80f8b260ca0bb9',
	);
});

test('throws an error if no image', () => {
	const images: ImageSource[] = [];
	expect(() => bestFitImage(images, 600)).toThrow();
});

test('it gets the correct image height, using aspect ratio', () => {
	const comparisonImage: Image = {
		index: 1234,
		fields: {
			height: '600',
			width: '1000',
			isMaster: 'false',
		},
		mediaType: 'picture',
		mimeType: 'jpg',
		url: 'https://media.guim.co.uk/abc/1000',
	};
	const width = 600;
	const h = heightEstimate(comparisonImage, width);

	expect(h).toBe(360);
});
