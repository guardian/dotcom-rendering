import type {
	DeleteError,
	InsertError,
	MoveError,
	UpdateError,
} from './appsNav';

export type AppsNavError =
	| {
			kind: 'PublishError';
			details: PublishError;
	  }
	| {
			kind: 'InsertError';
			details: InsertError;
			location: number[];
	  }
	| {
			kind: 'DeleteError';
			details: DeleteError;
			location: number[];
	  }
	| {
			kind: 'MoveError';
			details: MoveError | DeleteError | InsertError;
			location: number[];
			distance: number;
	  }
	| {
			kind: 'UpdateError';
			details: UpdateError;
			location: number[];
	  }
	| {
			kind: 'NoHistoryError';
	  };

export type PublishError = 'VersionMismatch' | 'NetworkError' | 'ServerError';
