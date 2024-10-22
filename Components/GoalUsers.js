import {FlatList, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {getAllDocs, writeToDB} from "../Firebase/firestoreHelper";

const GoalUsers = ({id}) => {
    console.log("id", id);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        async function fetchUserData() {
            try {
                const dataFromFirestore = await getAllDocs(`goals/${id}/users`);
                console.log(dataFromFirestore.length);
                if (dataFromFirestore.length) {
                    console.log("reading data from DB");
                    setUsers(dataFromFirestore);
                    return;
                }
                  console.log("reading data from API");
                const response = await fetch("https://jsonplaceholder.typicode.com/users");
                if (!response.ok) {
                    throw new Error(`The request failed ${response.status}`);
                }
                const data = await response.json();
                data.forEach((user) => {
                    writeToDB(user, `goals/${id}/users`);
                });
                setUsers(data);
            } catch (err) {
                console.log("fetch user data ", err);
            }
        }

        fetchUserData();
    }, []);
    return (<View>
        <FlatList
            data={users}
            renderItem={({item}) => {
                return <Text>{item.name}</Text>;
            }}
        />
    </View>);
};

export default GoalUsers;

const styles = StyleSheet.create({});