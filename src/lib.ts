// ----- Functions ----- //

const compose = <A, B, C>(f: (_b: B) => C, g: (_a: A) => B) => (a: A): C => f(g(a));

const hexToRGBA = (hex: string, alpha: number): string => {
    const [r, g, b] = hex.match(/\w\w/g)
      ?.map((x: string): number => parseInt(x, 16)) ?? [0, 0, 0];
    return `rgba(${r},${g},${b},${alpha})`;
  };

// ----- Exports ----- //

export {
    compose,
    hexToRGBA,
};
