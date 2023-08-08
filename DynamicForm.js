import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';
import Select from './Select';

const DynamicForm = ({ formData }) => {
  const [formValues, setFormValues] = useState({});

  const handleInputChange = (name, value) => {
    if (name === 'dob') {
      const cleanedValue = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
      if (cleanedValue.length <= 2) {
        setFormValues({ ...formValues, [name]: cleanedValue });
      } else if (cleanedValue.length <= 4) {
        setFormValues({ ...formValues, [name]: `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2)}` });
      } else {
        setFormValues({ ...formValues, [name]: `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2, 4)}/${cleanedValue.slice(4, 8)}` });
      }
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const renderFormElement = (item) => {
    const { value, placeholder, keyboardType, element, dropDownValues } = item;

    switch (element) {
      case 'TextInput':
        return (
          <TextInput
            key={value}
            style={styles.input}
            placeholder={placeholder}
            keyboardType={keyboardType}
            value={formValues[value] || ''}
            onChangeText={(text) => handleInputChange(value, text)}
          />
        );
      case 'Select':
        return (
          <Select
            key={value}
            values={dropDownValues}
            // selectedValue={formValues[value] || ''}
            onValueChange={(itemValue) => handleInputChange(value, itemValue)}
          >
            {/* <Picker.Item label={`Select ${value}`} value="" />
            {dropDownValues.map((option) => (
              <Picker.Item key={option} label={option} value={option} />
            ))} */}
          </Select>
        );
      default:
        return null;
    }
  };

  return (
    <View>
      {formData.map((item) => renderFormElement(item))}
      <View>
        <Button title='Submit' onPress={() => console.log(formValues)}></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default DynamicForm;