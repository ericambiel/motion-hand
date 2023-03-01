export default class Controller {
  #view;

  #camera;

  #worker;

  #blinkCounter;

  constructor({ view, worker, camera }) {
    this.#view = view;
    this.#view.configureOnBtnClick(this.onBtnStart.bind(this));
    this.#worker = this.#configureWorker(worker);
    this.#camera = camera;
  }

  static async initialize(deps) {
    const controller = new Controller(deps);
    controller.log('Not detect eye blink yet! Click on the button to start.');
    return controller.init();
  }

  #configureWorker(worker) {
    let ready = false;
    worker.onmessage = ({ data }) => {
      if (data === 'READY') {
        console.log('Video-Player Woker is ready!');
        this.#view.enableButton();
        ready = true;
        return;
      }
      const { blinked } = data;
      this.#blinkCounter += 1;
      this.#view.togglePlayVideo();
      console.log('blinked', blinked);
    };

    return {
      send(msg) {
        if (!ready) return;
        worker.postMessage(msg);
      },
    };
  }

  async init() {
    console.log('Init!!');
  }

  loop() {
    const { video } = this.#camera;
    const img = this.#view.getVideoFrame(video);
    this.#worker.send(img);
    this.log('Detecting eye blink...');

    setTimeout(() => this.loop(), 80);
  }

  log(txt) {
    const times = `     - blinked times: ${this.#blinkCounter}`;
    this.#view.log(`status: ${txt}`.concat(this.#blinkCounter ? times : ''));
  }

  onBtnStart() {
    this.#blinkCounter = 0;
    this.log('Initializing detection...');
    this.loop();
  }
}
