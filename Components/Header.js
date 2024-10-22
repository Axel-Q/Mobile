import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    useWindowDimensions, View,Dimensions,
} from "react-native";



export default function Header({name}) {
    const {width,height} = useWindowDimensions();
    console.log("Current width:", width);

    return (
        <View>
            <Text
                style={[
                    styles.text,
                    {
                        paddingVertical: height < 415 ? 0 : 10,
                        paddingHorizontal: height < 415 ? 0 : 10,
                        color: height < 415 ? "red": "darkmagenta",
                    },
                ]}
            >
                Welcome to {name}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        color: "darkmagenta",
        fontSize: 25,
        borderColor: "darkmagenta",
        borderWidth: 2,
        marginBottom: 10,
    },
});

