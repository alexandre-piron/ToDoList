import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { CheckBox, Icon } from '@rneui/themed';
import AsyncStorage from "@react-native-async-storage/async-storage";



function TaskItem (props) {
    const [check, setCheck] = useState(false);

    return (
        <TouchableOpacity onPress={() => props.deleteTask()}>
            <View style={styles.container}>
            <View style={styles.taskContainer}>
                {/* <CheckBox
                    center
                    title={props.task}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={check}
                    onPress={() => setCheck(!check)}
                    style={styles.task}
                    /> */}
                <Text style={styles.task}>{props.task}</Text>
                <TouchableOpacity onPress={() => props.deleteTask()}>
                    <Icon style={styles.delete} name="delete" size={20} color='#fff' type='material' />
                </TouchableOpacity>
            </View>
            </View>
        </TouchableOpacity>
    );
}

function ItemTaskList () {
    const [itemList,setItemList] = useState([])
    const getItem = async () => {
        try {
            const jsonlist =  await AsyncStorage.getItem('tasks')
            setItemList(jsonlist != null ? JSON.parse(jsonlist) : null);
        } catch(e) {
            console.log(e);
        }
        
    }
    getItem()

    return (
        <FlatList
            data={itemList}
            renderItem={({item}) => <TaskItem id={item.id} task={item.title}>{item.description}</TaskItem>}
            keyExtractor={item => item.id}
        />
        );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 20,
    },
    taskContainer: {
        backgroundColor: '#3E3364',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        minHeight: 50,
    },
    task: {
        color: '#fff',
        width: '90%',
        fontSize: 16,
    },
    delete: {
        marginLeft: 10,
    },
});

export { TaskItem, ItemTaskList };