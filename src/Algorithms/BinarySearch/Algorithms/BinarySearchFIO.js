// Binary Search First Index Of
import { Animation } from "../Animation";

// return first occurring instance of key in arr
function BinarySearchFIO(arr, key) {
  const animations = [];

  let lo = 0;
  let hi = arr.length - 1;
  let storedIndex = -1;
  let mid;

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
      // save index
      storedIndex = mid;
      animations.push(new Animation(storedIndex, "store"));

      hi = mid - 1;
      animations.push(new Animation(hi, "hi-highlight"));
    }
  }

  if (storedIndex !== -1) animations.push(new Animation(storedIndex, "found"));
  else animations.push(new Animation(0, "not-found"));

  return [storedIndex, animations];
}

export { BinarySearchFIO };
