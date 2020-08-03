import Animation from "./Animation";
import { exch, Timer } from "./Helper";

function animateSelectionSort(array) {
  const timer = new Timer();
  let animations = [];
  const n = array.length;

  for (let i = 0; i < n; i++) {
    let min = i;
    for (let j = i + 1; j < n; j++) {
      // compare
      animations.push(new Animation("compare", [i, j]));
      animations.push(new Animation("uncompare", [i, j]));

      if (array[j] < array[min]) {
        min = j;
      }
    }
    exch(array, i, min);
    animations.push(new Animation("exchange", [i, min]));
  }

  return [animations, timer.getElapsedTime()];
}

export { animateSelectionSort };
