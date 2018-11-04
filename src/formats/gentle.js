export default (input, offsets = false, digits = 2) => new Promise((resolve, reject) => {
  try {
    const unit = 1;

    const words = input.words.map((word, i, words) => {
      const previousEndOffset = i > 0 ? words[i - 1].endOffset : - 1;
      const nextStartOffset = i < words.length - 1 ? words[i + 1].startOffset : input.transcript.length - 1;

      let startOffset = word.startOffset;
      let endOffset = word.endOffset;

      const prefix = input.transcript.substring(previousEndOffset, word.startOffset).trimLeft();
      const suffix = input.transcript.substring(word.endOffset, nextStartOffset).trimRight();

      let text = ``;
      if (i === 0 && prefix !== ``) {
        text = prefix;
        startOffset -= prefix.length;
      }

      text += input.transcript.substring(word.startOffset, word.endOffset);

      if (suffix !== ``) {
        text += suffix;
        endOffset += suffix.length;
      }

      const w = {
        startOffset,
        endOffset,
        text,
      };

      if (word.start) w.start = parseFloat((word.start / unit).toFixed(digits));
      if (word.end) w.end = parseFloat((word.end / unit).toFixed(digits));
      return w;
    }).map(w => {
      if (!offsets) {
        delete w.startOffset;
        delete w.endOffset;
      }

      return w;
    });

    // const sdrow = words.slice(0).reverse();
    // const paragraphs = input.transcript.split(/[\r\n?]+/).reduce((acc, segment) => {
    //   const lastEndOffset = acc.lenght > 0 ? acc[acc.length - 1].endOffset : input.transcript.length - 1;
    //   const startOffset = input.transcript.indexOf(segment, lastEndOffset + 1);
    //   const endOffset = startOffset + segment.length - 1;
    //
    //   const p = {startOffset, endOffset};
    //
    //   const startWord = words.find(word => word.startOffset >= startOffset);
    //   const endWord = sdrow.find(word => word.endOffset <= endOffset);
    //
    //   if (startWord) p.start = startWord.start;
    //   if (endWord) p.end = endWord.end;
    //
    //   acc.push(p);
    //   return acc;
    // }, []);

    resolve({
      words,
      // paragraphs
    });
  } catch (error) { reject(error); }
});
