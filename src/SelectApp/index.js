/* eslint-disable global-require */
import React, { Component } from 'react';
import { Row, Tooltip, Badge } from 'antd';
import styles from './index.less';

const Image = props => {
  const { alt } = props;

  return <img alt={alt} {...props} />;
};
class Index extends Component {
  state = {
    value: '',
  };

  componentDidMount() {
    const { defaultValue } = this.props;
    this.setState({
      value: defaultValue,
    });
  }

  onChange = newValue => {
    const { value, onChange } = this.props;
    if (typeof value === 'undefined') {
      if (this.state.value !== value) {
        this.setState(
          {
            value: newValue,
          },
          () => {
            if (onChange) onChange(newValue);
          },
        );
      }
    } else if (onChange) {
      if (value !== newValue) {
        onChange(newValue);
      }
    }
  };

  renderAppInfo = appList => {
    const dir = {
      'turnover-box': {
        icon: 'tote.png',
        style: {
          height: '100%',
          display: 'block',
          verticalAlign: 'middle',
          margin: '0 auto',
        },
        color: 'linear-gradient(rgb(228, 148, 92), rgba(181, 22, 22, 0.93))',
        className: 'selectAppTote',
      },
      'latent-lifting': {
        icon: 'agv.png',
        style: {
          height: '70%',
          display: 'block',
          verticalAlign: 'middle',
          margin: '8px auto',
        },
        color: 'linear-gradient(rgb(142, 138, 138), rgba(107, 109, 130, 0.79))',
        className: 'selectAppLatent',
      },
      mixrobot: {
        icon: 'pick.png',
        style: {
          height: '100%',
          display: 'block',
          verticalAlign: 'middle',
          margin: '0 auto',
        },
        color: 'linear-gradient(rgb(141, 220, 91), rgb(12, 62, 0))',
        className: 'selectAppMix',
      },
    };
    const { value: stateValue } = this.state;

    const { value: propsValue } = this.props;

    const value = propsValue || stateValue;
    return (
      <div>
        {appList.map(appInfo => {
          const { key: name, value: url } = appInfo;
          const { icon, style, color, className } = dir[name];
          let img = null;
          if (icon != null) {
            img = (
              <Image style={{ ...style }} src={require(`./public/${icon}`)} />
            );
          }
          if (name === 'MixRobot') {
            return (
              <span key={name} style={{ marginLeft: 20 }}>
                <Tooltip placement="topLeft" title={name}>
                  <Badge dot count={value === name ? 1 : 0}>
                    <span
                      className={styles.selectAppMix}
                      value="MixRobot"
                      // padding: 3px;display: inline-block;c: linear-gradient(#4f97dc, #001529);width: 40px;height: 40px;border-radius: 4px;cursor: pointer
                      style={{
                        padding: 3,
                        display: 'inline-block',
                        background: 'linear-gradient(#4f97dc, #001529)',
                        width: 40,
                        height: 40,
                        borderRadius: 4,
                        cursor: 'pointer',
                      }}
                    >
                      <span
                        onClick={() => {
                          this.onChange(name);
                        }}
                        style={{
                          height: 40,
                          width: 34,
                          display: 'table',
                          color: ' #aed7ff',
                          fontSize: 30,
                          fontWeight: 'bold',
                          margin: 'auto',
                          textAlign: 'center',
                          lineHeight: '34px',
                        }}
                      >
                        M
                      </span>
                    </span>
                  </Badge>
                </Tooltip>
              </span>
            );
          }
          return (
            <span key={name} style={{ marginLeft: 20 }}>
              <Tooltip placement="topLeft" title={name}>
                <Badge dot count={value === name ? 1 : 0}>
                  <span
                    onClick={() => {
                      this.onChange(name);
                    }}
                    className={styles[className]}
                    value={name}
                    style={{
                      // border: value == name ? '2px solid green' : '',
                      padding: 3,
                      display: 'inline-block',
                      backgroundImage: color,
                      width: 40,
                      height: 40,
                      borderRadius: 4,
                      cursor: 'pointer',
                    }}
                  >
                    {img}
                  </span>
                </Badge>
              </Tooltip>
            </span>
          );
        })}
      </div>
    );
  };

  render() {
    const { appList } = this.props;
    return (
      <Row>
        <div
          style={{
            display: 'inline-block',
            position: 'absolute',

            width: 500,
            top: 10,
          }}
        >
          {this.renderAppInfo(appList)}
        </div>
      </Row>
    );
  }
}
export default Index;
