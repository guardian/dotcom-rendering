import moment from 'moment';
import { Option, Some, None } from 'types/Option'; 

function isToday(date: Date): boolean {
    const today = new Date();
    return (date.toDateString() === today.toDateString());
}

function isWithin24Hours(date: Date): boolean {
    const today = new Date();
    return (date.valueOf() > (today.valueOf() - (24 * 60 * 60 * 1000)));
}

function isWithinPastWeek(date: Date): boolean {
    const daysAgo = new Date().valueOf() - (7 * 24 * 60 * 60 * 1000);
    return date.valueOf() >= daysAgo;
}

function isWithinPastYear(date: Date): boolean {
    const weeksAgo = new Date().valueOf() - (52 * 7 * 24 * 60 * 60 * 1000);
    return date.valueOf() >= weeksAgo;
}

function isValidDate(date: Date): boolean {
    if (Object.prototype.toString.call(date) !== '[object Date]') {
        return false;
    }
    return !isNaN(date.getTime());
}

export function makeRelativeDate(date: Date): Option<string> {
    const then: Date = new Date(date);
    const now: Date = new Date();

    if (!isValidDate(then)) {
        return new None();
    }

    const delta: number = parseInt(`${(now.valueOf() - then.valueOf()) / 1000}`, 10);

    if (delta < 0) {
        return new None();
    } else if (delta < 55) {
        return new Some(`${delta}s`);
    } else if (delta < (55 * 60)) {
        const minutesAgo = Math.round(delta / 60);

        if (minutesAgo === 1) {
            return new Some('Now');
        } else {
            return new Some(`${minutesAgo}m ago`);
        }
    } else if (isToday(then) || isWithin24Hours(then)) {
        const hoursAgo = Math.round(delta / 3600);
        return new Some(`${hoursAgo}h ago`);
    } else if (isWithinPastWeek(then)) {
        const daysAgo = Math.round(delta / 3600 / 24);
        return new Some(`${daysAgo}d ago`);
    } else if (isWithinPastYear(then)) {
        const weeksAgo = Math.round(delta / 3600 / 24 / 7);
        return new Some(`${weeksAgo}w ago`);
    } else {
        const yearsAgo = Math.round(delta / 3600 / 24 / 7 / 52);
        return new Some(`${yearsAgo}y ago`);
    }
}

export function formatDate(date: Date) : string {
    return moment(date).format('HH:mm dddd, D MMMM YYYY');
}
