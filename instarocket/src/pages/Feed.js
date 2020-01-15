import React, { Component } from 'react';
import io from 'socket.io-client';
import api from '../services/api';

import { View ,Text, Image, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

import camera from '../assets/camerap.png';
import more from '../assets/more.png';
import like from '../assets/core.png';
import comment from '../assets/msn.png';
import send from '../assets/seta.png';


export default class Feed extends Component {
    static navigationOptions = ({navigation}) => ({
        headerRight : (
                <TouchableOpacity style={{marginHorizontal: 20}} onPress={() => navigation.navigate('New')} >
                    <Image source={camera}/>
                </TouchableOpacity>
        ),
    });
    
        state= {
            feed: [],
        };
    
       async componentDidMount(){
           this.registerToSocket (); //colar registerToSocket depois colocar essa funçao
    
           const response = await api.get('posts');

           this.setState({feed: response.data});
        }

        registerToSocket = () =>{
            const socket = io ('http://192.168.0.4:3333');
    
            //post, like
            socket.on('post', newPost =>{
                this.setState({ feed: [newPost, ... this.state.feed] }); // ... qualquer erro voltar com os 3pontos antes do "this" ...
            })
    
            socket.on('like', likedPost =>{
                this.setState({
                    feed: this.state.feed.map(post =>
                        post._id === likedPost._id ? likedPost : post
                        )
                });
            })
        }

        handleLike = id =>{
            api.post(`/posts/${id}/like`);
        }

  render() {
    return( 
        <View style={styles.container}>
            <FlatList
                data={this.state.feed}
                keyExtractor={post =>post._id}
                renderItem ={({item}) =>(
                   <View style={styles.feedItem}>

                       <View style={styles.feedItemHeader}>
                            <View style={styles.userInfo}>
                                <Text style={styles.name}>{item.author}</Text>
                                <Text style={styles.place}>{item.place}</Text>
                            </View>
                                <Image source={more}></Image>
                       </View>
                        
                        <Image style={styles.feedImage} source={{uri: `http://192.168.0.4:3333/files/${item.image}`}}/>

                            <View style={styles.feedItemFooter}>
                                <View style={styles.actions}>
                                    <TouchableOpacity stiyle={styles.action} onPress={() => this.handleLike(item._id)}>
                                        <Image source={like}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity stiyle={styles.action} onPress={() => {}}>
                                        <Image source={comment}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity stiyle={styles.action} onPress={() => {}}>
                                        <Image source={send}/>
                                    </TouchableOpacity>
                                </View>


                <Text style={styles.likes}>{item.likes} curtidas</Text>
                <Text style={styles.description}>{item.description} </Text>
                <Text style={styles.hashtags}>{item.hashtags} </Text>
                             </View>
                   </View>
                )}
             />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    feedItem:{
        marginTop: 30
    },
    feedItemHeader: {
        paddingHorizontal: 15,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name:{
        fontSize: 14,
        color: '#000',
    },
    place:{
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },

    feedImage: {
        width: '100%',
        height: 400,
        marginVertical: 15,
    },
    feedItemFooter:{
        paddingHorizontal:15,
    },

    actions:{
       flexDirection: 'row' ,
    },

    action:{
        marginRight: 6,
    },

    likes: {
        marginTop: 15,
        fontWeight: 'bold',
        color: '#000',
    },
    description: {
        lineHeight: 18,
        color: '#000',
    },
    hashtags: {
        color: '#7159c1',
    }

});
