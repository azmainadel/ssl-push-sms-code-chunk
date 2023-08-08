const { parseString } = require('xml2js');

const parseXml = async (xml) => {
  return new Promise((resolve, reject) => {
    parseString(xml, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  parseXml,
};
