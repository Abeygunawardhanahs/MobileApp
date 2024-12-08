import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class CustomLabel extends Component {
  render() {
    return (
      <View style={{backgroundColor:"#000000",
        
      }}>
        <Text style={{
          
          fontFamily:'serif',
          fontWeight:'bold',
          fontSize:60,
          alignItems:"center",
          marginLeft: 90,
          color:"#20b2aa",

        }}> Music </Text>
      </View>
    )
  }
}
