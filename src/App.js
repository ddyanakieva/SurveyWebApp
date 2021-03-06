import React, {Component} from "react";
import './App.css';
import Survey from './Survey.js';
import Forms from './Forms.js';
import Game from './Game.js';
import firebase from "firebase/app";
import "firebase/storage";

class App extends Component {
  constructor() {
    super();

    this.state = {
      userID: 0,
      currentSection: 1,
      allQuestionsInSectionAnswered: false,
      alert: false,      
      consentQData:"",
      demographicQData:"",
      feedbackQData:"",
      mainRoundPartAnswers:"",
    }

    this.id = "";

    this.sections = {
      1:["participation", "PROCEED", true, ""],
      2:["intoduction","PROCEED", true, ""],
      3:["consent", "START", false, "Please, tick the check box if you would like to proceed"],
      4:["demographics","SUBMIT", false, "Please, answer all questions before submitting."],
      5:["game","PROCEED", false, "You must complete the game round before proceeding."],
      6:["feedback","SUBMIT", false, "Please, answer all questions before submitting."],
      7:["end","", true, ""]
    }

    this.loadNextSection = this.loadNextSection.bind(this);
    this.scrollToTopOfWindow = this.scrollToTopOfWindow.bind(this);

    var firebaseConfig = {
     apiKey: 'AIzaSyDIGiTP4SLRlFpVb2VqpOlHeoOs73lDM-w',
      storageBucket: 'gs://phishing-surveyapp.appspot.com'
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    else {
      firebase.app(); // if already initialized, use that one
   }
  
    this.storage = firebase.storage();
  }
 
  componentDidMount(){
    this.id = Math.round(1 + Math.random() * (1000000 - 1));
  }

  receiveData(stateName, data, bool){  
    this.setState({
      [stateName]:data,
      allQuestionsInSectionAnswered:bool
    });
  }

  loadSurvey(type){
    return(
      <div>
        <Survey surveyToLoad={type} sendSurveyData={(stateName, data, bool) => {this.receiveData(stateName, data,bool)}}/>      
      </div>
    );
  }  

  loadForm(type){
    return(
      <Forms type={type} sendFormData={(stateName, data, bool) => {this.receiveData(stateName, data,bool)}}/>
    )
  }

  loadGame(){
    return(
        <Game sendGameData={(data)=>{this.receiveData("mainRoundPartAnswers", data ,true)}} />
    )
  }

  closeAlert = () =>{
    this.setState({
      alert:false,
    });
  }
  
  scrollToTopOfWindow = () =>{
    window.scrollTo({
      top:0, 
      left: 0,
      behavior: "smooth"
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
    // at current section == 6 should load 'thank you for participating'
    if (this.state.currentSection === 7) return;
    if (!this.state.allQuestionsInSectionAnswered){
      this.setState({
        alert:true,
      });
      return;
    }

    this.scrollToTopOfWindow();

    this.setState({
      currentSection: this.state.currentSection + 1,
      alert:false,
      allQuestionsInSectionAnswered: false,
    });
  }

  loadNextSection_= () => {
    this.scrollToTopOfWindow();

    this.setState({
      currentSection: this.state.currentSection + 1,
      allQuestionsInSectionAnswered: false,
    });
  }  

  handleFirebaseStorageUpload = () => {
    this.scrollToTopOfWindow();
    try {
      let storageRef = this.storage.ref();
      let data = JSON.stringify(this.state.demographicQData) + "\n\n" + JSON.stringify(this.state.feedbackQData) + "\n\n" + String(this.state.mainRoundPartAnswers);
      storageRef.child(`surveyResults-${String(this.id)}.txt`).putString(data);  
    }
    catch(error) {
      console.log(error);
    }

    this.loadNextSection_();
  }

  render() {
    let sectionNumber = this.state.currentSection;
    let section = this.sections[sectionNumber];
    let formPanelID;
    sectionNumber === 5 ? formPanelID = "game-round" : formPanelID = "form-panel";
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
            <div id={formPanelID} >
                {
                  sectionNumber === 1 ?
                  <div className="progress-section">                 
                      <p>Participation form</p>
                      <p>{sectionNumber}/6</p>
                  </div>
                  :
                  sectionNumber === 2 ?
                  <div className="progress-section">                 
                      <p>Introduction to the game</p>
                      <p>{sectionNumber}/6</p>
                  </div>
                  :
                  sectionNumber === 3 ?
                  <div className="progress-section">                 
                      <p>Consent form</p>
                      <p>{sectionNumber}/6</p>
                  </div>
                  :
                  sectionNumber === 4 ?
                  <div className="progress-section">                 
                      <p>Questionnaire</p>
                      <p>{sectionNumber}/6</p>
                  </div>
                  :
                  sectionNumber === 5 ?
                  <div className="progress-section">
                      <p>Main Game Round</p>
                      <p>{sectionNumber}/6</p>              
                  </div>
                  :
                  sectionNumber === 6?
                  <div className="progress-section">                 
                      <p>Questionnaire</p>
                      <p>{sectionNumber}/6</p>
                  </div>
                  :
                  <div className="progress-section">                 
                      <p>End</p>
                  </div>
                }
                {
                  sectionNumber < 4 ?
                  this.loadForm(section[0])
                  :
                  sectionNumber === 5 ?
                  this.loadGame()
                  :
                  sectionNumber === 7?
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
      <div className="button-wrapper">
        {
          sectionNumber === 6 ?
          <form>
            <button type="button" className="submit-button" aria-label="SubmitButton" onClick={this.handleFirebaseStorageUpload}>
              {section[1]}
            </button>
          </form>
        :
          sectionNumber === 7 ?
          null
        :
          !section[2] ?
        <button type="button" className={`submit-button ${this.state.allQuestionsInSectionAnswered ? null : "disabled"}`} aria-label="SubmitButton" onClick={this.loadNextSection}>
          {section[1]}
        </button>
        :
        <button type="button" className="submit-button" aria-label="SubmitButton" onClick={this.loadNextSection_}>
          {section[1]}
        </button>
        // <form>
        //   <button type="button" className="submit-button" aria-label="SubmitButton"onClick={this.handleFirebaseStorageUpload}>
        //     {section[1]}
        //   </button>
        // </form>
        }
      </div>  
      </div>
    );
  }

} 
export default App;
