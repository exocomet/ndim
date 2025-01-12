"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
test('Matrix creation', () => {
    let m = new src_1.Matrix(3, 2);
    expect(m.get(1, 1)).toEqual(0);
    m = new src_1.Matrix([[1, -3, 2], [1, 2, 7]]);
    expect(m.get(1, 1)).toEqual(2);
    // new Matrix(3) does not make much sense. is it square, is it a vector, ..?
    expect(() => { new src_1.Matrix(3); }).toThrow(Error);
    // it is a matrix, not a vector
    // expect(() => {new Matrix([3])}).toThrow(Error);
});
test('Basic matrix manipulatoin', () => {
    let m = new src_1.Matrix(3, 2);
    m.fill(1);
    expect(m.get(1, 1)).toEqual(1);
    m.apply((i, j) => i + j);
    expect(m.get(1, 1)).toEqual(2);
});
test('Check matrix dimensions', () => {
    let m = new src_1.Matrix([[1, -3, 2], [1, 2, 7]]); // m = 2, n = 3
    expect(m.dim()).toEqual([2, 3]);
});
test('Check matrix properties', () => {
    let m = new src_1.Matrix([[1, -3, 2], [1, 2, 7]]); // m = 2, n = 3
    expect(m.isSquare()).toBe(false);
    m = new src_1.Matrix([[1, -2], [1, 2]]); // m = 2, n = 2
    expect(m.isSquare()).toBe(true);
});
test('Matrix creation', () => {
    let m = new src_1.Matrix([[1, -3, 2], [1, 2, 7]]); // m = 2, n = 3
    expect(m.getRow(1).toArr()).toEqual([1, 2, 7]);
    expect(m.getColumn(1).toArr()).toEqual([-3, 2]);
    // transpose => [[1, 1], [-3, 2], [2, 7]]
    expect(m.transpose().get(1, 0)).toEqual(-3);
    expect(m.get(2, 1)).toEqual(7);
});
test('Matrix mirroring', () => {
    let a = new src_1.Matrix([[1, -3, 2], [1, 2, 7]]); // m = 2, n = 3
    expect(a.mirrorColumns().toArr()).toEqual([[2, -3, 1], [7, 2, 1]]);
    let b = new src_1.Matrix([[1, -3, 2, 6], [1, 2, 7, -3]]);
    expect(b.mirrorColumns().toArr()).toEqual([[6, 2, -3, 1], [-3, 7, 2, 1]]);
    let c = new src_1.Matrix([[1, -3, 2], [1, 2, 7]]);
    expect(c.mirrorRows().toArr()).toEqual([[1, 2, 7], [1, -3, 2]]);
    let d = new src_1.Matrix([[1, -3, 2, 6], [1, 2, 7, -3]]);
    expect(d.mirrorRows().toArr()).toEqual([[1, 2, 7, -3], [1, -3, 2, 6]]);
});
test('Matrix multiplication', () => {
    let a = new src_1.Matrix([[3, 2, 1], [1, 0, 2]]);
    let b = new src_1.Matrix([[1, 2], [0, 1], [4, 0]]);
    expect(a.multiply(b).toArr()).toEqual([[7, 8], [9, 2]]);
});
test('Matrix Hadamard product (element wise)', () => {
    let a = new src_1.Matrix([[3, 2], [0, 1]]);
    let b = new src_1.Matrix([[1, 2], [3, 1]]);
    // let a = new Matrix([[3, 2, 1], [1, 0, 2]]);
    // let b = new Matrix([[1, 2], [0, 1], [4, 0]]);
    expect(a.hadamard(b).toArr()).toEqual([[3, 4], [0, 1]]);
});
test('Matrix addition', () => {
    let a = new src_1.Matrix([[1, -3, 2], [1, 2, 7]]); // m = 2, n = 3
    let b = new src_1.Matrix([[0, 3, 5], [2, 1, -1]]); // m = 2, n = 3
    expect(a.add(b).toArr()).toEqual([[1, 0, 7], [3, 3, 6]]);
});
test('Matrix scalar multiplication', () => {
    let a = new src_1.Matrix([[1, -3, 2], [1, 2, 7]]); // m = 2, n = 3
    expect(a.scalar(2).toArr()).toEqual([[2, -6, 4], [2, 4, 14]]);
});
test('Matrix copy', () => {
    let m = new src_1.Matrix([[2, 5, 7], [8, 9, 10], [1, 2, 3]]);
    let c = m.copy();
    m.set(1, 1, 100);
    expect(c.get(1, 1)).toEqual(9);
    // this copy/cloning method does not work, still referenced!!
    let f = new src_1.Matrix(m.toArr());
    f.set(1, 1, 200);
    expect(m.get(1, 1)).toEqual(200);
});
