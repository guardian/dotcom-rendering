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

        if (!show) {
            return null;
        }

        const props = {
            source: 'dcr',
            onClose: () => {
                this.setState({ show: false });
            },
            fontFamilies: {
                headlineSerif: 'GH Guardian Headline, Georgia, serif',
                bodySerif: 'GuardianTextEgyptian, Georgia, serif',
                bodySans:
                    'GuardianTextSans, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif',
            },
        };

        return <ConsentManagementPlatform {...props} />;
    }
}
