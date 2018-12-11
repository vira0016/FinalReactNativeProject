import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Listrestorant from './Listrestorant';
import details from './details';

//const titleFunc = (props)=>{
//    console.log(props);
//    return (
//        <View>
//            <Text style={{fontWeight:'bold'}}>
//                {props.children}
//            </Text>
//        </View>
//    );
//}

const App = createStackNavigator({
        
    
    Listrestorant: {screen: Listrestorant},
                                 details: {screen: details},
                                 },
                                 {
                                 initialRouteName: "Listrestorant"
                                 }
                                 
        
    );

export default createAppContainer(App);