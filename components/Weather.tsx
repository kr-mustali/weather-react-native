import axios from 'axios';
import * as React from 'react';
import {useCallback, useState} from 'react';
import {
  Alert,
  ActivityIndicator,
  ImageBackground,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
  StatusBar,
} from 'react-native';

export default function Weather() {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchDataHandler = () => {
    setLoading(true);
    axios({
      method: 'GET',
      url: `http://api.weatherapi.com/v1/forecast.json?key=e1dfdd9ff43c4a81a9162623240802&q=${city}`,
    })
      .then(response => {
        setWeather(response.data);
      })
      .catch(e => {
        console.warn(e);
        setModalVisible(true);
      })
      .finally(() => setLoading(false));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setCity('');
    setWeather(null);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle="dark-content"
        showHideTransition="fade"
        hidden={false}
      />
      <ImageBackground
        resizeMode="cover"
        style={styles.backgroundImage}
        source={require('../assets/img-2.png')}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View>
              <View style={styles.modalView}>
                <Text>Invalid City Name :(</Text>
                <Pressable
                  style={styles.buttonHide}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={{fontSize: 20, color: '#fff'}}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter City Name"
              value={city}
              onChangeText={text => setCity(text)}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={fetchDataHandler}
              disabled={loading || !city.trim()}>
              <Text style={styles.buttonText}>
                {loading ? 'Loading...' : 'Get Weather'}
              </Text>
            </TouchableOpacity>
          </View>
          {loading && <ActivityIndicator size="large" color="#fff" />}
          {weather && (
            <View>
              <View style={styles.forecast}>
                <View style={styles.weatherContainer}>
                  <Text style={styles.cityName}>{weather?.location?.name}</Text>
                  <Text style={styles.temperature}>
                    {weather?.current?.temp_c}°C
                  </Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  inputContainer: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  textInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    fontSize: 18,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  weatherContainer: {
    alignItems: 'center',
  },
  cityName: {
    fontSize: 40,
    color: '#fff',
  },
  temperature: {
    fontSize: 36,
    color: '#fff',
  },
  loaderContainer: {
    position: 'absolute',
    bottom: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonHide: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
  },
  forecast: {
    borderWidth: 2,
    padding: 20,
    maxWidth: 200,
    borderRadius: 10,
    marginLeft: 100,
    marginTop: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  forecastontainer: {
    borderWidth: 2,
    padding: 20,
    maxWidth: 200,
    borderRadius: 10,
    marginTop: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  date: {
    fontSize: 20,
    color: '#fff',
  },
  nextWeather: {},
});
