const guNames = {
	ageWarning: 'age-warning',
} as const;

type GuName = (typeof guNames)[keyof typeof guNames];

const attribute = (name: GuName) => ({ 'data-gu-name': name });

export const guDataAttribute = Object.assign(attribute, guNames);
