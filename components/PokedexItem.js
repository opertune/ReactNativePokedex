import React, { Component } from "react";
import { View, Text, Image, TouchableWithoutFeedback, StyleSheet, Dimensions } from "react-native";
import PropTypes from "prop-types";
import Icon from 'react-native-vector-icons/Ionicons';

const propTypes = {
    item: PropTypes.object
};

class PokedexItem extends Component {
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

    // reverse isSelected value when user press an item
    onPress = () => {
        this.setState((prevState, prevProps) => ({
            isSelected: !prevState.isSelected
        }))
    }

    render() {
        const { isSelected } = this.state;
        return (
            // Return touchable view with arrow icon and pokemon name
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={this.onPress}>
                    <View style={[styles.titleContainer, isSelected ? styles.selectedContainer : styles.titleContainer]}>
                        <Image source={isSelected ? require('../images/arrowDown.png') : require('../images/arrowLeft.png') }/>
                        <Text style={[styles.title, isSelected ? styles.selectedContainerTitler : styles.title]}>{this.props.item.title}</Text>
                    </View>
                </TouchableWithoutFeedback>
                { 
                // If item is selected (user click on item) display description
                    isSelected &&
                    // Alternate style (portrait / landscape)
                    <View style={this.state.orientation === 'portrait' ? styles.description : styles.descriptionLandscape}>
                        <Image style={styles.descriptionImage} source={this.props.item.image} />
                        <Text style={styles.descriptionText}>
                            Description de {this.props.item.title.toLowerCase()}
                        </Text>
                    </View>
                }
            </View>
        )
    }
}

PokedexItem.propTypes = propTypes;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        margin: 5,
        backgroundColor: '#f7f6f7',
    },
    selectedContainer: {
        backgroundColor: '#0080ff',
    },
    titleContainer: {
        height: 70,
        borderWidth: 1,
        borderRadius: 3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
    },
    selectedContainerTitler: {
        color: 'white'
    },
    description: {
        height: 400,
    },
    descriptionLandscape: {
        height: 400,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    descriptionImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    descriptionText: {
        fontSize: 30,
        textAlign: 'center',
    },
})

export { PokedexItem }