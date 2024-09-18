import React, {useState, useEffect, useRef} from 'react';
import {TextInput, Text, Button, View, StyleSheet, Modal, Alert, Image} from 'react-native';

export default function Input({textInputFocus, inputHandler, visible, cancelHandler}) {
    const [text, setText] = useState('');
    const [blur, setBlur] = useState(false);
    const [canConfirm, setCanConfirm] = useState(false);

    useEffect(() => {
        if (text.length >= 3) {
            setCanConfirm(true);
        } else {
            setCanConfirm(false);
        }
    }, [text]);

    const handleConfirm = () => {
        setText('');
        inputHandler(text);
    }

    const handleCancel = () => {
        Alert.alert('Confirm Cancellation',
            'Are you sure you want to cancel?',
            [
                {
                    text: 'Yes', onPress: () => {
                        cancelHandler();
                        setText('')
                    }
                },
                {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
            ],
            {cancelable: true});
    }


    return (
        <Modal animationType={"slide"} visible={visible} transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>

                    <TextInput
                        autoFocus={textInputFocus}
                        placeholder={"Enter your goal here"}
                        autoCorrect={true}
                        keyboardType={"default"}
                        style={styles.input}
                        value={text}
                        onChangeText={(text) => setText(text)}
                        onBlur={() => setBlur(true)}
                        onFocus={() => setBlur(false)}/>

                    {blur ? (
                        text.length >= 3 ? (
                            <Text>Thank you</Text>
                        ) : (
                            <Text>Please type more than 3 characters</Text>
                        )
                    ) : (
                        text && <Text>{text.length}</Text>
                    )}
                    <View style={styles.buttonContainer}>
                        <Button disabled={!canConfirm} title={"Confirm"} onPress={() => handleConfirm()}/>
                        <Button title={"Cancel"} onPress={() => handleCancel()}/>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end', // Align modal content to the bottom
    },
    modalContent: {
        backgroundColor: 'red',
        height: '80%', // Occupy 80% of the screen height
        borderRadius: 60, // Rounded top-left corner
        padding: 20,
        alignItems: 'center',
    },
    input: {borderColor: "purple", borderWidth: 2, padding: 5},
    buttonContainer: {flexDirection: 'row', justifyContent: 'space-between', width: '40%'},
    imageContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    image: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
});