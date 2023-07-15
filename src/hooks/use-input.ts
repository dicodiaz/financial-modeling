import { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export type UseInputReturn = {
  value: string;
  debouncedValue: string;
  numberValue: number;
  setValue: Dispatch<SetStateAction<string>>;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  clear: () => void;
};

export type UseInputArgs = {
  defaultValue?: string;
  searchParam?: string;
  debounce?: number;
  onChangeCallback?: () => void;
};

export type UseInputType = (args?: UseInputArgs) => UseInputReturn;

const useInput: UseInputType = ({
  defaultValue = '',
  searchParam,
  debounce,
  onChangeCallback,
} = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialValue = (searchParam && searchParams.get(searchParam)) ?? defaultValue;
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  useEffect(() => {
    const setSearchParamsCallback = () => {
      if (searchParam) {
        setSearchParams((seachParams) => {
          if (value === defaultValue) {
            seachParams.delete(searchParam);
          } else {
            seachParams.set(searchParam, value);
          }

          return seachParams;
        });
      }
    };

    if (debounce) {
      const timeoutID = setTimeout(() => {
        setDebouncedValue(value);
        setSearchParamsCallback();
      }, debounce);

      return () => {
        clearTimeout(timeoutID);
      };
    }

    setSearchParamsCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const onChange: UseInputReturn['onChange'] = useCallback((e) => {
    setValue(e.target.value);
    onChangeCallback?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clear = useCallback(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return {
    value,
    debouncedValue,
    numberValue: Number(value),
    setValue,
    onChange,
    clear,
  };
};

export default useInput;
