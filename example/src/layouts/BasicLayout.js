import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Select, Input, Button, Col } from 'antd';
import SystemParams from '../../../es/SystemParams/index';
import SelectApp from '../../../es/SelectApp/index';
import NewSelect from '../../../es/NewSelect';
import axios from 'axios';

// const { DynamicFormCol } = DynamicForm;
export default class BasicLayout extends Component {
  state = {
    list: [],
    value: [],
  };

  componentDidMount() {
    // const _this = this;
    // axios.get('http://127.0.0.1:3000/getList').then(function(response) {
    //   // handle success
    //   _this.setState({
    //     list: response.data,
    //   });
    //   // console.log(response);
    // });
  }

  renderOption = record => {
    return record.map(record => {
      return <Select.Option value={record.age}>{record.name}</Select.Option>;
    });
  };
  render() {
    const { value } = this.state;
    return (
      <div>
        <NewSelect
          onChange={value => {
            this.setState({ value });
          }}
          value={value}
        />
        <Card />
      </div>
    );
  }
}
