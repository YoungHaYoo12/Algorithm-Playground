import Animation from "./Animation";
import { exch, Timer } from "./Helper";

function animateInsertionSort(array, halfExch) {
  const timer = new Timer();

  let animations = [];
  const n = array.length;

  if (halfExch) {
    for (let i = 1; i < n; i++) {
      const v = array[i];
      var j = i;
      while (true) {
        if (j - 1 < 0) break;
        animations.push(new Animation("compare", [i, j - 1]));
        animations.push(new Animation("uncompare", [i, j - 1]));

        if (!(v < array[j - 1])) break;
        animations.push(new Animation("set", [j, array[j - 1]]));
        array[j] = array[j - 1];
        j--;
      }
      animations.push(new Animation("set", [j, v]));
      array[j] = v;
    }
  } else {
    for (let i = 0; i < n; i++) {
      for (let j = i; j > 0; j--) {
        // compare
        animations.push(new Animation("compare", [j, j - 1]));
        animations.push(new Animation("uncompare", [j, j - 1]));

        if (array[j] < array[j - 1]) {
          // swap
          animations.push(new Animation("exchange", [j, j - 1]));
          exch(array, j, j - 1);
        } else {
          break;
        }
      }
    }
  }

  return [animations, timer.getElapsedTime()];
}

// binary insertion sort
function animateBinaryInsertionSort(array) {
  const timer = new Timer();

  let animations = [];
  const n = array.length;

  for (let i = 1; i < n; i++) {
    const v = array[i];
    let lo = 0;
    let hi = i;
    while (lo < hi) {
      const mid = lo + Math.floor((hi - lo) / 2);
      animations.push(new Animation("compare", [lo, mid]));
      animations.push(new Animation("uncompare", [lo, mid]));
      if (v < array[mid]) hi = mid;
      else lo = mid + 1;
    }

    // shift a[j]...a[i-1] to the right
    for (let j = i; j > lo; --j) {
      animations.push(new Animation("exchange", [j, j - 1]));
      array[j] = array[j - 1];
    }
    array[lo] = v;
  }

  return [animations, timer.getElapsedTime()];
}

// cutoff to insertion sort for other sort functions (e.g. merge sort, quick sort)
function animateCutoff(array, animations, lo, hi) {
  for (let i = lo; i <= hi; i++) {
    for (let j = i; j > lo; j--) {
      // compare
      animations.push(new Animation("compare", [j, j - 1]));
      animations.push(new Animation("uncompare", [j, j - 1]));

      if (array[j] < array[j - 1]) {
        // swap
        animations.push(new Animation("exchange", [j, j - 1]));
        exch(array, j, j - 1);
      } else {
        break;
      }
    }
  }
}

export { animateInsertionSort, animateBinaryInsertionSort, animateCutoff };
