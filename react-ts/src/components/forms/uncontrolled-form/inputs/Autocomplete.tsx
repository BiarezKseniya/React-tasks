import React, { forwardRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

interface AutocompleteProps {
  id: string;
  type: string;
  name: string;
  placeholder?: string;
}

const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  function Autocomplete(props, ref) {
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const { ...rest } = props;
    const countries = useSelector((state: RootState) => state.form.countryList);
    console.log(countries);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setInput(value);
      if (value.length > 0) {
        const regex = new RegExp(`^${value}`, 'i');
        setSuggestions([...countries].sort().filter((v) => regex.test(v)));
      } else {
        setSuggestions([]);
      }
    };

    const suggestionSelected = (value: string) => {
      setInput(value);
      setSuggestions([]);
    };

    return (
      <div className="form__autocomplete">
        <input
          className="form__input"
          ref={ref}
          value={input}
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
  }
);

export default Autocomplete;
