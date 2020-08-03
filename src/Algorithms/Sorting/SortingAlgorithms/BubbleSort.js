import Animation from "./Animation";
import { exch, Timer } from "./Helper";

function animateBubbleSort(array) {
  const timer = new Timer();

  let animations = [];
  const n = array.length;
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < n - 1; j++) {
      // comapare
      animations.push(new Animation("compare", [j, j + 1]));
      animations.push(new Animation("uncompare", [j, j + 1]));
      if (array[j] > array[j + 1]) {
        animations.push(new Animation("exchange", [j, j + 1]));
        exch(array, j, j + 1);
      }
    }
  }

  return [animations, timer.getElapsedTime()];
}

export { animateBubbleSort };
