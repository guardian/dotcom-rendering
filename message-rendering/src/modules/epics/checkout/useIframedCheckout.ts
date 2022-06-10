import { z } from 'zod';
import { useEffect, useRef, useState, RefObject } from 'react';

interface IframedCheckout {
    iframeRef: RefObject<HTMLIFrameElement>;
    iframeHeight: number;
    postReminderClosedMessage: () => void;
}

export function useIframedCheckout(onReminderClicked: () => void): IframedCheckout {
    const [iframeHeight, setIframeHeight] = useState(0);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const handler = (ev: MessageEvent<unknown>) => {
            const result = messageSchema.safeParse(ev.data);

            if (!result.success) {
                return;
            }

            const message = result.data;
            if (message.type === 'IFRAME_HEIGHT') {
                setIframeHeight(message.height);
            } else if (message.type === 'REMINDER_CTA_CLICKED') {
                onReminderClicked();
            }
        };

        window.addEventListener('message', handler);

        return () => window.removeEventListener('message', handler);
    }, []);

    function postReminderClosedMessage() {
        iframeRef.current?.contentWindow?.postMessage({ type: 'REMINDER_CLOSE_CLICKED' }, '*');
    }

    return { iframeRef, iframeHeight, postReminderClosedMessage };
}

// ---- Utils ---- //

const contentSizeMessageSchema = z.object({
    type: z.literal('IFRAME_HEIGHT'),
    height: z.number(),
});

const reminderCtaClickedMessageSchema = z.object({
    type: z.literal('REMINDER_CTA_CLICKED'),
});

const messageSchema = z.union([contentSizeMessageSchema, reminderCtaClickedMessageSchema]);
