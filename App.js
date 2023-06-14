import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DataComponent from './components/OffresPage';
import ApplicationsTable from './components/ViewPostulant';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function AcceuilScreen() {
  return (
    <View style={styles.container}>
      <DataComponent />
    </View>
  );
}

function PostulantsScreen() {
  return (
    <View style={styles.container}>
      <ApplicationsTable />
    </View>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Acceuil') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Postulants') {
              iconName = focused ? 'eye' : 'eye-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name='Acceuil' component={AcceuilScreen} />
        <Tab.Screen name='Postulants' component={PostulantsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
