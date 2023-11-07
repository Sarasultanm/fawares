import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from '@chakra-ui/react';

export default ({  }) => {
  const [input, setInput] = useState('');

  const handleInputChange = e => setInput(e.target.value);

  const isError = input === '';

  return (
    <FormControl isInvalid={isError}>
      <FormLabel>Email</FormLabel>
      <Input type="email" value={input} onChange={handleInputChange} />
      {!isError ? (
        <FormHelperText>
          Enter the email you'd like to receive the newsletter on.
        </FormHelperText>
      ) : (
        <FormErrorMessage>Email is required.</FormErrorMessage>
      )}
    </FormControl>
  );
};
