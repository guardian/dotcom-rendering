import React, { Component } from 'react';
import {
    shouldShow,
    setErrorHandler,
} from '@guardian/consent-management-platform';
import { ConsentManagementPlatform } from '@guardian/consent-management-platform/lib/ConsentManagementPlatform';

export class CMP extends Component<{}, { show: boolean }> {
    constructor(props: {}) {
        super(props);

        this.state = {
            show: false,
        };
    }

    public componentDidMount() {
        if (shouldShow()) {
            this.setState({ show: true });

            // setErrorHandler takes function to be called on errors in the CMP UI
            setErrorHandler((errMsg: string): void => {
                const err = new Error(errMsg);

                window.guardian.modules.sentry.reportError(err, 'cmp');
            });
        }
    }

    public render() {
        const { show } = this.state;
        const { cmpUi } = window.guardian.app.data.CAPI.config.switches;

        if (!show || !cmpUi) {
            return null;
        }

        const props = {
            source: 'dcr',
            onClose: () => {
                this.setState({ show: false });
            },
        };

        return <ConsentManagementPlatform {...props} />;
    }
}
