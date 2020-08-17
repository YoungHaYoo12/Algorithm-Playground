import { Animation } from "../Animation";

function BinarySearch(arr, key) {
  let lo = 0;
  let hi = arr.length - 1;
  var mid = 0;
  const animations = [];

  animations.push(new Animation(lo, "lo-highlight"));
  animations.push(new Animation(hi, "hi-highlight"));

  while (lo <= hi) {
    mid = lo + Math.floor((hi - lo) / 2);
    const val = arr[mid];

    // animation for lo, hi, mid
    animations.push(new Animation(mid, "mid-highlight"));

    if (key < val) {
      hi = mid - 1;
      animations.push(new Animation(hi, "hi-highlight"));
    } else if (key > val) {
      lo = mid + 1;
      animations.push(new Animation(lo, "lo-highlight"));
    } else {
      animations.push(new Animation(mid, "found"));
      return [mid, animations];
    }
  }
  animations.push(new Animation(0, "not-found"));
  return [-1, animations];
}

export { BinarySearch };
