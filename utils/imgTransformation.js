const fs = require('fs');

/**
 * From pictureObject inside database => Image source string
 * If the picture object is not exist inside database => Return undefined
 * @param {*} pictureObject Product.picture object
 * @returns imgSrc (string), which can be passed directly to <img src="imgSrc"/>
 */
function getImgSrc(pictureObject) {
  if (!pictureObject || !pictureObject.data || !pictureObject.contentType)
    return undefined;

  const imgBase64 = new Buffer(pictureObject.data).toString('base64');
  let imgSrc = `data:${pictureObject.contentType};base64,` + imgBase64;
  return imgSrc;
}

/**
 * From the data sent from user => Get the picture object
 * => Insert the picutre object to database
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
function getPictureObject(req, res, next) {
  // If there is no file uploaded => Return
  if (!req.file) return undefined;

  // Define a JSONobject image for saving to database
  const img = fs.readFileSync(req.file.path);
  const encode_image = img.toString('base64');
  let finalImg = undefined;
  if (req.file.mimetype && encode_image) {
    finalImg = {
      contentType: req.file.mimetype,
      data: new Buffer(encode_image, 'base64'),
    };
  }

  return finalImg;
}

module.exports = { getImgSrc, getPictureObject };
