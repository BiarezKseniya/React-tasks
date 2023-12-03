import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { AutocompleteProps } from '../../../../types/interfaces';

const Autocomplete = (props: AutocompleteProps) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { ...rest } = props;
  const { register, setValue } = useFormContext();
  const propsFromRegister = register(rest.id);
  const countries = useSelector((state: RootState) => state.form.countryList);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInput(value);
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      setSuggestions([...countries].sort().filter((v) => regex.test(v)));
    } else {
      setSuggestions([]);
    }
    propsFromRegister.onChange(event);
  };

  const suggestionSelected = (value: string) => {
    setInput(value);
    setSuggestions([]);
    setValue('country', value, { shouldValidate: true });
  };

  return (
    <div className="form__autocomplete">
      <input
        className="form__input"
        value={input}
        {...propsFromRegister}
        onChange={handleChange}
        {...rest}
      />
      <ul className="form__autocomplete-list">
        {suggestions.map((item, index) => (
          <li key={index} onClick={() => suggestionSelected(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
