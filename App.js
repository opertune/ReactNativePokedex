import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text, Dimensions } from 'react-native';
import { PokedexItem } from './components/PokedexItem'

const data = [
  {
    title: 'Dracaufeu',
    image: require('./images/dracaufeu.jpg')
  },
  {
    title: 'Pikachu',
    image: require('./images/pikachu.png')
  }
]

export default class App extends Component {
  constructor() {
    super()

    // If screen height >= screen width : phone in portrait mode
    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };

    // Init orientation
    this.state = {
      orientation: isPortrait() ? 'portrait' : 'landscape'
    };

    // Set orientation value when user turn his phone
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape'
      });
    });
  }

  // Create item (Touchable title and description) from pokedexItem class
  renderItem = ({ item }) => <PokedexItem item={item} />

  render() {
    return (
      // Alternate style (portrait / landscape)
      <View style={this.state.orientation === 'portrait' ? styles.container : styles.containerLandscape}>
        <FlatList
          data={data}
          renderItem={this.renderItem}
          keyExtractor={(index, _) => index + ''}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
    width: '100%',
    marginLeft: 0,
  },
  containerLandscape: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 0,
    width: '90%',
    marginLeft: 45,
  }
})