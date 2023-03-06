import { prepareRunChecker } from '../../../../shared/lib/util.js';

const { shouldRun: scrollShouldRun } = prepareRunChecker({ timerDelay: 200 });
export default class HandGestureController {
  #view;

  #service;

  #camera;

  #lastDirection = {
    direction: '',
    y: 0,
  };

  constructor({ view, service, camera }) {
    this.#view = view;
    this.#service = service;
    this.#camera = camera;
  }

  static async initialize(deps) {
    const controller = new this(deps);
    return controller.init();
  }

  #scrollPage(direction) {
    const pixelsPerScroll = 100;
    if (this.#lastDirection.direction === direction) {
      if (direction === 'scroll-down') this.#lastDirection.y += pixelsPerScroll;
      else if (this.#lastDirection.y >= 0)
        this.#lastDirection.y -= pixelsPerScroll;
    } else this.#lastDirection.direction = direction;

    this.#view.scrollPage(this.#lastDirection.y);
  }

  async #estimateHands() {
    try {
      const hands = await this.#service.estimateHands(this.#camera.video);
      // for await (const { event, x, y } of this.#service.detectGestures(hands)) {
      //   // if (scrollShouldRun()) continue;
      //   if (event.includes('scroll')) this.#scrollPage(event);
      // }

      const detectGesture = await this.#service
        .detectGestures(hands)
        .next()
        .then(({ value }) => value);

      if (detectGesture?.event.includes('scroll'))
        this.#scrollPage(detectGesture.event);
    } catch (err) {
      console.log('samething wrong: ', err);
    }
  }

  /**
   * At each iteration of the loop, the camera frames
   * will be processed by tensorflow.
   */
  async #loop() {
    await this.#service.initializeDetector();
    await this.#estimateHands();
    // "bind" - ensure the obj used in "this" is the
    // parent obj note the child, where "this" = Controller
    this.#view.loop(await this.#loop.bind(this));
  }

  async init() {
    return this.#loop();
  }
}
