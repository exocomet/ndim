
import { Vector } from "../src";

it('creates a valid vector', () => {
  const zeros = new Vector(3);
  // expect(zeros).toHaveLength(3);
  expect(zeros.toArr()).toEqual([0, 0, 0]);

})

test('Vector creation', () => {
  let v = new Vector([1, -3, 2]);
  expect(v.dim()).toEqual(3);
  let w = new Vector(3);
  expect(w.dim()).toEqual(3);
});

test('Vector addition', () => {
  let u = new Vector([1, -3, 2]);
  let v = new Vector([4, -5, 6]);
  expect(u.add(v).toArr()).toEqual([5, -8, 8]);
});

test('Vector subtract', () => {
  let u = new Vector([1, -3, 2]);
  let v = new Vector([4, -5, 6]);
  expect(u.subtract(v).toArr()).toEqual([-3, 2, -4]);
});

test('Vector hadamard product/elementwise multiplication', () => {
  let u = new Vector([1, -3, 2]);
  let v = new Vector([4, -5, 6]);
  expect(u.hadamard(v).toArr()).toEqual([4, 15, 12]);
});

test('Vector dot/scalar product', () => {
  let u = new Vector([1, 2, 3]);
  let v = new Vector([4, -5, 6]);
  expect(u.dot(v)).toEqual(12);
});

test('Vector cross/vector product', () => {
  let u = new Vector([2, -3, 1]);
  let v = new Vector([4, -1, 5]);
  expect(u.cross(v).toArr()).toEqual([-14, -6, 10]);
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
  expect(v.multiply(5).toArr()).toEqual([-10, 5, 20]);

  let z = new Vector(3, 0);
  expect(z.multiply(5).toArr()).toEqual([0, 0, 0]);
});


test('Vector copy', () => {
  let v = new Vector([2, 5, 7]);
  let c = v.copy();
  v.set(1, 100);
  expect(c.get(1)).toEqual(5);
});

test('Chaining', () => {
  let v = new Vector([2, 5, 7]);
  let w = new Vector([1, -3, -2]);
  let r = v.add(w).subtract(w);
  expect(r).toEqual(v);
});