
export enum TickerEndType {
    unlimited = 'unlimited',
    hardstop = 'hardstop', // currently unsupported
}
export enum TickerCountType {
    money = 'money',
    people = 'people',
}
interface TickerCopy {
    countLabel: string;
    goalReachedPrimary: string;
    goalReachedSecondary: string;
}

export interface TickerData {
    total: number;
    goal: number;
}

export interface TickerSettings {
    endType: TickerEndType;
    countType: TickerCountType;
    currencySymbol: string;
    copy: TickerCopy;
    tickerData?: TickerData;
}

export interface Cta {
    text: string;
    baseUrl: string;
}

export interface ReminderFields {
    reminderCTA: string;
    reminderDate: string;
    reminderDateAsString: string;
}

export interface Variant {
    name: string;
    heading?: string;
    paragraphs: string[];
    highlightedText?: string;
    tickerSettings?: TickerSettings;
    cta?: Cta;
    secondaryCta?: Cta;
    footer?: string;
    backgroundImageUrl?: string;
    showReminderFields?: ReminderFields;
}
