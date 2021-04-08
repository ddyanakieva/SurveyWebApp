import React, {Component} from "react";
import './App.css';
import Options from './Options.js'

class Survey extends Component {
  constructor(){
    super();    

    this.demographicQ = [
      {
        name: "age",
        input: "radio",
        question: "What is your age?",
        options: ["18 - 24 years old", "25 - 34 years old", "35 - 44 years old", "45 - 54 years old", "55 - 64 years old", "65 years or older"]
      },
      {
        name: "gender",
        input: "radio",
        question: "Please, specify your gender:",
        options: ["Female","Male","Other"]
      },
      {
        name: "degree",
        input: "radio",
        question: "What is the highest degree of education you have received?",
        options: ["Highschool graduate or equivalent", "Bachelor's degree", "Master's degree", "PhD"]
      },
      {
        name: "NewSection",
        input: "section",
        question: "",
      },
      {
        name: "officeExp",
        input: "radio",
        question: "How many years’ experience do you have using email within a professional organisational context e.g. office work involving email communication related to work tasks?",
        options: ["No experience", "Less than 1 year", "1 year", "2-3 years", "4-5 years", "More than 5 years"]
      },
      {
        name: "oftenUse",
        input: "radio",
        question: "How often do you use email?",
        options: ["Not very often", "Often", "Once a day", "Several times a day"]
      },
      {
        name: "formalTraining",
        input: "radio",
        question: "Have you undertaken any formal training related to safe email usage including how to identify potential phishing emails and how to respond correctly?",
        options: ["Yes","No"]
      },
      {
        name: "personalTraining",
        input: "radio",
        question: "Have you undertaken any self-training related to safe email usage or actively sought to discover any information that may help you to better identify phishing emails and respond correctly? e.g. reviewing how to set security settings by searching online for advice and guidance about a particular area of security i.e. password management, encryption tools, antivirus settings etc.",
        options: ["Yes","No"]
      },
      {
        name: "confidenceBefore",
        input: "radio",
        question: "How confident do you feel you are in identifying phishing emails?",
        options: ["Not confident at all", "Not very confident", "N/A", "Somewhat confident", "Very Confident"]
      }
    ]

    this.feedbackQ = [
      {
        name: "improvedKnowledge",
        input: "radio",
        question: "Do you feel this game improved your knowledge of phishing emails",
        options: ["No", "Yes"]
      },
      {
        name: "helpedIdentify",
        input: "radio",
        question: "Do you feel this game helped you better identify phishing emails?",
        options: ["No", "Yes"]
      },
      {
        name: "areas",
        input: "checkbox",
        question: "In which areas do you feel this game helped you better identify phishing emails?",
        options: ["Identifying fraudulent sender email addresses", "Identifying suspicious URL links", "Identifying suspicious email attachments", "Identifying phishing attempts at disclosing personal information", "None of the above"]
      },
      {
        name: "confidenceAfter",
        input: "radio",
        question: "How confident do you feel you are in identifying phishing emails after completing the game?",
        options: ["Not confident at all", "Not very confident", "N/A", "Somewhat confident", "Very Confident"]
      },
      {
        name: "engaging",
        input: "radio",
        question: "Do you believe this game is more engaging to existing cybersecurity training you may have experienced?",
        options: ["No previous experience","No","Yes"]
      },
      {
        name: "NewSection",
        input: "section",
        question: "Rate each of the following game mechanics based on ease of use",
      },
      {
        name: "cueSelection",
        input: "radio",
        question: "Cue selection method",
        options: ["Not easy to use at all", "Not very easy to use", "N/A", "Somewhat easy to use", "Very easy to use"],
        // image: "cueSelection.PNG"
      },
      {
        name: "hoverURL",
        input: "radio",
        question: "Hover over URL elements method",
        options: ["Not easy to use at all", "Not very easy to use", "N/A", "Somewhat easy to use", "Very easy to use"]
      },
      {
        name: "guidebook",
        input: "radio",
        question: "Locate required phishing advice in guidebook",
        options: ["Not easy to use at all", "Not very easy to use", "N/A", "Somewhat easy to use", "Very easy to use"]
      },
      {
        name: "NewSection",
        input: "section",
        question: "",
      },
      {
        name: "rateExperience",
        input: "radio",
        question: "How would you rate your overall experience playing the game?",
        options: ["Unsatisfied", "Neutral", "Satisfied", "Very satisfied"]
      },
      {
        name: "feedback",
        input: "textbox",
        question: "Please, let us know of any feedback you have regarding the game:"
      }
    ]

    this.consentTickBox = [
      {
        name: "consent",
        input: "checkbox",
        question: "",
        options: ["I confirm that I have read and understood the above statements (check the box)."]
      }
    ]

    let questionData = {
      demographics:{
        "age" : undefined,
        "gender" : undefined,
        "degree" : undefined,
        "officeExp" : undefined,
        "oftenUse" : undefined,
        "confidenceBefore" : undefined
      },
      feedback:{ 
        "improvedKnowledge" : undefined,
        "helpedIdentify" : undefined,
        "areas" : undefined,             
        "confidenceAfter" : undefined,
        "engaging" : undefined,
        "cueSelection" : undefined,
        "hoverURL" : undefined,
        "guidebook" : undefined,
        "rateExperience" : undefined,
        "feedback" : ""
      },
      consent:{
        "consent": undefined
      }
    }

    this.state = {
      demographicQData: questionData.demographics,
      feedbackQData: questionData.feedback,
      consentQData: questionData.consent,
    }
  }

  optionSelected(name, option) {
    let survey;
    let qdata;
    if (this.props.surveyToLoad === "demographics") {
      survey = "demographicQData"; 
      qdata = this.state.demographicQData;
    }
    if (this.props.surveyToLoad === "feedback") {
      survey = "feedbackQData";
      qdata = this.state.feedbackQData
    }
    if (this.props.surveyToLoad === "consent"){
      survey = "consentQData";
      qdata = this.state.consentQData
    }

    qdata[name] = option;

    let allAnswered = true;
    for (const value of Object.values(qdata)) {      
      if(value === undefined) {
        allAnswered = false;
      }
    }

    if (allAnswered){
      this.props.sendSurveyData(survey, qdata , true);
    }
    else{ 
      this.props.sendSurveyData(survey,"",false);
    }

    this.setState({[survey]: qdata});
  }
  
  
  getQuestionsFromSurveyType(type){
    let surveyTypes = {
      demographics: this.demographicQ,
      feedback: this.feedbackQ,
      consent: this.consentTickBox
    }

    return surveyTypes[type];
  }

  makeSurvey(surveyQ){   
    let survey = [];
    if(surveyQ === undefined) return null;

    surveyQ.map((element,i) => 
      survey.push(
      <div className={`question ${element.name}`} key={"question-"+i}>
          <p>{element.question}</p>  
          {element.image ? <img src={process.env.PUBLIC_URL + '/'+element.image} alt="ImageSupportingQuestion"/>: null}
          <Options input={element.input} key_={i} element={element} sendSelectedOption={(option) => this.optionSelected(element.name, option)}/>
      </div>)
    );      
    return survey
  }

  render() { 
    let surveyQuestions = this.getQuestionsFromSurveyType(this.props.surveyToLoad);
    return(      
      <div>
        {this.makeSurvey(surveyQuestions)}
      </div>
    );
  }

} 
export default Survey;