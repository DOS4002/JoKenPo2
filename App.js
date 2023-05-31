import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';

export default function App() {
  const [placar, setPlacar] = useState(0);
  const [placarMaquina, setPlacarMaquina] = useState(0);
  const [imgPedra, setImgPedra] = useState(null);
  const [imgPapel, setImgPapel] = useState(null);
  const [imgTesoura, setImgTesoura] = useState(null);
  const [imgUser, setImgUser] = useState(require('./assets/caixa.png'));
  const [imgMaquina, setImgMaquina] = useState(require('./assets/caixa.png'));
  const [maquinaEscolha, setMaquinaEscolha] = useState(null);
  const [userEscolha, setUserEscolha] = useState(null);

  function verificaPedra() {
    setImgUser(require('./assets/pedra.png'));
    const maquinaEscolha = Math.floor(Math.random() * 3) + 1;
    setMaquinaEscolha(maquinaEscolha);

    if (maquinaEscolha === 1) {
      setImgMaquina(require('./assets/pedra.png'));
    } else if (maquinaEscolha === 2) {
      setImgMaquina(require('./assets/papel.png'));
      setPlacarMaquina(placarMaquina + 1);
    } else if (maquinaEscolha === 3) {
      setImgMaquina(require('./assets/tesoura.png'));
      setPlacar(placar + 1);
    }

    verificaVitoria();
  }

  function verificaPapel() {
    setImgUser(require('./assets/papel.png'));
    const maquinaEscolha = Math.floor(Math.random() * 3) + 1;
    setMaquinaEscolha(maquinaEscolha);

    if (maquinaEscolha === 1) {
      setImgMaquina(require('./assets/pedra.png'));
      setPlacar(placar + 1);
    } else if (maquinaEscolha === 2) {
      setImgMaquina(require('./assets/papel.png'));
    } else if (maquinaEscolha === 3) {
      setImgMaquina(require('./assets/tesoura.png'));
      setPlacarMaquina(placarMaquina + 1);
    }

    verificaVitoria();
  }

  function verificaTesoura() {
    setImgUser(require('./assets/tesoura.png'));
    const maquinaEscolha = Math.floor(Math.random() * 3) + 1;
    setMaquinaEscolha(maquinaEscolha);

    if (maquinaEscolha === 1) {
      setImgMaquina(require('./assets/pedra.png'));
      setPlacarMaquina(placarMaquina + 1);
    } else if (maquinaEscolha === 2) {
      setImgMaquina(require('./assets/papel.png'));
      setPlacar(placar + 1);
    } else if (maquinaEscolha === 3) {
      setImgMaquina(require('./assets/tesoura.png'));
    }

    verificaVitoria();
  }

  function resetar() {
    setPlacar(0);
    setPlacarMaquina(0);
    setImgUser(require('./assets/caixa.png'));
    setImgMaquina(require('./assets/caixa.png'));
  }

  function verificaVitoria() {
    if (placar === 3) {
      exibirMensagemVencedor('Você venceu! Parabéns!');
      resetar();
    } else if (placarMaquina === 3) {
      exibirMensagemVencedor('A máquina venceu! Tente novamente!');
      resetar();
    }
  }

  function exibirMensagemVencedor(mensagem) {
    Alert.alert('Resultado', mensagem);
  }

  function obterFraseVencedor() {
    if (placar === 3) {
      return 'Você venceu! Parabéns!';
    } else if (placarMaquina === 3) {
      return 'A máquina venceu! Tente novamente!';
    } else {
      return 'Jogue e tente vencer!';
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('./assets/logoJokempo.png')} />

      <View style={styles.placarContainer}>
        <Text style={styles.nomePlacar}>PLACAR</Text>
      </View>

      <View style={styles.placarContainer}>
        <Text style={styles.placarText}>{placar}</Text>
        <Text style={styles.placarText}>{placarMaquina}</Text>
      </View>

      <View style={styles.imagesContainer}>
        <Image style={styles.userImage} source={imgUser} />
        <Image style={styles.vsImage} source={require('./assets/vs.png')} />
        <Image style={styles.maquinaImage} source={imgMaquina} />
      </View>

      <TouchableOpacity style={styles.botao} onPress={resetar}>
        <Text style={styles.textoBotao}>Novo jogo</Text>
      </TouchableOpacity>

      <View style={styles.opcoesContainer}>
        <TouchableOpacity style={styles.opcao} onPress={() => { setImgUser(require('./assets/pedra.png')); verificaPedra(); }}>
          <Image style={styles.opcaoImage} source={require('./assets/pedra.png')} />
          <Text style={styles.opcaoText}>Pedra</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.opcao} onPress={() => { setImgUser(require('./assets/papel.png')); verificaPapel(); }}>
          <Image style={styles.opcaoImage} source={require('./assets/papel.png')} />
          <Text style={styles.opcaoText}>Papel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.opcao} onPress={() => { setImgUser(require('./assets/tesoura.png')); verificaTesoura(); }}>
          <Image style={styles.opcaoImage} source={require('./assets/tesoura.png')} />
          <Text style={styles.opcaoText}>Tesoura</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.fraseVencedor}>{obterFraseVencedor()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 50,
    marginTop: 30,
    marginBottom: 40,
  },
  placarContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  nomePlacar: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginRight: 0,
    textShadowColor: '#777',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  placarText: {
    color: '#fde910',
    fontSize: 30,
    paddingHorizontal: 92,
    textShadowColor: '#777',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  imagesContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  userImage: {
    width: 115,
    height: 100,
    marginRight: 20,
  },
  vsImage: {
    width: 50,
    height: 50,
    marginRight: 20,
    alignSelf: 'center',
  },
  maquinaImage: {
    width: 115,
    height: 100,
  },
  botao: {
    marginTop: 19,
    backgroundColor: '#fde910',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 20,
  },
  textoBotao: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  opcoesContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  opcao: {
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  opcaoImage: {
    width: 92,
    height: 80,
    marginBottom: 10,
  },
  opcaoText: {
    color: '#fff',
    fontSize: 16,
  },
  fraseVencedor: {
    color: '#fff',
    fontSize: 24,
    marginTop: 20,
    textShadowColor: '#777',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
