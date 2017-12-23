import React from 'react';
import { TextInput, View, Text, Imageasdfasdfasdfadsfasdfasdfasdfasdfadsferq } from 'react-native';
import { FONT_NAME } from '../config/styles';


const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;


  return (
      
        <TextInput
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          autoCorrect={false}
          style={inputStyle}
          value={value}
          onChangeText={onChangeText}
        />
   
    
  );
};

const styles = {
  inputStyle: {
      color: '#fff',
      fontFamily: FONT_NAME,
      fontSize: 14,
      lineHeight: 0,
      marginHorizontal: 25,
      height: 40,
      borderRadius: 3,
      borderWidth: 1,
      borderColor: '#ECF0F3',
      paddingHorizontal: 10
  },
 
};



export { Input };
