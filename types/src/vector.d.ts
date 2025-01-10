export declare class Vector {
    private arr;
    constructor(n: number | number[], fill?: number);
    copy(): Vector;
    dim(): number;
    _assertDimensions(v: Vector): void;
    get(i: number): number;
    set(i: number, val: any): void;
    add(v: Vector): this;
    subtract(v: Vector): this;
    hadamard(v: Vector): this;
    dot(v: Vector): number;
    cross(v: Vector): Vector;
    multiply(s: number): this;
    norm(): number;
    unit(): this;
    toArr(): number[];
}
