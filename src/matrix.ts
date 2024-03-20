import { Vector } from "./vector";

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


export class Matrix {
  private arr: number[][];

  // TODO: overloading?
  // constructor();
  // constructor(m: Matrix);
  constructor(m: Matrix | number[][] | number, n?: number) {
    const _fill = 0;
    // m - number of rows
    // n - number of columns

    if (n) {
      this.arr = Array(m).fill(_fill).map(()=>Array(n).fill(_fill));
    } else {
      if (m instanceof Matrix) {
        // copy the matrix
        this.arr = m.arr.map((row) => row.slice());
      } else if ((Array.isArray(m) && Array.isArray(m[0]))) {
        this.arr = m;
      } else {
        throw new Error('NotImplemented');
      }
    }

  }

  dim() {
    const m = this.arr.length;
    const n = this.arr[0].length;
    return [m, n];
  }

  copy() {
    // TODO. replace that any
    const _copy: any = this.arr.map((row) => row.slice());
    return new Matrix(_copy);
  }

  isSquare() {
    const [m, n] = [...this.dim()];
    return m == n;
  }

  apply(func: any) {
    const [m, n] = this.dim();
    if(func instanceof Function) {
      for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
          this.arr[i][j] = func(i, j, this.arr[i][j]);
        }
      }
    }
    return this;
  }

  fill(obj: any) {
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

  get(i: number, j: number) {
    // element at row i and column j
    return this.arr[i][j];
  }

  set(i: number, j: number, v: number | any) {
    this.arr[i][j] = v;
  }

  getRow(i: number) {
    // returns a Vector
    return new Vector(this.arr[i]);
  }

  getColumn(j: number) {
    // returns a Vector
    return new Vector(this.arr.map(row=>row[j]));
  }

  multiply(b: Matrix) {
    let _ma = this.arr.length;
    let _na = this.arr[0].length;
    let _b = this.assureArray(b);
    // let _mb = _b.length;
    let _nb = _b[0].length;
    // TODO: assert correct dimensions
    let a = Array(_ma).fill(0).map(() => Array(_nb).fill(0));
    for(let i=0; i < _ma; i++) {
      for(let j=0; j < _nb; j++) {
        for (let k=0; k < _na; k++) {
          a[i][j] = a[i][j] + this.arr[i][k]*_b[k][j];
        }
      }
    }
    this.arr = a;
    return this;
  }

  add(b: Matrix) {
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
  hadamard(b: Matrix) {
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

  scalar(s: number) {
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
      for (let j = 0; j < Math.floor(n/2); j++) {
        let tmp = a[i][j];
        a[i][j] = a[i][n-j-1];
        a[i][n-j-1] = tmp;
      }
    }
    return this;
  }

  mirrorRows() {
    const [m, ] = this.dim();
    let a = this.arr;
    for (let i = 0; i < Math.floor(m/2); i++) {
      let tmp = a[i];
      a[i] = a[m-i-1];
      a[m-i-1] = tmp;
    }
    return this;
  }

  // TODO: with typescript not needed?
  // a<Array>
  assureArray(a: any) {
    if (a instanceof Matrix) {
      return a.arr;
    } else {
      return a;
    }
  }
}
