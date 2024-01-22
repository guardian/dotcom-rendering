type Result<E, A> =
	| {
			kind: 'success';
			value: A;
	  }
	| {
			kind: 'error';
			error: E;
	  };

export type { Result };
