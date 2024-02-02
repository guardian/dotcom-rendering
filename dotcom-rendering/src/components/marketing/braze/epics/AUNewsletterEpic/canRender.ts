import type { BrazeMessageProps } from './AUNewsletterEpic';

export const COMPONENT_NAME = 'AUNewsletterEpic';

export const canRender = (props: BrazeMessageProps): boolean => {
	const { header, frequency, paragraph1, ophanComponentId } = props;

	return Boolean(header && frequency && paragraph1 && ophanComponentId);
};
