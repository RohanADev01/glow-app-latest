import DashboardScreen from '@/components/HomeScreens/dashboardScreen';
import ProfileScreen from '@/components/HomeScreens/profileScreen';
import ScansScreen from '@/components/HomeScreens/scansScreen';
import { Ionicons } from '@expo/vector-icons'; // for icons
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

const Layout = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false, // Hide default labels
        tabBarStyle: {
          position: 'absolute',
          bottom: 35,
          left: '8%', // Adjusted to center the bar
          right: '8%', // Adjusted to center the bar
          elevation: 0,
          backgroundColor: '#ffffff',
          borderRadius: 50,
          height: 80,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          paddingBottom: 0,
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName: 'home' | 'scan-circle-outline' | 'person' = 'home';
          let iconSize = 30; // Default icon size

          if (route.name === 'Home') {
            iconName = 'home';
            iconSize = 25; // Custom size for Home tab
          } else if (route.name === 'Scan') {
            iconName = 'scan-circle-outline';
            iconSize = 50; // Custom size for Scan tab
          } else if (route.name === 'Profile') {
            iconName = 'person';
            iconSize = 25; // Custom size for Profile tab
          }

          if (focused) {
            // Highlighted tab style
            return (
              <View
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: '#F4EFFF', // Light purple background for active tab
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Ionicons name={iconName} size={iconSize} color='#7c4cff' />
              </View>
            );
          } else {
            // Default tab icon
            return <Ionicons name={iconName} size={iconSize} color={color} />;
          }
        },
        tabBarInactiveTintColor: '#c4c4c4', // Inactive icon color
      })}
    >
      <Tab.Screen
        name='Home'
        component={DashboardScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name='Scan'
        component={ScansScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default Layout;
