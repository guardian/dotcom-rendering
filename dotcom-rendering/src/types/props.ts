import { Platform } from './platform';

type AppsProps<Props> = Props & { platform: Platform.Apps };
type WebProps<Props> = Props & { platform: Platform.Web };
type AppsOrWeb<Apps, Web> = AppsProps<Apps> | WebProps<Web>;

export type CombinedProps<Common, Apps, Web> =
    Common & AppsOrWeb<Apps, Web>
