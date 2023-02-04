import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import { Icon } from '@rneui/themed';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { CheckBox } from './Checkbox';

function TaskItem (props) {
    const [check, setCheck] = useState(props.checked);

    return (
        <View style={styles.container}>
        <View style={styles.taskContainer}>
            <CheckBox
                label={props.task}
                checked={check}
                handleClick={async () => {  setCheck(!check)
                                            try {
                                            const jsonlist = await AsyncStorage.getItem('tasks');
                                            const Tasks = jsonlist != null ? JSON.parse(jsonlist) : [];
                                            //action recup et modif
                                            const indelem = Tasks.findIndex(Task => Task['id'] === props.id);
                                            Tasks[indelem]['checked'] = !check;
                                            const listTasks = JSON.stringify(Tasks)
                                            try {
                                                await AsyncStorage.setItem("tasks", listTasks);
                                                console.log("OK.");
                                            } catch (e) {
                                                console.log(e);
                                            }
                                        } catch(e) {
                                            console.log(e);
                                        }
                                        }}
            /> 
            {/* <Text style={styles.task}>{props.task}</Text> */}
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => deleteTask(props.id)}>
                    <Icon style={styles.delete} name="menu" size={30} color='#fff' type='ionicons' />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => editTask(props.id)}>
                    <Icon style={styles.delete} name="delete" size={30} color='#fff' type='material' />
                </TouchableOpacity>
            </View>
        </View>
        </View>
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
            renderItem={({item}) => <TaskItem id={item.id} task={item.title} checked={item.checked}>
                                        {item.description}
                                    </TaskItem>}
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