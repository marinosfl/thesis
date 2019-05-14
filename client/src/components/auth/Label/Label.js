import React from 'react';

const Label = ({ input, isFocused, name }) => {
  const transform = !isFocused ? 'translateY(-2rem)' : 'translateY(-4.5rem)';
  const cursor = !isFocused ? 'text' : 'default';

  const styles = {
    transition: 'transform 0.2s',
    marginLeft: '0.5rem',
    transform,
    cursor
  };
  return (
    <label htmlFor={input} style={styles}>
      {name}
    </label>
  );
};

export default Label;
