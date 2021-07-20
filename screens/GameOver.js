import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView
} from 'react-native'

import CardView from '../components/CardView'
import Button from '../components/CustomButton'

const GameOver = props => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <CardView style={styles.cardView}>
          <Text style={styles.gameText}>Game Over</Text>
          <Image
            resizeMode='contain'
            source={require('../assets/images/Completed.png')}
            style={styles.image}
          />
          <View>
            <Text style={styles.vertPadding}>Computer Took</Text>
            <Text style={styles.vertPadding}>
              <Text style={styles.number}>{props.rounds} </Text> Rounds
            </Text>
            <Text style={styles.vertPadding}>The number was</Text>
            <Text style={styles.number}>{props.guessedNumber}</Text>
            <Button title='New Game' onPress={props.onStartNewGame} />
          </View>
        </CardView>
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  vertPadding: {
    paddingVertical: 5
  },
  cardView: {
    minWidth: '80%',
    alignItems: 'center'
  },
  screen: {
    flex: 1,
    padding: 15
  },
  number: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 30,
    marginVertical: 10
  },
  gameText: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  image: {
    width: '100%',
    height: Dimensions.get('window').height > 600 ? '40%' : '30%'
    // resizeMode: 'contain'
  }
})

export default GameOver
