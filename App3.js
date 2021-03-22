import React from "react"
import {
    Alert,
    Image,
    Text,
    TouchableOpacity,
    View,
    ViewPropTypes,
    Platform,TouchableHighlight
  } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics'
//or import TouchID from 'react-native-touch-id'

export default class App3 extends React.Component {
  state={
    key:''
  }
check=()=>{
        ReactNativeBiometrics.isSensorAvailable()
  .then((resultObject) => {
    const { available, biometryType } = resultObject

    if (available && biometryType === ReactNativeBiometrics.TouchID) {
      alert('TouchID is supported')
      console.log('TouchID is supported')
    } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
        alert('FaceID is supported')
      console.log('FaceID is supported')
    } else if (available && biometryType === ReactNativeBiometrics.Biometrics) {
        alert('Biometrics is supported')
      console.log('Biometrics is supported')
    } else {
        alert('Biometrics not supported')
      console.log('Biometrics not supported')
    }
  })
    }

  createKey=()=>{
    try{
    ReactNativeBiometrics.createKeys('Confirm fingerprint')
    .then((resultObject) => {
      const { publicKey } = resultObject
      console.log('Key:')
      console.log(publicKey)
      alert('publickey: ',publicKey)
      this.setState({key:publicKey})
      // sendPublicKeyToServer(publicKey)
    })
    .catch(err=>console.log(err))
  
  }
    catch(error){
        alert('Catched error: ',error)
        console.log('catched: ',error)
    }
  }

  checkIfKeyExists=()=>{
    ReactNativeBiometrics.biometricKeysExist()
    .then((resultObject) => {
      const { keysExist } = resultObject
  
      if (keysExist) {
          alert('Keys exist')
        console.log('Keys exist')
      } else {
        alert('Keys do not exist or were deleted')
        console.log('Keys do not exist or were deleted')
      }
    })
  }

  deleteKey=()=>{
    ReactNativeBiometrics.deleteKeys()
    .then((resultObject) => {
      const { keysDeleted } = resultObject
  
      if (keysDeleted) {
        alert('Successful deletion')
        console.log('Successful deletion')
      } else {
        alert('Keys do not exist or were deleted')
        console.log('Keys do not exist or were deleted')
      }
    })
  }

  createSignature=()=>{
    let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
    let payload = epochTimeSeconds + 'some message'
    console.log('payload')
    console.log(payload)
    
    ReactNativeBiometrics.createSignature({
        promptMessage: 'Sign in',
        payload: payload
      })
      .then((resultObject) => {
        const { success, signature } = resultObject
        // console.log(resultObject)
    
        if (success) {
          console.log('signature')
          console.log(signature)
          alert('Signature made')
          // verifySignatureWithServer(signature, payload)
        }
      })
      .catch(err=>console.log(err))
  }

  simpleprompt=()=>{
    ReactNativeBiometrics.simplePrompt({promptMessage: 'Confirm fingerprint'})
    .then((resultObject) => {
      const { success } = resultObject
      console.log(resultObject)
  
      if (success) {
        console.log('successful biometrics provided')
        alert('successful biometrics provided')
      } else {
        console.log('user cancelled biometric prompt')
        alert('user cancelled biometric prompt')
      }
    })
    .catch(() => {
    alert('biometrics failed')
      console.log('biometrics failed')
    })
  }

  render() {
    return (
      <View>
        <TouchableHighlight onPress={this.check} style={{marginTop:15,backgroundColor:'lightblue',height:50,width:150,alignSelf:'center',justifyContent:'center'}}>
          <Text style={{alignSelf:'center',padding:5}}>
            Check if biometric is supported or not
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.createKey}  style={{marginTop:15,backgroundColor:'lightblue',height:50,width:150,alignSelf:'center',justifyContent:'center'}}>
          <Text style={{alignSelf:'center',padding:5}}>
            Creates key
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.checkIfKeyExists}  style={{marginTop:15,backgroundColor:'lightblue',height:50,width:150,alignSelf:'center',justifyContent:'center'}}>
          <Text style={{alignSelf:'center',padding:5}}>
            Check if key exists
          </Text>
        </TouchableHighlight>
        {/* <TouchableHighlight onPress={this.deleteKey}  style={{marginTop:15,backgroundColor:'lightblue',height:50,width:150,alignSelf:'center',justifyContent:'center'}}>
          <Text style={{alignSelf:'center',padding:5}}>
            Delete key
          </Text>
        </TouchableHighlight> */}
        <TouchableHighlight onPress={this.createSignature}  style={{marginTop:15,backgroundColor:'lightblue',height:50,width:150,alignSelf:'center',justifyContent:'center'}}>
          <Text style={{alignSelf:'center',padding:5}}>
            Create signature
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.simpleprompt}  style={{marginTop:15,backgroundColor:'lightblue',height:50,width:150,alignSelf:'center',justifyContent:'center'}}>
          <Text style={{alignSelf:'center',padding:10}}>Prompt user for fingerprint</Text>
        </TouchableHighlight>
      </View>
    );
  }
}