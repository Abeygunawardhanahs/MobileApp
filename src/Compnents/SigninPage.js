import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, Button  } from 'react-native'
import images from '../../assets/Image/images.jpg';

export default class SigninPage extends Component {
  render() {
    return (

      <View style=
      {{
        alignItems:'center'
      }}>
        <Text style=
        {{
            fontSize:20,
            alignItems:'center',
            paddingLeft:20,
            paddingTop:100,
            fontWeight:'bold'


        }} >Welcome to </Text>
       <Image source={images} style={styles.images} resizeMode='contain'/>
       
       <Text style=
        {{
            fontSize:20,
            alignItems:'center',
            paddingLeft:20,
            paddingTop:50,
            paddingBottom:50,
            fontWeight:'bold'


        }} > Academy...</Text>
        <Button 
        title='Go'
        color={"#e0ffff"}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
root:{
    alignItems :"center",
    paddingTop:20,
},
images:{

    marginTop:50,
    width:'100%',
    height:200,
    

},
});
