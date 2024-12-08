import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CustomLabel from './src/Compnents/CustomLabel';
import Secondpage from './src/Compnents/Secondpage';
import SigninPage from './src/Compnents/SigninPage';
import CustomInput from './src/Compnents/CustomInput/CustomInput';

export default function App() {
  return (
    <View style={styles.container}>

      {/* <CustomLabel/>
      <Secondpage/> */}
      {/* <SigninPage/> */}
      <CustomInput/>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingTop:30,
  },
});
