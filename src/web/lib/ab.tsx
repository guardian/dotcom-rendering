import React from 'react';

import { AB as ABConstructor, ABTest, CoreAPI } from '@guardian/ab-rendering';

import { getCookie } from '@root/src/web/browser/cookie';

/**
 * Usage
 *
 * import { ABProvider, useAB } from './ab';
 *
 * const Example = () => {
 *   const AB = useAB();
 *   if (AB === null) return <p>IhaveNoMvtCookie</p>;
 *   if (AB.isUserInVariant('DummyTest', 'variant')) return <p>InTheTest</p>;
 *   return <p>NotInTest</p>;
 * };
 *
 * export const WithProvider = (abConfig) => (
 *   <ABProvider { ...abConfig } >
 *     <Example />
 *   </ABProvider>
 * )
 */

/**
 * ABContext is the global context container for the AB object
 *
 * undefined = Not yet defined, pending cookie read
 * null = No cookie or cookie value invalid
 * CoreAPI = Is the AB API as exported from ab-rendering
 */
const ABContext = React.createContext<CoreAPI | undefined | null>(undefined);

/**
 * ABProvider sets an instance of ABContext
 *
 * Each instance of AB reads the cookie and has its own config. For DCR, you probably
 * only need one instance but wrapping the whole App has the disadvantage of blocking
 * on cookie read. An alternative could be to wrap sections or individual components in
 * their own ABProviders
 */
export const ABProvider = ({
    tests,
    switches,
    isSensitive,
    mvtMax = 1000000,
    children,
}: {
    tests: ABTest[];
    switches: { [key: string]: boolean };
    isSensitive: boolean;
    mvtMax?: number;
    children: React.ReactNode;
}) => {
    const mvtCookie = getCookie('GU_mvt_id');
    const mvtId = mvtCookie && parseInt(mvtCookie, 10);

    return (
        <ABContext.Provider
            value={
                // If mvtId is not a number it was either invalid or no cookie
                // was found. In which case, we set AB to null
                typeof mvtId === 'number'
                    ? new ABConstructor({
                          mvtCookieId: mvtId,
                          mvtMaxValue: mvtMax,
                          pageIsSensitive: isSensitive,
                          abTestSwitches: switches,
                          arrayOfTestObjects: tests,
                      })
                    : null
            }
        >
            {children}
        </ABContext.Provider>
    );
};

/**
 * useAB is a wrapper around React.useContext(ABContext) to provide a
 * check to make sure there is a ABProvider parent and throw a useful
 * message if not
 */
export const useAB = () => {
    const context = React.useContext(ABContext);
    if (context === undefined) {
        throw new Error('useAB must be used within the ABProvider');
    }
    return context;
};
