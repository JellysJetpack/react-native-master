import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import firebase from "../database/firebase";
import bgImage from "../images/background6.jpg";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      pass: "",
      isLoading: false,
    };
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  userLogin = () => {
    const {username, pass, cpass, email,phone, address} = this.state;
    console.log("Press Login");
    if (this.state.email === "" && this.state.pass === "") {
      Alert.alert("Enter details to signin!");
    } else {
      this.setState({
        isLoading: true,
      });
     ()=>firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass).database().ref('userdata/'+ email).set({
      pass: this.state.pass,
      email: this.state.email,
    
     });
     firebase.auth().signInWithEmailAndPassword(email, pass)
     .then((user) => {
      console.log("User login successfully!"+JSON.stringify(user));
     })
     .catch((error) => {
       var errorCode = error.code;
       var errorMessage = error.message;
     });

      
      this.setState({
        isLoading: false,
      
        email: "",
        pass: "",
     
       });
     
       
          this.props.navigation.navigate("Categories");
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <View style={styles.inner}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Email"
            placeholderTextColor={"rgba(30, 30, 30, 0.8)"}
            value={this.state.email}
            onChangeText={(val) => this.updateInputVal(val, "email")}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Password"
            placeholderTextColor={"rgba(30, 30, 30, 0.8)"}
            value={this.state.pass}
            onChangeText={(val) => this.updateInputVal(val, "pass")}
            maxLength={15}
            secureTextEntry={true}
          />
          <Button
            color="#3740FE"
            title="Login"
            onPress={() => this.userLogin()}
          />
          {/* <View>
            <Text style={styles.headText}>Signin</Text>
          </View> */}
          <Text
            style={styles.loginText}
            onPress={() => this.props.navigation.navigate("Signup")}
          >
            Don't have account? Click here to signup
          </Text>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    display: "flex",
    width: null,
    height: null,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 35,
    //backgroundColor: "#fff",
  },
  inner: {
    //flex: 1,
    display: "flex",
    width: "85%",
    height: "70%",
    //flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 35,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  headText: {
    color: "#000C67",
    fontSize: 50,
    fontWeight: "500",
    marginTop: -250,
    textAlign: "center",
  },
  inputStyle: {
    width: "100%",
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#727272",
    borderBottomWidth: 1,
  },
  loginText: {
    color: "#00195F",
    marginTop: 25,
    textAlign: "center",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
