import { Text, Button, View } from 'react-native';


function ListSreen(){
    return (
        <View>
            <Text>Home</Text>
            <Button
            title="Ajouter une tâche"
            onPress={() => navigation.navigate('About')}
            />
        </View>
    );
}

export { ListSreen };