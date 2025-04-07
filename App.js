import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import WeatherApp from './src/screens/WeatherApp';


export default function App() {
  return (
      <SafeAreaView style={styles.container}>
        <WeatherApp />
      </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
