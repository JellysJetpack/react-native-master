import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import firebase from "../database/firebase";

export default class ReviewScreen extends Component {

  constructor(props){
    super(props);
    this.state={ 
    list:[],
    } }

  componentDidMount() {
    firebase.database().ref('userrating/').on('value', (snapshot) => {
      var li = []
      snapshot.forEach((child)=>{
        li.push({
          key: child.key,
          displayName: firebase.auth().currentUser.displayName,
          comment: child.val().comment
        })
      })
      this.setState({list:li})
    })
  }

  render(){
    return(
      <View style={styles.container}>
         <FlatList style={{width:'100%'}}
            data={this.state.list}
            keyExtractor={(item)=>item.key}
            renderItem={({item})=>{
               return(
                  <View>
                     <Text style={styles.title}>{item.displayName}</Text>
                     <Text style={styles.listItem}>{item.comment}</Text>
                  </View>)
               }}/>
       </View>
    )}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginHorizontal: 20,
    fontFamily: "open-sans-bold",
    fontSize: 20,
    textAlign: "left",
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
});