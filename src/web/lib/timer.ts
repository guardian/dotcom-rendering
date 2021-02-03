// A higher order timer for measuring sections of an overall timeline

const perf = window.performance;

export class Timer {
	handleMeasurement: (measureName: string, measurement: number) => any;

	namePrefix: string;

	constructor(
		namePrefix: string,
		handleMeasurement: (measureName: string, measurement: number) => any,
	) {
		this.handleMeasurement = handleMeasurement;
		this.namePrefix = namePrefix;
	}

	private marks: Array<string> = [];

	private createMark(newMark: string) {
		perf.mark(newMark);
		this.marks.push(newMark);
	}

	start() {
		this.createMark(this.namePrefix);
	}

	// Measures time taken since previous mark and passes it to handleMeasurement()
	pip(nameSuffix: string) {
		const { length } = this.marks;
		if (length === 0) {
			// The start() method has not been run first
			return;
		}

		const startMark = this.marks[length - 1];
		const endMark = `${this.namePrefix}-${length - 1}-${nameSuffix}`;
		// 'length - 1' used here to help sequence measurements in receiving platform

		this.createMark(endMark);
		perf.measure(endMark, startMark, endMark);
		const measurement = perf.getEntriesByName(endMark, 'measure');

		this.handleMeasurement(endMark, measurement[0].duration);
	}

	clear() {
		// Remove all marks and measures created
		perf.clearMarks(this.namePrefix);
		this.marks.forEach((markName) => {
			perf.clearMarks(markName);
			perf.clearMeasures(markName);
		});
	}
}

// e.g.
// const createLogTimer = (name: string) =>
// 	new Timer(name, (measureName, measurement) =>
// 		console.log(measureName, measurement),
// 	);

// const logTimer = createLogTimer('myTimer');

// logTimer.start();
