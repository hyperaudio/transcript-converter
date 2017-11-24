const transcriptConverter = require(`../`);

const data = require(`./flat-rGhKXS8bRKKm8MAph3E25g.json`);
transcriptConverter(data).then(converted => {
  console.log(JSON.stringify(converted, null, 2));
});


// const data = require(`./sm-rGhKXS8bRKKm8MAph3E25g.json`);
// transcriptConverter(data, `sm`).then(converted => {
//   console.log(JSON.stringify(converted, null, 2));
// });
