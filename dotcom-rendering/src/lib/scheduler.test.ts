import {
	schedule,
	setSchedulerConcurrency,
	setSchedulerPriorityLastStartTime,
} from './scheduler';

jest.useFakeTimers();

describe('scheduler', () => {
	beforeEach(() => {
		jest.clearAllTimers();
		jest.clearAllMocks();
	});

	it('should run scheduled tasks', async () => {
		const task = jest.fn().mockResolvedValue('task result');
		const result = await schedule('testTask', task, {
			priority: 'feature',
		});

		expect(result).toBe('task result');
		expect(task).toHaveBeenCalled();
	});

	it('should not run tasks that should not run', async () => {
		const taskWillRun = jest.fn().mockResolvedValue('will run result');
		const taskWillNotRun = jest
			.fn()
			.mockResolvedValue('will not run result');

		const willRunResult = schedule('will run', taskWillRun, {
			priority: 'feature',
			canRun: () => true,
		});

		void schedule('will not run', taskWillNotRun, {
			priority: 'feature',
			canRun: () => false,
		});

		expect(taskWillRun).toHaveBeenCalled();
		expect(taskWillNotRun).not.toHaveBeenCalled();

		jest.runAllTimers();

		expect(await willRunResult).toBe('will run result');
		expect(taskWillNotRun).not.toHaveBeenCalled();
	});

	it('should not run tasks after their last start time', () => {
		setSchedulerPriorityLastStartTime('enhancement', 1000);

		const enhancement = jest.fn().mockResolvedValue('task result');
		const feature = jest.fn().mockResolvedValue('task result');

		jest.advanceTimersByTime(10_000);

		void schedule('enhancement', enhancement, {
			priority: 'enhancement',
		});
		void schedule('feature', feature, {
			priority: 'feature',
		});

		expect(enhancement).not.toHaveBeenCalled();
		expect(feature).toHaveBeenCalled();
	});

	it('should use concurrency', async () => {
		setSchedulerConcurrency(2);

		const task1 = jest.fn().mockResolvedValue('task1 result');
		const task2 = jest.fn().mockResolvedValue('task2 result');
		const task3 = jest.fn().mockResolvedValue('task3 result');

		const scheduledTask1 = schedule('testTask1', task1, {
			priority: 'feature',
		});
		const scheduledTask2 = schedule('testTask2', task2, {
			priority: 'feature',
		});
		void schedule('testTask3', task3, {
			priority: 'feature',
		});

		expect(task1).toHaveBeenCalled();
		expect(task2).toHaveBeenCalled();
		expect(task3).not.toHaveBeenCalled();

		jest.runAllTimers();

		await Promise.race([scheduledTask1, scheduledTask2]);

		expect(task3).toHaveBeenCalled();
	});

	it('should prefer higher priority tasks', async () => {
		setSchedulerConcurrency(1);

		const mockResolvedValueAfterDelay = (value: string, delay: number) =>
			jest
				.fn()
				.mockImplementation(
					() =>
						new Promise((res) =>
							setTimeout(() => res(value), delay),
						),
				);

		const featureTask1 = mockResolvedValueAfterDelay(
			'feature task 1 result',
			1000,
		);
		const featureTask2 = mockResolvedValueAfterDelay(
			'feature task 2 result',
			500,
		);
		const criticalTask = mockResolvedValueAfterDelay(
			'critical task result',
			250,
		);

		const featureTask1Result = schedule('feature  task 1', featureTask1, {
			priority: 'feature',
		});
		const featureTask2Result = schedule('feature  task 2', featureTask2, {
			priority: 'feature',
		});
		const criticalTaskResult = schedule('critical', criticalTask, {
			priority: 'critical',
		});

		expect(featureTask1).toHaveBeenCalled();
		expect(featureTask2).not.toHaveBeenCalled();
		expect(criticalTask).not.toHaveBeenCalled();

		jest.runAllTimers();

		await expect(featureTask1Result).resolves.toBe('feature task 1 result');
		expect(featureTask2).not.toHaveBeenCalled();
		expect(criticalTask).toHaveBeenCalled();

		jest.runAllTimers();

		await expect(criticalTaskResult).resolves.toBe('critical task result');
		expect(featureTask2).toHaveBeenCalled();

		jest.runAllTimers();

		expect(await featureTask2Result).toBe('feature task 2 result');
	});
});
