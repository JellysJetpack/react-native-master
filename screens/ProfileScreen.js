import React, { Component } from "react";
import { View, SafeAreaView, StyleSheet,Text} from "react-native";
import { Avatar, Title, Caption, TouchableRipple,} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from "../database/firebase";
import { createStackNavigator } from "react-navigation-stack";



export default class ProfileScreen extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      email: "",
      username: "",
      phone: "",
      address: "",
      user:""
    };


  };

componentDidMount(){
  console.log(this.state.email)

 
  firebase.auth().onAuthStateChanged( (z) =>{
    if(userCur){   
     // this.setState({user : JSON.stringify(userCur)}) 
   //   alert("State")
  firebase.database().ref('userdata').on('value', snap => { 
        var Data= snap.val()
      for(var obj in snap.val()){

          console.log(JSON.stringify(Data[obj].email))
         // alert(JSON.stringify(Data[obj].email)+ "  "+ JSON.stringify(userCur.email))
          if(JSON.stringify(Data[obj].email) === JSON.stringify(userCur.email)){
           // alert("Match")
            console.log("Match")
            //var that = this;
           
            var that = this 
            that.setState(()=>({email:Data[obj].email,username: Data[obj].username,phone: Data[obj].phone, address: Data[obj].address })).bind(this);
            //this.setState(()=>({username: Data[obj].username})).bind(this);
            //this.setState(() =>({phone: Data[obj].phone})).bind(this);
            // this.setState(()=>({address: Data[obj].address})).bind(this);
           /* alert(JSON.stringify(Data[obj].email))
            alert(JSON.stringify(Data[obj].username))
           alert(JSON.stringify(Data[obj].phone))
           alert(JSON.stringify(Data[obj].address))*/

         
         
            
          }
          else{
            console.log("objemail: "+JSON.stringify(Data[obj].email))
            console.log("useremail: "+JSON.stringify(userCur.email))
           // alert("objemail: "+JSON.stringify(Data[obj].email))
            //alert("useremail: "+JSON.stringify(userCur.email))
          }
        }


      })

      
    } 
    else{

      console.log("Don't have user")
    }
  })
  
 
}

  signOut = () => {
   

    firebase
      .auth()
      .signOut()
      .then(() => {
        //alert("LogOut")
        this.props.navigation.navigate("Login");
      })
      .catch((error) => {
        alert("Cannot LogOut")
      this.setState({ errorMessage: error.message })});
  };


 render() {
 

    return (

      <SafeAreaView style={styles.container}>

      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image 
            source={{
              uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
            }}
            size={80}
          />
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{this.state.username}</Title>
            <Caption style={styles.caption}>@{this.state.username}</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{this.state.address}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{this.state.phone}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{this.state.email}</Text>
        </View>
      </View>
      <View style={styles.menuWrapper}>
        <TouchableRipple  onPress={() => {
          console.log("press")
          return this.props.navigation.navigate('EditProfile')
        }}>
          <View style={styles.menuItem}>
            <Icon name="account-edit" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Edit Profile</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="heart-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Your Favorites</Text>
          </View>
        </TouchableRipple>
        
    
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="settings-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() =>{
          this.signOut()
         
        }}>
          <View style={styles.menuItem}>
            <Icon name="logout-variant" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>LogOut</Text>
          </View>
        </TouchableRipple>
      </View>
      
    </SafeAreaView>

  
    );
   
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 35,
//     backgroundColor: "#fff",
//   },
//   textStyle: {
//     fontSize: 15,
//     marginBottom: 20,
//   },

//   backgroundContainer: {
//     flex: 1,
//     width: null,
//     height: null,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   logo: {
//     width: 70,
//     height: 70,
//   },
//   head: {
//     alignItems: "center",
//     marginTop: 10,
//   },
//   headText: {
//     color: "#323232",
//     fontSize: 20,
//     fontWeight: "500",
//     marginTop: 20,
//     opacity: 0.5,
//   },
//   headget: {
//     marginTop: 70,
//   },
//   getdata: {
//     color: "#323232",
//     fontSize: 15,
//     fontWeight: "500",
//     marginBottom: 20,
//     left: 20,
//   },
//   Button: {
//     color: "#00195F",
//     marginTop: 25,
//     textAlign: "center",
//   },
// });
