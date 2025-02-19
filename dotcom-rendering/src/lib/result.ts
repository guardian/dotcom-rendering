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

const okOrThrow = <E, A>(result: Result<E, A>, throwMessage: string): A => {
	if (result.kind === 'error') {
		throw new Error(throwMessage);
	}

	return result.value;
};

const errorOrThrow = <E, A>(result: Result<E, A>, throwMessage: string): E => {
	if (result.kind === 'ok') {
		throw new Error(throwMessage);
	}

	return result.error;
};

export type { Result };

export { ok, error, okOrThrow, errorOrThrow };
