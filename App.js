/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Icon} from 'react-native-elements';

import {Spacing, Colors} from './src/styles';
import TodoItem from './src/components/TodoItem';
import SaveTodoModal from './src/components/SaveTodoModal';

const App: () => React$Node = () => {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const getTodosFromAsyncStorage = async () => {
      try {
        setTodos(JSON.parse((await AsyncStorage.getItem('todos')) || []));
      } catch (e) {
        console.log(e);
      }
    };
    getTodosFromAsyncStorage();
  }, []);

  useEffect(() => {
    const saveTodosToAsyncStorage = async () => {
      try {
        await AsyncStorage.setItem('todos', JSON.stringify(todos));
      } catch (e) {
        console.log(e);
      }
    };
    saveTodosToAsyncStorage();
  }, [todos]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <SaveTodoModal
        isModalVisible={isModalVisible}
        selectedTodo={selectedTodo}
        handleCloseModal={() => setIsModalVisible(false)}
        handleSubmit={({title}) => {
          if (selectedTodo.title) {
            const index = todos.findIndex(
              (a) => a.title === selectedTodo.title,
            );
            const newtodos = [...todos];
            newtodos[index] = {
              isCompleted: selectedTodo.isCompleted,
              title: title,
            };
            setTodos(newtodos);
          } else {
            setTodos([...todos, {isCompleted: false, title: title}]);
          }
          setIsModalVisible(false);
        }}
      />

      <SafeAreaView style={styles.innerContainer}>
        <Text style={styles.headerText}>All Tasks</Text>
        <FlatList
          keyExtractor={(item) => item.title}
          data={todos}
          renderItem={({item}) => (
            <TodoItem
              handleTodoCompleted={() => {
                const index = todos.findIndex((a) => a.title === item.title);
                const newtodos = [...todos];
                newtodos[index] = {...item, isCompleted: !item.isCompleted};
                setTodos(newtodos);
              }}
              handleEdit={() => {
                setIsModalVisible(true);
                setSelectedTodo(item);
              }}
              handleDelete={() =>
                setTodos(todos.filter((a) => a.title !== item.title))
              }
              todo={item}
            />
          )}
        />

        <TouchableOpacity
          onPress={() => {
            setIsModalVisible(true);
            setSelectedTodo({});
          }}>
          <Icon
            name="add-circle"
            size={Spacing.extraLarge}
            color={Colors.primary}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  innerContainer: {flex: 1, padding: Spacing.smaller},
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.opaque,
  },
  modalView: {
    width: '80%',
    margin: Spacing.large,
    backgroundColor: Colors.white,
    borderRadius: Spacing.large,
    padding: Spacing.largest,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerText: {fontSize: 28, textAlign: 'center'},
  button: {width: '100%', marginTop: Spacing.large},
});

export default App;
