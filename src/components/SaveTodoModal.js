import React from 'react';
import {View, Modal, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import * as yup from 'yup';
import {Formik} from 'formik';
import {Button, Input} from 'react-native-elements';

import {Spacing, Colors} from '../styles';

export default function SaveTodoModal({
  isModalVisible,
  selectedTodo,
  handleSubmit,
  handleCloseModal,
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={handleCloseModal}>
      <TouchableWithoutFeedback onPress={handleCloseModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Formik
              validateOnMount
              initialValues={{title: selectedTodo.title}}
              onSubmit={handleSubmit}
              validationSchema={yup.object().shape({
                title: yup.string().max(50).required(),
              })}>
              {({
                values,
                handleChange,
                errors,
                setFieldTouched,
                handleBlur,
                touched,
                isValid,
                handleSubmit,
              }) => (
                <>
                  <Input
                    autoFocus
                    placeholder="title"
                    value={values.title}
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                    errorMessage={
                      touched.title && errors.title ? errors.title : undefined
                    }
                    errorStyle={{color: Colors.error}}
                  />

                  <Button
                    disabled={!isValid}
                    containerStyle={styles.button}
                    onPress={handleSubmit}
                    title="Save"
                  />
                </>
              )}
            </Formik>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
  button: {width: '100%', marginTop: Spacing.large},
});
