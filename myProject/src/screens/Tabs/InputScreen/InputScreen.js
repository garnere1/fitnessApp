import React, {useEffect, useState} from 'react';
import { StyleSheet, View, TextInput, Button, Keyboard, Alert, SafeAreaView, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Auth, API, graphqlOperation} from 'aws-amplify';
import {createProduct} from '../../../graphql/mutations';
import t from 'tcomb-form-native';

const Form = t.form.Form;
const User = t.struct({
  name: t.String,
  price: t.Number,
  description: t.String,
});


const InputScreen = () => {
    const [form, setForm] = useState(null); 
  const [initialValues, setInitialValues] = useState({});
  const options = {
    auto: 'placeholders',
    fields: {
      description: {
        multiLine: true,
        stylesheet: {
          ...Form.stylesheet,
          textbox: {
            ...Form.stylesheet.textbox,
            normal: {
              ...Form.stylesheet.textbox.normal,
              height: 100,
              textAlignVertical: 'top',
            },
          },
        },
      },
    },
  };
  const handleSubmit = async () => {
    try {
        const value = await form.getValue();
        const user = await Auth.currentAuthenticatedUser();
        const response = await API.graphql(
          graphqlOperation(createProduct, {
            input: {
              name: value.name,
              price: value.price.toFixed(2),
              description: value.description,
              userId: user.attributes.sub,
              userName: user.username,
            },
          }),
        );
        console.log('Response :\n');
        console.log(response);
      } catch (e) {
        console.log(e.message);
      }
  };

  return (
    <>
      <SafeAreaView style={styles.addProductView}>
        <ScrollView>
          <Form
            ref={(c) => setForm(c)}
            value={initialValues}
            type={User}
            options={options}
          />
          <Button title="Save" onPress={handleSubmit} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
    addProductView: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingTop: 15,
      height: 'auto',
    },
});
export default InputScreen;