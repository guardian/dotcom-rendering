import { basePx, baseMultiply, darkModeCss } from "./styles";
import { getThemeStyles } from "themeStyles";
import { Pillar } from "@guardian/types/Format";

describe("helper functions return correct styles", () => {
    test("Calculates base pixels", () => {
        expect(basePx(1)).toBe("8px");
    });

    test("Calculates base multiplication", () => {
        expect(baseMultiply(4)).toBe(32);
    });

    test("Returns correct pillar styles for pillar", () => {
        const pillarStyles = getThemeStyles(Pillar.News);
        const expectedNewsPillarStyles = {
            kicker: "#C70000",
            inverted: "#FF5943",
            liveblogBackground: "#AB0613",
            liveblogDarkBackground: "#8B0000",
        };
        expect(pillarStyles).toEqual(expectedNewsPillarStyles);
    });

    test("Returns correct dark mode styles", () => {
        const css = darkModeCss`a { text-decoration: none; color: ${`aliceblue`}; }`;
        const expectedCss = `@media(prefers-color-scheme:dark){a{text-decoration:none;color:aliceblue;}}`;
        expect(css.styles.trim().replace(/\s/g, "")).toEqual(expectedCss);
    });
});
