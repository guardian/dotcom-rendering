import { abTestsDictionaryId, mvtDictionaryId } from "../config.ts";
import type { FastlyClient, UpdateDictionaryItemRequest } from "./client.ts";
import type { FastlyService } from "./service.ts";

export class FastlyDictionary {
	id: string;
	name: string;
	service: FastlyService;

	constructor(
		service: FastlyService,
		{ id, name }: { id: string; name: string },
	) {
		this.service = service;
		this.id = id;
		this.name = name;
	}

	async getItems() {
		return this.service.getDictionaryItems(this.id);
	}

	async updateItems(items: UpdateDictionaryItemRequest[]) {
		return this.service.updateDictionaryItems(this.id, items);
	}
}

export const getMVTGroupsFromDictionary = (client: FastlyClient) =>
	client.getDictionaryItems({
		dictionaryId: mvtDictionaryId,
	});

export const getABTestGroupsFromDictionary = (client: FastlyClient) =>
	client.getDictionaryItems({
		dictionaryId: abTestsDictionaryId,
	});

export const updateMVTGroups = (
	client: FastlyClient,
	items: UpdateDictionaryItemRequest[],
) =>
	client.updateDictionaryItems({
		dictionaryId: mvtDictionaryId,
		items,
	});

export const updateABTestGroups = (
	client: FastlyClient,
	items: UpdateDictionaryItemRequest[],
) =>
	client.updateDictionaryItems({
		dictionaryId: abTestsDictionaryId,
		items,
	});
