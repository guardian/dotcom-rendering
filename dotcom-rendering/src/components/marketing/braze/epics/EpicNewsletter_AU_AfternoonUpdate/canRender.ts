import type { BrazeMessageProps } from './EpicNewsletter_AU_AfternoonUpdate';

export const COMPONENT_NAME = 'EpicNewsletter_AU_AfternoonUpdate';

export const canRender = (props: BrazeMessageProps): boolean => {
	const { header, frequency, paragraph1, ophanComponentId } = props;

	return Boolean(header && frequency && paragraph1 && ophanComponentId);
};
