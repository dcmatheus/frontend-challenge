import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { removeLetters, addCentsSeparator, convertToReal } from '../utils';
import Context from '../context';

const invalidValues = ['', '0', '00', '000', '0000'];

const ValueInput = ({ testId, contextKey }) => {
  const context = useContext(Context);
  const [currencyValue, setCurrencyValue] = useState('0,00');
  const formatValue = (value) => {
    if (value.length <= 14) {
      const rawValue = removeLetters(value);
      if (invalidValues.includes(rawValue)) {
        setCurrencyValue('0,00');
        context[contextKey](0);
      } else {
        const centsValue = addCentsSeparator(rawValue);
        context[contextKey](parseFloat(centsValue));
        const formattedValue = convertToReal(centsValue);
        setCurrencyValue(formattedValue);
      }
    }
  };
  return (
    <div className='flex my-1'>
      <span className='p-2 text-gray-800 bg-gray-300 rounded-l-full'>R$</span>
      <input
        type='text'
        className='w-32 pl-2 text-gray-800 rounded-r-full'
        data-testid={testId}
        value={currencyValue}
        onChange={({ target }) => formatValue(target.value)}
      />
    </div>
  );
};

ValueInput.propTypes = {
  testId: PropTypes.string.isRequired,
  contextKey: PropTypes.string.isRequired,
};

export default ValueInput;
