/* eslint-disable react/prefer-stateless-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component, memo } from 'react';
import { Button, Input } from 'antd';

class InputComponent extends Component {
  render() {
    const { value,options } = this.props;
    return (
      <div>
        <Input
          value={value}
          onChange={newValue => {
            const { onChange } = this.props;
            if (onChange) {
              onChange(newValue);
            }
          }}
        />
      </div>
    );
  }
}

export default function InputFunction({ name, value, options = {}, onChange }) {
  return (
    <InputComponent
      onChange={val => {
        onChange(name, val);
      }}
      value={value}
      params={options}
    />
  );
}
