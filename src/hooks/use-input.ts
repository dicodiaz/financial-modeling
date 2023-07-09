import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from 'react';

export type UseInputOutput = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  clear: () => void;
};

const useInput = (initialValue = ''): UseInputOutput => {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value),
    [],
  );
  const clear = useCallback(() => setValue(''), []);

  return {
    value,
    setValue,
    onChange,
    clear,
  };
};

export default useInput;
