import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

import Colors from '../constants/Colors';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
           <Text style={styles.resultText}>Game Over</Text> 
           <View style={styles.imageContainer}>
           <Image source={require('../assets/success.png')} style={styles.image} />
           {/* <Image source={{uri: 'https://tgr.scdn2.secure.raxcdn.com/images/wysiwyg/_article/istockphoto-485966046-612x612.jpg'}} style={styles.image} /> */}
           </View>
           <View style={styles.resultContainer}>
           <Text style={styles.resultText}>
               Your phone needed{' '} 
               <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds
               to guess the number{' '}
               <Text style={styles.highlight}>{props.userNumber}</Text>.
            </Text>
            </View>
           <MainButton onPress={props.onRestart}>NEW GAME</MainButton>

        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30
    },
    image: {
        width: '100%',
        height: '100%',
    },
    resultContainer: {
        marginHorizontal: 60,
        marginVertical: 15
    },
    resultText: {
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Arial Rounded MT Bold',

    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'Arial Rounded MT Bold',

    }
})

export default GameOverScreen;