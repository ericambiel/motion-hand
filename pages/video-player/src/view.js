export default class View {
  #btnInit = document.querySelector('#init');

  #statusElement = document.querySelector('#staus');

  #videoFrameCanvas = document.createElement('canvas');

  #canvasContext = this.#videoFrameCanvas.getContext('2d', {
    willReadFrequently: true, // Cache canvas instances
  });

  #videoElement = document.querySelector('#video');

  /**
   * Treat complex video object and tranforme to Canvas,
   * useful for Worker.
   * @param video
   * @return {ImageData}
   */
  getVideoFrame(video) {
    const canvas = this.#videoFrameCanvas;
    const { videoWidth: width, videoHeight: height } = video;
    canvas.width = width;
    canvas.height = height;

    // Slice images form videos and for Canvas obj
    this.#canvasContext.drawImage(video, 0, 0, width, height);
    return this.#canvasContext.getImageData(0, 0, width, height);
  }

  togglePlayVideo() {
    if (this.#videoElement.paused) {
      this.#videoElement.play();
      return;
    }
    this.#videoElement.pause();
  }

  enableButton() {
    this.#btnInit.disabled = false;
  }

  configureOnBtnClick(fn) {
    this.#btnInit.addEventListener('click', fn);
  }

  log(txt) {
    this.#statusElement.innerHTML = txt;
  }
}
