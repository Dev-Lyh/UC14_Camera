/* eslint-disable prettier/prettier */
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import React from 'react';

export default function Card({ item }) {
  return (
    <ImageBackground
      source={{ uri: item.filePath }}
      resizeMode="cover"
      style={styles.globalContainer}
      borderRadius={12}>
      <View style={styles.globalContainer}>
        <Text style={styles.idText}>{item.id}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    borderRadius: 12,
    marginVertical: 20,
    height: 200,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
  idText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 5,
    paddingHorizontal: 5,
    textAlign: 'center',
    borderRadius: 15,
  },
  borderRadius: {
    borderRadius: 12,
  },
  container: {
    paddingTop: 120,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  titlePrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  address: {
    color: 'white',
    fontSize: 18,
    fontStyle: 'italic',
  },
  viewGoalType: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  goal: {
    color: 'white',
    fontSize: 18,
  },
  viewType: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  type: {
    color: 'white',
    fontSize: 16,
    marginRight: 5,
  },
  price: {
    fontSize: 32,
    color: 'white',
    textAlign: 'right',
    fontWeight: 'bold',
  },
  marginGoal: {
    marginVertical: 2,
    marginRight: 2,
  },
});
