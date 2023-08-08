const convertBanglaToUnicode = (banglaText) => {
  const unicodeArray = [...banglaText].map((c) => c.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0'));

  return unicodeArray.join('');
};

module.exports = {
  convertBanglaToUnicode,
};
