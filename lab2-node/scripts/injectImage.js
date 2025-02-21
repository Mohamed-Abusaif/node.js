const injectImage = (temp, imagePath) => {
  let output = temp.replace(
    /{%Image%}/g,
    `<img src="${imagePath}" alt="hello from astro image"/>`
  );
  return output;
};

module.exports = { injectImage };
