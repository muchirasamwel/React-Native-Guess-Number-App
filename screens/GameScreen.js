import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList,
  Dimensions
} from 'react-native'

import Colors from '../constants/Colors'
import Button from '../components/CustomButton'

const bigScreen = Dimensions.get('window').height > 500

const genRandBtwn = (min, max, exclude) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  let randNum = Math.floor(Math.random() * (max - min)) + min
  if (randNum == exclude) {
    return genRandBtwn(min, max, exclude)
  } else {
    return randNum
  }
}
// const renderGuess = (guess, noOfRounds) => {
//   return (
//     <View style={styles.listItem} key={guess}>
//       <Text>#{noOfRounds}</Text>
//       <Text>{guess}</Text>
//     </View>
//   )
// }

const renderGuess = (roundsLength, itemData) => {
  return (
    <View style={styles.listItem}>
      <Text>#{roundsLength - itemData.index}</Text>
      <Text>{itemData.item}</Text>
    </View>
  )
}

const GameScreen = props => {
  const [compGuess, setCompGuess] = useState(
    genRandBtwn(1, 99, props.userNumber)
  )
  const min = useRef(1)
  const max = useRef(99)
  const rounds = useRef(0)
  const { onGameOver, userNumber } = props
  const [guesses, setGuesses] = useState([compGuess.toString()])
  const checkOrientation = () => {
    const dim = Dimensions.get('screen')
    return dim.height >= dim.width ? 'portrait' : 'landscape'
  }
  const [orientation, setOrientation] = useState(checkOrientation())

  const updateOrientation = () => {
    setOrientation(checkOrientation())
  }
  useEffect(() => {
    Dimensions.addEventListener('change', updateOrientation)

    return () => {
      Dimensions.removeEventListener('change', updateOrientation)
    }
  }, [Dimensions, updateOrientation])
  useEffect(() => {
    if (compGuess == userNumber) {
      onGameOver(rounds.current, compGuess)
    }
  }, [compGuess, userNumber, rounds])
  const handleHint = (direction = 'lower') => {
    if (
      (direction == 'lower' && props.userNumber > compGuess) ||
      (direction == 'higher' && props.userNumber < compGuess)
    ) {
      Alert.alert('Dont Cheat', 'The number is not lower than ' + compGuess, [
        { title: 'Ok', style: 'default' }
      ])
      return
    }

    direction == 'lower'
      ? (max.current = compGuess)
      : (min.current = compGuess + 1)
    let newGuess = genRandBtwn(min.current, max.current, compGuess)
    setCompGuess(newGuess)
    setGuesses(prev => [newGuess.toString(), ...prev])
    rounds.current = rounds.current + 1
  }
  let renderGuessResult = (
    <View style={styles.selectedNumContainer}>
      <Text style={styles.selectedNum}>Computer Guessed Number</Text>

      <Text style={styles.number}>{compGuess}</Text>
      <Text style={styles.selectedNum}>
        Is the no. Lower or Greater than this?
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title='Lower'
          backColor={Colors.secondary}
          onPress={handleHint.bind(this, 'lower')}
        />
        <Button
          title='Greater'
          color='black'
          backColor={Colors.primary}
          onPress={handleHint.bind(this, 'higher')}
        />
      </View>
    </View>
  )
  if (orientation == 'landscape') {
    renderGuessResult = (
      <View style={styles.selectedNumContainer}>
        <Text style={styles.selectedNum}>Computer Guessed Number</Text>
        <View style={styles.buttonContainer}>
          <Button
            title='Lower'
            backColor={Colors.secondary}
            onPress={handleHint.bind(this, 'lower')}
          />
          <Text style={styles.number}>{compGuess}</Text>
          <Button
            title='Greater'
            color='black'
            backColor={Colors.primary}
            onPress={handleHint.bind(this, 'higher')}
          />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.screen}>
      {renderGuessResult}

      <View style={styles.listContainer}>
        <View style={{ flex: 1 }}>
          <View style={styles.listContainerHeader}>
            <Text style={styles.headerText}>Rounds</Text>
            <Text style={styles.headerText}>Guess</Text>
          </View>
          {/* <ScrollView contentContainerStyle={styles.list}>
            {guesses.map((guess, index) =>
              renderGuess(guess, guesses.length - index)
            )}
          </ScrollView> */}
          <FlatList
            keyExtractor={item => item}
            data={guesses}
            renderItem={renderGuess.bind(this, guesses.length)}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center'
  },
  buttonContainer: {
    marginVertical: 10,
    flexDirection: 'row'
  },
  selectedNumContainer: {
    marginVertical: bigScreen ? 20 : 5,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectedNum: {
    fontSize: 18
  },
  number: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 30,
    marginVertical: bigScreen ? 10 : 2
  },
  listContainer: {
    width: '70%',
    flexDirection: 'row',
    flex: 1
  },

  listContainerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: bigScreen ? 10 : 5,

    backgroundColor: Colors.secondary,
    borderWidth: 2,
    borderRadius: 5
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold'
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  },
  list: {
    flexGrow: 1,
    justifyContent: 'flex-end'
  }
})

export default GameScreen
