import React, {Component} from "react";
import './App.css';
import Survey from './Survey.js';
import Forms from './Forms.js';

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentSection: 1,
      allQuestionsInSectionAnswered: false,
      alert: false,
      pilotRound: false,
      mainRound: true,
    }
    this.sections = {
      1:["participation", "PROCEED", true, ""],
      2:["intoduction","PROCEED", true, ""],
      3:["consent", "START", false, "Please, tick the check box if you would like to proceed"],
      4:["demographics","SUBMIT", false, "Please, answer all questions before submitting."],
      5:["feedback","SUBMIT", false, "Please, answer all questions before submitting."]
    }

    this.loadNextSection = this.loadNextSection.bind(this);
  }

  loadSurvey(type){
    return(
      <div>
        <Survey surveyToLoad={type} enableButton={(bool) => {this.setState({allQuestionsInSectionAnswered:bool})}} />      
      </div>
    );
  }  

  loadForm(type){
    return(
      <Forms type={type} proceed={(bool) => {this.setState({allQuestionsInSectionAnswered:bool})}}/>
    )
  }

  closeAlert = () =>{
    this.setState({
      alert:false,
    });
  }

  getSectionButtonBehaviour = () =>{
    let currSection = this.state.currentSection;
    if (this.sections[currSection+1] !== null){
      let bool = this.sections[currSection+1][2];
      return bool;
    }
    return;
  }

  loadNextSection = () =>{
    if (this.state.currentSection === 5) return;
    if (!this.state.allQuestionsInSectionAnswered){
      this.setState({
        alert:true,
      });
      return;
    }

    window.scrollTo({
      top:0, 
      left: 0,
      behavior: "smooth"
    });

    this.setState({
      currentSection: this.state.currentSection + 1,
      alert:false,
      allQuestionsInSectionAnswered: false,
    });
  }

  loadNextSection_= () => {
    window.scrollTo({
      top:0, 
      left: 0,
      behavior: "smooth"
    });

    this.setState({
      currentSection: this.state.currentSection + 1,
      allQuestionsInSectionAnswered: false,
    });
  }

  render() {
    let sectionNumber = this.state.currentSection;
    let section = this.sections[sectionNumber];
    // pilot round
    // main round
    return(
      <div className="body">
      <div className="outer-container">
        <div id="top-side"></div>
        <div id="container">
            <div id="title">
                {/* <p><i className="fas fa-fish"></i></p> */}
                <p style={{fontFamily: "'Press Start 2P', cursive", fontSize: "2rem", color: "white", paddingBottom: "5px"}}>SERIOUS GAMES</p>
                <p style={{color:"white"}}>for increasing awareness of phishing emails</p>
            </div>
            <div id="form-panel">
                {
                  sectionNumber === 1 ?
                  <div className="progress-section">                 
                      <p>Participation form</p>
                      <p>{sectionNumber}/5</p>
                  </div>
                  :
                  sectionNumber === 2 ?
                  <div className="progress-section">                 
                      <p>Introduction to the game</p>
                      <p>{sectionNumber}/5</p>
                  </div>
                  :
                  sectionNumber === 3 ?
                  <div className="progress-section">                 
                      <p>Consent form</p>
                      <p>{sectionNumber}/5</p>
                  </div>
                  :
                  sectionNumber > 3 ?
                  <div className="progress-section">                 
                      <p>Questionnaire</p>
                      <p>{sectionNumber}/5</p>
                  </div>
                  :
                  null
                }
                {
                  sectionNumber < 4 ?
                  this.loadForm(section[0])
                  :
                  this.loadSurvey(section[0])
                }
            </div>            
            <div className="alert" style={{display: `${this.state.alert ? "block" : "none"}`}}>
              <span className="closebtn" onClick={this.closeAlert}>&times;</span>
              <p>{section[3]}</p>
            </div>
        </div>  
      </div>
      <button className="info-button" aria-label="MoreInformation"> <i className="fas fa-question"></i> </button>
      <div className="button-wrapper">
        {
          !section[2] ?
        <button type="button" className={`submit-button ${this.state.allQuestionsInSectionAnswered ? null : "disabled"}`} aria-label="SubmitButton" onClick={this.loadNextSection}>
          {section[1]}
        </button>
        :
        <button type="button" className="submit-button" aria-label="SubmitButton" onClick={this.loadNextSection_}>
          {section[1]}
        </button>
        }
      </div>  
      </div>
    );
  }

} 
export default App;
