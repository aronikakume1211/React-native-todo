import React, { useEffect } from "react";
import { View, Text, Button, TextInput, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { FIREBASE_DB } from '../../firbaseConfig';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';

const List = ({ navigation }) => {
    const [todos, setTodos] = React.useState([]);
    const [todo, setTodo] = React.useState('');

    useEffect(() => {
        const todoRef = collection(FIREBASE_DB, 'todos');

        const subscriber = onSnapshot(todoRef, {
            next: (snapshot) => {
                const todos = [];
                snapshot.docs.forEach(doc => {
                    todos.push({ ...doc.data(), id: doc.id })
                });
                setTodos(todos);
            }
        });
        return () => subscriber()
    }, [])
    const addTodo = async () => {
        try {
            const doc = await addDoc(collection(FIREBASE_DB, 'todos'), { title: todo, done: false });
            setTodo('');
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    }
    const renderTodo = ({ item }) => {
        const ref = doc(FIREBASE_DB, `todos/${item.id}`);
        const toggleDone = async () => {
            updateDoc(ref, { done: !item.done });

        };
        const deleteItem = async () => {
            deleteDoc(ref);
         };
        return (
            <View style={styles.todoContainer}>
                <TouchableOpacity onPress={() => toggleDone()} style={styles.todo}>
                    {item.done && <Ionicons name="checkmark-done-outline" size={24} color="green" />}
                    {!item.done && <Entypo name="circle" size={24} color="black" />}
                    <Text style={styles.item}>{item.title}</Text>
                </TouchableOpacity>
                <Ionicons name="trash-outline" size={24} color="red" onPress={() => deleteItem()} />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <TextInput style={styles.input} placeholder="Add new todo" onChangeText={(text) => setTodo(text)} value={todo} />
                <Button onPress={() => addTodo()} title="Add Todo" />
            </View>
            <View>
                {todos.length > 0 && (
                    <View>
                        <FlatList
                            data={todos} renderItem={renderTodo} keyExtractor={todo => todo.id} />
                    </View>
                    // todos.map(todo => (
                    //     <Text key={todo.id}>{todo.title}</Text>
                    // ))
                )
                }
            </View>
        </View>
    );
}

export default List;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    form: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        gap: 10
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: "#fff"

    },
    todoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 4
    },
    todo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        flexGrow: 1

    }
});