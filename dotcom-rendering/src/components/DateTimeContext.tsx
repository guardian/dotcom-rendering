import { isUndefined } from '@guardian/libs';
import { createContext, useContext } from 'react';

/**
 * Context to store current date and time when page is rendered on server.
 *
 * It is deliberately set with a default value of `undefined` to better
 * surface errors relating to incorrect usage and not exported.
 *
 * @see https://kentcdodds.com/blog/how-to-use-react-context-effectively
 */
const DateTimeContext = createContext<number | undefined>(undefined);

/**
 * DateTimeProvider should be included at a high level to ensure child
 * components can access the current date and time
 */
export const DateTimeProvider = ({
	value,
	children,
}: {
	value: number | undefined;
	children: React.ReactNode;
}) => (
	<DateTimeContext.Provider value={value}>
		{children}
	</DateTimeContext.Provider>
);

/**
 * Hook to safely fetch current date and time from context and ensure it is
 * used correctly within an instance of `DateTimeProvider`
 */
export const useDateTime = () => {
	const context = useContext(DateTimeContext);

	if (isUndefined(context)) {
		throw Error('useDateTime must be used within DateTimeProvider');
	}

	return context;
};
