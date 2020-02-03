import React, { Component } from 'react';
import { shouldShow } from '@guardian/consent-management-platform';
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
