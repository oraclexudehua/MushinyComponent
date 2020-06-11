/* eslint-disable react/prefer-stateless-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component, memo } from 'react';
import { Button, Input } from 'antd';

class PassWordComponent extends Component {
  render() {
    const { value } = this.props;
    return (
      <div>
        <Input.Password
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

export default function PassWord({ name, value, options = {}, onChange }) {
  console.log(name);
  return (
    <PassWordComponent
      onChange={val => {
        onChange(name, val);
      }}
      value={value}
      params={options}
    />
  );
}
