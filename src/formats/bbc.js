export default (input, offsets = false, digits = 2) => new Promise((resolve, reject) => {
  try {
    const unit = 1;

    resolve({
      words: [],
      paragraphs: [],
      // speakers: []
    });
  } catch (error) { reject(error); }
});
