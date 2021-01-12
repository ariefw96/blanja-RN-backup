import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Splash from './screens/splash/index'
import Icon from 'react-native-vector-icons/FontAwesome';

import Home from './screens/home/index';

import Profile from './screens/profile/index';

import Login from './screens/auth/login';
import Signup from './screens/auth/register';
import Activate from './screens/auth/activate';
import Forgot from './screens/auth/forgotPassword';
import Otp from './screens/auth/otp';
import Reset from './screens/auth/resetPassword'

import Shop from './screens/shop/index';
import Categories from './screens/shop/categories'
import Filter from './screens/shop/filter'
import DetailPage from './screens/shop/detailProduct' 

import Bag from './screens/myBag/index';
import Checkout from './screens/myBag/checkoutPayment'
import Success from './screens/myBag/success'

import Order from './screens/profile/myOrder'
import DetailOrders from './screens/profile/orderDetails'
import Shipping from './screens/profile/shippingAddress'
import AddAddress from './screens/profile/addShipingAddress'
import ChangeAddress from './screens/profile/changeAddress'
import Setting from './screens/profile/setting'

import Notification from './screens/home/notifications'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MyTabs = ({auth}) => {
  return (
    <Tab.Navigator
      headerMode="none"
      sceneContainerStyle={{ borderWidth: 0 }}
      barStyle={{ borderTopLeftRadius: 20 }}
      tabBarOptions={{
        activeTintColor: '#DB3022',
        style: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => {
            return <Icon name="home" size={25} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Shop"
        component={ShopPage}
        options={{
          tabBarIcon: ({ color }) => {
            return <Icon name="shopping-cart" size={25} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="MyBag"
        component={myBag}
        options={{
          tabBarIcon: ({ color }) => {
            return <Icon name="shopping-bag" size={25} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Login}
        options={{
          tabBarIcon: ({ color }) => {
            return <Icon name="heart" size={25} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={MainProfile}
        options={{
          tabBarIcon: ({ color }) => {
            return <Icon name="user-circle-o" size={25} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

const myBag = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Bag" component={Bag} />
      <Stack.Screen name="Checkout" component={Checkout} />
    </Stack.Navigator>
  )
};

const ShopPage = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Shop" component={Shop} />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="Filter" component={Filter} />
    </Stack.Navigator>
  );
};

const MainProfile = () => {
  return (
    <Stack.Navigator initialRouteName="MainProfile" headerMode="none">
            <>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Orders" component={Order} />
            <Stack.Screen name="DetailsOrders" component={DetailOrders} />
            <Stack.Screen name="Shipping" component={Shipping} />
            <Stack.Screen name="ChangeAddress" component={ChangeAddress} />
            <Stack.Screen name="AddAddress" component={AddAddress} />
            <Stack.Screen name="Setting" component={Setting} />
            </>    
    </Stack.Navigator>
  );
};

const appRouter = () => {

  return (
    <>
      
        <Stack.Navigator headerMode="none">
          {/* <Stack.Screen name="Splash" component={Splash} /> */}
          <Stack.Screen name="Tab" component={MyTabs} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="DetailPage" component={DetailPage} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Signup} />
          <Stack.Screen name="Activate" component={Activate} />
          <Stack.Screen name="ForgotPassword" component={Forgot} />
          <Stack.Screen name="Otp" component={Otp} />
          <Stack.Screen name="ResetPassword" component={Reset} />
          <Stack.Screen name="Success" component={Success} />
        </Stack.Navigator>
      
    </>
  );
};

export default appRouter