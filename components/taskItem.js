import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, TextInput } from "react-native";
import { Icon } from '@rneui/themed';
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateField from 'react-native-datefield';
import { Picker } from '@react-native-picker/picker';

import { CheckBox } from './Checkbox';

function TaskItem (props) {
    const [check, setCheck] = useState(props.checked);
    const [modalVisible, setModalVisible] = useState(false);
    const [taskTitle, onChangeTaskTitle] = useState(props.task);
    const [taskDescription, onChangeTaskDescription] = useState(props.children);
    const [taskDate, onChangeTaskDate] = useState(props.date);
    const [selectedTag, setSelectedTag] = useState("N");

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
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => {setModalVisible(true)}}>
                        <Icon style={styles.delete} name="edit" size={30} color='#fff' type='material' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteTask(props.id)}>
                        <Icon style={styles.delete} name="delete" size={30} color='#fff' type='material' />
                    </TouchableOpacity>
                </View>
                {/* Modal qui apparait lorsqu'on (ouche l'ic??ne pour modifier */}
                <Modal
                animationType="slide"
                transparent={false}
                visible= {modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <Text>Titre</Text>
                <TextInput onChangeText={onChangeTaskTitle} value={taskTitle} placeholder='hey'/>
                <Text>Description</Text>
                <TextInput onChangeText={onChangeTaskDescription} value={taskDescription} />
                <DateField labelDate="Jour" labelMonth="Mois" labelYear="Ann??e" onSubmit={onChangeTaskDate} value={taskDate}/>
                
                <Text>Tag ou Liste</Text>
                <Picker
                    selectedValue={selectedTag}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedTag(itemValue)}
                >
                    <Picker.Item label="Important et Urgent" value="IU" />
                    <Picker.Item label="Important uniquement" value="I" />
                    <Picker.Item label="Urgent uniquement" value="U" />
                    <Picker.Item label="Ni l'un, Ni l'autre " value="N" />
                </Picker>
                <View >
                    <TouchableOpacity onPress={async() => {
                            editTask(props.id,taskTitle,taskDescription,selectedTag, taskDate)
                            setModalVisible(!modalVisible);                   
                        }}>
                            <Text>ENREGISTRER</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                            setModalVisible(!modalVisible);                   
                        }}>
                            <Text>ANNULER</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
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
            renderItem={({item}) => <TaskItem 
                                        id={item.id} 
                                        task={item.title} 
                                        checked={item.checked} 
                                        tag={item.tag} date={item.date}  
                                    >
                                        {item.description}
                                    </TaskItem>}
            keyExtractor={item => item.id}
        />
        );
}

const deleteTask = async(index) => {
    try {
        const jsonlist = await AsyncStorage.getItem('tasks');
        const Tasks = jsonlist != null ? JSON.parse(jsonlist) : [];
        //action recup 
        const indelem = Tasks.findIndex(Task => Task['id'] === index);
        // action delete
        Tasks.splice(indelem, 1);
        const listTasks = JSON.stringify(Tasks)
        try {
            await AsyncStorage.setItem("tasks", listTasks);
            console.log("task deleted.");
        } catch (e) {
            console.log(e);
        }
    } catch(e) {
        console.log(e);
    }
}

const editTask = async(index,title,description,tag,date) => {
    try {
        const jsonlist = await AsyncStorage.getItem('tasks');
        const Tasks = jsonlist != null ? JSON.parse(jsonlist) : [];
        //action recup et modif
        const indelem = Tasks.findIndex(Task => Task['id'] === index);
        Tasks[indelem]['title'] = title;
        Tasks[indelem]['description'] = description;
        Tasks[indelem]['date'] = date;
        Tasks[indelem]['tag'] = tag;
        const listTasks = JSON.stringify(Tasks)
        try {
            await AsyncStorage.setItem("tasks", listTasks);
            console.log("task modified");
            console.log(listTasks);
        } catch (e) {
            console.log(e);
        }
    } catch(e) {
        console.log(e);
    }
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
