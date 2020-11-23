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

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      pass: "",
      cpass: "",
      email: "",
      phone: "",
      address: "",
      isLoading: false,
    };
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  registerUser = () => {
    const {username, pass, cpass, email,phone, address} = this.state;
    if (this.state.email === "" && this.state.pass === "") {
      Alert.alert("Enter details to signup!");
    } else {
      this.setState({
        isLoading: true,
      });
      firebase
        
        .database().ref('userdata/'+ username).set({
          username: this.state.username,
          pass: this.state.pass,
          cpass: this.state.cpass,
          email: this.state.email,
          phone: this.state.phone,
          address: this.state.address,
         });
     
          console.log("User registered successfully!");
          this.setState({
            isLoading: false,
            username: "",
            email: "",
            pass: "",
            cpass: "",
            phone: "",
            address: ""
           });
         
          
          this.props.navigation.navigate("Login");
        
        
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
            placeholder="User Name"
            placeholderTextColor={"rgba(53, 53, 53, 0.8)"}
            value={this.state.username}
            onChangeText={(val) => this.updateInputVal(val, "username")}

          />
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
            placeholderTextColor={"rgba(53, 53, 53, 0.8)"}
            value={this.state.pass}
            onChangeText={(val) => this.updateInputVal(val, "pass")}
            maxLength={15}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Confirm Password"
            placeholderTextColor={"rgba(53, 53, 53, 0.8)"}
            value={this.state.cpass}
            onChangeText={(val) => this.updateInputVal(val, "cpass")}
            maxLength={15}
            secureTextEntry={true}
          /> 
         <TextInput
            style={styles.inputStyle}
            placeholder="Phone"
            placeholderTextColor={"rgba(30, 30, 30, 0.8)"}
            value={this.state.phone}
            onChangeText={(val) => this.updateInputVal(val, "phone")}
          /> 
       
           <TextInput
            style={styles.inputStyle}
            placeholder="Address"
            placeholderTextColor={"rgba(53, 53, 53, 0.8)"}
            value={this.state.address}
            onChangeText={(val) => this.updateInputVal(val, "address")}
            
          />
           
         
        
          <Button
            color="#3740FE"
            title="Signup"
            onPress={() => this.registerUser()}
          />
          {/* <View>
            <Text style={styles.headText}>Signup</Text>
          </View> */}
          <Text
            style={styles.loginText}
            onPress={() => this.props.navigation.navigate("Login")}
          >
            Already Registered? Click here to login
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
    marginTop: -300,
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
