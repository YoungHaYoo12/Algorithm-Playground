import { Animation } from "../Animation";

// Binary Search for Floor

function BinarySearchF(arr, key) {
  let lo = 0;
  let hi = arr.length - 1;
  var mid = 0;
  var storedIndex = -1; // floor
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
      storedIndex = mid;
      animations.push(new Animation(storedIndex, "store"));

      lo = mid + 1;
      animations.push(new Animation(lo, "lo-highlight"));
    } else {
      storedIndex = mid;
      animations.push(new Animation(storedIndex, "store"));
      animations.push(new Animation(storedIndex, "found"));
      return [mid, animations];
    }
  }

  if (storedIndex !== -1) animations.push(new Animation(storedIndex, "found"));
  else animations.push(new Animation(0, "not-found"));

  return [storedIndex, animations];
}

export { BinarySearchF };
