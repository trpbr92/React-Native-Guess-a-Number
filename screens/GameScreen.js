import React, {useState, useRef, useEffect} from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';

const generateRandomBetween = (min, max, exclude) =>{
    min = Math.ceil(min);
    max = Math.floor(max);
    //gives a random number between the min and max
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const renderListItem = (value, numOfRound) => (<View key={value} style={styles.listItem} >
    <Text>Round {numOfRound}</Text>
    <Text>{value}</Text>
</View>);

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver} = props;

    useEffect(() => {
        if(currentGuess === props.userChoice){
            props.onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler =  direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'higher' && currentGuess > props.userChoice )) {
            Alert.alert('Don\'t lie!', 'You Know this is wrong...', [{text: 'Sorry!', style: 'cancel'}]);
            return;
        }
        if (direction === 'lower') {
        currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        //setRounds(curRounds => curRounds + 1);
        setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses])
    };

    return(
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}> 
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    LOWER
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'higher')}>
                    HIGHER
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
            <ScrollView contentContainerStyle={styles.list}>
                {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index ))}
            </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    },
    listContainer: {
        flex: 1,
        width: '80%'
    },
    list: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    listItem: {
       borderColor: '#ccc',
       borderWidth: 1,
       padding: 15,
       marginVertical: 10,
       backgroundColor: 'white',
       flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%'
    }
});
export default GameScreen;