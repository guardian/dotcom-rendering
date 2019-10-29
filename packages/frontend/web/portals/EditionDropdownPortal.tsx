import React from 'react';
import { createPortal } from 'react-dom';

import { EditionDropdown } from '@frontend/web/components/Header/EditionDropdown';

export const EditionDropdownPortal = ({
    CAPI,
}: {
    CAPI: CAPIType;
}): React.ReactPortal | null => {
    const EditionDropdownRoot = document.getElementById(
        'edition-dropdown-portal',
    );
    if (!EditionDropdownRoot) {
        return null;
    }
    return createPortal(
        <EditionDropdown
            edition={CAPI.editionId}
            dataLinkName={'nav2 : topbar : edition-picker: toggle'}
        />,
        EditionDropdownRoot,
    );
};
