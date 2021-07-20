import React from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native'

const bigScreen = Dimensions.get('window').height > 600
export default function CustomButton ({
  title,
  backColor,
  color,
  onPress,
  borderColor
}) {
  const styles = StyleSheet.create({
    button: {
      minWidth: '30%',
      borderColor: borderColor ? borderColor : 'black',
      borderRadius: 5,
      backgroundColor: backColor ? backColor : 'black',
      paddingVertical: bigScreen ? 10 : 5,
      paddingHorizontal: 20,
      marginVertical: 5,
      marginHorizontal: 10,
      flexDirection: 'row',
      justifyContent: 'center'
    },
    btnText: {
      color: color ? color : 'white',
      fontSize: 14,
      fontWeight: 'bold'
    }
  })

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  )
}
