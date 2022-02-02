import { QandaAtom } from '@guardian/atoms-rendering';
import { QandaAtomType } from '@guardian/atoms-rendering/dist/types/types';

export const QandaAtomWrapper = (props: QandaAtomType) => {
	// eslint-disable-next-line react/jsx-props-no-spreading
	return <QandaAtom {...props} />;
};
