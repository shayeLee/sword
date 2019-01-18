import { compose, Observable, map } from "../src/functional/index.js";

function fn1(x) {
  return x + 1;
}

function fn2(x) {
  return x + 2;
}

function fn3(x) {
  return x + 3;
}

function fn4(x) {
  return x + 4;
}

const newFn = compose(
  fn1,
  fn2,
  fn3,
  fn4
);

const m = Observable.of(3);
const m1 = map(function (x) {
  return x * 2;
})(m);
console.log(m1);