const { GestureDescription, Finger, FingerCurl } = window.fp;

const RockGesture = new GestureDescription('scroll-down'); // ✊️
const PaperGesture = new GestureDescription('scroll-up'); // 🖐

// Rock - 'scroll-down': '✊️'
// -----------------------------------------------------------------------------

// thumb: half curled
// accept no curl with a bit lower confidence
RockGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
RockGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5);

// all other fingers: curled
for (const finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  RockGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
  RockGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}

// Paper - 'scroll-up': '🖐'
// -----------------------------------------------------------------------------

// no finger should be curled
for (const finger of Finger.all) {
  PaperGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
}

const knownGestures = [RockGesture, PaperGesture];

const gesturesString = {
  'scroll-down': '✊️',
  'scroll-up': '🖐',
};

export { knownGestures, gesturesString };
