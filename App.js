/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';


const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const Drawer = createDrawerNavigator();


// const HomeScreen = () => {
//   return (
//     <View style={{ flex:1, alignItems:'center', justifyContent: 'center'}}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// };

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#FFFFFF'
    },
    headerTintColor: '#000000',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <HomeStack.Screen name="Home" component={HomeScreen} options={{
      title: 'Contacts',
      headerLeft: () => (
        <Icon.Button name="ios-add" size={25} backgroundColor="#FFFFFF" 
        onPress={() => navigation.openDrawer()}></Icon.Button>
      )
    }} />
  </HomeStack.Navigator>  
);

const DetailsScreen = () => {
  return (
    <View style={{ flex:1, alignItems:'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
    </View>
  );
};

const DetailsStackScreen = ({navigation}) => (
  <DetailsStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#FFFFFF'
    },
    headerTintColor: '#000000',
    headerTitleStyle: {
      fontWeight: 'bold',
      alignSelf: 'center'
    }
    
  }}>
    <HomeStack.Screen name="Details" component={DetailsScreen} options={{
      
    }} />
  </DetailsStack.Navigator> 
);


 


export default class HomeScreen extends Component {
  constructor() {
    super()
    this.state = {
      dataSource: [],
      isLoading: true  
    }
  } 

  renderItem = ({ item }) => {
    return(
      <TouchableOpacity style={{ flex: 1, flexDirection: 'row', marginBottom: 3 }}
        onPress={() => ToastAndroid.show(item.first_name, ToastAndroid.SHORT)}>
      <Image style={{ width: 100, height: 100, margin: 5, borderRadius: 200 }}
      source={{ uri: item.avatar }}/>
      <View style={{ flex: 1, justifyContent: 'center'}}>
        <Text style={{ fontSize: 18, color: 'green', marginBottom: 15, }}>
          {item.first_name} {item.last_name}
        </Text>
        <Text style={{fontSize: 16, color: 'red', }}>
          {item.email}
        </Text>
      </View>
    </TouchableOpacity>

    )
  }

  renderSeperator = () => {
    return (
      <View
        style={{ height: 1, width: '100%', backgroundColor: 'black' }}>
      </View>
    )
  }

  componentDidMount() {
    const url = 'https://reqres.in/api/users?page=2';
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        dataSource: responseJson.data,
        isLoading: false
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render() {
    return (
      this.state.isLoading
      ?
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#330066" animating />
      </View>
      :
      <View style={StyleSheet.container}>
        <View style={styles.header}>
            <FontAwesome5 style={styles.menuIcon} name={'bars'} solid/>
            <Text style={styles.headerTitle}>Contacts</Text>
            <FontAwesome5 style={styles.searchIcon} name={'search'} solid/>
         </View>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index }
          ItemSeparatorComponent={this.renderSeperator}
        />
         <TouchableOpacity style={ styles.fab }>
            <FontAwesome5 style={styles.fabContent} name={'plus'} solid/>
         </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  header: {
    backgroundColor: '#FFFFFF',
    height: 60,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: -25
  },
  menuIcon: {
    textAlign: 'left',
    marginTop: 15,
    marginLeft: 20,
    fontSize: 25,
    color: '#FFFFFF'
  },
  searchIcon: {
    textAlign: 'right',
    marginTop: -25,
    marginRight: 20,
    fontSize: 25,
    color: '#FFFFFF'
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#e95280',
    borderRadius: 50,
    bottom: 10,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabContent: {
    color: '#FFFFFF',
    fontSize: 20
  } 
})



const App = () => {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator>
        <Stack.Screen name="Contacts" component={ HomeScreen } />
      </Stack.Navigator> */}
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeStackScreen} />
        <Drawer.Screen name="Details" component={DetailsStackScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


// export default App;
