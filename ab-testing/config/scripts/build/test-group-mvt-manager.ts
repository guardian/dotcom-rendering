import { MVT_COUNT } from "../../lib/constants.ts";
import type { AudienceSpace } from "../../lib/types.ts";

/**
 * A class to manage MVTs for test groups in a test space.
 *
 * This class handles the allocation, resizing, and deletion of MVTs for A/B test groups.
 * It ensures that existing test groups retain their mvts aka users in the tests.
 */
class TestGroupMVTManager {
	/**
	 * A map of test groups to their MVTs.
	 * The key is the test name and group, e.g. "test1:group1",
	 * and the value is an array of MVTs assigned to that group.
	 */
	testGroups: Map<string, number[]>;

	private occupiedMVTs: Set<number>;
	private availableMVTs: number[];

	/**
	 * Create a new TestGroupMVTs instance.
	 * @param mvtGroups - An array of current MVT groups from the Fastly dictionary.
	 */
	constructor(mvtGroups: AudienceSpace) {
		this.testGroups = new Map(
			Object.entries(
				mvtGroups
					.entries()
					.reduce<Record<string, number[]>>(
						(acc, [key, { name }]) => {
							const mvt = parseInt(key.split(":")[1] ?? "", 10);
							// Skip invalid MVT values (NaN)
							if (!Number.isNaN(mvt)) {
								if (!acc[name]) {
									acc[name] = [mvt];
								} else {
									acc[name].push(mvt);
								}
							}
							return acc;
						},
						{},
					),
			),
		);
		this.occupiedMVTs = new Set(
			Array.from(this.testGroups.values()).flat(),
		);

		this.availableMVTs = Array.from({ length: MVT_COUNT }, (_, i) => i)
			.filter((i) => !this.occupiedMVTs.has(i))
			.sort((a, b) => a - b);

		console.log(
			`Initialized TestGroupMVTs with ${this.availableMVTs.length} available MVTs`,
		);
	}

	/**
	 * Get a test group by name.
	 * @param name - The name of the test group.
	 */
	getTestGroup(name: string): number[] | undefined {
		return this.testGroups.get(name);
	}

	/**
	 * Add a new test group with the specified size.
	 * @param name - The name of the test group.
	 * @param size - The number of MVTs to assign to the test group.
	 */
	addTestGroup(name: string, size: number) {
		if (this.availableMVTs.length < size) {
			throw new Error(`Not enough available MVTs for test ${name}`);
		}
		if (this.testGroups.has(name)) {
			throw new Error(`Test ${name} already exists`);
		}
		const mvts = this.availableMVTs.splice(0, size);
		this.testGroups.set(name, mvts);
		mvts.forEach((mvt) => {
			this.occupiedMVTs.add(mvt);
		});
	}

	/**
	 * Resize an existing test group to a new size.
	 * @param name - The name of the test group.
	 * @param newSize - The new number of MVTs to assign to the test group.
	 */
	resizeTestGroup(name: string, newSize: number) {
		if (!this.testGroups.has(name)) {
			throw new Error(`Test ${name} does not exist`);
		}

		const currentMVTs = this.testGroups.get(name) ?? [];
		const currentSize = currentMVTs.length;

		if (newSize > currentSize) {
			const additionalMVTsNeeded = newSize - currentSize;
			if (this.availableMVTs.length < additionalMVTsNeeded) {
				throw new Error(`Not enough available MVTs for test ${name}`);
			}
			for (let i = 0; i < additionalMVTsNeeded; i++) {
				const mvtIndex = this.availableMVTs.shift();
				if (mvtIndex !== undefined) {
					currentMVTs.push(mvtIndex);
					this.occupiedMVTs.add(mvtIndex);
				}
			}
		} else if (newSize < currentSize) {
			const removedMVTs = currentMVTs.slice(newSize);
			removedMVTs.forEach((mvt) => {
				this.occupiedMVTs.delete(mvt);
				this.availableMVTs.push(mvt);
			});
			currentMVTs.length = newSize;
			// Keep available MVTs sorted in ascending order
			this.availableMVTs.sort((a, b) => a - b);
		}
		this.testGroups.set(name, currentMVTs);
	}

	/**
	 * Delete a test group and free its MVTs.
	 * @param name - The name of the test group to delete.
	 */
	deleteTestGroup(name: string) {
		const mvts = this.testGroups.get(name);
		if (mvts) {
			mvts.forEach((mvt) => {
				this.occupiedMVTs.delete(mvt);
				this.availableMVTs.push(mvt);
			});
			this.testGroups.delete(name);
			// Keep available MVTs sorted in ascending order
			this.availableMVTs.sort((a, b) => a - b);
		}
	}
}

export { TestGroupMVTManager };
