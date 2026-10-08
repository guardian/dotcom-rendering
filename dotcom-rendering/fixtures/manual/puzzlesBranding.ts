import type { CommercialProperties } from '../../src/types/commercial';

export const puzzlesCommercialProperties = {
	AU: {
		adTargeting: [],
		branding: {
			brandingType: { name: 'sponsored' },
			sponsorName: 'Example sponsor',
			logo: {
				src: 'https://static.theguardian.com/commercial/sponsor/19/Dec/2022/57ba1d00-b2bd-4f6d-ba35-15a82b8d9507-0094b90a-bdb8-4e97-b866-dcf49179b29d-theguardian.org.png',
				link: 'https://example.com',
				label: 'Supported by',
				dimensions: { width: 280, height: 180 },
			},
			aboutThisLink: 'https://example.com/about',
		},
	},
} satisfies Partial<CommercialProperties>;
