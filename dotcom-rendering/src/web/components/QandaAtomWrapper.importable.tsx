import { QandaAtom } from '@guardian/atoms-rendering';
import type { QandaAtomType } from '@guardian/atoms-rendering/dist/types/types';

export const QandaAtomWrapper = (props: QandaAtomType) => {
	return <QandaAtom {...props} />;
};
