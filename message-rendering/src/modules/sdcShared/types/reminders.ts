export type ReminderPlatform = 'WEB' | 'AMP';

export type ReminderComponent = 'EPIC' | 'BANNER';

export type ReminderStage = 'PRE' | 'POST';

interface BaseSignupRequest {
    email: string;
    reminderPlatform: ReminderPlatform;
    reminderComponent: ReminderComponent;
    reminderStage: ReminderStage;
    country?: string;
    reminderOption?: string;
}

export interface OneOffSignupRequest extends BaseSignupRequest {
    reminderPeriod: string;
}
