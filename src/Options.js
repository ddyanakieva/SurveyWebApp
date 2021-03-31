import React, {Component} from "react";
import './App.css';

// this.props.options returns all options

class Options extends Component {

  constructor(){
    super();

    this.state = {
      selectedOption: "",
      selectedOptions: []
    };
  }
  
  handleOptionChange = (option) => {
    this.props.sendSelectedOption(option);
    this.setState({
      selectedOption: option,
    });
  }

  handleMultipleOptions = (option) => {
    let options = this.state.selectedOptions;
    if (options.includes(option)) options.splice(options.indexOf(option),1);
    else options.push(option)

    this.setState({
      selectedOptions: options
    })

    options.length === 0 ? this.props.sendSelectedOption(undefined) : this.props.sendSelectedOption(options);
  }

  handleTextAreaChange = (e) => {
    this.props.sendSelectedOption(e.target.value);
    this.setState({
      selectedOption: e.target.value
    });
  }

  makeRadio(){
    let options = [];
    this.props.element.options.map((option,i) => 
      options.push(
        <div className={`answer-wrapper ${this.state.selectedOption === option ? ' answer-clicked' : ""}`} onClick={() => this.handleOptionChange(option)} key={i}>
            <input type="radio" 
              name={this.props.element.name} 
              value={option} 
              checked={this.state.selectedOption === option}
              onChange={() => this.handleOptionChange(option)}/>
            <label>{option}</label><br />
        </div>
      )
    );
    return options;
  }

  makeCheckbox(){
    let options = [];
    this.props.element.options.map((option,i) => 
      options.push(
        <div className={`answer-wrapper ${this.props.element.name} ${this.state.selectedOptions.includes(option) ? ' answer-clicked' : ""}`} onClick={() => this.handleMultipleOptions(option)} key={i}>
            <input type="checkbox" 
              name={this.props.element.name} 
              value={option} 
              checked={this.state.selectedOptions.includes(option)}
              onChange={() => this.handleMultipleOptions(option)}
              onClick={() => this.handleMultipleOptions(option)}/>
            <label>{option}</label><br />
        </div>
      )
    );
    return options;
  }

  makeTextBox(){
    return <textarea rows="5" key={this.props.key_} onChange={this.handleTextAreaChange}></textarea>;
  }

  addNewSection(){
    return <hr className="solid" key={this.props.key_}></hr>
  }

  render() { 
    let inputType = this.props.input;
    
    let options = 
    inputType === "radio" ? this.makeRadio() 
    : inputType === "checkbox" ? this.makeCheckbox() 
    : inputType === "section" ? this.addNewSection()
    : this.makeTextBox()

    return(
      <div className="answers">
        {options}
      </div>
    );
  }

} 
export default Options;