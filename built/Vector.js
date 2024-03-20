"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector = void 0;
class Vector {
    constructor(n, fill = 0) {
        // [v0, v1, .., vn]
        if (n instanceof Array) {
            this.arr = n;
        }
        else {
            this.arr = Array(n).fill(fill);
        }
    }
    copy() {
        return new Vector(this.arr.slice());
    }
    dim() {
        return this.arr.length;
    }
    _assertDimensions(v) {
        // if(!this.dim() == v.dim()) throw Error;
        if (!(this.dim() == v.dim()))
            throw Error;
    }
    get(i) {
        return this.arr[i];
    }
    // any?
    set(i, val) {
        this.arr[i] = val;
    }
    add(v) {
        this._assertDimensions(v);
        let u = this.arr;
        // see MAtrix: let _b = this.assureArray(b);
        let _v = v.arr; // assert vector -> array
        u.forEach((_, i) => u[i] += _v[i]);
        return this;
    }
    subtract(v) {
        this._assertDimensions(v);
        let u = this.arr;
        // see MAtrix: let _b = this.assureArray(b);
        let _v = v.arr; // assert vector -> array
        u.forEach((_, i) => u[i] -= _v[i]);
        return this;
    }
    hadamard(v) {
        // elementwise product of vectors
        this._assertDimensions(v);
        let u = this.arr;
        let _v = v.arr; // assert vector -> array
        u.map((_, i) => u[i] = u[i] * _v[i]);
        return this;
    }
    dot(v) {
        // scalar product, returns scalar
        this._assertDimensions(v);
        let u = this.arr;
        let _v = v.arr; // assert vector -> array
        const result = u.reduce((acc, cur, i) => {
            acc += (cur * _v[i]);
            return acc;
        }, 0);
        return result;
    }
    cross(v) {
        // defined only for 3d
        this.dim() == 3;
        this.dim() == v.dim();
        let u = this.arr;
        let _v = v.arr; // assert vector -> array
        let w = new Array(3);
        w[0] = u[1] * _v[2] - u[2] * _v[1],
            w[1] = u[2] * _v[0] - u[0] * _v[2],
            w[2] = u[0] * _v[1] - u[1] * _v[0];
        return new Vector(w);
    }
    multiply(s) {
        // scalar multiplication
        this.arr.forEach((v, i) => this.arr[i] = v * s);
        return this;
    }
    norm() {
        // "length", must specify initial value acc == 0
        return Math.sqrt(this.arr.reduce((acc, val) => acc + val * val, 0));
    }
    unit() {
        // normalize
        const norm = this.norm();
        if (norm < Number.EPSILON) {
            throw new Error('Can not normalize zero-vector.');
        }
        this.arr.forEach((v, i) => this.arr[i] = v / norm);
        return this;
    }
}
exports.Vector = Vector;
