
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';

const App = () => {
  const [message, setMessage] = useState('');
  const [todo, setTodo] = useState([]);
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState('');
  const [editId, setEditId] = useState('');

  const editTask = id => {
    if (edit != '') {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        message: edit,
      });

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch(`http://192.168.1.104:3000/api/update${editId}`, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
      readMethod();
      setEdit('');
      setEditId(0);
    }
  };

  const deleteTask = async id => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow',
    };

    await fetch(`http://192.168.1.104:3000/api/delete${id}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    readMethod();
  };

  const addTask = () => {
    if (message != '') {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        message: message,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch('http://192.168.1.104:3000/api/create', requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
      setMessage('');
      readMethod();
    } else {
      alert('Please enter a task');
    }
  };

  const readMethod = () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch('http://192.168.1.104:3000/api/read', requestOptions)
      .then(response => response.json())
      .then(result => setTodo(result))
      .catch(error => console.log('error', error));
    setMessage('');
  };
  // const [todo, setTodo] = useState([]);
  useEffect(() => {
    console.log('hello');
    readMethod();
  }, [modal]);
  return (
    <View
      style={{
        flex: 1,
        padding: 15,
        backgroundColor: '#001B61',
        paddingTop: 20,
      }}>
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <Text style={{ color: '#fff' }}>React-Native + Node + MySQL<Text style={{ color: 'lightblue' }}> TODO(CRUD)</Text></Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#fff',
          borderRadius: 10,
          paddingHorizontal: 10,
        }}>
        <TextInput
          style={{ color: 'black' }}
          placeholder="Enter Your Task"
          value={message}
          onChangeText={e => setMessage(e)}
        />
        <TouchableOpacity onPress={() => addTask()}>
          <Icon1 name="plus" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={todo}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#fff',
                marginTop: 15,
                paddingVertical: 8,
                paddingHorizontal: 5,
                borderRadius: 5,
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', color: 'black' }}>Task: </Text>
                <Text style={{ color: 'black', fontSize: 16 }}>
                  {item.message}
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      'Delete Confirmation',
                      'Do You Want To Delete?',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                        },
                        {
                          text: 'OK',
                          onPress: () => {
                            deleteTask(item.id);
                          },
                        },
                      ],
                      { cancelable: false },
                    );
                  }}>
                  <Icon1 name="delete" size={20} color="red" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setEdit(item.message);
                    setEditId(item.id);
                    // editTask(item.id)
                    setModal(true);
                  }}>
                  <Icon name="edit" size={20} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
      {/* <View> */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        backgroundColor="red">
        <View
          style={{
            position: 'absolute',
            top: '20%',
            alignSelf: 'center',
            height: 180,
            width: '80%',
            backgroundColor: '#abbed6',
            justifyContent: 'space-evenly',
            paddingTop: 20,
            alignItems: 'center',
            borderBottomLeftRadius: 50,
            borderTopRightRadius: 50,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              // justifyContent: 'center',
              backgroundColor: '#fff',
              borderRadius: 10,
              paddingHorizontal: 10,
              width: '80%',
            }}>
            <TextInput
              style={{ color: 'black' }}
              placeholder="Enter Your Task"
              value={edit}
              onChangeText={e => setEdit(e)}
            />
            <TouchableOpacity
              onPress={() => {
                editTask();
                setModal(false);
              }}>
              <Icon1 name="plus" size={30} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => setModal(false)}
            style={{
              // position: 'absolute',
              // bottom: 20,
              backgroundColor: '#FF6B6B',
              width: '60%',
              paddingVertical: 10,
              borderRadius: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* </View> */}
    </View>
  );
};

export default App;
