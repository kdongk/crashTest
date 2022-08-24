import React, { useState } from "react";

const useInput = (validateFn) => {
  const [inputValue, setInputValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const inputValidity = validateFn(inputValue);
  const inputHasError = !inputValidity && isTouched;

  const onChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  const onBlurHandler = () => {
    setIsTouched(true);
  };

  const resetInputValue = () => {
    setIsTouched(false);
    setInputValue("");
  };

  return {
    inputValue,
    inputValidity,
    inputHasError,
    onChangeHandler,
    onBlurHandler,
    resetInputValue,
  };
};

export default useInput;
