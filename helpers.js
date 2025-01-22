export const ucFirst = (str) => {
    if (!str) return str;
  
    return str[0].toUpperCase() + str.slice(1);
  }

export const getUserBrowser = () => {
  const userAgent = navigator.userAgent;
  const vendor = navigator.vendor;

  if (
    /Chrome/.test(userAgent) &&
    /Google Inc/.test(vendor) &&
    !/Edg/.test(userAgent) &&
    !/OPR/.test(userAgent) &&
    !/YaBrowser/.test(userAgent)
  ) {
    return "Chrome";
  }
  else if (/Edg/.test(userAgent)) {
    return "Edg";
  }
  else if (/YaBrowser/.test(userAgent)) {
    return "YaBrowser";
  }
  else if (/OPR/.test(userAgent) || /Opera/.test(userAgent)) {
    return "OPR";
  }
  else if (/Safari/.test(userAgent) && /Apple Computer/.test(vendor)) {
    return "Safari";
  }
  else if (/Firefox/.test(userAgent)) {
    return "Firefox";
  }
  else if (/MSIE|Trident/.test(userAgent)) {
    return "MSIE";
  } else {
    return "UnknownBrowser";
  }
};

export const replaceStateUrl = (url) => {
    window.history.replaceState({}, "", url.toString());
}

export const setStateUrl = (url) => {
    window.history.replaceState({}, "", url.toString());
}