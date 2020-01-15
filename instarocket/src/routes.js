import React from 'react';
import {createAppContainer} from 'react-navigation';
import{createStackNavigator} from 'react-navigation-stack';
import {Image} from 'react-native';

import Feed from './pages/Feed'
import New from './pages/New'

import logo from './assets/logop.png';

export default createAppContainer(
    createStackNavigator({
        Feed,
        New,
    },{
      //  initialRouteName: 'New', determinar a rota
        defaultNavigationOptions: {
            headerTintColor: '#000',
            headerTitle: <Image style={{marginHorizontal: 150}} source={logo}/> 
           // headerBackTitle: null,
        },
        mode: 'modal'
    })
);



