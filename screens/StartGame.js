import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native'

import Button from '../components/CustomButton'
import CardView from '../components/CardView'
import Colors from '../constants/Colors'
import Input from '../components/Input'

export default function StartGame (props) {
  const [enteredNum, setEnteredNum] = useState('')
  const [selectedNumber, setSelectedNumber] = useState()

  const handleReset = () => {
    setEnteredNum('')
  }

  const handleGameStart = () => {
    props.onStartGame(selectedNumber)
  }

  const handleConfirm = () => {
    let number = parseInt(enteredNum)
    if (isNaN(number) || number <= 0) {
      Alert.alert('Invalid Input', 'Entered value must be between 1 and 99', [
        { title: 'Okay', style: 'cancel', onPress: handleReset }
      ])
      return
    }

    setSelectedNumber(number)
    setEnteredNum('')
    Keyboard.dismiss()
  }

  const validateInput = e => {
    // if (e.match(/^[0-9]{1,2}$/g) || e == '')
    setEnteredNum(e.replace(/[^0-9]/g, ''))
  }
  const renderNumber = selectedNumber ? (
    <View style={styles.selectedNumContainer}>
      <Text style={styles.selectedNum}>Entered Number</Text>
      <Text style={styles.number}>{selectedNumber}</Text>
      <Button
        title='START GAME'
        color='white'
        backColor={Colors.highlight}
        onPress={handleGameStart}
      />
    </View>
  ) : (
    <View></View>
  )

  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss()
          }}
        >
          <View style={styles.screen}>
            <CardView style={styles.cardView}>
              <Text style={styles.gameText}>Guess a Number</Text>
              <Input
                style={styles.input}
                value={enteredNum}
                onChangeText={validateInput}
                placeholder='Enter a number'
                keyboardType='number-pad'
                maxLength={2}
              />
              <View style={styles.buttonContainer}>
                <Button
                  title='clear'
                  backColor={Colors.secondary}
                  onPress={handleReset}
                />
                <Button
                  title='confirm'
                  color='black'
                  backColor={Colors.primary}
                  onPress={handleConfirm}
                />
              </View>
            </CardView>
            {renderNumber}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 15
    // justifyContent: 'center'
  },
  selectedNumContainer: {
    marginVertical: 20,
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
    marginVertical: 10
  },
  gameText: {
    fontSize: 30,
    // fontWeight: 'bold',
    fontFamily: 'pirate-one'
  },
  cardView: {
    width: 300,
    minWidth: '80%',
    alignItems: 'center'
  },
  input: {
    width: '70%',
    textAlign: 'center'
  },
  buttonContainer: {
    marginVertical: 10,
    flexDirection: 'row'
  }
})
