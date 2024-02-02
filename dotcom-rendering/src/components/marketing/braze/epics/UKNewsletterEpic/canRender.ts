import type { BrazeMessageProps } from './UKNewsletterEpic';

export const COMPONENT_NAME = 'UKNewsletterEpic';

export const canRender = (props: BrazeMessageProps): boolean => {
	const { header, frequency, paragraph1, ophanComponentId } = props;

	return Boolean(header && frequency && paragraph1 && ophanComponentId);
};
