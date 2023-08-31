import { startPerformanceMeasure } from '@guardian/libs';

const START = Date.now();

/**
 * Keeps a count of how many tasks are currently running, so we can manage concurrency.
 */
let RUNNING_TASK_COUNT = 0;

/**
 * The maximum amount of concurrent tasks.
 * @default Infinity
 */
let CONCURRENCY_COUNT = Infinity;

/**
 * Possible task priorities.
 *
 * These are the Guardian's priorities, not the user's or browser's.
 *
 * The order of this array is important. Tasks are batched according to these
 * priorities, and the scheduler will prefer the priority with the lowest index.
 **/
const PRIORITIES = ['critical', 'feature', 'enhancement'] as const;
export type TaskPriority = (typeof PRIORITIES)[number];

/**
 * A thing that a consumer want to do. Should be a function that returns a promise.
 */
type Task<T> = (...args: unknown[]) => Promise<T>;

/**
 * A function that determines whether or not a task can be run.
 */
type CanRun = ({ runningTime }: { runningTime: number }) => boolean;

/**
 * Internal representation of a task. This is what the scheduler actually uses.
 */
type QueueableTask<T = unknown> = {
	name: string;
	task: Task<T>;
	/** Resolves the promise that `schedule()` (below) returns. */
	resolver: (value: T) => void;
	canRun: CanRun;
};

/**
 * Stores scheduled tasks in a queue, grouped by priority.
 */
const queue: Record<
	TaskPriority,
	{
		/**
		 * The number of milliseconds after which tasks of a this priority
		 * will no longer be run.
		 *
		 * @default Infinity
		 */
		lastStartTime: number;
		tasks: QueueableTask[];
	}
> = {
	critical: { lastStartTime: Infinity, tasks: [] },
	feature: { lastStartTime: Infinity, tasks: [] },
	enhancement: { lastStartTime: Infinity, tasks: [] },
};

/**
 * Checks whether there's spare task-running capacity.
 */
function atConcurrencyLimit() {
	return RUNNING_TASK_COUNT === CONCURRENCY_COUNT;
}

/**
 * Gets the next task to run, according to priority and the order they were
 * scheduled.
 */
function getNextTask() {
	if (atConcurrencyLimit()) return undefined;

	const runningTime = Date.now() - START;

	for (const priority of PRIORITIES) {
		const { lastStartTime, tasks } = queue[priority];
		const nextTask = tasks.shift();
		if (runningTime <= lastStartTime && nextTask?.canRun({ runningTime })) {
			return nextTask;
		}
	}

	// found no suitable tasks, so return undefined
	return undefined;
}

/**
 * Handles running tasks.
 *
 * Gets the next eligible task from the queue, executes it, then calls the
 * task's resolver with the result.
 *
 * If there are no tasks to run, or the maximum number of tasks are already
 * running, then it does nothing.
 */
function run() {
	const nextTask = getNextTask();
	if (!nextTask) return;

	RUNNING_TASK_COUNT++;

	const { name, task, resolver } = nextTask;
	const { endPerformanceMeasure } = startPerformanceMeasure(
		'dotcom',
		'scheduler',
		name,
	);
	task()
		.then(resolver)
		.catch(console.error)
		.finally(() => {
			endPerformanceMeasure();
			RUNNING_TASK_COUNT--;
			run();
		});
}

export type ScheduleOptions = {
	priority: TaskPriority;
	canRun?: CanRun;
};

/**
 * Schedules a task for execution.
 * @param name Human name for the task, used for logging etc.
 * @param task The thing you want to do. This should be a function that
 * returns a promise. Make sure its an _honest_ promise! If you just return
 * `Promise.resolve()` to keep the compiler happy, then the scheduler will
 * think the task instantly completed and start the next one too soon.
 * @param options Options for scheduling a task.
 * @param {TaskPriority} options.priority Priority of the task. Tasks with
 * higher priority will be run first. Defaults to `'standard'`.
 * @returns A promise that resolves when the task completes.
 */
export async function schedule<T>(
	name: string,
	task: Task<T>,
	{ priority, canRun = () => true }: ScheduleOptions,
): Promise<T> {
	const queueableTask: Partial<QueueableTask<T>> = { name, task, canRun };

	const scheduledTask = new Promise<T>(
		(resolve) => (queueableTask.resolver = resolve),
	);

	// we know this is safe because we know function in the new Promise above
	// is synchronous (even if TS doesn't)
	queue[priority].tasks.push(queueableTask as QueueableTask);
	run();
	return scheduledTask;
}

export function setSchedulerConcurrency(
	concurrency: typeof CONCURRENCY_COUNT,
): void {
	CONCURRENCY_COUNT = concurrency;
}

export function setSchedulerPriorityLastStartTime(
	priority: TaskPriority,
	lastStartTime: number,
): void {
	queue[priority].lastStartTime = lastStartTime;
	run();
}
