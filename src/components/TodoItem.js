import React from 'react';
import {View, Text, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import {Card, Icon} from 'react-native-elements';

import {Colors, Spacing} from '../styles';

export default function TodoItem({
  todo,
  handleEdit,
  handleDelete,
  handleTodoCompleted,
}) {
  return (
    <Card containerStyle={{borderRadius: Spacing.extraLarge}}>
      <TouchableOpacity onPress={handleTodoCompleted} style={styles.container}>
        <View style={styles.row}>
          {todo.isCompleted ? (
            <Icon
              name="check-circle"
              color={Colors.success}
              size={Spacing.largest}
            />
          ) : (
            <Icon
              name="circle-outline"
              type="material-community"
              color={Colors.lightgray}
              size={Spacing.largest}
            />
          )}

          <Text
            style={[
              {marginHorizontal: Spacing.smallest},
              todo.isCompleted ? styles.completedText : styles.text,
            ]}>
            {todo.title}
          </Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={handleEdit}>
            <Icon name="edit" color={Colors.orange} size={Spacing.large} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Confirm',
                'Are you sure?',
                [
                  {
                    text: 'No',
                    onPress: () => console.log('No Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'Yes',
                    onPress: handleDelete,
                  },
                ],
                {cancelable: false},
              );
            }}>
            <Icon name="delete" color={Colors.error} size={Spacing.large} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  text: {color: Colors.black},
  completedText: {
    textDecorationLine: 'line-through',
    color: Colors.lightgray,
  },
});
