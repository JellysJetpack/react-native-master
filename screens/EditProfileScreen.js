 import React, { Component } from 'react'
 import { View, SafeAreaView, StyleSheet,Text} from "react-native";
 import ReviewModal from "react-native-review-modal";

 export default class EditProfileScreen extends Component{
    
  constructor() {
    super();
    this.state = {
      uid: "",
      email: "",
      starCount: 3.6
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }
  
    render() {
     
      return (
        <View style={styles.container}>
           <ReviewModal
      starRating={this.state.starCount}
      onStarRatingPress={rating => {
        this.onStarRatingPress(rating);
      }}
    />
    
          <Text>You are on Edit Profile Page</Text>
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      margin:50,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
 

 