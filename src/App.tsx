import { useState,useEffect, useCallback } from 'react'
import './App.css';
import { HangmanDrawing } from './HangmanDrawing';
import { HangmanWord } from './HangmanWord';
import { Keyboard } from './Keyboard';
import words from  './wordList.json';

function getword(){
  return words[Math.floor(Math.random() * words.length)]
}

function App() {

  //get a random word from the wordlist
  const[wordToGuess,setWordToGuess] = useState(getword())

  //get the guessed word
  const[guessedLetters,setGuessedLetters] = useState<string[]>([])

  const inCorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  )

  const addGuessedLetter = useCallback((letter:string)=>{
    if(guessedLetters.includes(letter) || isLoser || isWinner) return

    setGuessedLetters(currentLetters => [...currentLetters, letter])
  },[guessedLetters])

  useEffect(() => {
    const handler = (e:KeyboardEvent) =>{
      const key = e.key;
      if(!key.match(/^[a-z]$/)) return

      e.preventDefault();
      addGuessedLetter(key)

    }

    document.addEventListener("keypress", handler)

    return ()=>{
      document.removeEventListener("keypress", handler)
    }
  }, [guessedLetters])
  

  const isLoser = inCorrectLetters.length >= 6
  const isWinner = wordToGuess
  .split("")
  .every(letter => 
   guessedLetters.includes(letter))
  
  useEffect(() => {
    const handler = (e:KeyboardEvent) =>{
      const key = e.key
      if(key !== "enter") return

      e.preventDefault();

      setGuessedLetters([]);

      setWordToGuess(getword())

    }

    document.addEventListener("keypress", handler)

    return ()=>{
      document.removeEventListener("keypress", handler)
    }
     
   }, [])
   


  return (
    <div className="App" style={{
      maxWidth : "800px",
      display : "flex",
      flexDirection : "column",
      gap : "2rem",
      margin : "0 auto",
      alignItems : "center"
    }}>
      <div style={{ fontSize :"2rem", textAlign: "center"}}>
        {isWinner && "Winner !! Refreash to try again"}
        {isLoser && "Nice try !! Refresh to try again"}
      </div>

      <HangmanDrawing numberOfGuesses={inCorrectLetters.length}/>
      <HangmanWord 
      reveal = {isLoser}
      guessedLetters = {guessedLetters} wordToGuess= {wordToGuess}/>
      <div style={{ alignSelf: "stretch"}}>
      <Keyboard 
      disabled = {isWinner || isLoser}
      activeLetters={guessedLetters.filter(letter =>
        wordToGuess.includes(letter)
      )}
      inactiveLetters={inCorrectLetters}
      addGuessedLetter={addGuessedLetter}/>
      </div>
      
    </div>
  )
}

export default App
