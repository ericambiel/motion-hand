import Controller from './controller.js';
import View from './view.js';
import Camera from '../../../shared/lib/camera.js';
import { supportsWorkerType } from '../../../shared/lib/util.js';
import Service from './service.js';

async function execTensorflowSameTread() {
  console.warn('The Browser NOT suports Workers');
  console.warn('The classic mode will be used instead');

  // Import all requeriments without use Worker
  await import('https://unpkg.com/@tensorflow/tfjs-core@2.4.0/dist/tf-core.js');
  await import(
    'https://unpkg.com/@tensorflow/tfjs-converter@2.4.0/dist/tf-converter.js'
  );
  await import(
    'https://unpkg.com/@tensorflow/tfjs-backend-webgl@2.4.0/dist/tf-backend-webgl.js'
  );
  await import(
    'https://unpkg.com/@tensorflow-models/face-landmarks-detection@0.0.1/dist/face-landmarks-detection.js'
  );

  const service = new Service({
    faceLandmarksDetection: window.faceLandmarksDetection,
  });

  console.log('Loading Tensorflow models...');
  await service.loadModel().then(() => {
    setTimeout(() => worker.onmessage({ data: 'READY' }), 500);
    console.log('Tensorflow models loaded!');
  });

  // worker mocked
  return {
    async postMessage(video) {
      const blinked = await service.handBlinked(video);
      if (!blinked) return;
      this.onmessage({ data: { blinked } });
    },
    // Will be overwrite by Controller
    onmessage(msg) {},
  };
}

async function getWorker() {
  if (!supportsWorkerType()) return execTensorflowSameTread();
  return new Worker('./src/worker.js', { type: 'module' });
}

const worker = await getWorker();
const camera = await Camera.init();
const [rootPath] = window.location.href.split('/pages/');
const factory = {
  async initalize() {
    return Controller.initialize({
      view: new View(),
      worker,
      camera,
    });
  },
};

export default factory;
