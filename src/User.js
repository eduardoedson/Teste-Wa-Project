import React, {useEffect, useState } from 'react';
import axios from 'axios';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { Avatar, Icon, Overlay } from 'react-native-elements';
import { WebView } from 'react-native-webview';

const User = ({ navigation, route }) => {
    const [params, setParams] = useState(null)
    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
      setVisible(!visible);
    }

    const getParams = async () => {
        let response = await axios.get(`https://api.github.com/users/${route.params.login}`)
                                  .then((res) => { return res.data })
                                  .catch((err) => {  console.log('getParams === ', err); return [] })
        setParams(response)
    }

    useEffect(() => {
        navigation.setOptions({ title: route.params.login })
		return () => { null }
    }, [])

    useEffect(() => {
        if(!params) {
            getParams()
        }
        return () => { null }
    }, [params])

    return (
        <ScrollView>
            {params ? 
                <View style={{ justifyContent: 'center' }}>
                    <Avatar size={200} rounded source={{ uri: params.avatar_url }} containerStyle={{ alignSelf: 'center', marginTop: 20 }} />
                    
                    <View style={styles.listContainer}>
                        <Text style={styles.titleContainer}>Login: </Text>
                        <Text style={styles.itemContainer}>{params.login}</Text>
                    </View>

                    <View style={styles.listContainer}>
                        <Text style={styles.titleContainer}>nodeId: </Text>
                        <Text style={styles.itemContainer}>{params.node_id}</Text>
                    </View>

                    <View style={styles.listContainer}>
                        <Text style={styles.titleContainer}>userId: </Text>
                        <Text style={styles.itemContainer}>{params.id}</Text>
                    </View>

                    <View style={styles.listContainer}>
                        <Text style={styles.titleContainer}>Followers: </Text>
                        <Text style={styles.itemContainer}>{params.followers}</Text>
                    </View>

                    <View style={styles.listContainer}>
                        <Text style={styles.titleContainer}>Followings: </Text>
                        <Text style={styles.itemContainer}>{params.following}</Text>
                    </View>

                    <View style={styles.listContainer}>
                        <Icon
                            raised
                            name='home'
                            type='font-awesome'
                            color='#AA0000'
                            onPress={toggleOverlay} 
                        />
                    </View>

                    <Overlay
                        isVisible={visible} 
                        onBackdropPress={toggleOverlay}
                        overlayStyle={{ width: '80%', height: '80%' }}
                    >
                        <WebView source={{ uri: params.html_url }} />
                    </Overlay>

                </View> 
            : null}
        </ScrollView>
    )
}

export default User;

const styles = StyleSheet.create({
    listContainer: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        marginTop: 20
    },
    titleContainer: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    itemContainer: {
        fontSize: 20
    }
})