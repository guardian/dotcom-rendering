import type { UpdateDictionaryItemRequest } from "./client.ts";
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
