/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/9c3eae7cb0b159db4a1c40679d6b37710b0bb937/packages/modules/src/modules/epics/utils/ophan.ts#L3
 */
import type { ComponentEvent } from '@guardian/ophan-tracker-js';

const OPHAN_COMPONENT_ID_CTAS_VIEW = 'contributions-epic-ctas-view';
const OPHAN_COMPONENT_ID_PRIMARY_CTA = 'contributions-epic-primary-cta';
const OPHAN_COMPONENT_ID_SECONDARY_CTA = 'contributions-epic-secondary-cta';
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

export const getReminderViewEvent = (isSignedIn: boolean): ComponentEvent => ({
	component: {
		componentType: 'ACQUISITIONS_OTHER',
		id: OPHAN_COMPONENT_ID_REMINDER_VIEW,
	},
	action: 'VIEW',
	value: isSignedIn.toString(),
});

export const OPHAN_COMPONENT_EVENT_CTAS_VIEW = {
	component: {
		componentType: 'ACQUISITIONS_OTHER',
		id: OPHAN_COMPONENT_ID_CTAS_VIEW,
	},
	action: 'VIEW',
} as const satisfies ComponentEvent;

export const OPHAN_COMPONENT_EVENT_PRIMARY_CTA = {
	component: {
		componentType: 'ACQUISITIONS_EPIC',
		id: OPHAN_COMPONENT_ID_PRIMARY_CTA,
	},
	action: 'CLICK',
} as const satisfies ComponentEvent;

export const OPHAN_COMPONENT_EVENT_SECONDARY_CTA = {
	component: {
		componentType: 'ACQUISITIONS_OTHER',
		id: OPHAN_COMPONENT_ID_SECONDARY_CTA,
	},
	action: 'CLICK',
} as const satisfies ComponentEvent;

export const OPHAN_COMPONENT_EVENT_REMINDER_OPEN = {
	component: {
		componentType: 'ACQUISITIONS_OTHER',
		id: OPHAN_COMPONENT_ID_REMINDER_OPEN,
	},
	action: 'CLICK',
} as const satisfies ComponentEvent;

export const OPHAN_COMPONENT_EVENT_REMINDER_SET = {
	component: {
		componentType: 'ACQUISITIONS_OTHER',
		id: OPHAN_COMPONENT_ID_REMINDER_SET,
	},
	action: 'CLICK',
} as const satisfies ComponentEvent;

export const OPHAN_COMPONENT_EVENT_REMINDER_CLOSE = {
	component: {
		componentType: 'ACQUISITIONS_OTHER',
		id: OPHAN_COMPONENT_ID_REMINDER_CLOSE,
	},
	action: 'CLICK',
} as const satisfies ComponentEvent;

export const OPHAN_COMPONENT_ARTICLE_COUNT_OPT_OUT_OPEN = {
	component: {
		componentType: 'ACQUISITIONS_OTHER',
		id: OPHAN_COMPONENT_ID_ARTICLE_COUNT_OPT_OUT_OPEN,
	},
	action: 'CLICK',
} as const satisfies ComponentEvent;

export const OPHAN_COMPONENT_ARTICLE_COUNT_OPT_OUT_CLOSE = {
	component: {
		componentType: 'ACQUISITIONS_OTHER',
		id: OPHAN_COMPONENT_ID_ARTICLE_COUNT_OPT_OUT_CLOSE,
	},
	action: 'CLICK',
} as const satisfies ComponentEvent;

export const OPHAN_COMPONENT_ARTICLE_COUNT_STAY_IN = {
	component: {
		componentType: 'ACQUISITIONS_OTHER',
		id: OPHAN_COMPONENT_ID_ARTICLE_COUNT_STAY_IN,
	},
	action: 'CLICK',
} as const satisfies ComponentEvent;

export const OPHAN_COMPONENT_ARTICLE_COUNT_OPT_OUT = {
	component: {
		componentType: 'ACQUISITIONS_OTHER',
		id: OPHAN_COMPONENT_ID_ARTICLE_COUNT_OPT_OUT,
	},
	action: 'CLICK',
} as const satisfies ComponentEvent;

export const OPHAN_COMPONENT_ARTICLE_COUNT_STAY_OUT = {
	component: {
		componentType: 'ACQUISITIONS_OTHER',
		id: OPHAN_COMPONENT_ID_ARTICLE_COUNT_STAY_OUT,
	},
	action: 'CLICK',
} as const satisfies ComponentEvent;

export const OPHAN_COMPONENT_ARTICLE_COUNT_OPT_IN = {
	component: {
		componentType: 'ACQUISITIONS_OTHER',
		id: OPHAN_COMPONENT_ID_ARTICLE_COUNT_OPT_IN,
	},
	action: 'CLICK',
} as const satisfies ComponentEvent;

export const OPHAN_COMPONENT_SIGN_IN = {
	component: {
		componentType: 'ACQUISITIONS_OTHER',
		id: OPHAN_COMPONENT_ID_SIGN_IN,
	},
	action: 'CLICK',
} as const satisfies ComponentEvent;
