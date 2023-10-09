export class MorningDate extends Date {
	constructor(date) {
		super(date);
		if (date) {
			return new Date(date);
		}
		return new Date(2023, 9, 9, 9, 30, 0);
	}
}

export class AfternoonDate extends Date {
	constructor(date) {
		super(date);
		if (date) {
			return new Date(date);
		}
		return new Date(2023, 9, 9, 17, 30, 0);
	}
}
