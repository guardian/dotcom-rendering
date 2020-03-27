// ----- Imports ----- //

import { FC, ReactNode } from 'react';
import React from '@emotion/core';

// ----- Component ----- //

interface Props {
    children?: ReactNode;
}

const Paragraph: FC<Props> = ({ children }: Props) =>
    <p>{children}</p>;


// ----- Exports ----- //

export default Paragraph;
