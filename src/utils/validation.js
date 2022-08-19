export const findDuplicateWords = (words) => {
  const formatter = new Intl.ListFormat("en", { style: "long", type: "unit" });
  words = textToWordsArray(words);
  words = words.filter((word, index) => words.indexOf(word) !== index);
  return formatter.format(words);
};

export const validatePalindrome = (input) => {
  let result = validatePhrasePalindrome(input);
  if (!result.isPalindrome) result = validateWordsPalindrome(input);
  return result;
};

export const validatePalindromeList = (
  type,
  palindromes,
  actualPalindromeList
) => {
  let isInPalindromeList = false;
  if (type === "phrase") {
    isInPalindromeList = actualPalindromeList.includes(palindromes);
  } else {
    isInPalindromeList = palindromes.some((palindrome) =>
      actualPalindromeList.includes(palindrome)
    );
  }
  return isInPalindromeList;
};

const validateWordsPalindrome = (words) => {
  let isPalindrome = true;
  words = textToWordsArray(words);
  for (let word of words) {
    if (word !== word.split("").reverse().join("")) {
      isPalindrome = false;
      break;
    }
  }
  const result = { isPalindrome };
  if (isPalindrome) {
    result.palindromes = words;
    result.score = words.length;
    result.type = "words";
  }
  return result;
};

const validatePhrasePalindrome = (phrase) => {
  let isPalindrome = true;
  let phraseWithoutBlankSpaces = removeTextBlankSpaces(phrase);
  if (
    phraseWithoutBlankSpaces !==
    phraseWithoutBlankSpaces.split("").reverse().join("")
  ) {
    isPalindrome = false;
  }
  const result = { isPalindrome };
  if (isPalindrome) {
    result.palindromes = phrase;
    result.score = 1;
    result.type = "phrase";
  }
  return result;
};

const textToWordsArray = (input) => {
  return (input = input.toLowerCase().trim().split(" "));
};

const removeTextBlankSpaces = (input) => {
  return (input = input.toLowerCase().replace(/ /g, ""));
};
