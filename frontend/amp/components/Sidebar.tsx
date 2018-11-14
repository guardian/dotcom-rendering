import React from 'react';
import { css } from 'react-emotion';

const sidebarStyles = css`
    width: 80vh;
`;

const template = `
<ul>
    {{ #topLevelSections }}
        <li>
            <amp-accordion>
                <section>
                    <h2
                        data-link-name="amp : nav : secondary : {{ title }}">
                        <i></i>
                        {{ title }}
                    </h2>

                    <ul>
                        {{ #subSections }}
                            <li>
                                <a
                                    href="{{ url }}"
                                    data-link-name="amp : nav : secondary : {{ title }}">
                                    {{ title }}
                                </a>
                            </li>
                        {{ /subSections }}
                    </ul>
                </section>
            </amp-accordion>
        </li>
    {{ /topLevelSections }}
</ul>

<ul
    role="menubar">
    {{ #readerRevenueLinks }}
        <li
            role="menuitem">

            <a
                href="{{ url }}"
                data-link-name="amp : nav : {{ title }}">
                {{ title }}
            </a>
        </li>
    {{ /readerRevenueLinks }}

    <li>
        <a href="@{Configuration.id.url}/signin?INTCMP=DOTCOM_HEADER_SIGNIN"
            data-link-name="amp : nav : sign in"
            >
            Sign in / Register
        </a>
    </li>
</ul>

<ul>
    {{ #secondarySections }}
        <li>
            <a
                href="{{ url }}"
                data-link-name="amp : nav : {{ title }}">
                {{ title }}
            </a>
        </li>
    {{ /secondarySections }}
</ul>
`;

// tslint:disable:react-no-dangerous-html
const Sidebar: React.SFC<{ nav: NavType }> = ({ nav }) => (
    <amp-sidebar class={sidebarStyles} layout="nodisplay" id="sidebar1">
        <amp-list
            layout="fill"
            src="https://amp.theguardian.com/editionalised-nav.json"
        >
            <template type="amp-mustache">
                <div dangerouslySetInnerHTML={{ __html: template }} />
            </template>
            />
        </amp-list>
    </amp-sidebar>
);

export default Sidebar;
