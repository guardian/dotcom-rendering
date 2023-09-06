import { createContext, useContext } from 'react';
import type { ApplicationConfig } from '../types/configContext';

/**
 * Context for global, static, immutable values (application configuration)
 *
 * This should not contain anything which will change between re-renders.
 * It is deliberately set with a default context of `undefined` to better
 * surface errors relating to incorrect usage.
 *
 * It is deliberately not exported
 * @see https://kentcdodds.com/blog/how-to-use-react-context-effectively
 */
const ConfigContext = createContext<ApplicationConfig | undefined>(undefined);

export const ConfigProvider = ({
	value,
	children,
}: {
	value: ApplicationConfig;
	children: React.ReactNode;
}) => <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;

/**
 * useContext hook for safely fetching application configuration
 * Ensures that it is used within the relevant Context.Provider
 *
 * @returns {ConfigContext}
 */
export const useConfig = (): ApplicationConfig => {
	const context = useContext(ConfigContext);

	if (context === undefined) {
		throw Error('useConfig must be used within the ConfigContext provider');
	}

	return context;
};
