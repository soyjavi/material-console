import React from 'react';
import Dropdown from '../../components/dropdown';
import style from '../style.module.css';

const countries = [
  { value: 'EN-gb', label: 'England', img: 'http://' },
  { value: 'ES-es', label: 'Spain', img: 'http://' },
  { value: 'TH-th', label: 'Thailand', img: 'http://' },
  { value: 'EN-en', label: 'USA', img: 'http://' },
  { value: 'FR-fr', label: 'France', img: 'http://' },
];

class DropdownTest extends React.Component {
  state = {
    dropdown4: 'TH-th',
    dropdown1: null, 
    dropdown5: null,
  };

  handleChange = (dropdown, value) => {
    console.log('selected', value);
    const newState = {};
    newState[dropdown] = value;
    this.setState(newState);
  };

  customDropdownItem(data) {
    return (
      <div className={style.dropdownTemplate}>
        <img className={style.dropdownTemplateImage} src={data.img} />
        <div className={style.dropdownTemplateContent}>
          <strong>{data.label}</strong>
          <small>{data.value}</small>
        </div>
      </div>
    );
  }
  handleSubmit = (event) => {
    event.preventDefault(); 
    const { dropdown1, dropdown4, dropdown5 } = this.state;
    if (!dropdown1) {
      alert('Please select a country for Dropdown 1.');
    } else if (!dropdown4) {
      alert('Please select a country for Dropdown 4.');
    } else if (!dropdown5) {
      alert('Please select a country for Dropdown 5.');
    } else {
      console.log('Form submitted successfully!');
      
    }
  };

  render() {
    return (
      <section>
        <h5>Dropdown</h5>
        <p>lorem ipsum...</p>
        <form onSubmit={this.handleSubmit}> 
           <Dropdown
          label="Country"
          ref="dropdown1"
          onChange={this.handleChange.bind(this, 'dropdown1')}
          source={countries}
          template={this.customDropdownItem}
          value={this.state.dropdown1}
           />

          <Dropdown
          label="Country"
          ref="dropdown4"
          onChange={this.handleChange.bind(this, 'dropdown4')}
          source={countries}
          value={this.state.dropdown4}
          />

          <Dropdown
          disabled
          ref="dropdown3"
          label="Country"
          onChange={this.handleChange.bind(this, 'dropdown3')}
          source={countries}
         />

         <Dropdown
          label="Country"
          ref="dropdown5"
          onChange={this.handleChange.bind(this, 'dropdown5')}
          source={countries}
          value={this.state.dropdown5}
          required
         />
         <button type="submit"></button>
        </form>
      </section>
    );
  }
}

export default DropdownTest;
