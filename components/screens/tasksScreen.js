import {useState} from 'react'
import { StyleSheet, TextInput, Pressable, View, ScrollView, Modal, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateField from 'react-native-datefield';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { ItemTaskList } from '..';

function TaskScreen(){
    const [modalVisible, setModalVisible] = useState(false);
    const [taskTitle, onChangeTaskTitle] = useState('');
    const [taskDescription, onChangeTaskDescription] = useState('');
    const [taskDate, onChangeTaskDate] = useState('');

    return (
        <View style={{flex:1,backgroundColor:'#daceeb'}}>
            <Modal
                animationType="slide"
                transparent={true}
                visible= {modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }} 
            >
                <View style={{flex:1,justifyContent: 'flex-end',}}>
                <View style={styles.modalAddTask}>
                    <View>
                        <TextInput onChangeText={onChangeTaskTitle} value={taskTitle} placeholder={'Ajouter une tâche'} style={{color:'#daceeb'}} placeholderTextColor={'#daceeb'}/>
                        <TextInput onChangeText={onChangeTaskDescription} value={taskDescription} placeholder={'Description...'} placeholderTextColor={'#daceeb'}/>
                        <DateField labelDate="Jour" labelMonth="Mois" labelYear="Année" onSubmit={onChangeTaskDate} value={taskDate} style={{color:'#daceeb'}}/>
                    </View>
                    <View style={styles.saveButton}>
                        <TouchableOpacity onPress={async() => {
                            try {
                                const jsonlist = await AsyncStorage.getItem('tasks');
                                const Tasks = jsonlist != null ? JSON.parse(jsonlist) : [];
                                let idString = await AsyncStorage.getItem('id');
                                const Id = idString != null ? parseInt(idString) : 0;
                                Tasks.push({
                                    id : Id+1,
                                    checked : false,
                                    title : taskTitle,
                                    description : taskDescription,
                                    date : taskDate,
                                    tag : 'N',
                                })
                                const listTasks = JSON.stringify(Tasks)
                                idString = (Id+1).toString()
                                try {
                                    await AsyncStorage.setItem("tasks", listTasks);
                                    await AsyncStorage.setItem("id", idString);
                                    console.log("OK l'élément "+idString+" ajouté.");
                                    console.log(listTasks);
                                } catch (e) {
                                    console.log(e);
                                }
                            } catch(e) {
                                console.log(e);
                            } setModalVisible(!modalVisible);                   
                        }}>
                            <Text style={{color:'#daceeb'}}>ENREGISTRER</Text>
                        </TouchableOpacity>
                    </View>
                </View>    
                </View>
                
            </Modal>
            <ItemTaskList/>
            <View style={styles.addbuttoncontainer}>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.addbutton}>
                <Ionicons name="add" size={50} color='#fff' style={{alignItems:'center'}}></Ionicons>
            </TouchableOpacity>
            </View>
            
            {/*clear button pour nettoyer asyncstorage
            <Button  title='clear' onPress={
                async () => {
                    try {
                        await AsyncStorage.clear()
                    } catch(e) {
                        console.log(e);
                    }
                    console.log('Done.')
                }
            }/> */}
            
        </View>
    );
}




const styles = StyleSheet.create({
    modalAddTask: {
        height: 150,
        backgroundColor: '#3E3364',
    },
    saveButton: {
        alignSelf:'flex-end',
        margin:5,
    },
    addbutton: {
        borderRadius : 100,
        height : 50,
        width :50,
        backgroundColor: '#3E3364',
    },
    addbuttoncontainer: {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'flex-end'
    }
})

export { TaskScreen };