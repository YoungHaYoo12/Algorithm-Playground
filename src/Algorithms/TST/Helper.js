function hasWhiteSpace(s) {
  return s.indexOf(" ") >= 0;
}

function stringWithOnlyLetters(str) {
  return /^[a-zA-Z]+$/.test(str);
}

function isValidKey(s) {
  if (
    hasWhiteSpace(s) ||
    s.length === 0 ||
    s.length > 20 ||
    !stringWithOnlyLetters(s)
  )
    return false;
  return true;
}

const opDisplayNames = {
  put: "Run Put",
  putR: "Run Put (Random)",
  get: "Run Get",
  keys: "Run Keys",
  lpo: "Run Longest Prefix Of",
  kwp: "Run Keys With Prefix",
  ktm: "Run Keys That Match",
  min: "Run Min",
  max: "Run Max"
};

// whether key,value fields are disabled or not
const opInputsDisabled = {
  put: [false, false],
  putR: [true, true],
  get: [false, true],
  keys: [true, true],
  lpo: [false, true],
  kwp: [false, true],
  ktm: [false, true],
  min: [true, true],
  max: [true, true]
};

export {
  hasWhiteSpace,
  stringWithOnlyLetters,
  opDisplayNames,
  opInputsDisabled,
  isValidKey
};
