import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import UnitConverterScreen from './src/screens/UnitConverterScreen';
import CurrencyConverterScreen from './src/screens/CurrencyConverterScreen';
import BMICalculatorScreen from './src/screens/BMICalculatorScreen';
import TaskManagerScreen from './src/screens/TaskManagerScreen';
import { Colors } from './src/theme/colors';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Colors.background },
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="UnitConverter" component={UnitConverterScreen} />
          <Stack.Screen name="CurrencyConverter" component={CurrencyConverterScreen} />
          <Stack.Screen name="BMICalculator" component={BMICalculatorScreen} />
          <Stack.Screen name="TaskManager" component={TaskManagerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
