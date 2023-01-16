import { QandaAtom } from '@guardian/atoms-rendering';
import type { QandaAtomType } from '@guardian/atoms-rendering';

export const QandaAtomWrapper = (props: QandaAtomType) => {
	return <QandaAtom {...props} />;
};
