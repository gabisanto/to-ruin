/* this section helps import all images in assets together without the need to import them individually in several similar lines */

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => (images[item.slice(2, 8)] = r(item)));
  return images;
}

const images = importAll(require.context("./notFound", false, /\.png/));

export default images;
