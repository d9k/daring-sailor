export class IntXY {
    constructor(
        public x: number,
        public y: number
    ) {}

    toKey(): string {
        return `${this.x}_${this.y}`;
    }

    static fromKey(key: string): IntXY {
        const [x, y] = key.split('_');
        return new IntXY(Number(x), Number(y));
    }

    offset(dx: number, dy: number): IntXY {
        return new IntXY(this.x + dx, this.y + dy);
    }
}
