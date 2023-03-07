export default class HandGestureService {
  #gestureEstimator;

  #handPoseDetection;

  #handsVersion;

  #detector = null;

  #gesturesString;

  constructor({
    fingerpose,
    handPoseDetection,
    handsVersion,
    gesturesString,
    knownGestures,
  }) {
    this.#gestureEstimator = new fingerpose.GestureEstimator(knownGestures);
    this.#handPoseDetection = handPoseDetection;
    this.#handsVersion = handsVersion;
    this.#gesturesString = gesturesString;
  }

  /**
   * Recive tensorflow data ante manipulate them
   * @param keypoints3D
   * @return {Promise<void>}
   */
  async estimate(keypoints3D) {
    const predictions = await this.#gestureEstimator.estimate(
      this.#getLandMarksFromKeypoints(keypoints3D),
      10, // Precentage reability
    );

    return predictions.gestures;
  }

  async *detectGestures(predications) {
    for (const hand of predications) {
      if (!hand.keypoints3D) continue;
      const gestures = await this.estimate(hand.keypoints3D);
      if (!gestures.length) continue;

      const result = gestures.reduce((previous, current) =>
        previous.score > current.score ? previous : current,
      );
      const { x, y } = hand.keypoints.find(
        keypoint => keypoint.name === 'index_finger_tip',
      );

      console.log('detected', this.#gesturesString[result.name]);
      yield { event: result.name, x, y };
    }
  }

  #getLandMarksFromKeypoints(keypoints3D) {
    return keypoints3D.map(keypoint3D => [
      keypoint3D.x,
      keypoint3D.y,
      keypoint3D.z,
    ]);
  }

  /**
   * Identify hands and estimate results
   * @return {Promise<null>}
   */
  async estimateHands(video) {
    return this.#detector.estimateHands(video, { flipHorizontal: true });
  }

  async initializeDetector() {
    if (this.#detector) return this.#detector;

    const model = this.#handPoseDetection.SupportedModels.MediaPipeHands;
    const detectorConfig = {
      runtime: 'mediapipe', // or 'tfjs',
      solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${
        this.#handsVersion
      }`,
      modelType: 'lite', // "full" heavier to process but more thorough
      masHands: 2, // Qtd hans to detect
    };
    this.#detector = await this.#handPoseDetection.createDetector(
      model,
      detectorConfig,
    );

    return this.#detector;
  }
}
