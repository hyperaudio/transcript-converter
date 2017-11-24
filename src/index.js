export default (input, format = `flat`, offsets = false, digits = 2) => new Promise((resolve, reject) => {
  try {
    let unit = 1e3;
    if (format === `sm`) unit = 1;

    resolve({
      words: input.words.map(w => {
        return {
          text: w.name,
          start: parseFloat((w.time / unit).toFixed(digits)),
          end: parseFloat((w.time / unit + w.duration / unit).toFixed(digits))
        };
      }),
      paragraphs: format === `sm` ? input.speakers.map(s => {
        return {
          speaker: s.name,
          start: parseFloat((s.time / unit).toFixed(digits)),
          end: parseFloat((s.time / unit + s.duration / unit).toFixed(digits))
        };
      }) : input.words.reduce((acc, w) => {
        const p = acc.lenght > 1 ? acc[acc.length - 1] : {};
        if (p.id !== w.para) {
          acc.push({
            id: w.para,
            start: parseFloat((w.time / unit).toFixed(digits)),
            end: parseFloat((w.time / unit + w.duration / unit).toFixed(digits)),
            speaker: input.speakers[w.speaker] ? input.speakers[w.speaker].name : null
          });
        } else {
          p.end = parseFloat((w.time / unit + w.duration / unit).toFixed(digits));
        }

        return acc;
      }, []).map(p => {
        delete p.id;
        return p;
      }),
      // speakers: format === `sm` ? input.speakers.map(s => {
      //   return {
      //     name: s.name,
      //     start: parseFloat((s.time / unit).toFixed(digits)),
      //     end: parseFloat((s.time / unit + s.duration / unit).toFixed(digits))
      //   };
      // }) : /*Object.keys(input.words.reduce((acc, w) => {
      //   const speaker = input.speakers[w.speaker] ? input.speakers[w.speaker].name : null;
      //   if (speaker) acc[speaker] = w.speaker;
      //   return acc;
      // }, {}))*/
      // input.words.reduce((acc, w) => {
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
