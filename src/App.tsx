import { useState } from 'react'
import './App.css';
import { HangmanDrawing } from './HangmanDrawing';
import { HangmanWord } from './HangmanWord';
import { Keyboard } from './Keyboard';
import words from  './wordList.json';

function App() {

  //get a random word from the wordlist
  const[wordToGuess,setWordToGuess] = useState(()=>{
    return words[Math.floor(Math.random() * words.length)]
  })

  //get the guessed word
  const[guessedLetters,setGuessedLetters] = useState<string[]>([])

  


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
        Lose Win
      </div>
      <HangmanDrawing/>
      <HangmanWord/>
      <Keyboard/>
      
    </div>
  )
}

export default App
