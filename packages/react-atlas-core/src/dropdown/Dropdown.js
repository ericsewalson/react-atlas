/*
Dropdown inspired and mostly taken from:
react-simple-dropdown
https://github.com/Fauntleroy/react-simple-dropdown
Copyright (c) 2015, Timothy Kempf <tim@kemp59f.info>
*/

import React, { cloneElement, Component, PropTypes } from "react";
import cx from 'classNames';
import DropdownTriggerCore from "./index";
import DropdownContentCore from "./index";
import { findDOMNode } from "react-dom";

/**
 * Simple Composable Dropdown Component that wraps DropdownTrigger and DropdownContent components. Primarily useful for Navigational dropdowns, not form select dropdowns.
 */
class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "active": false
    };
  }

  componentDidMount() {
    window.addEventListener("click", this._onWindowClick);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this._onWindowClick);
  }

  _onWindowClick = event => {
    const dropdown_element = findDOMNode(this);
    if (
      event.target !== dropdown_element &&
        !dropdown_element.contains(event.target) &&
        this._isActive()
    ) {
      this._hide();
    }
  };

  _onToggleClick = event => {
    event.preventDefault();
    if (this._isActive()) {
      this._hide();
    } else {
      this._show();
    }
  };

  _isActive = () => {
    return typeof this.props.active === "boolean"
      ? this.props.active
      : this.state.active;
  };

  _hide = () => {
    this.setState({
      "active": false
    });
    if (this.props.onHide) {
      this.props.onHide();
    }
  };

  _show = () => {
    this.setState({
      "active": true
    });
    if (this.props.onShow) {
      this.props.onShow();
    }
  };

  render() {
    const { children, className, ...props } = this.props;

    // create component classes
    const active = this._isActive();
    const classes = cx(
      {
        "container": true
      }
    );

    // stick callback on trigger element
    const bound_children = React.Children.map(children, child => {
      if (child.type.displayName === "DropdownTrigger") {
        child = cloneElement(child, {
          "onClick": this._onToggleClick
        });
      } else if (child.type.displayName === "DropdownContent") {
        child = cloneElement(child, {
          active
        });
      }
      return child;
    });

    return (
      <div {...props} className={className} styleName={classes}>
        {bound_children}
      </div>
    );
  }
}

Dropdown.defaultProps = {
  "className": ""
};

Dropdown.propTypes = {
  "active": PropTypes.bool,
  "onHide": PropTypes.bool,
  "onShow": PropTypes.bool,
  "children": PropTypes.node,
  "className": PropTypes.string
};

Dropdown.styleguide = {
  "category": "Navigation",
  "index": "5.2",
  "wrappedExample": true,
  "example": 
    `
// Dropdown Dummy Data {
var countries = [
  { value: 'EN-gb', label: 'England'},
  { value: 'ES-es', label: 'Spain'},
  { value: 'TH-th', label: 'Thailand'},
  { value: 'EN-en', label: 'USA'},
  { value: 'FR-fr', label: 'France'}
];
// }
// Internal Methods {
class DropdownExample extends React.Component {

  handleChange = (dropdown, value) => {
    const newState = {};
    newState[dropdown] = value;
    this.setState(newState);
  };

  render () {
// }
    return (
      <section>
        <h5>Dropdown</h5>
        <p>lorem ipsum...</p>

        <Dropdown>
          <DropdownTrigger>
            <Button>Dropdown Button</Button>
          </DropdownTrigger>
          <DropdownContent>
            <DropdownList>
              {countries.map((country, idx) => (
                <DropdownListItem key={idx}>{country.label}</DropdownListItem>
              ))}
            </DropdownList>
          </DropdownContent>
        </DropdownCore>
      </section>
    );
// Mount Component {
  }
}
ReactDOM.render(<DropdownExample/>, mountNode);
// }
`
  
};

export default Dropdown;
