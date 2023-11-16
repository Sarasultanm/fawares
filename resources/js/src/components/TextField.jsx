import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from '@chakra-ui/react';
import { useTranslation } from "react-i18next";

export default ({  }) => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');

  const handleInputChange = e => setInput(e.target.value);

  const isError = input === '';

  return (
    <FormControl isInvalid={isError}>
      <FormLabel>{t("Email")}</FormLabel>
      <Input type="email" value={input} onChange={handleInputChange} />
      {!isError ? (
        <FormHelperText>
          {t("Enter the email you'd like to receive the newsletter on.")}
        </FormHelperText>
      ) : (
        <FormErrorMessage>{t("Email is required")}</FormErrorMessage>
      )}
    </FormControl>
  );
};
