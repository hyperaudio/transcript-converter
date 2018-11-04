import flat from './formats/flat';
import sm from './formats/sm';
import gentle from './formats/gentle';
// import bbc from './formats/bbc';

export default (input, format, digits, timeBase) => {
  switch (format) {
  case `flat`:
    return flat(input, digits, timeBase);
  case `sm`:
    return sm(input, timeBase);
  case `gentle`:
    return gentle(input, timeBase);
  // case `bbc`:
  //   return bbc(input, timeBase);
  default:
    throw new Error(`Unknown format: ${format}`);
  }
};
