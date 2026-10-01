export function randomIntInRange(
    minIncluding: number,
    maxIncluding: number
): number {
    return (
        minIncluding +
        Math.floor(Math.random() * (maxIncluding - minIncluding + 1))
    );
}
