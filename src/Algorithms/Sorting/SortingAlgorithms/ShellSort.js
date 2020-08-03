import Animation from "./Animation";
import { exch, Timer } from "./Helper";

function animateShellSort(array) {
  const timer = new Timer();
  let animations = [];
  const n = array.length;

  let h = 1;
  while (h < Math.floor(n / 3)) h = 3 * h + 1;

  while (h >= 1) {
    for (let i = h; i < n; i++) {
      for (let j = i; j >= h && array[j] < array[j - h]; j -= h) {
        animations.push(new Animation("compare", [j, j - h]));
        animations.push(new Animation("uncompare", [j, j - h]));
        animations.push(new Animation("exchange", [j, j - h]));
        exch(array, j, j - h);
      }
    }
    h /= 3;
  }

  for (let i = 0; i < n; i++) {
    for (let j = i; j > 0; j--) {
      // comapare
      animations.push(new Animation("compare", [j, j - 1]));
      if (array[j] < array[j - 1]) {
        // swap
        animations.push(new Animation("exchange", [j, j - 1]));
        animations.push(new Animation("uncompare", [j, j - 1]));
        exch(array, j, j - 1);
      } else {
        animations.push(new Animation("uncompare", [j, j - 1]));
        break;
      }
    }
  }

  return [animations, timer.getElapsedTime()];
}

export { animateShellSort };
