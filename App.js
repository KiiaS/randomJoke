import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';

const URL = 'https://sv443.net/jokeapi/v2/joke/Any'

export default function App() {
  const [joke, setJoke] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchJoke = async () => {
    setLoading(true)
    try {
      const response = await fetch("https://sv443.net/jokeapi/v2/joke/Any")
      const data = await response.json()
      if (!data.error) {
        setJoke(data)
      }
    } catch (error) {
      console.log("Error fetching joke: ", error)
    }
    setLoading(false)
  }


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Random joke</Text>
      <View style={styles.spacer} />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : joke ? (
        <View style={styles.jokeContainer}>
          <Text style={styles.jokeText}>{joke.setup}</Text>
          <Text style={styles.jokeText}>{joke.delivery}</Text>
        </View>
      ) : (
      <Text style={styles.text}>Press the button to get a joke!</Text>
      )}
      <Button title="Get a joke" onPress={fetchJoke} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  spacer: {
    height: 30,
  },
  jokeContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  jokeText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
});
