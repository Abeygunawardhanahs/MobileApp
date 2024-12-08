import React, { Component } from "react";
import { Text, TextInput, View } from "react-native";

export default class Secondpage extends Component {
  render() {
    return (
      <View
        style={{
          alignItems: "center",
          paddingTop: 20,
          paddingBottom: 2,
        }}
      >
        <TextInput
          style={{
            backgroundColor: "#e0ffff",
            color: "black",
            width: 300,
            height: 50,
            borderRadius: 20,
            paddingLeft: 40,
          }}
          placeholder="User name"
        />
        <TextInput
          style={{
            backgroundColor: "#e0ffff",
            color: "black",
            width: 300,
            marginTop:20,
            height: 50,
            borderRadius: 20,
            paddingLeft: 40,
          }}
          secureTextEntry={true}
          placeholder='password'
        />

        
      </View>
    );
  }
}
