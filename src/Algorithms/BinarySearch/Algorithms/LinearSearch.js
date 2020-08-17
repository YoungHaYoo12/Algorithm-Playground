import { Animation } from "../Animation";

function LinearSearch(arr, key) {
  let n = arr.length;
  const animations = [];
  var i;

  for (i = 0; i < n; i++) {
    animations.push(new Animation(i, "index-highlight"));
    if (arr[i] === key) {
      animations.push(new Animation(i, "found"));
      return [i, animations];
    }
  }
  animations.push(new Animation(0, "not-found"));
  return [i, animations];
}

export { LinearSearch };
