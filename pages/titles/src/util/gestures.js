const { GestureDescription, Finger, FingerCurl } = window.fp;

const ScrollDownGesture = new GestureDescription('scroll-down'); // ✊
const ScrollUpGesture = new GestureDescription('scroll-up'); // 🖐
const ClickGesture = new GestureDescription('click'); // 🤏

// Start - Rock - 'scroll-down': '✊️'
// -----------------------------------------------------------------------------

// thumb: half curled
// accept no curl with a bit lower confidence
ScrollDownGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
ScrollDownGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5);

// all other fingers: curled
for (const finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  ScrollDownGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
  ScrollDownGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}
// End - Rock - 'scroll-down': '✊️'

// Start - Paper - 'scroll-up': '🖐'
// -----------------------------------------------------------------------------

// no finger should be curled
for (const finger of Finger.all) {
  ScrollUpGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
}
// End - Paper - 'scroll-up': '🖐'

// Start - 'click': 🤏
// -----------------------------------------------------------------------------
ClickGesture.addCurl(Finger.Index, FingerCurl.HalfCurl, 0.8);
ClickGesture.addCurl(Finger.Index, FingerCurl.FullCurl, 0.5);

ClickGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
ClickGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.4);

ClickGesture.addCurl(Finger.Middle, FingerCurl.NoCurl, 0.9);
ClickGesture.addCurl(Finger.Middle, FingerCurl.FullCurl, 0.9);

ClickGesture.addCurl(Finger.Ring, FingerCurl.NoCurl, 0.9);
ClickGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 0.9);

ClickGesture.addCurl(Finger.Pinky, FingerCurl.NoCurl, 0.9);
ClickGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl, 0.9);
// End - 'click': 🤏

const knownGestures = [ScrollDownGesture, ScrollUpGesture, ClickGesture];

const gesturesString = {
  'scroll-down': '✊️',
  'scroll-up': '🖐',
  click: '🤏',
};

export { knownGestures, gesturesString };
