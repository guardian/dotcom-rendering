// ----- Imports ----- //
import { Footer } from "@guardian/src-footer";
import { withKnobs } from "@storybook/addon-knobs";
import type { FC, ReactElement } from "react";
import React from "react";
import { footerContents } from "./shared/footer";

const FooterCcpa = (): ReactElement => {
    return <Footer>{footerContents(true)}</Footer>;
};

// ----- Stories ----- //

const Default: FC = (): ReactElement => {
    return <FooterCcpa />;
};

export default {
    component: FooterCcpa,
    title: "Footer",
    decorators: [withKnobs],
};

export { Default };
