import React from 'react';

export const GoogleSubscribeButton: React.FC = () => (
    <section>
        <button
            subscriptions-action="subscribe"
            subscriptions-service="subscribe.google.com"
            subscriptions-display="true"
        >
            Subscribe
        </button>
    </section>
);
