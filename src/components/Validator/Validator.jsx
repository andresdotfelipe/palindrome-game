import { useState, useEffect, useRef } from "react";
import {
  findDuplicateWords,
  validatePalindrome,
  validatePalindromeList,
} from "../../utils/validation";
import "./Validator.scss";

const initialState = {
  actualScore: 0,
  palindromeInput: "",
  actualPalindromeList: [],
  error: "",
  stateCleared: false,
};

const Validator = ({ startGame, showGameOver, handleStartClick }) => {
  const [actualScore, setActualScore] = useState(initialState.actualScore);
  const [palindromeInput, setPalindromeInput] = useState(
    initialState.palindromeInput
  );
  const [actualPalindromeList, setActualPalindromeList] = useState(
    initialState.actualPalindromeList
  );
  const [error, setError] = useState(initialState.error);
  const [stateCleared, setStateCleared] = useState(initialState.stateCleared);

  const palindromeField = useRef(null);

  const handleValidateClick = (e) => {
    e.preventDefault();    
    const duplicatedWords = findDuplicateWords(palindromeInput);
    if (duplicatedWords.length === 0) {
      let result = validatePalindrome(palindromeInput);
      if (result.isPalindrome) {
        const isInPalindromeList = validatePalindromeList(
          result.type,
          result.palindromes,
          actualPalindromeList
        );
        if (!isInPalindromeList) {
          setActualScore(result.score + actualScore);
          if (result.type === "phrase") {
            setActualPalindromeList([
              ...actualPalindromeList,
              result.palindromes,
            ]);
          } else {
            setActualPalindromeList([
              ...actualPalindromeList,
              ...result.palindromes,
            ]);
          }
          setPalindromeInput("");
          setError("");
        } else {
          setError("Word already in palindrome list.");
        }
      } else {
        setError("No palindrome found!");
      }
    } else {
      setError(`Duplicated words: ${duplicatedWords}`);
    }
    palindromeField.current.focus();
  };

  const onChange = (e) => {
    setPalindromeInput(e.target.value);
  };

  useEffect(() => {
    palindromeField?.current?.focus();
  }, []);

  useEffect(() => {
    if (showGameOver && !stateCleared) {      
      const actualStorageHistoryScore =
        JSON.parse(localStorage.getItem("historyScore")) || [];
      actualStorageHistoryScore.unshift(actualScore);
      localStorage.setItem(
        "historyScore",
        JSON.stringify(actualStorageHistoryScore)
      );
      localStorage.setItem("bestScore", JSON.stringify(Math.max.apply(Math, actualStorageHistoryScore)));
      setActualScore(initialState.actualScore);
      setPalindromeInput(initialState.palindromeInput);
      setActualPalindromeList(initialState.actualPalindromeList);
      setError(initialState.error);
      setStateCleared(true);
    } else if (!showGameOver && startGame) {
      setStateCleared(false);
    }
  }, [showGameOver, startGame, stateCleared, actualScore]);

  return (
    <section className="validator">
      {!startGame ? (
        <button onClick={handleStartClick}>Start</button>
      ) : (
        <>
          <span>Score: {actualScore}</span>
          <form onSubmit={handleValidateClick}>
            <input
              type="text"
              value={palindromeInput}
              onChange={onChange}
              required
              pattern="[a-z A-Z]*"
              ref={palindromeField}
            ></input>
            <button type="submit">Validate</button>
          </form>
          {error !== "" && <span>Error: {error}</span>}
          <div>
            <span>Palindrome list</span>
            <ul>
              {actualPalindromeList.map((palindrome, index) => {
                return <li key={index}>{palindrome}</li>;
              })}
            </ul>
          </div>
        </>
      )}
    </section>
  );
};

export default Validator;
