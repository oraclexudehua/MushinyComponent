import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Select, Input, Button, Col } from 'antd';
import SystemParams from '../../../es/SystemParams/index';
import SelectApp from '../../../es/SelectApp/index';
import axios from 'axios';

// const { DynamicFormCol } = DynamicForm;
export default class BasicLayout extends Component {
  state = {
    list: [],
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
    return (
      <div>
        {/* <SelectApp
          onChange={value => {
            console.log(value);
          }}
               wrapperCol={{ span: 18 }}
                        labelCol={{ span: 6 }}
          defaultValue={'MixRobot'}
          appList={[
            { key: 'turnover-box', value: 'http://turnover-box-wcs-dev.mushiny.com' },
            { key: 'latent-lifting', value: 'http://latent-lifting-wcs-dev.mushiny.com' },
            { key: 'MixRobot', value: 'http://mixrobot-dev.mushiny.com/' },
          ]}
        /> */}
        <Card>
          <SystemParams
            loading={false}
            submit={value => {
              console.log(value);
            }}
            formItemWapper={{ labelCol: { span: 10 }, wrapperCol: { span: 14 } }}
            systemFormData={[
              {
                name: '交通管控',
                tabContent: [
                  {
                    groupName: '安全设置',
                    group: [
                      {
                        name: '安全距离(mm)',
                        key: 'secureDistance',
                        type: 'password',
                        description: '小于安全距离的车将被严格管控（单位mm）',
                        readonly: false,
                        isRequired: false,
                        defaultValue: 8000.0,
                        labelCol: 90,
                      },
                      {
                        name: '预先锁提前量',
                        key: 'preLockRotation',
                        type: 'number',
                        description: '提前几个二维码标记路径上的旋转点',
                        readonly: false,
                        isRequired: false,
                        defaultValue: 3.0,
                      },
                      {
                        name: '最大锁格数',
                        key: 'maxLockCount',
                        type: 'number',
                        description: '小车行使过程中锁住点位的最大数量',
                        readonly: false,
                        isRequired: false,
                        defaultValue: 5.0,
                      },
                    ],
                  },
                  {
                    groupName: '路径规划',
                    group: [
                      {
                        name: '超时重算(ms)',
                        key: 'noChangeTimeout',
                        type: 'number',
                        description: '请输入等待多少秒后重算',
                        readonly: false,
                        isRequired: false,
                        defaultValue: 30000.0,
                      },
                      {
                        name: '超时错误(ms)',
                        key: 'agvNochangeLockTimeout',
                        type: 'number',
                        description: '请输入等待多少秒后小车变错误状态',
                        readonly: false,
                        isRequired: false,
                        defaultValue: 120000.0,
                      },
                      {
                        name: '重算车型',
                        key: 'agvType',
                        type: 'checkbox',
                        description: '参与超时重算的车型',
                        readonly: false,
                        isRequired: true,
                        items: [
                          { label: '潜伏车', value: 'LatentLifting' },
                          { label: '料箱车', value: 'Tote' },
                        ],
                      },
                      {
                        name: '重算车状态',
                        key: 'agvStatus',
                        type: 'checkbox',
                        description: '参与超时重算的车状态',
                        readonly: false,
                        isRequired: true,
                        items: [{ label: '空车', value: '1' }, { label: '重车', value: '2' }],
                      },
                    ],
                  },
                ],
              },
              { name: '报表参数', tabContent: [] },
              {
                name: '任务参数',
                tabContent: [
                  {
                    groupName: '个人信息',
                    group: [
                      {
                        name: 'DateTime',
                        key: 'dateTime',
                        type: 'dateTime',
                        description: '描述文字',
                        readonly: false,
                        isRequired: false,
                      },
                      {
                        name: 'Time',
                        key: 'time',
                        type: 'time',
                        description: '描述文字',
                        readonly: false,
                        isRequired: false,
                      },
                      {
                        name: 'Rang',
                        key: 'Rang',
                        type: 'range',
                        description: '描述文字',
                        readonly: false,
                        isRequired: false,
                      },
                      {
                        name: 'Checkbox',
                        key: 'agvType',
                        type: 'checkbox',
                        description: '描述文字',
                        readonly: false,
                        isRequired: true,
                        items: [{ label: '重车', value: '1' }, { label: '潜伏车', value: '2' }],
                      },
                      {
                        name: 'Multiple',
                        key: 'taskType',
                        type: 'multiple',
                        description: '描述文字',
                        readonly: false,
                        isRequired: false,
                        items: [{ label: '充电', value: '1' }, { label: '空跑', value: '2' }],
                      },
                      {
                        name: 'Boolean',
                        key: 'isStop',
                        type: 'boolean',
                        readonly: false,
                        isRequired: false,
                      },
                      {
                        name: 'Tag',
                        key: 'tag',
                        type: 'tag',
                        readonly: false,
                        isRequired: false,
                        items: [{ label: '充电', value: '1' }, { label: '空跑', value: '2' }],
                      },
                      {
                        name: 'Button',
                        key: 'BUTTON',
                        type: 'button',
                        readonly: false,
                        isRequired: false,
                        params: 'wcs',
                        defaultValue: '测试',
                      },
                    ],
                  },
                  {
                    groupName: '测试',
                    group: [
                      {
                        name: 'String',
                        key: 'name',
                        type: 'string',
                        description: '描述文字',
                        readonly: false,
                        isRequired: false,
                        defaultValue: ['12', '13'],
                        format: '',
                        formatMessage: '请输入手机号',
                      },
                      {
                        name: 'Number',
                        key: 'sex',
                        type: 'number',
                        description: '描述文字',
                        readonly: false,
                        isRequired: false,
                        defaultValue: 1.0,
                      },
                      {
                        name: 'Date',
                        key: 'date',
                        type: 'date',
                        description: '描述文字',
                        readonly: false,
                        isRequired: false,
                      },
                      {
                        name: 'Radio',
                        key: 'radio',
                        type: 'radio',
                        readonly: false,
                        isRequired: false,
                        items: [{ label: '重车', value: '1' }, { label: '潜伏车', value: '2' }],
                      },
                    ],
                  },
                ],
              },
              {
                name: 'Exhibition',
                tabContent: [
                  {
                    groupName: '显示设置',
                    group: [
                      {
                        name: '采样频率(单位: 分钟)',
                        key: 'rateMinuteSpan',
                        type: 'number',
                        description: '请输入每隔多少分钟采样',
                        readonly: false,
                        isRequired: false,
                        defaultValue: 5.0,
                      },
                      {
                        name: 'WMS API',
                        key: 'WMS_URL',
                        type: 'string',
                        description: 'WMS请求链接',
                        readonly: false,
                        isRequired: false,
                        defaultValue: '',
                      },
                      {
                        name: '用户名',
                        key: 'username',
                        type: 'string',
                        description: '请求 WMS API 时使用的用户名',
                        readonly: false,
                        isRequired: true,
                        defaultValue: '',
                      },
                      {
                        name: '密码',
                        key: 'password',
                        type: 'string',
                        description: '请求 WMS API 时使用的用户名密码',
                        readonly: false,
                        isRequired: true,
                        defaultValue: '',
                      },
                      {
                        name: '目标仓库ID',
                        key: 'warehouseId',
                        type: 'string',
                        description: '目标仓库ID',
                        readonly: false,
                        isRequired: true,
                        defaultValue: '',
                      },
                    ],
                  },
                ],
              },
            ]}
          />
        </Card>
      </div>
    );
  }
}
