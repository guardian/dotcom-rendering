import type { FastlyClient, UpdateDictionaryItemRequest } from "./client.ts";
import { FastlyDictionary } from "./dictionary.ts";

export class FastlyService {
	id: string;
	name: string;
	activeVersion: number;
	client: FastlyClient;

	constructor(
		client: FastlyClient,
		{
			id,
			name,
			activeVersion,
		}: { id: string; name: string; activeVersion: number },
	) {
		this.client = client;
		this.id = id;
		this.name = name;
		this.activeVersion = activeVersion;
	}

	async getDictionary(name: string): Promise<FastlyDictionary> {
		const dictionaryConfig = await this.client.getDictionary({
			activeVersion: this.activeVersion,
			dictionaryName: name,
			serviceId: this.id,
		});

		return new FastlyDictionary(this, dictionaryConfig);
	}

	async getDictionaryItems(dictionaryId: string) {
		return this.client.getDictionaryItems({
			dictionaryId,
			serviceId: this.id,
		});
	}

	async updateDictionaryItems(
		dictionaryId: string,
		items: UpdateDictionaryItemRequest[],
	) {
		return this.client.updateDictionaryItems({
			dictionaryId,
			serviceId: this.id,
			items,
		});
	}

	async verifyDictionaryName({
		dictionaryName,
		dictionaryId,
	}: {
		dictionaryName: string;
		dictionaryId: string;
	}) {
		return this.client.verifyDictionaryName({
			serviceId: this.id,
			activeVersion: this.activeVersion,
			dictionaryName,
			dictionaryId,
		});
	}
}
