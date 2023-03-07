export default class HandGestureView {
  #handsCanvas = document.querySelector('#hands');

  #canvasContext = this.#handsCanvas.getContext('2d');

  #fingerLookupIndexes;

  constructor({ fingerLookupIndexes }) {
    this.#handsCanvas.width = globalThis.screen.availWidth;
    this.#handsCanvas.height = globalThis.screen.availHeight;
    this.#fingerLookupIndexes = fingerLookupIndexes;
  }

  /**
   * Clean all drawings made by Canvas
   */
  clearCanvas() {
    this.#canvasContext.clearRect(
      0,
      0,
      this.#handsCanvas.width,
      this.#handsCanvas.height,
    );
  }

  drawResults(hands) {
    for (const { keypoints, handedness } of hands) {
      if (!keypoints) continue;

      this.#canvasContext.fillStyle = handedness === 'Left' ? 'red' : 'green';
      this.#canvasContext.strokeStyle = 'white';
      this.#canvasContext.lineWidth = 8;
      this.#canvasContext.lineJoin = 'round';

      // Joients
      this.#drawJoients(keypoints);

      // Fingers
      this.#drawFingersAndHoverElemnts(keypoints);
    }
  }

  /**
   * Draw the joints of the hands and fingers
   * @param keypoints
   */
  #drawJoients(keypoints) {
    for (const { x, y } of keypoints) {
      this.#canvasContext.beginPath(); // begin write on Canvas obj

      const newX = x - 2;
      const newY = y - 2;
      const radius = 3;
      const startAngle = 0;
      const endAngle = 2 * Math.PI;

      this.#canvasContext.arc(newX, newY, radius, startAngle, endAngle); // Drawing Canvas obj
      this.#canvasContext.fill(); // Print Canvas Drawed obj on canvas area.
    }
  }

  /**
   * Draw canvas fingers and show efects components like mouse
   */
  #drawFingersAndHoverElemnts(keypoints) {
    const fingers = Object.keys(this.#fingerLookupIndexes);
    // For each finger
    for (const finger of fingers) {
      const points = this.#fingerLookupIndexes[finger].map(
        idx => keypoints[idx],
      );

      // Used to draw objects in 2d
      const region = new Path2D();

      // The first position will always be the wrist of hand.
      // const { x, y } = points.shift();
      //
      // Start drawing line from position 0(wrist)[hand-pose-detection] to point x and y
      // region.moveTo(x, y);

      // For each x and y
      for (const point of points) {
        // Finish drawing a line to the point x and y
        region.lineTo(point.x, point.y);
      }

      // Draw line
      this.#canvasContext.stroke(region);
    }
  }

  loop(fn) {
    requestAnimationFrame(fn);
  }

  scrollPage(top) {
    scroll({
      top,
      behavior: 'auto',
    });
  }
}
