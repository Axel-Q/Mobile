import React from "react";
import {Text, View, Button, Pressable} from "react-native";
import {StyleSheet, TouchableOpacity} from "react-native";
import {useEffect, useState} from "react";
import PressableButton from "./PressableButton";
import {FontAwesome} from "@expo/vector-icons";
import {addWarning} from "../Firebase/firestoreHelper";
import GoalUsers from "./GoalUsers";

/* goal is passed as a prop from the parent component */
export const GoalDetails = ({navigation, route}) => {
    const [warning, setWarning] = useState(false);
    const handleWarning = async () => {
        if (route.params && route.params.goal.id) {
            await addWarning(route.params.goal.id);
            setWarning(true);
            navigation.setOptions({
                title: "Warning",
            });
        }
    };


    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <PressableButton onPressHandler={handleWarning} customStyle={styles.buttonStyle}>
                    <FontAwesome name="warning" size={24} color="black"/>
                </PressableButton>
            }
        });
    }, [navigation, route.params]);
    console.log("route", route.params);
    return (<View>
            {route.params ? (<Text style={warning ? styles.warning : null}
            >GoalDetails with id {route.params.goal.id} and text is {route.params.goal.text}</Text>) : (
                <Text style={warning ? styles.warning : null}>More details</Text>)}
            <Button
                title="More details"
                onPress={() => {
                    navigation.push("Details");
                }}
            />
            <GoalUsers id={route.params.goal.id}/>
        </View>

    );
}

const styles = StyleSheet.create({
    warning: {
        color: 'red',
    },
    buttonStyle: {
        backgroundColor: "pink",
        padding: 5,
        margin: 10,
    },
});