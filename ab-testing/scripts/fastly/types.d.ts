declare module 'fastly' {
	interface Service {
		id: string;
		name: string;
		environments: Array<{
			name: string;
			version: number;
		}>;
	}

	interface Dictionary {
		name: string;
		write_only: boolean;
		id: string;
		service_id: string;
		version: number;
	}

	interface DictionaryItemResponse {
		item_key: string;
		item_value: string;
		created_at: string;
		updated_at: string;
	}

	type BulkUpdateDictionaryItemRequest =
		| {
				item_key: string;
				item_value: string;
				op: 'create' | 'update' | 'upsert';
		  }
		| {
				item_key: string;
				op: 'delete';
		  };

	export class DictionaryItemApi {
		listDictionaryItems(params: {
			service_id: string;
			dictionary_id: string;
			per_page?: number;
			page?: number;
		}): Promise<DictionaryItemResponse[]>;

		bulkUpdateDictionaryItem(params: {
			service_id: string;
			dictionary_id: string;
			bulk_update_dictionary_list_request: BulkUpdateDictionaryItemRequest[];
		}): Promise<{ status?: 'ok' }>;
	}

	export class ApiClient {
		static instance: ApiClient;

		authenticate(token: string): void;
	}

	export type { Service, Dictionary, BulkUpdateDictionaryItemRequest };
}
