import {Matrix, Vector} from '../src/index.js';

test('Matrix creation', () => {
  let m = new Matrix(3, 2);
  expect(m.get(1, 1)).toEqual(0);
})

test('Basic matrix manipulatoin', () => {
  let m = new Matrix(3, 2);
  m.fill(1);
  expect(m.get(1, 1)).toEqual(1);

  m.apply((i, j) => i+j);
  expect(m.get(1, 1)).toEqual(2);
});

test('Check matrix properties', () => {
  let m = new Matrix([[1, -3, 2], [1, 2, 7]]); // m = 2, n = 3
  expect(m.dim()).toEqual([2, 3]);
  expect(m.isSquare()).toBe(false);
})

test('Matrix creation', () => {
  let m = new Matrix([[1, -3, 2], [1, 2, 7]]); // m = 2, n = 3
  expect(m.getRow(1).arr).toEqual([1, 2, 7]);
  expect(m.getColumn(1).arr).toEqual([-3, 2]);

  // transpose => [[1, 1], [-3, 2], [2, 7]]
  expect(m.transpose().get(1, 0)).toEqual(-3);
  expect(m.get(2, 1)).toEqual(7);
});


test('Matrix mirroring', () => {
  let a = new Matrix([[1, -3, 2], [1, 2, 7]]); // m = 2, n = 3
  expect(a.mirrorColumns().arr).toEqual([[2, -3, 1], [7, 2, 1]]);

  let b = new Matrix([[1, -3, 2, 6], [1, 2, 7, -3]]);
  expect(b.mirrorColumns().arr).toEqual([[6, 2, -3, 1], [-3, 7, 2, 1]]);

  let c = new Matrix([[1, -3, 2], [1, 2, 7]]);
  expect(c.mirrorRows().arr).toEqual([[1, 2, 7], [1, -3, 2]]);

  let d = new Matrix([[1, -3, 2, 6], [1, 2, 7, -3]]);
  expect(d.mirrorRows().arr).toEqual([[1, 2, 7, -3], [1, -3, 2, 6]]);
});





test('Matrix multiplication', () => {
  let a = new Matrix([[3, 2, 1], [1, 0, 2]]);
  let b = new Matrix([[1, 2], [0, 1], [4, 0]]);
  expect(a.multiply(b).arr).toEqual([[7, 8], [9, 2]])
});

test('Matrix Hadamard product (element wise)', () => {
  let a = new Matrix([[3, 2], [0, 1]]);
  let b = new Matrix([[1, 2], [3, 1]])
  // let a = new Matrix([[3, 2, 1], [1, 0, 2]]);
  // let b = new Matrix([[1, 2], [0, 1], [4, 0]]);
  expect(a.hadamard(b).arr).toEqual([[3, 4], [0, 1]])
});

test('Matrix addition', () => {
  let a = new Matrix([[1, -3, 2], [1, 2, 7]]); // m = 2, n = 3
  let b = new Matrix([[0, 3, 5], [2, 1, -1]]); // m = 2, n = 3
  expect(a.add(b).arr).toEqual([[1, 0, 7], [3, 3, 6]])
});

test('Matrix scalar multiplication', () => {
  let a = new Matrix([[1, -3, 2], [1, 2, 7]]); // m = 2, n = 3
  expect(a.scalar(2).arr).toEqual([[2, -6, 4], [2, 4, 14]]);
});




test('Vector creation', () => {
  let v = new Vector([1, -3, 2]);
  expect(v.dim()).toEqual(3);
  let w = new Vector(3);
  expect(w.dim()).toEqual(3);
});

test('Vector addition', () => {
  let u = new Vector([1, -3, 2]);
  let v = new Vector([4, -5, 6]);
  expect(u.add(v).arr).toEqual([5, -8, 8]);
  console.log(u)
});

test('Vector subtract', () => {
  let u = new Vector([1, -3, 2]);
  let v = new Vector([4, -5, 6]);
  expect(u.subtract(v).arr).toEqual([-3, 2, -4]);
});

test('Vector hadamard product/elementwise multiplication', () => {
  let u = new Vector([1, -3, 2]);
  let v = new Vector([4, -5, 6]);
  expect(u.hadamard(v).arr).toEqual([4, 15, 12]);
});

test('Vector dot/scalar product', () => {
  let u = new Vector([1, 2, 3]);
  let v = new Vector([4, -5, 6]);
  expect(u.dot(v)).toEqual(12);
});

test('Vector cross/vector product', () => {
  let u = new Vector([2, -3, 1]);
  let v = new Vector([4, -1, 5]);
  expect(u.cross(v).arr).toEqual([-14, -6, 10]);
});

test('Vector length and normalization', () => {
  // let u = new Vector([0, 1]);
  let u2 = new Vector([1, 1]);
  let u3 = new Vector([1, 1, 1]);
  let v = new Vector([3, 4]);
  expect(u2.norm()).toEqual(Math.sqrt(2));
  expect(u3.norm()).toEqual(Math.sqrt(3));
  expect(v.norm()).toEqual(5);

  let u = new Vector([1, 1, 1]);
  expect(u.unit().norm()).toEqual(1);

  // unit vector for zero-vector not defined -> throw error!
  let z = new Vector(3, 0);
  expect(()=> z.unit()).toThrow();
});


test('Vector scalar multiplication', () => {
  let v = new Vector([-2, 1, 4]);
  expect(v.multiply(5).arr).toEqual([-10, 5, 20]);

  let z = new Vector(3, 0);
  expect(z.multiply(5).arr).toEqual([0, 0, 0]);
});

test('Matrix copy', () => {
  let m = new Matrix([[2, 5, 7], [8, 9, 10], [1, 2, 3]]);
  let c = m.copy();
  m.set(1, 1, 100);
  expect(c.get(1, 1)).toEqual(9);

  // this copy/cloning method does not work, still referenced!!
  let f = new Matrix(m.arr);
  f.set(1, 1, 200);
  expect(m.get(1, 1)).toEqual(200);
});

test('Vector copy', () => {
  let v = new Vector([2, 5, 7]);
  let c = v.copy();
  v.set(1, 100);
  expect(c.get(1)).toEqual(5);
});