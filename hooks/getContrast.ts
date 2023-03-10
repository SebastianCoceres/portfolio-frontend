const getContrast = (hexcolor: string) => {
  if (hexcolor.slice(0, 1) === "#") {
    hexcolor = hexcolor.slice(1);
  }
  if (hexcolor.length === 3) {
    hexcolor = hexcolor
      .split("")
      .map(function (hex) {
        return hex + hex;
      })
      .join("");
  }

  var r = parseInt(hexcolor.substring(0, 2), 16);
  var g = parseInt(hexcolor.substring(2, 4), 16);
  var b = parseInt(hexcolor.substring(4, 6), 16);

  //YIQ ratio
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;

  return yiq >= 126 ? "#000" : "#fff";
};

export { getContrast };
