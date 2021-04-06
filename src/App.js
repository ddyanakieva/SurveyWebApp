import React, {Component} from "react";
import './App.css';
import axios from 'axios';
import Survey from './Survey.js';
import Forms from './Forms.js';
import firebase from "firebase/app";
import "firebase/storage";

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

 handleFirebaseStorageUpload = () => {
   try {
    let storageRef = this.storage.ref();

    storageRef.child('testDeniDeniDeni.txt').putString("Hjelo")
      // .then(function(snapshot) {
      // console.log('Uploaded', snapshot.totalBytes, 'bytes.');
      // console.log('File metadata:', snapshot.metadata);
      // Let's get a download URL for the file.
      // snapshot.ref.getDownloadURL().then(function(url) {
      //   // console.log('File available at', url);
      //   document.getElementById('linkbox').innerHTML = '<a href="' +  url + '">Click For File</a>';
      // });
    // });    
    }
    catch(error){
      console.log(error);
    }
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
      <div className="button-wrapper">
        {
          !section[2] ?
        <button type="button" className={`submit-button ${this.state.allQuestionsInSectionAnswered ? null : "disabled"}`} aria-label="SubmitButton" onClick={this.loadNextSection}>
          {section[1]}
        </button>
        :
        // <button type="button" className="submit-button" aria-label="SubmitButton" onClick={this.loadNextSection_}>
        //   {section[1]}
        // </button>
        <form>
          <button type="button" className="submit-button" aria-label="SubmitButton"onClick={this.handleFirebaseStorageUpload}>
            {section[1]}
          </button>
        </form>
        }
      </div>  
      </div>
    );
  }

} 
export default App;
