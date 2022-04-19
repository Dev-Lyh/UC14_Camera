/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Image, FlatList, Button, LogBox } from 'react-native';
import ImgDB from './src/database/ImgDB';
import Img from './src/model/Img';
import ImagePicker from 'react-native-image-crop-picker';
import Card from './src/components/Card';

LogBox.ignoreAllLogs();

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filePath: '',
      // title: '',
      imgList: [],
    };
    this.ListImg();
  }

  ListImg = () => {
    const db = new ImgDB();
    db.Select().then(completeImgList => {
      this.setState({ imgList: completeImgList });
    });
  };

  Add = (filePath, title) => {
    const newImg = new Img(filePath, title);
    const db = new ImgDB();
    db.Insert(newImg).then(this.ListImg());
  }

  onSelectedImage = image => {
    const source = { uri: image.path };
    // const titleHere = { size: image.size };
    this.setState({ filePath: source.uri });
    // this.setState({ title: titleHere })
    console.log("This is source.uri", source.uri, "Type OF: ", typeof (source.uri));
    console.log("filePath STATE", this.state.filePath);
    // console.log("TITLE STATE", this.state.filePath);
  };

  // FUNCTION QUE ABRE A CAMERA
  takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: false,
      waitAnimationEnd: false,
    }).then(image => {
      // NESSA PARTE, SE A FOTO DER CERTO, A FUNÇÃO DE SALVAR O ENDEREÇO DA IMAGEM VAI SER CHAMADA
      this.onSelectedImage(image);
      console.log(image);
    });
  }

  choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
    }).then(image => {
      this.onSelectedImage(image);
      console.log(image);
    });
  }

  render() {
    return (
        <ScrollView style={{ backgroundColor: '#282828', paddingHorizontal: 20 }}>
          <Text style={styles.title}>UC14 - Camera e Galeria</Text>
          {this.state.filePath === '' ? (
            <View style={styles.imageEmptyBox}>
              <Text style={styles.noneImage}>Nenhuma imagem selecionada</Text>
            </View>
          ) : (
            <Image source={{ uri: this.state.filePath }} style={styles.imageFullBox} />
          )}
          <TouchableOpacity
            onPress={this.choosePhotoFromLibrary}
            style={styles.options}
          >
            <Text style={styles.optionsText}>
              Escolher uma foto da galeria
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.takePhotoFromCamera}
            style={styles.options}
          >
            <Text style={styles.optionsText}>Tirar uma foto</Text>
          </TouchableOpacity>
          <Button title="Adicionar imagem" color='dodgerblue' onPress={() => this.Add(this.state.filePath)} />

          <Text style={styles.listTitle}>Listagem</Text>
          <FlatList
            data={this.state.imgList}
            renderItem={item => Card(item)}
            key={item => item.id}
            style={styles.pd20}
            horizontal={false}
          />
        </ScrollView>
    );
  }

}
const styles = StyleSheet.create({
  imageEmptyBox: {
    width: '100%',
    height: 180,
    backgroundColor: '#CCC',
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  imageFullBox: {
    width: '100%',
    height: 180,
    marginTop: 25,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  listTitle: {
    fontSize: 24,
    color: 'white',
    marginTop: 50,
  },
  title: {
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
  noneImage: {
    fontSize: 20,
    color: '#787878',
    fontWeight: 'bold',
  },
  options: {
    backgroundColor: 'aliceblue',
    marginBottom: 10,
    paddingVertical: 20,
    borderWidth: 2,
    borderColor: 'dodgerblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsText: {
    color: 'dodgerblue',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
