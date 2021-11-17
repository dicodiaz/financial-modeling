import { useState } from 'react';

const useInputHook = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    onChange: (event) => setValue(event.target.value),
    clear: () => setValue(''),
  };
};

export default useInputHook;
