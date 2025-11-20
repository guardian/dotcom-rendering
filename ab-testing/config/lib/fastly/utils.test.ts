import { deepEqual, equal } from "node:assert";
import test from "node:test";
import { calculateUpdates, encodeObject } from "./utils.ts";

test("calculateUpdates - creates new items", () => {
	const currentDictionary: Array<{ item_key: string; item_value: string }> =
		[];
	const newDictionary = [
		{ item_key: "test1", item_value: "value1" },
		{ item_key: "test2", item_value: "value2" },
	];

	const result = calculateUpdates(newDictionary, currentDictionary);

	equal(result.length, 2);
	deepEqual(result[0], {
		item_key: "test1",
		item_value: "value1",
		op: "create",
	});
	deepEqual(result[1], {
		item_key: "test2",
		item_value: "value2",
		op: "create",
	});
});

test("calculateUpdates - updates existing items", () => {
	const currentDictionary = [
		{ item_key: "test1", item_value: "old_value1" },
		{ item_key: "test2", item_value: "value2" },
	];
	const newDictionary = [
		{ item_key: "test1", item_value: "new_value1" },
		{ item_key: "test2", item_value: "value2" },
	];

	const result = calculateUpdates(newDictionary, currentDictionary);

	equal(result.length, 1);
	deepEqual(result[0], {
		item_key: "test1",
		item_value: "new_value1",
		op: "update",
	});
});

test("calculateUpdates - deletes removed items", () => {
	const currentDictionary = [
		{ item_key: "test1", item_value: "value1" },
		{ item_key: "test2", item_value: "value2" },
	];
	const newDictionary = [{ item_key: "test1", item_value: "value1" }];

	const result = calculateUpdates(newDictionary, currentDictionary);

	equal(result.length, 1);
	deepEqual(result[0], {
		item_key: "test2",
		op: "delete",
	});
});

test("calculateUpdates - no changes needed", () => {
	const currentDictionary = [
		{ item_key: "test1", item_value: "value1" },
		{ item_key: "test2", item_value: "value2" },
	];
	const newDictionary = [
		{ item_key: "test1", item_value: "value1" },
		{ item_key: "test2", item_value: "value2" },
	];

	const result = calculateUpdates(newDictionary, currentDictionary);

	equal(result.length, 0);
});

test("calculateUpdates - combination of operations", () => {
	const currentDictionary = [
		{ item_key: "keep", item_value: "same_value" },
		{ item_key: "update", item_value: "old_value" },
		{ item_key: "delete", item_value: "will_be_deleted" },
	];
	const newDictionary = [
		{ item_key: "keep", item_value: "same_value" },
		{ item_key: "update", item_value: "new_value" },
		{ item_key: "create", item_value: "new_item" },
	];

	const result = calculateUpdates(newDictionary, currentDictionary);

	equal(result.length, 3);

	const deleteOp = result.find((op) => op.op === "delete");
	deepEqual(deleteOp, {
		item_key: "delete",
		op: "delete",
	});

	const updateOp = result.find((op) => op.op === "update");
	deepEqual(updateOp, {
		item_key: "update",
		item_value: "new_value",
		op: "update",
	});

	const createOp = result.find((op) => op.op === "create");
	deepEqual(createOp, {
		item_key: "create",
		item_value: "new_item",
		op: "create",
	});
});

test("encodeObject - encodes object to string", () => {
	const obj = {
		test: "value",
		another: 123,
		bool: true,
	};

	const result = encodeObject(obj);
	equal(result, "test=value,another=123,bool=true");
});

test("encodeObject - handles arrays", () => {
	const arr = ["test", "another"];

	const result = encodeObject(arr);
	equal(result, "0=test,1=another");
});
