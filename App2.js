import React from "react"
import {
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,
  Platform, TouchableHighlight
} from 'react-native';
import TouchID from 'react-native-touch-id';
//or import TouchID from 'react-native-touch-id'

export default class App2 extends React.Component {

  check = () => {
    let isFingerPrintSupported = yield call(KeychainService.checkBiometricSupportednEnrolled);
    if (isFingerPrintSupported === true) {
      //fingerprint is supported and enrolled
      //TODO: we’ll work here in the next step
    } else {
      //show alert "TouchID has no enrolled fingers. Please go to settings and enable fingerprint on this device." that we returned from the service
      Alert.alert(
        "Alert",
        isFingerPrintSupported,
        [{
          text: 'Ok', onPress: () => {
            //redirect to settings
            Platform.OS === "ios"
              ? Linking.openURL('app-settings:')
              : AndroidOpenSettings.securitySettings() // Open security settings menu
          }
        }]
      );
    }


    render() {
      return (
        <View>
          <TouchableHighlight onPress={this.pressHandler}>
            <Text>
              Authenticate with Touch ID
          </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.check}>
            <Text>
              Check if supported or not
          </Text>
          </TouchableHighlight>
        </View>
      );
    }
  }