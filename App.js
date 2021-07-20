import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'

import Header from './components/Header'
import StartGame from './screens/StartGame'
import GameScreen from './screens/GameScreen'
import GameOver from './screens/GameOver'

// const loadFonts = () => {
//   return Font.loadAsync({
//     'pirate-one': require('./assets/fonts/PirataOne-Regular.ttf')
//   })
// }

export default function App () {
  const [userNumber, setUserNumber] = useState()
  const [gameOver, setGameOver] = useState()
  const [guessedNumber, setGuessedNumber] = useState()
  // const [dataLoaded, setDataLoaded] = useState(false)

  const [fontLoaded] = Font.useFonts({
    'pirate-one': require('./assets/fonts/PirataOne-Regular.ttf')
  })

  if (!fontLoaded) {
    return (
      <AppLoading
      // startAsync={loadFonts}
      // onFinish={() => setDataLoaded(true)}
      // onError={err => console.log('error occurred', err)}
      />
    )
  }

  const startGameHandler = number => {
    setUserNumber(number)
  }
  const newGameHandler = () => {
    setGameOver()
    setGuessedNumber()
    setUserNumber()
  }

  const handleGameOver = (rounds, number) => {
    setGameOver(rounds)
    setGuessedNumber(number)
  }

  let screen = <StartGame onStartGame={startGameHandler} />

  if (userNumber && !gameOver) {
    screen = <GameScreen userNumber={userNumber} onGameOver={handleGameOver} />
  } else if (gameOver) {
    screen = (
      <GameOver
        rounds={gameOver}
        guessedNumber={guessedNumber}
        onStartNewGame={newGameHandler}
      />
    )
  }

  return (
    <View style={styles.container}>
      <Header title='Guess Number App' />
      <StatusBar style='auto' />
      {screen}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
    // justifyContent: 'center'
  }
})
