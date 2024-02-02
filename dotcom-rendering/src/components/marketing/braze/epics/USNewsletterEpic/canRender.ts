import type { BrazeMessageProps } from './USNewsletterEpic';

export const COMPONENT_NAME = 'USNewsletterEpic';

export const canRender = (props: BrazeMessageProps): boolean => {
	const { header, frequency, paragraph1, ophanComponentId } = props;

	return Boolean(header && frequency && paragraph1 && ophanComponentId);
};
