import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';

function TelaDeInicio() {
  const navegacao = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Tela de início</Text>
      <Text style={styles.subtitulo}>Fotos aleatórias de:</Text>
      <Button onPressIn={()=> navegacao.navigate("Cachorros")} style={styles.botton}>Cachorros</Button>
      <Button onPressIn={()=> navegacao.navigate("Gatos")} style={styles.botton}>Gatos</Button>
    </View>
  )
};

function TelaDeCachorros() {
  const navegacao = useNavigation();
  const [linkCachorros, setLinkCachorros] = useState("https://images.dog.ceo/breeds/terrier-boston/bostonTerrier_000003.jpg");
    
  async function GerarCachorros() {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    setLinkCachorros(data.message);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cachorros aleatórios</Text>
      <Image source={{uri: linkCachorros}} style={styles.imagem}/>
      <Button onPressIn={()=> navegacao.navigate("Inicio")} style={styles.botton}>Ir para início</Button>
      <Button onPressIn={()=> GerarCachorros()} style={styles.botton}>Gerar</Button>
    </View>
  );
}

function TelaDeGatos() {
  const navegacao = useNavigation();
  const [linkGatos, setLinkGatos] = useState("https://cdn2.thecatapi.com/images/MTY1NTk5Nw.jpg");

  async function GerarGatos() {
    const response = await fetch("https://api.thecatapi.com/v1/images/search");
    const data = await response.json();
    setLinkGatos(data[0].url)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Gatos aleatórios</Text>
      <Image source={{uri: linkGatos}} style={styles.imagem}/>
      <Button onPressIn={()=> navegacao.navigate("Inicio")} style={styles.botton}>Ir para início</Button>
      <Button onPressIn={()=> GerarGatos()} style={styles.botton}>Gerar</Button>
    </View>
  );
}

const MinhaPilha = createNativeStackNavigator({
  screens: {
    Inicio: TelaDeInicio,
    Cachorros: TelaDeCachorros,
    Gatos: TelaDeGatos
  },
});

const Navegacao = createStaticNavigation(MinhaPilha);

export default function App() {
  return <Navegacao />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffda9e",
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagem: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: "#333",
    marginBottom: 20
  },
  titulo: {
    fontSize: 40,
    marginBottom: 20,
    color: "#333"
  },
  subtitulo: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: 20,
    color: "#333"
  },
  botton: {
    width: 200,
    height: 50,
    marginBottom: 20,
    backgroundColor: "#666",
  },
});

