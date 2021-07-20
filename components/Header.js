import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Colors from '../constants/Colors'

const Header = props => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{props.title}</Text>
    </View>
  )
}
export default Header
const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
    // flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 40,
    height: 70,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '100%'
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18
  }
})
