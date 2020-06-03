import React, { Component } from 'react';
import FormRender from 'form-render/lib/antd';
import SelectTag from './SelectTag';
import FormButton from './FormButton';

class FormRenderComponent extends Component {
  onChange = value => {
    const { onChange } = this.props;
    if (onChange) {
      const {
        propsSchema: { defaultValue: propsDefault },
      } = this.props;
      const { defaultValue } = value;
      if (
        !(
          propsDefault &&
          propsDefault['ui:widget'] &&
          propsDefault['ui:widget'] === 'button'
        )
      ) {
        onChange(defaultValue);
      }
    }
  };

  render() {
    const { propsSchema, value } = this.props;
    return (
      <div>
        <FormRender
          onChange={this.onChange}
          propsSchema={propsSchema}
          column={1}
          displayType="row"
          formData={{
            defaultValue: value,
            required: false,
          }}
          widgets={{ tag: SelectTag, button: FormButton }}
        />
      </div>
    );
  }
}
export default FormRenderComponent;
