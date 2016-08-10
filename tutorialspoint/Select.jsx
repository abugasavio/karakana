import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.updateCity = this.updateCity.bind(this);
    this.state = {options: []};
  }

  updateCity(e) {
    let country = e.target.value;
    this.setState({options: [<option key="1">Savio</option>, <option key="2">Abuga</option>]})
  }

  render() {
    return (
      <div>
        <Country updateCity={this.updateCity}/>
        <City options={this.state.options} />
      </div>
    );
  }
}


class Country extends Component {

  constructor(props) {
    super(props);
    this.createOptions = this.createOptions.bind(this);
    this.state = {'options': []}
  }

  createOptions() {
      let coutries = [{'id': '1', 'name': 'Kenya'}, {'id': '2', 'name': 'Uganda'}]

      for (var i = 0; i < coutries.length; i++) {
        this.state.options.push(<option key={coutries[i]['id']} value={coutries[i]['name']}>{coutries[i]['name']}</option>);
      }
      this.forceUpdate();
    }

    componentDidMount() {
      this.createOptions();
    }


  render() {

    return (
      <select onChange={this.props.updateCity}>
        {this.state.options}
      </select>
    );
  }
}


class City extends Component {
  render() {
    return (
      <select>
        {this.props.options}
      </select>
    );
  }
}

export default Form;
