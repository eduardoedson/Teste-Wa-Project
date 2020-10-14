import React, {useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, ScrollView, Text, View } from 'react-native';
import { SearchBar, ListItem, Icon } from 'react-native-elements'

const Index = ({ navigation }) => {
    const [users, setUsers] = useState(null)
    const [showDeleteds, setShowDeleteds] = useState(false)
    const [deleteds, setDeleteds] = useState([])
    const [usersComponent, setUsersComponent] = useState(null)
    const [search, setSearch] = useState('')

    const getUsers = async () => {
        let response = await axios.get('https://api.github.com/users?per_page=10')
                                  .then((res) => { return res.data })
                                  .catch((err) => {  console.log('getUsers === ', err); return [] })
        setUsers(response)
    }

    const mountUsersComponent = () => {
        let temp = []
        for(let i = 0; i < users.length; i++) {
            let item = <ListItem 
                    key={i} 
                    bottomDivider 
                    onPress={() =>  navigation.navigate('User', users[i])}
                    onLongPress={() => addDeleted(users[i].id)}
                >
                    <ListItem.Content>
                        <ListItem.Title>{users[i].login}</ListItem.Title>
                        <ListItem.Subtitle>{users[i].id}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>

            if(search === '') {
                if(!showDeleteds) {
                    if(!deleteds.includes(users[i].id)) {
                        temp.push(item)
                    }
                } else {
                    if(deleteds.includes(users[i].id)) {
                        temp.push(item)
                    }
                }
            }else if(String(users[i].login).includes(search) || String(users[i].id).includes(search)) {
                if(!showDeleteds) {
                    if(!deleteds.includes(users[i].id)) {
                        temp.push(item)
                    }
                } else {
                    if(deleteds.includes(users[i].id)) {
                        temp.push(item)
                    }
                }
            }
        }
        setUsersComponent(temp)
    }

    const updateSearch = (searchValue) => setSearch(searchValue)

    const clearSearch = () => setSearch('')

    const addDeleted = (id) => {
        const temp = deleteds
        temp.push(id)
        setDeleteds(temp)
        Alert.alert('Item deletado.')
    }

    useEffect(() => {
        if(users) {
            mountUsersComponent()
        }
    }, [search, showDeleteds, deleteds])

    useEffect(() => {
        if(!users) {
            getUsers()
        }

        if(users && !usersComponent) {
            mountUsersComponent()
        }
		return () => { null }
    }, [users, usersComponent])

    return (
        <ScrollView>
            <SearchBar
                placeholder="Buscar Usuário..."
                onChangeText={updateSearch}
                onClear={clearSearch}
                value={search}
                lightTheme 
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', margin: 5, width: '40%' }}>
                <Icon
                    raised
                    name='home'
                    type='font-awesome'
                    color='#AA0000'
                    onPress={() => setShowDeleteds(false)}
                />
                <Icon
                    raised
                    name='trash'
                    type='font-awesome'
                    color='#AA0000'
                    onPress={() => setShowDeleteds(true)}
                />
            </View>

            {usersComponent ? usersComponent : <Text>Nenhum usuário encontrado.</Text>}
        </ScrollView>
    )
}

export default Index;
