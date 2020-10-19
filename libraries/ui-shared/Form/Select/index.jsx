import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Chevron from '../../icons/ChevronIcon';
import FormElement from '../../FormElement';
import styles from './style';

/**
 * A component that provides a styled select for user input in material design.
 */
class Select extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    errorText: PropTypes.node,
    isControlled: PropTypes.bool,
    label: PropTypes.node,
    onChange: PropTypes.func,
    options: PropTypes.shape(),
    placeholder: PropTypes.node,
    translateErrorText: PropTypes.bool,
    value: PropTypes.string,
  };

  static defaultProps = {
    className: '',
    errorText: '',
    isControlled: false,
    placeholder: '',
    label: '',
    onChange: () => {},
    options: {},
    translateErrorText: true,
    value: '',
    disabled: false,
  };

  /**
   * Creates a new text field component.
   * @param {Object} props The component properties.
   */
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      isFocused: false,
    };
  }

  /**
   * Update state with new props.
   * @param {Object} nextProps The new props.
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value,
    });
  }

  /**
   * @param {string} value The entered text.
   */
  handleChange = ({ target }) => {
    if (!this.props.isControlled) {
      this.setState({ value: target.value });
    }
    this.props.onChange(target.value);
  };

  /**
   * @param {boolean} isFocused focused
   */
  handleFocusChange = (isFocused) => {
    this.setState({ isFocused });
  };

  /**
   * @return {JSX}
   */
  render() {
    const {
      name, options, translateErrorText, disabled,
    } = this.props;
    return (
      <FormElement
        className={this.props.className}
        placeholder={this.props.placeholder}
        htmlFor={name}
        label={this.props.label}
        errorText={this.props.errorText}
        translateErrorText={translateErrorText}
        isFocused={this.state.isFocused}
        hasValue={!!this.state.value || options[''].length}
        hasPlaceholder={!disabled || this.state.value !== ''}
        disabled={disabled}
      >
        <select
          id={this.props.name}
          name={this.props.name}
          onChange={this.handleChange}
          onFocus={() => this.handleFocusChange(true)}
          onBlur={() => this.handleFocusChange(false)}
          value={this.state.value}
          className={classNames(styles.select, 'select')}
          disabled={disabled}
        >
          {
            Object.keys(options).map(key => (
              <option className="option" value={key} key={`${name}_${key}`}>{options[key]}</option>
            ))
          }
        </select>
        <Chevron className={styles.chevron} />
      </FormElement>
    );
  }
}

export default Select;
