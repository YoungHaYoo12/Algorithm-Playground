import Animation from "./Animation";
import { exch, compareTo, medianOf3, Timer } from "./Helper";
import { animateCutoff } from "./InsertionSort";

// 3 way quick sort
function animate3WayQuickSort(array) {
  const timer = new Timer();
  let animations = [];
  const n = array.length;

  sort3Way(array, 0, n - 1, animations);

  return [animations, timer.getElapsedTime()];
}

// private helper sort function for 3 way quick sort
function sort3Way(array, lo, hi, animations) {
  if (hi <= lo) return;
  let lt = lo;
  let gt = hi;
  let v = array[lo];
  let i = lo + 1;

  while (i <= gt) {
    let cmp = compareTo(array[i], v);
    animations.push(new Animation("compare", [i, lo]));
    animations.push(new Animation("uncompare", [i, lo]));
    if (cmp < 0) {
      animations.push(new Animation("exchange", [lt, i]));
      exch(array, lt++, i++);
    } else if (cmp > 0) {
      animations.push(new Animation("exchange", [i, gt]));
      exch(array, i, gt--);
    } else {
      i++;
    }
  }

  sort3Way(array, lo, lt - 1, animations);
  sort3Way(array, gt + 1, hi, animations);
}

// regular quick sort
function animateQuickSort(array, cutoff, median) {
  const timer = new Timer();
  let animations = [];
  const n = array.length;

  sort(array, 0, n - 1, animations, cutoff, median);

  return [animations, timer.getElapsedTime()];
}

// private helper sort function for regular quick sort
function sort(array, lo, hi, animations, cutoff, median) {
  // cutoff to insertion sort
  if (cutoff !== 0 && hi <= lo + cutoff - 1) {
    animateCutoff(array, animations, lo, hi);
    return;
  }
  if (hi <= lo) return;

  // median of sample optimization
  if (median) {
    const mid = lo + Math.floor((hi - lo) / 2);
    const median = medianOf3(array, lo, mid, hi);
    animations.push(new Animation("compare", [lo, mid]));
    animations.push(new Animation("compare", [hi, mid]));
    animations.push(new Animation("uncompare", [lo, mid]));
    animations.push(new Animation("uncompare", [hi, mid]));

    animations.push(new Animation("exchange", [lo, median]));
    exch(array, lo, median);
  }

  const j = partition(array, lo, hi, animations);
  sort(array, lo, j - 1, animations, cutoff, median);
  sort(array, j + 1, hi, animations, cutoff, median);
}

// partition step of quick sort
function partition(array, lo, hi, animations) {
  let i = lo;
  let j = hi + 1;
  while (true) {
    while (true) {
      if (i === hi) break;
      animations.push(new Animation("compare", [i + 1, lo]));
      animations.push(new Animation("uncompare", [i + 1, lo]));
      if (!(array[++i] < array[lo])) break;
    }

    while (true) {
      if (j === lo) break;
      animations.push(new Animation("compare", [j - 1, lo]));
      animations.push(new Animation("uncompare", [j - 1, lo]));
      if (!(array[lo] < array[--j])) break;
    }

    if (i >= j) break;
    animations.push(new Animation("exchange", [i, j]));
    exch(array, i, j);
  }
  animations.push(new Animation("exchange", [lo, j]));
  exch(array, lo, j);
  return j;
}

export { animateQuickSort, animate3WayQuickSort };
