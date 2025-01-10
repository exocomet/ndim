import { Vector } from "./vector.js";
interface Indexable {
    [key: string | number]: any;
}
export declare class Matrix implements Indexable {
    [k: string]: any;
    private arr;
    constructor(m: Matrix | number[][] | number, n?: number);
    dim(): number[];
    copy(): Matrix;
    isSquare(): boolean;
    apply(func: any): this;
    fill(obj: any): this;
    transpose(): this;
    get(i: number, j: number): number;
    set(i: number, j: number, v: number | any): void;
    getRow(i: number): Vector;
    getColumn(j: number): Vector;
    multiply(b: Matrix): this;
    add(b: Matrix): this;
    hadamard(b: Matrix): this;
    scalar(s: number): this;
    mirrorColumns(): this;
    mirrorRows(): this;
    toArr(): number[][];
}
export {};
