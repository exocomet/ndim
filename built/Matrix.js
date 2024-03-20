"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matrix = void 0;
const vector_1 = require("./vector");
// interface IMatrix {
//   dim(): number[];
//   copy(): Matrix;
//   isSquare(): boolean;
//   apply(func: any): Matrix;
//   fill(obj: object): Matrix;
//   transpose(): Matrix;
//   get(i: number, j: number): number;
//   set(i: number, j: number, val: number): Matrix;
//   getRow(i: number): Vector;
//   getColumn(j: number): Vector;
//   multiply(m: Matrix): Matrix;
//   add(m: Matrix): Matrix;
//   hadamard(m: Matrix): Matrix;
//   scalar(s: number): Matrix;
//   mirrorColumns(): Matrix;
//   mirrorRows(): Matrix;
// }
class Matrix {
    // TODO: overloading?
    // constructor(m: Matrix);
    constructor(m, n) {
        const _fill = 0;
        // m - number of rows
        // n - number of columns
        if (n) {
            this.arr = Array(m).fill(_fill).map(() => Array(n).fill(_fill));
        }
        else {
            if (m instanceof Matrix) {
                //this.arr = ob.arr;
                // copy
                this.arr = m.arr.map((row) => row.slice());
            }
            else if ((Array.isArray(m) && Array.isArray(m[0]))) {
                this.arr = m;
            }
            else {
                throw new Error('NotImplemented');
            }
        }
        // if (Array.isArray(m)) {
        //   this.arr = Array(m).fill(fill).map(()=>Array(n).fill(fill));
        // } else if (typeof m == "number") {
        //   this.arr = Array(m).fill(fill).map(()=>Array(n).fill(fill));
        // // if (typeof m === 'IMatrix') {
        // // if (m instanceof Matrix) {
        // //   this.arr = m.arr;
        // // } else if (m instanceof Array) {
        // //   this.arr = m;
        // // } else if (typeof m == "number" && typeof n == "number") {
        // //   this.arr = Array(m).fill(fill).map(()=>Array(n).fill(fill));
        // // } else if (typeof m == "number" && typeof n == "undefined") {
        // //   this.arr = Array(m).fill(fill);
        // // } else if (typeof m == "undefined" && typeof n == "undefined") {
        // //   this.arr = [];
        // // } else if (typeof m == "undefined" && typeof n == "number") {
        // //   this.arr = Array(n).fill(fill);
        // } else if (typeof m == "undefined" && typeof n == "undefined") {
        //   this.arr = [];
        // } else {
        //   throw Error;
        // }
    }
    dim() {
        const m = this.arr.length;
        const n = this.arr[0].length;
        return [m, n];
    }
    copy() {
        // TODO. replace that any
        const _copy = this.arr.map((row) => row.slice());
        return new Matrix(_copy);
    }
    isSquare() {
        const [m, n] = [...this.dim()];
        return m == n;
    }
    apply(func) {
        const [m, n] = this.dim();
        if (func instanceof Function) {
            for (let i = 0; i < m; i++) {
                for (let j = 0; j < n; j++) {
                    this.arr[i][j] = func(i, j, this.arr[i][j]);
                }
            }
        }
        return this;
    }
    fill(obj) {
        // obj can be a function or a basic type
        // if function the arguments are indices i, j, and the value at (i, j)
        const [m, n] = this.dim();
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                this.arr[i][j] = obj;
            }
        }
        return this;
    }
    transpose() {
        const [m, n] = this.dim();
        let a = Array(n).fill(0).map(() => Array(m).fill(0));
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                a[j][i] = this.arr[i][j];
            }
        }
        this.arr = a;
        return this;
    }
    get(i, j) {
        // element at row i and column j
        return this.arr[i][j];
    }
    set(i, j, v) {
        this.arr[i][j] = v;
    }
    getRow(i) {
        // returns a Vector
        return new vector_1.Vector(this.arr[i]);
    }
    getColumn(j) {
        // returns a Vector
        return new vector_1.Vector(this.arr.map(row => row[j]));
    }
    multiply(b) {
        let _ma = this.arr.length;
        let _na = this.arr[0].length;
        let _b = this.assureArray(b);
        // let _mb = _b.length;
        let _nb = _b[0].length;
        // TODO: assert correct dimensions
        let a = Array(_ma).fill(0).map(() => Array(_nb).fill(0));
        for (let i = 0; i < _ma; i++) {
            for (let j = 0; j < _nb; j++) {
                for (let k = 0; k < _na; k++) {
                    a[i][j] = a[i][j] + this.arr[i][k] * _b[k][j];
                }
            }
        }
        this.arr = a;
        return this;
    }
    add(b) {
        let a = this.arr;
        let _b = this.assureArray(b);
        const [m, n] = this.dim();
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                a[i][j] = a[i][j] + _b[i][j];
            }
        }
        return this;
    }
    // https://en.wikipedia.org/wiki/Hadamard_product_(matrices)
    hadamard(b) {
        const [m, n] = this.dim();
        let a = this.arr;
        let _b = this.assureArray(b);
        // check for same size
        // if (!(a.length==b.length) || !(a[0].length==b[0].length)) throw new Error('Different size');
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                a[i][j] = a[i][j] * _b[i][j];
            }
        }
        return this;
    }
    scalar(s) {
        const [m, n] = this.dim();
        let b = this.arr;
        // check for same size
        // if (!(a.length==b.length) || !(a[0].length==b[0].length)) throw new Error('Different size');
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                b[i][j] *= s;
            }
        }
        return this;
    }
    mirrorColumns() {
        const [m, n] = this.dim();
        let a = this.arr;
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < Math.floor(n / 2); j++) {
                let tmp = a[i][j];
                a[i][j] = a[i][n - j - 1];
                a[i][n - j - 1] = tmp;
            }
        }
        return this;
    }
    mirrorRows() {
        const [m,] = this.dim();
        let a = this.arr;
        for (let i = 0; i < Math.floor(m / 2); i++) {
            let tmp = a[i];
            a[i] = a[m - i - 1];
            a[m - i - 1] = tmp;
        }
        return this;
    }
    // TODO: with typescript not needed?
    // a<Array>
    assureArray(a) {
        if (a instanceof Matrix) {
            return a.arr;
        }
        else {
            return a;
        }
    }
}
exports.Matrix = Matrix;
