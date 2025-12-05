import {
	array,
	assert,
	boolean,
	type Infer,
	nullable,
	number,
	object,
	string,
	type,
} from "superstruct";
import { FastlyService } from "./service.ts";

const fastlyDictionaryItemStruct = object({
	service_id: string(),
	item_key: string(),
	item_value: string(),
	dictionary_id: string(),
	created_at: string(),
	updated_at: string(),
	deleted_at: nullable(string()),
});

export type FastlyDictionaryItem = Infer<typeof fastlyDictionaryItemStruct>;

export type UpdateDictionaryItemRequest =
	| {
			item_key: string;
			item_value: string;
			op: "create" | "update" | "upsert";
	  }
	| {
			item_key: string;
			op: "delete";
	  };

export type ServiceConfig = {
	id: string;
	name: string;
	activeVersion: number;
};

export class FastlyClient {
	apiToken: string;
	baseUrl: string = "https://api.fastly.com";

	constructor(apiToken: string, baseUrl?: string) {
		this.apiToken = apiToken;
		if (baseUrl) {
			this.baseUrl = baseUrl;
		}
	}
	/**
	 * Fetch data from Fastly API
	 * We're using fetch instead of the Fastly API client as it doesn't play nicely with Deno, nor is it typed
	 *
	 * @param url - The URL to fetch
	 * @param options - Fetch options
	 * @returns The parsed JSON response
	 * @throws Error if the response is not ok or if the response cannot be parsed
	 */
	async fetch<T>(url: string, options: RequestInit = {}): Promise<T> {
		const response = await fetch(`${this.baseUrl}/${url}`, {
			...options,
			headers: {
				...options.headers,
				"Fastly-Key": this.apiToken,
			},
		});
		if (!response.ok) {
			console.error(await response.text());
			throw new Error(
				`Failed to fetch from Fastly: ${response.status} ${response.statusText}`,
			);
		}
		const data = (await response.json()) as unknown;
		if (!data) {
			throw new Error(`Failed to parse response from Fastly`);
		}
		return data as T;
	}

	async getService(
		serviceId: string,
		serviceName: string,
	): Promise<FastlyService> {
		const serviceConfig = await this.fetch(`service/${serviceId}`);

		assert(
			serviceConfig,
			type({
				id: string(),
				name: string(),
				versions: array(
					type({
						active: boolean(),
						number: number(),
					}),
				),
			}),
		);

		if (serviceConfig.name !== serviceName) {
			throw new Error(
				`Service with ID ${serviceId} does not match the expected service name ${serviceName}`,
			);
		}

		const activeVersion = serviceConfig.versions.find(
			(v: { active: boolean }) => v.active,
		);

		if (!activeVersion) {
			throw new Error(
				`No active version found for service ${serviceConfig.name}`,
			);
		}

		return new FastlyService(this, {
			id: serviceConfig.id,
			name: serviceConfig.name,
			activeVersion: activeVersion.number,
		});
	}

	async getDictionary({
		activeVersion,
		dictionaryName,
		serviceId,
	}: {
		activeVersion: number;
		dictionaryName: string;
		serviceId: string;
	}): Promise<{ id: string; name: string }> {
		const dictionary = await this.fetch(
			`service/${serviceId}/version/${activeVersion}/dictionary/${dictionaryName}`,
		);
		assert(dictionary, type({ id: string(), name: string() }));

		return dictionary;
	}

	async getDictionaryItems({
		dictionaryId,
		serviceId,
	}: {
		dictionaryId: string;
		serviceId: string;
	}): Promise<FastlyDictionaryItem[]> {
		const dictionary = await this.fetch(
			`service/${serviceId}/dictionary/${dictionaryId}/items?per_page=1000`,
		);

		assert(dictionary, array(fastlyDictionaryItemStruct));

		return dictionary;
	}

	async updateDictionaryItems({
		dictionaryId,
		serviceId,
		items,
	}: {
		dictionaryId: string;
		serviceId: string;
		items: UpdateDictionaryItemRequest[];
	}): Promise<{ status: string }> {
		const dictionary = await this.fetch(
			`service/${serviceId}/dictionary/${dictionaryId}/items`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					service_id: serviceId,
					dictionary_id: dictionaryId,
					items,
				}),
			},
		);

		assert(dictionary, object({ status: string() }));
		if (dictionary.status !== "ok") {
			throw new Error(
				`Failed to update dictionary: ${dictionary.status}`,
			);
		}
		return dictionary;
	}

	/**
	 * Verify that the service and dictionary names match the expected IDs
	 *
	 */
	async verifyDictionaryName({
		serviceId,
		activeVersion,
		dictionaryName,
		dictionaryId,
	}: {
		serviceId: string;
		activeVersion: number;
		dictionaryName: string;
		dictionaryId: string;
	}) {
		const dictionary = await this.getDictionary({
			serviceId,
			activeVersion,
			dictionaryName,
		});

		if (dictionary.id !== dictionaryId) {
			throw new Error(
				`Dictionary ID ${dictionaryId} does not match the expected dictionary ${dictionaryName}`,
			);
		}

		return;
	}
}
