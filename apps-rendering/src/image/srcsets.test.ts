// ----- Imports ----- //

import { Dpr, srcset } from "./srcsets";

// ----- Tests ----- //

describe("srcsets", () => {
  test("show lower quality when DPR is 2", () => {
    const src = srcset(
      "https://media.guim.co.uk/img/media/948ad0a2ebe6d931d8827ea89ac184986af76c1b/0_22_1313_788/master/1313.jpg",
      "",
      Dpr.Two
    );
    expect(src).toContain("quality=45");
  });

  test("show higher quality when DPR is 1", () => {
    const src = srcset(
      "https://media.guim.co.uk/img/media/948ad0a2ebe6d931d8827ea89ac184986af76c1b/0_22_1313_788/master/1313.jpg",
      "",
      Dpr.One
    );
    expect(src).toContain("quality=85");
  });
});
