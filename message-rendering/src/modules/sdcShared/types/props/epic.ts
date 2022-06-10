import { z } from 'zod';
import {
    bylineWithImageSchema,
    ctaSchema,
    imageSchema,
    secondaryCtaSchema,
    Stage,
    tickerSettingsSchema,
    Tracking,
    trackingSchema,
} from './shared';
import { OphanComponentEvent } from '../ophan';
import { EpicVariant } from '../abTests';

export interface ArticleCounts {
    for52Weeks: number; // The user's total article view count, which currently goes back as far as 52 weeks
    forTargetedWeeks: number; // The user's article view count for the configured periodInWeeks
}

export type EpicProps = {
    variant: EpicVariant;
    tracking: Tracking;
    countryCode?: string;
    articleCounts: ArticleCounts;
    // eslint-disable-next-line @typescript-eslint/ban-types
    onReminderOpen?: Function;
    email?: string;
    fetchEmail?: () => Promise<string | null>;
    submitComponentEvent?: (componentEvent: OphanComponentEvent) => void;
    openCmp?: () => void;
    hasConsentForArticleCount?: boolean;
    stage?: Stage;
};

/**
 * Props validation
 */
const articleCountsSchema = z.object({
    for52Weeks: z.number(),
    forTargetedWeeks: z.number(),
});

const maxViewsSchema = z.object({
    maxViewsCount: z.number(),
    maxViewsDays: z.number(),
    minDaysBetweenViews: z.number(),
});

const separateArticleCountSchema = z.object({
    type: z.string(),
});

const reminderFieldsSchema = z.object({
    reminderCta: z.string(),
    reminderLabel: z.string(),
    reminderPeriod: z.string(),
});

const variantSchema = z.object({
    name: z.string(),
    heading: z.string().optional(),
    paragraphs: z.array(z.string()),
    highlightedText: z.string().optional(),
    tickerSettings: tickerSettingsSchema.optional(),
    cta: ctaSchema.optional(),
    secondaryCta: secondaryCtaSchema.optional(),
    footer: z.string().optional(),
    image: imageSchema.optional(),
    showReminderFields: reminderFieldsSchema.optional(),
    separateArticleCount: separateArticleCountSchema.optional(),
    maxViews: maxViewsSchema.optional(),
    showSignInLink: z.boolean().optional(),
    bylineWithImage: bylineWithImageSchema.optional(),
});

export const epicPropsSchema = z.object({
    variant: variantSchema,
    tracking: trackingSchema,
    countryCode: z.string().optional(),
    articleCounts: articleCountsSchema,
    onReminderOpen: z.any().optional(),
    email: z.string().optional(),
    fetchEmail: z.any().optional(),
    submitComponentEvent: z.any().optional(),
    openCmp: z.any().optional(),
    hasConsentForArticleCount: z.boolean().optional(),
    stage: z.string().optional(),
});
