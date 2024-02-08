type Result<Err, Value> =
	| {
			kind: 'ok';
			value: Value;
	  }
	| {
			kind: 'error';
			error: Err;
	  };

const ok = <Err, Value>(value: Value): Result<Err, Value> => ({
	kind: 'ok',
	value,
});

const error = <Err, Value>(err: Err): Result<Err, Value> => ({
	kind: 'error',
	error: err,
});

export type { Result };

export { ok, error };
