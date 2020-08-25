import Animation from "./Animation";
import { Timer } from "./Helper";

function animateHeapSort(array) {
  const timer = new Timer();

  let animations = [];
  const n = array.length;

  for (let k = Math.floor(n / 2); k >= 1; k--) sink(array, k, n, animations);
  let k = n;
  while (k > 1) {
    exch(array, 1, k--, animations);
    sink(array, 1, k, animations);
  }

  return [animations, timer.getElapsedTime()];
}

function sink(array, k, n, animations) {
  while (2 * k <= n) {
    let j = 2 * k;
    if (j < n && less(array, j, j + 1, animations)) j++;

    if (!less(array, k, j, animations)) break;

    exch(array, k, j, animations);
    k = j;
  }
}

function less(array, i, j, animations) {
  animations.push(new Animation("compare", [i - 1, j - 1]));
  animations.push(new Animation("uncompare", [i - 1, j - 1]));
  return array[i - 1] < array[j - 1];
}

function exch(array, i, j, animations) {
  animations.push(new Animation("exchange", [i - 1, j - 1]));
  const t = array[i - 1];
  array[i - 1] = array[j - 1];
  array[j - 1] = t;
}

function animateDaryHeapSort(array, d) {
  const timer = new Timer();

  let animations = [];
  const n = array.length;

  for (let k = Math.floor(n / d); k >= 1; k--)
    dArySink(array, k, n, d, animations);
  let k = n;
  while (k > 1) {
    exch(array, 1, k--, animations);
    dArySink(array, 1, k, d, animations);
  }

  return [animations, timer.getElapsedTime()];
}

function dArySink(array, k, n, d, animations) {
  while (d * (k - 1) + 1 <= n) {
    var j = d * (k - 1) + 1;

    var max = j;
    for (let i = 0; i <= d; i++) {
      if (j + i <= n && less(array, max, j + i, animations)) max = j + i;
    }

    if (!less(array, k, max, animations)) break;

    exch(array, k, max, animations);
    k = max;
  }
}

export { animateHeapSort, animateDaryHeapSort };
