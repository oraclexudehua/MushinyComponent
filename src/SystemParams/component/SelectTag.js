import React, { Component } from 'react';
import { Select } from 'antd';

// eslint-disable-next-line react/prefer-stateless-function
class SelectTagComponent extends Component {
  render() {
    const { options = [] } = this.props;
    return (
      <Select
        onChange={value => {
          const { onChange } = this.props;
          if (onChange) {
            onChange(value);
          }
        }}
        value={this.props.value}
        mode="tags"
      >
        {options.map(record => (
          <Select.Option key={record.value} value={record.value}>
            {record.label}
          </Select.Option>
        ))}
      </Select>
    );
  }
}

export default function SelectTag({ name, value, onChange, options }) {
  return (
    <SelectTagComponent
      value={value}
      onChange={val => {
        onChange(name, val);
      }}
      options={options}
    />
  );
}
