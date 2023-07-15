import { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export type UseInputReturn = {
  value: string;
  debouncedValue: string;
  setValue: Dispatch<SetStateAction<string>>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  clear: () => void;
};

export type UseInputArgs = {
  defaultValue?: string;
  searchParam?: string;
  debounce?: number;
};

export type UseInputType = (args?: UseInputArgs) => UseInputReturn;

const useInput: UseInputType = ({ defaultValue = '', searchParam, debounce } = {}) => {
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

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const clear = useCallback(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return {
    value,
    debouncedValue,
    setValue,
    onChange,
    clear,
  };
};

export default useInput;
