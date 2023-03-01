export default class Camera {
  constructor() {
    this.video = document.createElement('video');
  }

  static async init() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('Camera not avalible, check!');
    }

    const videoConfig = {
      audio: false,
      video: {
        width: globalThis.screen.availWidth,
        height: globalThis.screen.availHeight,
        frameRate: {
          ideal: 24,
        },
        // First viceoinput device, any Browser
        deviceId: {
          exact: await navigator.mediaDevices
            .enumerateDevices()
            .then(
              devices =>
                devices.find(device => device.kind === 'videoinput').deviceId,
            ),
        },
        // facingMode: {
        //   exact: 'user',
        // },
      },
    };

    const stream = await navigator.mediaDevices.getUserMedia(videoConfig);
    const camera = new Camera();
    camera.video.srcObject = stream;

    // Debug, show in view
    // camera.video.height = 240;
    // camera.video.width = 240;
    // document.body.append(camera.video);

    // Await for camera aready
    await new Promise(resolve => {
      camera.video.onloadedmetadata = () => {
        resolve(camera.video);
      };
    });

    camera.video.play();

    return camera;
  }
}
