import Animation from "./Animation";
import { Timer } from "./Helper";
import { animateCutoff } from "./InsertionSort";

// recursive merge sort
function animateMergeSort(array, cutoff) {
  const n = array.length;

  const timer = new Timer();
  let animations = [];
  let aux = Array(n).fill(0);

  sort(array, aux, 0, n - 1, animations, cutoff);

  return [animations, timer.getElapsedTime()];
}

// bottom up merge sort (non-recursive version)
function animateBUMergeSort(array, cutoff) {
  const timer = new Timer();
  let animations = [];
  const n = array.length;
  let aux = Array(n).fill(0);

  // perform insertion cutoff first
  if (cutoff !== 0) {
    for (let i = 0; i < n; i += cutoff) {
      animateCutoff(array, animations, i, Math.min(i + cutoff - 1, n - 1));
    }
  }

  // perform bottom up merge sort
  const initialSZ = cutoff === 0 ? 1 : cutoff;
  for (let sz = initialSZ; sz < n; sz = sz + sz) {
    for (let lo = 0; lo < n - sz; lo += sz + sz)
      merge(
        array,
        aux,
        lo,
        lo + sz - 1,
        Math.min(lo + sz + sz - 1, n - 1),
        animations
      );
  }

  return [animations, timer.getElapsedTime()];
}

// merging operation in merge sort
function merge(array, aux, lo, mid, hi, animations) {
  // copy into auxiliary array
  for (let k = lo; k <= hi; k++) {
    aux[k] = array[k];
  }

  // merge
  let i = lo;
  let j = mid + 1;
  for (let k = lo; k <= hi; k++) {
    if (i > mid) {
      animations.push(new Animation("compare", [j, j]));
      animations.push(new Animation("uncompare", [j, j]));
      animations.push(new Animation("set", [k, aux[j]]));
      array[k] = aux[j++];
    } else if (j > hi) {
      animations.push(new Animation("compare", [i, i]));
      animations.push(new Animation("uncompare", [i, i]));
      animations.push(new Animation("set", [k, aux[i]]));
      array[k] = aux[i++];
    } else if (aux[j] < aux[i]) {
      animations.push(new Animation("compare", [j, i]));
      animations.push(new Animation("uncompare", [j, i]));
      animations.push(new Animation("set", [k, aux[j]]));
      array[k] = aux[j++];
    } else {
      animations.push(new Animation("compare", [j, i]));
      animations.push(new Animation("uncompare", [j, i]));
      animations.push(new Animation("set", [k, aux[i]]));
      array[k] = aux[i++];
    }
  }
}

// private sort helper function for merge sort
function sort(array, aux, lo, hi, animations, CUTOFF) {
  if (CUTOFF !== 0 && hi <= lo + CUTOFF - 1) {
    animateCutoff(array, animations, lo, hi);
    return;
  }
  if (hi <= lo) return;
  const mid = lo + Math.floor((hi - lo) / 2);
  sort(array, aux, lo, mid, animations, CUTOFF);
  sort(array, aux, mid + 1, hi, animations, CUTOFF);
  merge(array, aux, lo, mid, hi, animations);
}

export { animateMergeSort, animateBUMergeSort };
