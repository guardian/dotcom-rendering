export function interlace<A>(
    xs: A[],
    positions: number[],
    insert: (n: number) => A,
): A[] {
    const xss: A[][] = xs.map((x, i) => {
        const position = positions.indexOf(i);
        if (position === -1) return [x];
        return [insert(position), x];
    });
    return ([] as A[]).concat(...xss);
}
