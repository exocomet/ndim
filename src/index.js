export class Matrix {
  constructor(m, n, fill=0) {
    // m - number of rows
    // n - number of columns
    if (m instanceof Array) {
      this.arr = m;
    } else {
      this.arr = Array(m).fill().map(()=>Array(n).fill(fill));
    }
  }

  dim() {
    const m = this.arr.length;
    const n = this.arr[0].length;
    return [m, n];
  }

  isSquare() {
    const [m, n] = [...this.dim()]
    return m == n;
  }

  apply(func) {
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
    return new Vector(this.arr[i]);
  }

  getColumn(j) {
    // returns a Vector
    return new Vector(this.arr.map(row=>row[j]));
  }

  multiply(b) {
    let _ma = this.arr.length;
    let _na = this.arr[0].length;
    let _b = this.assureArray(b);
    let _mb = _b.length;
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
      for (let j = 0; j < Math.floor(n/2); j++) {
        let tmp = a[i][j]
        a[i][j] = a[i][n-j-1]
        a[i][n-j-1] = tmp
      }
    }
    return this;
  }

  mirrorRows() {
    const [m, _] = this.dim();
    let a = this.arr;
    for (let i = 0; i < Math.floor(m/2); i++) {
      let tmp = a[i]
      a[i] = a[m-i-1]
      a[m-i-1] = tmp
    }
    return this;
  }

  log() {
    console.table(this.arr);
  }

  assureArray(a) {
    if (a instanceof Matrix) {
      return a.arr;
    } else {
      return a;
    }
  }
}

export class Vector {
  constructor(v) {
    this.arr = v; // [v0, v1, .., vn]
  }

  dim() {
    return this.arr.length;
  }

  _assertDimensions(v) {
    if(!this.dim() == v.dim()) throw Error;
  };

  get(i) {
    return this.arr[i];
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
    w[2] = u[0] * _v[1] - u[1] * _v[0]
    return new Vector(w);
  }

  multiply(s) {
    // scalar multiplication
    this.arr.forEach((v, i) => this.arr[i] = v * s);
    return this;
  }

  norm() {
    // "length", must specify initial value acc == 0
    return Math.sqrt(this.arr.reduce((acc, val) => acc + val*val, 0));
  }

  unit() {
    // normalize
    const norm = this.norm();
    this.arr.forEach((v, i) => this.arr[i] = v / norm)
    return this;
  }
}
