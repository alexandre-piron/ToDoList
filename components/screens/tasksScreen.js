import {useState} from 'react'
import { StyleSheet, TextInput, Button, View, ScrollView, Modal, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateField from 'react-native-datefield';
import { ItemTaskList } from '..';

function TaskScreen(){
    const [modalVisible, setModalVisible] = useState(false);
    const [taskTitle, onChangeTaskTitle] = useState('');
    const [taskDescription, onChangeTaskDescription] = useState('');
    const [taskDate, onChangeTaskDate] = useState('');

    return (
        <View >
            <Modal
                animationType="slide"
                transparent={true}
                visible= {modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }} 
            >
                <View style={styles.inputField}>
                    <TextInput onChangeText={onChangeTaskTitle} value={taskTitle} placeholder={'Ajouter une tâche'} placeholderTextColor={'#000000'}/>
                    <TextInput onChangeText={onChangeTaskDescription} value={taskDescription} placeholder={'Description...'} placeholderTextColor={'#000000'}/>
                    <DateField labelDate="Jour" labelMonth="Mois" labelYear="Année" onSubmit={onChangeTaskDate} value={taskDate}/>
                    <View >
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
                                    date : taskDate
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
                            <Text>ENREGISTRER</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Button  title='add' onPress={() => setModalVisible(!modalVisible)}/>
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
            <ItemTaskList/>
        </View>
    );
}




const styles = StyleSheet.create({
    inputField: {
        //position: 'absolute',
        //height: 10,
        //marginHorizontal: 30,
        backgroundColor: '#1069FA'
    }
})

export { TaskScreen };