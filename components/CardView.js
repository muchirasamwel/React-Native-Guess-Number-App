import React from 'react'
import { View, StyleSheet } from 'react-native'

const CardView = props => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  )
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    elevation: 6,
    shadowColor: 'black',
    shadowRadius: 3,
    shadowOffset: {
      width: 2,
      height: 3
    },
    shadowOpacity: 0.3
  }
})
export default CardView
