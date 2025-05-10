// src/hooks/useErrorbox.js
import { useState } from 'react';

const useErrorbox = () => {
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const showErrorDialog = (message) => {
    console.log("Showing error with message:", message); // Debug log
    setErrorMessage(message);
    setErrorVisible(true);
  };

  const handleErrorOk = () => {
    console.log("Closing error box"); // Debug log
    setErrorVisible(false);
  };

  return {
    errorVisible,
    errorMessage,
    showErrorDialog,
    handleErrorOk,
  };
};

export default useErrorbox;