import { useState } from "react";

type inputValidatorProps = {
  initialValue: string;
  regexValue: RegExp;
};
function useInputValidator({ initialValue, regexValue }: inputValidatorProps) {
  const [value, setValue] = useState<string>(initialValue);
  const [valid, setValid] = useState<boolean>(false);

  const handleChange = (newValue: string) => {
    setValue((prevState) => (prevState = newValue));
    setValid((prevState) => (prevState = regexValue.test(newValue)));
  };

  return [value, valid, handleChange] as const;
}

export default useInputValidator;
