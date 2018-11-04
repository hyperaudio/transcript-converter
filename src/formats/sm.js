export default (input, offsets = false, digits = 2) => new Promise((resolve, reject) => {
  try {
    const unit = 1;

    // TODO collate punctuation to words
    resolve({
      words: input.words.map(w => {
        return {
          text: w.name,
          start: parseFloat((w.time / unit).toFixed(digits)),
          end: parseFloat((w.time / unit + w.duration / unit).toFixed(digits))
        };
      }),
      paragraphs: input.speakers.map(s => {
        return {
          speaker: s.name,
          start: parseFloat((s.time / unit).toFixed(digits)),
          end: parseFloat((s.time / unit + s.duration / unit).toFixed(digits))
        };
      }),
      // speakers: input.speakers.map(s => {
      //   return {
      //     name: s.name,
      //     start: parseFloat((s.time / unit).toFixed(digits)),
      //     end: parseFloat((s.time / unit + s.duration / unit).toFixed(digits))
      //   };
      // })
    });
  } catch (error) { reject(error); }
});
