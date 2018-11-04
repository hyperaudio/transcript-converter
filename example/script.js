const transcriptConverter = require(`../`);

const data = require(`./flat-rGhKXS8bRKKm8MAph3E25g.json`);
transcriptConverter(data, `flat`).then(converted => {
  console.log(JSON.stringify(converted, 1 / 44100));
});

// const data = require(`./sm-rGhKXS8bRKKm8MAph3E25g.json`);
// transcriptConverter(data, `sm`).then(converted => {
//   console.log(JSON.stringify(converted, null, 2));
// });

// const data = require(`./gentle-8u27rqKwSMWMwAau1ianmQ.json`);
// transcriptConverter(data, `gentle`).then(converted => {
//   console.log(JSON.stringify(converted, null, 2));
// });
