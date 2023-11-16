import type { OphanComponentEvent } from '@guardian/libs';

const OPHAN_COMPONENT_ID_CTAS_VIEW = 'contributions-epic-ctas-view';
const OPHAN_COMPONENT_ID_REMINDER_VIEW = 'contributions-epic-reminder-view';
const OPHAN_COMPONENT_ID_REMINDER_OPEN = 'contributions-epic-reminder-open';
const OPHAN_COMPONENT_ID_REMINDER_SET = 'contributions-epic-reminder-set';
const OPHAN_COMPONENT_ID_REMINDER_CLOSE = 'contributions-epic-reminder-close';
const OPHAN_COMPONENT_ID_ARTICLE_COUNT_OPT_OUT_OPEN =
	'contributions-epic-article-count-open';
const OPHAN_COMPONENT_ID_ARTICLE_COUNT_OPT_OUT_CLOSE =
	'contributions-epic-article-count-close';
const OPHAN_COMPONENT_ID_ARTICLE_COUNT_STAY_IN =
	'contributions-epic-article-count-stay-on';
const OPHAN_COMPONENT_ID_ARTICLE_COUNT_OPT_OUT =
	'contributions-epic-article-count-opt-out';
const OPHAN_COMPONENT_ID_ARTICLE_COUNT_STAY_OUT =
	'contributions-epic-article-count-stay-out';
const OPHAN_COMPONENT_ID_ARTICLE_COUNT_OPT_IN =
	'contributions-epic-article-count-opt-in';
const OPHAN_COMPONENT_ID_SIGN_IN = 'contributions-epic-sign-in';

export const getReminderViewEvent = (
	isSignedIn: boolean,
): OphanComponentEvent => ({
	component: {
		componentType: 'ACQUISITIONS_OTHER',
		id: OPHAN_COMPONENT_ID_REMINDER_VIEW,
	},
	action: 'VIEW',
	value: isSignedIn.toString(),
});

export const OPHAN_COMPONENT_EVENT_CTAS_VIEW: OphanComponentEvent = {
	component: {
		componentType: 'ACQUISITIONS_OTHER',
		id: OPHAN_COMPONENT_ID_CTAS_VIEW,
	},
	action: 'CLICK',
};

export const OPHAN_COMPONENT_EVENT_REMINDER_OPEN: OphanComponentEvent = {
	component: {
		componentType: 'ACQUISITIONS_OTHER',
		id: OPHAN_COMPONENT_ID_REMINDER_OPEN,
	},
	action: 'CLICK',
};

export const OPHAN_COMPONENT_EVENT_REMINDER_SET: OphanComponentEvent = {
	component: {
		componentType: 'ACQUISITIONS_OTHER',
		id: OPHAN_COMPONENT_ID_REMINDER_SET,
	},
	action: 'CLICK',
};

export const OPHAN_COMPONENT_EVENT_REMINDER_CLOSE: OphanComponentEvent = {
	component: {
		componentType: 'ACQUISITIONS_OTHER',
		id: OPHAN_COMPONENT_ID_REMINDER_CLOSE,
	},
	action: 'CLICK',
};

export const OPHAN_COMPONENT_ARTICLE_COUNT_OPT_OUT_OPEN: OphanComponentEvent = {
	component: {
		componentType: 'ACQUISITIONS_OTHER',
		id: OPHAN_COMPONENT_ID_ARTICLE_COUNT_OPT_OUT_OPEN,
	},
	action: 'CLICK',
};

export const OPHAN_COMPONENT_ARTICLE_COUNT_OPT_OUT_CLOSE: OphanComponentEvent =
	{
		component: {
			componentType: 'ACQUISITIONS_OTHER',
			id: OPHAN_COMPONENT_ID_ARTICLE_COUNT_OPT_OUT_CLOSE,
		},
		action: 'CLICK',
	};

export const OPHAN_COMPONENT_ARTICLE_COUNT_STAY_IN: OphanComponentEvent = {
	component: {
		componentType: 'ACQUISITIONS_OTHER',
		id: OPHAN_COMPONENT_ID_ARTICLE_COUNT_STAY_IN,
	},
	action: 'CLICK',
};

export const OPHAN_COMPONENT_ARTICLE_COUNT_OPT_OUT: OphanComponentEvent = {
	component: {
		componentType: 'ACQUISITIONS_OTHER',
		id: OPHAN_COMPONENT_ID_ARTICLE_COUNT_OPT_OUT,
	},
	action: 'CLICK',
};

export const OPHAN_COMPONENT_ARTICLE_COUNT_STAY_OUT: OphanComponentEvent = {
	component: {
		componentType: 'ACQUISITIONS_OTHER',
		id: OPHAN_COMPONENT_ID_ARTICLE_COUNT_STAY_OUT,
	},
	action: 'CLICK',
};

export const OPHAN_COMPONENT_ARTICLE_COUNT_OPT_IN: OphanComponentEvent = {
	component: {
		componentType: 'ACQUISITIONS_OTHER',
		id: OPHAN_COMPONENT_ID_ARTICLE_COUNT_OPT_IN,
	},
	action: 'CLICK',
};

export const OPHAN_COMPONENT_SIGN_IN: OphanComponentEvent = {
	component: {
		componentType: 'ACQUISITIONS_OTHER',
		id: OPHAN_COMPONENT_ID_SIGN_IN,
	},
	action: 'CLICK',
};
