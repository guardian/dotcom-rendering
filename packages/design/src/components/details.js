import React, { useRef, useEffect, useState } from 'react';

const Details = ({ children, initialOpenState }) => {
    const deets = useRef();
    const [open, setOpen] = useState(initialOpenState);
    useEffect(
        () => {
            if (deets.current) {
                deets.current.addEventListener('toggle', ev => {
                    setOpen(ev.currentTarget.open);
                });
            }
        },
        [deets],
    );

    return (
        <details ref={deets} open={open}>
            {children}
        </details>
    );
};

export { Details };
