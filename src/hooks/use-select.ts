import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from 'react';

export type UseSelectOutput = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  clear: () => void;
};

const useSelect = (initialValue = ''): UseSelectOutput => {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => setValue(e.currentTarget.value),
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

export default useSelect;
