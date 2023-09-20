/**
 * Based on
 * - https://wicg.github.io/scheduling-apis
 * - https://gist.github.com/gvergnaud/6c79c8b50342b7572ef4921d6ba380f7
 */

export type TaskPriority = 'user-blocking' | 'user-visible' | 'background';

export interface SchedulerPostTaskOptions {
	priority?: TaskPriority;
	delay?: number;
	signal?: TaskSignal;
}

export interface Scheduler {
	postTask<T>(
		task: (args: any) => any,
		options?: SchedulerPostTaskOptions,
	): Promise<T>;
}

export interface TaskControllerInit {
	priority?: TaskPriority;
}

declare global {
	interface TaskController extends AbortController {
		readonly signal: TaskSignal;
		setPriority(priority: TaskPriority): void;
	}

	interface TaskSignal extends AbortSignal {
		readonly priority: TaskPriority;
		addEventListener(
			type: 'prioritychange' | 'abort',
			listener: (event: Event) => void,
		): void;
	}

	const TaskController: {
		prototype: TaskController;
		new (init?: TaskControllerInit): TaskController;
	};

	const TaskSignal: {
		prototype: TaskSignal;
		new (): TaskSignal;
	};

	const scheduler: Scheduler;

	interface Window {
		scheduler?: Scheduler;
		TaskController?: typeof TaskController;
		TaskSignal?: typeof TaskSignal;
	}
}
