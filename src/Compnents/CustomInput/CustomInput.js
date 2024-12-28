import React, { Component } from "react";
import { Text, View, TextInput, Image, StyleSheet, Button } from "react-native";
import images from "../../../assets/Image/images.jpg";

export default class CustomInput extends Component {
  render() {
    return (
      <View
        style={{
          alignItems: "center",
          paddingTop: 20,
          paddingBottom: 2,
        }}
      >
        <Image source={images} style={StyleSheet.images} resizeMode="contain" />
        <Text style={{
          marginTop:50,
          marginBottom:20,
          color:"orange"
          
        }}> Enter your details to Login </Text>
        <TextInput style={{
          color:"black",
          backgroundColor:"#e0ffff",
          width:300,
          marginTop:20,
          height:50,
          borderRadius:20,
          paddingLeft:30

        }}
        placeholder="Enter your name"
        keyboardType="Default"
        />
        <TextInput 
        style={{
          color:"black",
          backgroundColor:"#e0ffff",
          width: 300,
          height: 50, 
          borderRadius:20,
          marginTop:20,
          paddingLeft:30,
          marginBottom:40,
          
        }} 
        secureTextEntry={true}
        placeholder="Enter your Password"
        />
        <Button 
         color="orange"
         title="Submit"
        />

         <Button 
         color="blue"
         title="Cancel"
         />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    paddingTop: 20,
  },
  images: {
    marginTop: 50,
    width: "100%",
    height: 200,
    
  },
  
});
