import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import utils from '../utils/utils';

const factory = (Checkbox) => {
  class TableRow extends Component {
    static propTypes = {
      data: PropTypes.object,
      index: PropTypes.number,
      model: PropTypes.object,
      onChange: PropTypes.func,
      onSelect: PropTypes.func,
      selectable: PropTypes.bool,
      selected: PropTypes.bool,
      theme: PropTypes.shape({
        editable: PropTypes.string,
        row: PropTypes.string,
        selectable: PropTypes.string,
        selected: PropTypes.string
      })
    };

    handleInputChange = (index, key, type, event) => {
      const value = type === 'checkbox' ? event.target.checked : event.target.value;
      const onChange = this.props.model[key].onChange || this.props.onChange;
      onChange(index, key, value);
    };

    renderSelectCell () {
      if (this.props.selectable) {
        return (
          <td className={this.props.theme.selectable}>
            <Checkbox checked={this.props.selected} onChange={this.props.onSelect} />
          </td>
        );
      }
    }

    renderCells () {
      return Object.keys(this.props.model).map((key) => {
        return <td key={key}>{this.renderCell(key)}</td>;
      });
    }

    renderCell (key) {
      const value = this.props.data[key];

      // if the value is a valid React element return it directly, since it
      // cannot be edited and should not be converted to a string...
      if (React.isValidElement(value)) { return value; }

      const onChange = this.props.model[key].onChange || this.props.onChange;
      if (onChange) {
        return this.renderInput(key, value);
      } else if (value) {
        if (this.props.model[key].render) {
          var disabled = true;
          return this.props.model[key].render(this.props.index, key, value, disabled);
        }
        return value.toString();
      }
    }

    renderInput (key, value) {
      const index = this.props.index;
      const inputType = utils.inputTypeForPrototype(this.props.model[key].type);
      if (this.props.model[key].render) {
          var disabled = false;
          return this.props.model[key].render(index, key, value, disabled);
      }
      const inputValue = utils.prepareValueForInput(value, inputType);
      const checked = inputType === 'checkbox' && value ? true : null;
      return (
        <input
          checked={checked}
          onChange={this.handleInputChange.bind(null, index, key, inputType)}
          type={inputType}
          value={inputValue}
        />
      );
    }

    render () {
      const className = classnames(this.props.theme.row, {
        [this.props.theme.editable]: this.props.onChange,
        [this.props.theme.selected]: this.props.selected
      });

      return (
        <tr data-react-toolbox-table='row' className={className}>
          {this.renderSelectCell()}
          {this.renderCells()}
        </tr>
      );
    }
  }

  return TableRow;
};

export default factory;
