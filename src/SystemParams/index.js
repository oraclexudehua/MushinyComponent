import React, { PureComponent } from 'react';
import {
  Spin,
  Card,
  Tabs,
  Button,
  message,
  Form,
  Row,
  Col,
  Tooltip,
  Icon,
  Badge,
} from 'antd';
import SelectTag from './component/SelectTag';
import FormButton from './component/FormButton';
import FormRenderComponent from './component/FormRender';
import styles from './SystemParamsManager.less';

const uiSchema = {};
const { TabPane } = Tabs;

class SystemParams extends PureComponent {
  state = { error: {} };

  transformSystemJson = (type, json, label) => {
    const {
      readonly,
      isRequired,
      format,
      items: arrayItems,
      extraInfo,
      defaultValue: initialValue,
      params,
    } = json;

    const result = {
      propsSchema: {
        type: 'object',
        properties: {
          required: [],
        },
      },
      formData: {},
    };
    let defaultValue = { 'ui:readonly': false, type: 'string' };
    if (type == 'string') {
      defaultValue.type = 'string';
    } else if (type == 'multiple') {
      defaultValue.type = 'array';
      const enumNames = [];
      const enums = [];
      arrayItems.map(({ label, value }) => {
        enumNames.push(label);
        enums.push(value);
      });
      defaultValue.enum = enums;
      defaultValue.enumNames = enumNames;
      defaultValue['ui:widget'] = 'multiSelect';
    } else if (type == 'number') {
      defaultValue.type = 'number';
    } else if (type == 'date') {
      defaultValue.format = 'date';
    } else if (type == 'dateTime') {
      defaultValue.format = 'dateTime';
    } else if (type == 'time') {
      defaultValue.format = 'time';
    } else if (type == 'radio') {
      const enumNames = [];
      const enums = [];
      arrayItems.map(({ label, value }) => {
        enumNames.push(label);
        enums.push(value);
      });
      defaultValue.enum = enums;
      defaultValue.enumNames = enumNames;
      defaultValue['ui:widget'] = 'radio';
    } else if (type == 'checkbox') {
      defaultValue.type = 'array';
      const items = {
        type: 'string',
      };
      const enumNames = [];
      const enums = [];
      arrayItems.map(({ label, value }) => {
        enumNames.push(label);
        enums.push(value);
      });
      defaultValue.enum = enums;
      defaultValue.enumNames = enumNames;
      defaultValue.items = items;
    } else if (type == 'boolean') {
      defaultValue.type = 'boolean';
      defaultValue['ui:widget'] = 'switch';
    } else if (type == 'tag') {
      defaultValue.type = 'tag';
      defaultValue['ui:widget'] = 'tag';
      if (arrayItems) {
        defaultValue['ui:options'] = arrayItems;
      }
    } else if (type == 'button') {
      defaultValue['ui:widget'] = 'button';
      defaultValue['ui:options'] = params;
    } else if (type == 'range') {
      defaultValue.type = 'range';
      defaultValue.format = 'date';
    }
    if (readonly) {
      defaultValue['ui:readonly'] = true;
    }
    if (initialValue != null) {
      defaultValue['default'] = initialValue;
    }
    if (extraInfo) {
      defaultValue = {
        ...extraInfo,
        defaultValue,
      };
    }
    if (isRequired) {
      result.propsSchema.properties.required.push('defaultValue');
    }
    result.propsSchema.properties.defaultValue = defaultValue;
    return result;
  };

  transForm = json => {
    const newData = json.map(record => {
      const { tabContent } = record;
      return {
        ...record,
        content: tabContent.map(object => {
          const { group } = object;
          return {
            ...object,
            group: group.map(form => {
              const {
                key,
                description,
                type,
                name,
                isRequired,
                format,
                formatMessage,
                isRequiredMessage,
                defaultValue,
              } = form;
              return {
                schema: this.transformSystemJson(type, form, name),
                field: key,
                desc: description,
                isRequired,
                format,
                name,
                formatMessage,
                defaultValue,
                isRequiredMessage,
                type,
              };
            }),
          };
        }),
      };
    });
    return newData;
  };

  renderTabContent = content => {
    return (
      <FormRenderComponent
        propsSchema={content.propsSchema}
        uiSchema={uiSchema}
        column={1}
        displayType="row"
        widgets={{ tag: SelectTag, button: FormButton }}
        onValidate={this.setValid}
      />
    );
  };

