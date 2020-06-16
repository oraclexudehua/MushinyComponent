import React, { Component } from 'react';
import { Select, Popover, Divider, Icon, Empty } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import isEqual from 'fast-deep-equal';

const grid = 4;

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  borderRadius: 4,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
  width: 50,
  textAlign: 'center',
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: '100%',
});

class NewSelect extends Component {
  state = {
    value: [],
  };

  onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const { value: oldValue } = this.state;
    const value = reorder(
      oldValue,
      result.source.index,
      result.destination.index,
    );

    this.setState(
      {
        value,
      },
      () => {
        const { onChange } = this.props;
        if (onChange) {
          onChange(value);
        }
      },
    );
  };

  componentDidMount = () => {
    const { value: defaultValue } = this.props;
    this.setState({
      value: defaultValue,
    });
  };

  componentWillReceiveProps = nextpros => {
    const { value } = nextpros;
    const { value: currentValue } = this.state;
    if (!isEqual(currentValue, value)) {
      this.setState({
        value,
      });
    }
  };

  render() {
    const { value } = this.state;
    let content = null;
    if (value == null || value === '') {
      content = <Empty />;
    } else {
      content = (
        <div
          style={{ padding: '4px 8px', cursor: 'pointer' }}
          onMouseDown={e => e.preventDefault()}
        >
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {value.map((item, index) => (
                    <Draggable key={item} draggableId={item} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style,
                          )}
                        >
                          {item}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      );
    }

    return (
      <div>
        <Select
          style={{ width: 200 }}
          {...this.props}
          onChange={changeValue => {
            this.setState(
              {
                value: changeValue,
              },
              () => {
                const { onChange } = this.props;
                if (onChange) {
                  onChange(changeValue);
                }
              },
            );
          }}
          value={value}
          mode="tags"
        ></Select>

        <span style={{ marginLeft: 8 }}>
          <Popover trigger="click" placement="rightBottom" content={content}>
            <Icon type="sort-descending" />
          </Popover>
        </span>
      </div>
    );
  }
}
export default NewSelect;
