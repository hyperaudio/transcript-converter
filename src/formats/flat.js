export default (input, digits = 3, timeBase) => new Promise((resolve, reject) => {
  try {
    const unit = 1e3;
    // const T = 1 / 44100;
    // const round = t => T * Math.round(t / T);

    const round = t => parseFloat(t.toFixed(digits));

    resolve({
      words: input.words.map(w => {
        return {
          text: w.name,
          start: round(w.time / unit),
          end: round(w.time / unit + w.duration / unit)
        };
      }),
      paragraphs: input.words.reduce((acc, w) => {
        const p = acc.length > 0 ? acc[acc.length - 1] : {id: null};
        if (p.id !== w.para) {
          acc.push({
            id: w.para,
            start: round(w.time / unit),
            end: round(w.time / unit + w.duration / unit),
            speaker: input.speakers[w.speaker] ? input.speakers[w.speaker].name : null
          });
        } else {
          p.end = round(w.time / unit + w.duration / unit);
        }

        return acc;
      }, []).map(p => {
        delete p.id;
        return p;
      }),
      // speakers: input.words.reduce((acc, w) => {
      //   const p = acc.lenght > 1 ? acc[acc.length - 1] : {};
      //   if (p.id !== w.para) {
      //     acc.push({
      //       id: w.para,
      //       start: parseFloat((w.time / unit).toFixed(digits)),
      //       end: parseFloat((w.time / unit + w.duration / unit).toFixed(digits)),
      //       name: input.speakers[w.speaker] ? input.speakers[w.speaker].name : null
      //     });
      //   } else {
      //     p.end = parseFloat((w.time / unit + w.duration / unit).toFixed(digits));
      //   }
      //
      //   return acc;
      // }, []).map(p => {
      //   delete p.id;
      //   return p;
      // })
    });
  } catch (error) { reject(error); }
});
