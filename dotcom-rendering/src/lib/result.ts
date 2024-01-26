type Result<Err, Value> =
	| {
			kind: 'ok';
			value: Value;
	  }
	| {
			kind: 'error';
			error: Err;
	  };

export type { Result };
