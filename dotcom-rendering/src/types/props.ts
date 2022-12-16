import type { Platform } from './platform';

type AppsProps<Props> = Props extends void
	? { platform: Platform.Apps }
	: Props & { platform: Platform.Apps };
type WebProps<Props> = Props extends void
	? { platform: Platform.Web }
	: Props & { platform: Platform.Web };

type AppsOrWeb<Apps, Web> = AppsProps<Apps> | WebProps<Web>;

export type CombinedProps<Common, Apps, Web> = Common & AppsOrWeb<Apps, Web>;
