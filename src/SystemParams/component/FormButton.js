import React, { Component, memo } from 'react';
import { Button } from 'antd';
import request from '@/utils/request';

// class FormButtonComponent extends Component {
//   render() {
//     const { value } = this.props;
//     return <Button onClick={() => {

//     }}>{value}</Button>;
//   }
// }

const FormButtonComponent = memo(function FormButton({ value, api, extra }) {
  return <Button onClick={() => {}}>{value}</Button>;
});

export default function FormButton({ value, options = {} }) {
  return <FormButtonComponent value={value} params={options} />;
}
