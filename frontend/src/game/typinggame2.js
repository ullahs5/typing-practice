
import { Button, Container, Input, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Timer from "./timer";
import { type } from "@testing-library/user-event/dist/type";
import { useContext } from "react";
import zIndex from "@mui/material/styles/zIndex";
import LoggedIn from "../0LoggedIn/LoggedIn";

// TypingGame component
const TypingGame = (props) => {

     // Constants and state variables for managing game logic and statistics
    const [wordsToShow, setWordsToShow] = useState(30);
    const wordBase = [
      "the", "be", "of", "and", "a", "to", "in", "he", "have", "it", "that", "for", "they", "I", "with", "as", "not",
      "on", "she", "at", "by", "this", "we", "you", "do", "but", "from", "or", "which", "one", "would", "all", "will",
      "there", "say", "who", "make", "when", "can", "more", "if", "no", "man", "out", "other", "so", "what", "time",
      "up", "go", "about", "than", "into", "could", "state", "only", "new", "year", "some", "take", "come", "these",
      "know", "see", "use", "get", "like", "then", "first", "any", "work", "now", "may", "such", "give", "over",
      "think", "most", "even", "find", "day", "also", "after", "way", "many", "must", "look", "before", "great",
      "back", "through", "long", "where", "much", "should", "well", "people", "down", "own", "just", "because",
      "good", "each", "those", "feel", "seem", "how", "high", "too", "place", "little", "world", "very", "still",
      "nation", "hand", "old", "life", "tell", "write", "become", "here", "show", "house", "both", "between", "need",
      "mean", "call", "develop", "under", "last", "right", "move", "thing", "general", "school", "never", "same",
      "another", "begin", "while", "number", "part", "turn", "real", "leave", "might", "want", "point", "form", "off",
      "child", "few", "small", "since", "against", "ask", "late", "home", "interest", "large", "person", "end", "open",
      "public", "follow", "during", "present", "without", "again", "hold", "govern", "around", "possible", "head",
      "consider", "word", "program", "problem", "however", "lead", "system", "set", "order", "eye", "plan", "run",
      "keep", "face", "fact", "group", "play", "stand", "increase", "early", "course", "change", "help", "line"
    ];
    
    // State variables using useState hook to manage component state
    const [wordList, setWordList] = useState("");
    const[showError, setShowError] = useState(false);
    const[wordCount, setWordCount] = useState(0);
    const[characterCount, setCharacterCount] = useState(0);
    const[missedCharacter, setMissedCharacter] = useState(0);
    const[wpm, setWpm] = useState(0);
    const[startTimer, setStartTimer] = useState(false);
    const[time, setTime] = useState(0);
    const[accuracy, setAccuracy] = useState(0);
    const[gameRestart, setGameRestart] = useState(false);

    const[showCorrectLetter, setShowCorrectLetter] = useState('');

    const [words, setWords] = useState('');
    const[letterCount, setLetterCount] = useState(0);
    const[userInput, setUserInput] = useState('');

    const[gameStart, setGameStart] = useState('');
    const[wpmStat, setWpmStat] = useState('');
    const[accuracyStat, setAccuracyStat] = useState('');

    // useEffect to generate random words for the game
    useEffect(() => {
      // Function to generate random words
      const getRandomWords = () => {
        resetGame()
        let i = 0;
        let newWordList = '';
        let newWords = '';
        while (i < wordsToShow) {
          const randomIndex = Math.floor(Math.random() * wordBase.length);
          const randomWord = wordBase[randomIndex];
          newWordList += randomWord + " ";
          newWords += randomWord + " ";
          i++;
        }
        setWordList(newWordList);
        setWords(newWords)
      };
  
      getRandomWords();
    }, [gameRestart, wordsToShow]);


    const handleTime = (updatedTime) => {
      setTime(updatedTime);
      if (updatedTime > 0) {
        const wordCount = Math.round(characterCount / 5); // Assuming 5 characters per word on average
        const timeInMinutes = updatedTime / 60; // Convert time to minutes for WPM calculation
        setWpm(Math.round(wordCount / timeInMinutes)); // Calculate WPM
        const accuracyPercentage = ((characterCount - missedCharacter) / characterCount) * 100;
        setAccuracy(Math.round(accuracyPercentage)); // Calculate Accuracy
      } else {
        setWpm(0);
        setAccuracy(0);
      }
    }

    const handleTypo = (e) => {
      const typed = e.key;
      if (typed === "Backspace"){
        setShowError(false);
      }
    }

    // Function to handle key press events
    const handleKeyDown = (e) => {
      const typed  = e.key;
      console.log("typed: " + typed);
      console.log("target: " + wordList.charAt(characterCount));
      console.log("LETTERCOUNT:" + letterCount)
      if(typed === "Tab"){
        setGameRestart(true);
      }
      else if (typed === "Backspace") {
        if (letterCount > 0) {
          setUserInput(userInput.substring(0, userInput.length-1));
          setCharacterCount((count) => count -1);
          setLetterCount((count) => count - 1);
        }
      }
      else if(typed === "Shift"){
      }
      else{
      checkLetterMatch(typed);
      setStartTimer(true);  
      }
    };
    // Function to check if typed letter matches
    const checkLetterMatch = (typed) => {
      if(typed === wordList.charAt(characterCount)) { //If the typed letter MATCHES the wordlist
        setLetterCount((prevCount) => prevCount + 1); 
        setCharacterCount((prevCount) => prevCount + 1);
        if (characterCount === wordList.length - 2) { //if user finishes the test
          setAccuracyStat(accuracy);
          setWpmStat(wpm);
          props.setWpmStat(wpm);
          props.setAccuracyStat(accuracy);
          setGameRestart(true);
        }
        if(typed === " "){
          setUserInput('');
          setWords(words.substring(letterCount, words.length).trim());
          setLetterCount(0);
          setShowError(false)
        }
        else{
          setUserInput((lastchar) => lastchar + typed);
          setShowError(false);
        }
      } 
      else {  //if the typed letter DOESN'T MATCH the wordlist
        if (wordList.charAt(characterCount) !== " "){
          setShowError(true);
          console.log(letterCount);
          console.log("USER INPUT:" + userInput);
          setMissedCharacter((prevCount) => prevCount + 1);
        }
        
        
      }
    };

    
    
    // Function to reset the game
    const resetGame = () => {
      setWordList("");
      setWords("");
      setUserInput("");
      setShowError(false);
      setCharacterCount(0);
      setLetterCount(0);
      setMissedCharacter(0);
      setStartTimer(false);
      setTime(0);
      // setWpm(0);
      // setAccuracy(0);
      setGameRestart(false);
    };


    // JSX returned by the TypingGame component
    return (
      <div>
        {startTimer? <Timer onTimeUpdate={handleTime}/>:false}
        <div className="live_stats">
          <a className="timer">{time}</a>
          <div>Wpm:{wpm}</div>
          <div>Accuracy:{accuracy > 0? accuracy:0}%</div>
        </div>

        <div className="word_count"> 
        <Button color="secondary" size="large" onClick={() => setWordsToShow(10)}>10</Button>
        <Button color="secondary" size="large" onClick={() => setWordsToShow(30)}>30</Button>
        <Button color="secondary" size="large" onClick={() => setWordsToShow(50)}>50</Button>
        </div>

        <div className="type_it">
          <input readOnly id="user_input" className="user_input" variant="standard" onKeyDown={ showError? handleTypo: handleKeyDown} value={userInput} autoComplete="off" autoFocus={true} autoCorrect="off" spellCheck={false} />
          

          <input readOnly id="word_scroll" className="word_scroll" defaultValue={`${words}`} variant="standard" onKeyDown={handleKeyDown} autoComplete="off" autoFocus={false} autoCorrect="off" />


          {showError? <input readOnly className="display_error" defaultValue={`${words.substring(0, letterCount+1)}`} variant="standard" onKeyDown={handleKeyDown} autoComplete="off" autoFocus={false} autoCorrect="off" />:""}
        </div>


      </div>
    );
  };

export default TypingGame;
