import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { TaskItem } from '..';


function ListScreen(){
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
        <View style={{flex:1,backgroundColor:'#daceeb'}}>
            <View style={{flex:0.10}}>
                <Text style={styles.title}>Gère tes priorités</Text>
            </View>
            <View style={{flex:0.90}}>
                <View style={styles.list}>
                    <Text style={styles.listTitle}>Urgent et Important</Text>
                    <Text style={styles.advice}>Fais le dès que possible!</Text>
                    <FlatList
                        data={itemList.filter(l_item => l_item['tag']==='UI')}
                        renderItem={({item}) => <TaskItem 
                                                    id={item.id} 
                                                    task={item.title} 
                                                    checked={item.checked} 
                                                    tag={item.tag}  
                                                >
                                                    {item.description}
                                                </TaskItem>}
                        keyExtractor={item => item.id}
                    />
                </View>
                <View style={styles.list}>
                    <Text style={styles.listTitle}>Urgent mais pas trop important</Text>
                    <Text style={styles.advice}>Tu peux déléguer ces tâches à quelqu'un...</Text>
                    <FlatList
                        data={itemList.filter(l_item => l_item['tag']==='U')}
                        renderItem={({item}) => <TaskItem 
                                                    id={item.id} 
                                                    task={item.title} 
                                                    checked={item.checked} 
                                                    tag={item.tag}  
                                                >
                                                    {item.description}
                                                </TaskItem>}
                        keyExtractor={item => item.id}
                    />
                </View>
                <View style={styles.list}>
                    <Text style={styles.listTitle}>Important mais pas super Urgent</Text>
                    <Text style={styles.advice}>Prends ton temps pour le planifier (mais ne l'oublie pas)</Text>
                    <FlatList
                        data={itemList.filter(l_item => l_item['tag']==='I')}
                        renderItem={({item}) => <TaskItem 
                                                    id={item.id} 
                                                    task={item.title} 
                                                    checked={item.checked} 
                                                    tag={item.tag}  
                                                >
                                                    {item.description}
                                                </TaskItem>}
                        keyExtractor={item => item.id}
            />
                </View>
                <View style={styles.list}>
                    <Text style={styles.listTitle}>Ni urgent , ni important</Text>
                    <Text style={styles.advice}>Pourquoi la garder ? supprime les !</Text>
                    <FlatList
                        data={itemList.filter(l_item => l_item['tag']==='N')}
                        renderItem={({item}) => <TaskItem 
                                                    id={item.id} 
                                                    task={item.title} 
                                                    checked={item.checked} 
                                                    tag={item.tag}  
                                                >
                                                    {item.description}
                                                </TaskItem>}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 32,
        marginBottom: 20,
    },
    listTitle : {
        fontWeight: 'bold',
        fontSize: 25,
        
    },
    list : {
        marginLeft : 5,
        marginBottom : 50,
    },
    advice : {
        fontWeight: 'bold',
        fontStyle: 'italic',
        textShadowColor :'#7d2ee6',
        textShadowRadius : 3,
        fontSize: 18,
        color: '#706f70'
    },
})

export { ListScreen };