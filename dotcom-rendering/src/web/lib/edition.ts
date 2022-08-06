import type { Edition, EditionId } from '../../types/edition';

const UkEdition: Edition = {
	id: 'UK',
	displayName: 'UK Edition',
	locale: 'en-gb',
};

const UsEdition: Edition = {
	id: 'US',
	displayName: 'US Edition',
	locale: 'en-us',
};

const AuEdition: Edition = {
	id: 'AU',
	displayName: 'Australia edition',
	locale: 'en-au',
};

const InternationalEdition: Edition = {
	id: 'INT',
	displayName: 'International edition',
	locale: 'en-gb',
};

export const getEditionFromId = (id: EditionId): Edition => {
	switch (id) {
		case 'UK':
			return UkEdition;
		case 'US':
			return UsEdition;
		case 'AU':
			return AuEdition;
		case 'INT':
			return InternationalEdition;
	}
};
