onmessage = ({ data }) => {
  let i = 0;

  console.log('activating blocking operation...', data.maxItems);
  console.time('blocking-op');
  // blocking function
  // 1e5 = 100.000
  for (; i < data.maxItems; i += 1) console.log('.');
  console.timeEnd('blocking-op');

  postMessage({ response: 'ok', data: i });
};
