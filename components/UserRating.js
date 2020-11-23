import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, Alert } from 'react-native';

import firebase from "../database/firebase";

export default class UserRating extends Component {

	state = {
        value: 'unrated',
        comment: '',
        text: '',
        newText: ''
    }
    
    send = (value, comment) => {
        firebase.database().ref('userrating/').push({
            value: value,
            comment: comment
        });
        this.setState({value:'unrated',comment:''})
    }

    handleComment = (text) => {
        this.setState({ comment: text })
     }

     submitComment = (comment) => {
        Alert.alert('Review submitted!',  comment)
        
        onPress = () => {
           this.setState({
             newText: this.state.comment,
           });
         }

        firebase
        .database().ref('userrating/').push({
            displayName: firebase.auth().currentUser.displayName,
            comment:comment,
        })

     }

	render() {
		const { PROP } = this.props;
		const { value } = this.state;

		return (
            
			<View>
				{PROP.map(res => {
					return (
						<View key={res.key} style={styles.buttoncontainer}>
							<Text style={styles.radioText}>{res.text}</Text>
							<TouchableOpacity
								style={styles.radioCircle}
								onPress={() => {
									this.setState({ 
										value: res.key,
                                    })
                                    
                                    firebase
                                    .database().ref('userrating/').set({
                                      value: res.key,
                                     })
                                     
								}}>
                                  {value === res.key && <View style={styles.selectedRb} />}
							</TouchableOpacity>
						</View>
					);
				})}
                
            <View style = {styles.container}>
             <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Leave your review here!!"
                placeholderTextColor = "#A9A9A9"
                autoCapitalize = "none"
                onChangeText = {this.handleComment}
                />
             <TouchableOpacity
                style = {styles.submitButton}
                onPress = {
                   () => { this.submitComment(this.state.comment) }
                }>
                <Text style = {styles.submitButtonText}> Submit </Text>
             </TouchableOpacity> 
          </View>
			</View>
		);
	}
}
 
 const styles = StyleSheet.create({
    container: {
       paddingTop: 20
    },
    input: {
       margin: 0,
       height: 50,
       width: 300,
       borderColor: '#000',
       borderWidth: 1
    },
    submitButton: {
       backgroundColor: '#7a42f4',
       padding: 10,
       margin: 15,
       height: 40,
       width: 75
    },
    submitButtonText:{
      color: 'white'
    },
	buttoncontainer: {
        marginBottom: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        display: 'flex',
    },
    horizontal: {
        width: 'auto',
        height: 'auto',
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
      },
    radioText: {
        marginRight: 35,
        fontSize: 20,
        color: '#000',
        fontWeight: '400'
    },
	radioCircle: {
		height: 25,
		width: 25,
		borderRadius: 100,
		borderWidth: 2,
		borderColor: '#7a42f4',
		alignItems: 'center',
		justifyContent: 'center',
	},
	selectedRb: {
		width: 12,
		height: 12,
		borderRadius: 50,
		backgroundColor: '#000',
    },
    result: {
        marginTop: 20,
        color: 'white',
        fontWeight: '600',
        backgroundColor: '#F3FBFE',
    },
});