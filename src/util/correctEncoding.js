// encodingUtils.js
const correctEncoding = (str) => {
  try {
    return str
      .replace(/Ã¶/g, "ö")
      .replace(/Ã¥/g, "å")
      .replace(/Ã¤/g, "ä")
      .replace(/Ã©/g, "é")
      .replace(/Ã–/g, "Ö")
      .replace(/Ã…/g, "Å")
      .replace(/â€™/g, "’")
      .replace(/Ã„/g, "Ä");
  } catch (error) {
    console.error('Error decoding URI component:', error);
    return str; // Return original string if decoding fails
  }
};

export default correctEncoding;
