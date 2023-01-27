import { StyleSheet, TextInput, Button, View } from 'react-native';
import { TaskItem } from '.';


function TaskSreen(){
    //const [task, setTask] = useState();


    return (
        <View>
            <TaskItem  index="1" task='la tache' ></TaskItem >
            <TextInput style={styles.inputField} placeholder={'Ajouter une tâche'} placeholderTextColor={'#000000'}/>
        </View>
    );
}

export { TaskSreen };

const styles = StyleSheet.create({
    inputField: {
        position: 'relative',
        height: 50,
        marginHorizontal: 30,
        backgroundColor: '#1069FA'
    }
})