  renderGroup = record => {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return record.map(({ group, groupName }) => {
      return (
        <Col style={{ marginTop: 40 }} key={groupName}>
          <Card>
            <div className={styles.codeBoxTitle}>{groupName}</div>
            {group.map(
              ({
                field,
                schema,
                desc,
                isRequired,
                isRequiredMessage,
                format,
                formatMessage,
                name,
                type,
                defaultValue,
              }) => {
                const rules = [];
                if (isRequired) {
                  rules.push({
                    required: true,
                    message: isRequiredMessage,
                  });
                }
                if (format) {
                  const reg = new RegExp(format);
                  rules.push({
                    pattern: reg,
                    message: formatMessage,
                  });
                }
                return (
                  <Col
                    style={{ minHeight: 66 }}
                    key={field}
                    xxl={{ span: 8 }}
                    sm={{ span: 24 }}
                    xl={{ span: 12 }}
                  >
                    <Col span={22}>
                      <Form.Item
                        wrapperCol={{ span: 18 }}
                        labelCol={{ span: 6 }}
                        label={name}
                        key={field}
                      >
                        {type === 'button' ? (
                          <FormButton value={defaultValue} />
                        ) : (
                          getFieldDecorator(field, {
                            rules,
                          })(this.renderTabContent(schema))
                        )}
                      </Form.Item>
                    </Col>
                    {desc ? (
                      <Col
                        span={2}
                        style={{ textAlign: 'center', lineHeight: '52px' }}
                      >
                        <Tooltip placement="top" title={desc}>
                          <Icon
                            style={{
                              lineHeight: '40px',
                              fontSize: 20,
                              cursor: 'pointer',
                            }}
                            type="question-circle"
                          />
                        </Tooltip>
                      </Col>
                    ) : null}
                  </Col>
                );
              },
            )}
          </Card>
        </Col>
      );
    });
  };

  renderTabPane = record => {
    const { error } = this.state;
    return record.map((obj, index) => {
      const { name, content } = obj;
      return (
        <TabPane
          key={index}
          tab={
            <Badge count={error[index] ? error[index] : 0} dot>
              {name}
            </Badge>
          }
        >
          <Row className={styles.formItem} gutter={16}>
            <Form>{this.renderGroup(content)}</Form>
          </Row>
        </TabPane>
      );
    });
  };

  refresh = () => {
    const { refresh } = this.props;
    if (refresh) {
      refresh();
    }
  };

  handleError = errors => {
    const errorKey = Object.keys(errors);
    const dir = {};
    const { systemFormData } = this.props;
    systemFormData.forEach((record, index) => {
      const { tabContent } = record;
      tabContent.forEach(({ group }) => {
        group.forEach(({ key }) => {
          dir[key] = index;
        });
      });
    });
    const result = {};
    errorKey.forEach(error => {
      const key = dir[error];
      if (result[key] == null) {
        result[key] = 1;
      } else {
        result[key] += 1;
      }
    });
    this.setState({
      error: result,
    });
  };

  commit = () => {
    const {
      form: { validateFields },
    } = this.props;
    validateFields((error, value) => {
      this.handleError(error);
      if (error !== null) {
        console.log(error);
        message.warn('表单未完成, 请检查必填项');
      } else {
        const { submit } = this.props;
        if (submit) {
          submit(value);
        }
        // dispatch({ type: 'system/updateSystemParams', payload: value });
      }
    });
  };

  render() {
    const { systemFormData, loading } = this.props;
    const data = this.transForm(systemFormData);
    return (
      <div>
        <Spin size="large" spinning={loading}>
          <Card style={{ minHeight: 600 }}>
            <Tabs
              onChange={() => {}}
              defaultActiveKey="2"
              type="card"
              tabBarExtraContent={
                <span>
                  <Button onClick={this.refresh}>刷新</Button>
                  <Button
                    onClick={this.commit}
                    style={{ marginLeft: 10 }}
                    type="primary"
                  >
                    保存
                  </Button>
                </span>
              }
            >
              {this.renderTabPane(data)}
            </Tabs>
          </Card>
        </Spin>
      </div>
    );
  }
}
// const systemParams = new SystemParams();
export default Form.create()(SystemParams);
// export default SystemParams;
