import React, {Component} from "react";
import './App.css';
import Survey from './Survey.js';

class Forms extends Component {
  constructor() {
    super();
    let link = <a href="https://www.abdn.ac.uk/about/privacy/research-participants-938.php" target="_blank" rel="noreferrer">here</a>

    this.projectTitle = "Serious games for phishing susceptibility and awareness research"
    this.bold = '<strong>hi</strong>'

    this.participationSection = [
      {
        title: "AIMS:",
        text: "The research project aims to raise awareness of phishing by simulating a real-life scenario involving phishing emails in a role-playing game. Additionally, the research project aims at measuring users’ susceptibility to phishing emails and capturing users’ decision-making process."
      },
      {
        title: "WHAT YOU WILL BE ASKED TO DO: ",
        text: "In this experiment, you will be asked to indicate your gender, age, highest level of education, whether you have any formal or self-training related to safe email usage. You will be presented with an introduction to the game format, including a preview of the game, followed up with instructions how to play. Then you will be given the opportunity to practice the game mechanics during a training round. Once the training round is complete you will be given feedback based on your performance. Then the main round of the game will begin. You will be presented with several emails and your main task will be to categorize them. As a secondary task, you will be asked to select those phishing cues, where applicable, which lead to your decision. Finally, you will have the opportunity to provide feedback before the experiment has ended."
      },
      {
        title: "DATA MANAGEMENT AND STORAGE:",
        text: "Only anonymous data will be collected. It will be collected and stored indefinitely on secure university facilities."
      },
      {
        title: "CONFIDENTIALITY AND ANONYMITY:",
        text: `The anonymous data collected will be analysed and may be used in publications, dissertations, reports or presentations derived from the study. The University’s privacy notice for research participants is available`,
        links: link
      },
      {
        title: "CONSENT:",
        text: "If you agree to take part in the research, you will be asked to indicate your consent by ticking a box on an online Consent Form."
      },      
    ]

    this.introductionSection = [
      {
        dangerText: `In the first highlighted section of the screenshot below you can see at the top your <span class="highlighted">Score Points</span> and right below it the <span class="highlighted">Time Remaining</span>. In the second highlighted section of the screenshot below you can see the attachments as well as the two buttons. Use the buttons to classify each email, progress to the next email, reset the timer and earn points. Use the <span class="highlighted">Report button</span> when an email appears <b>phishing</b> and use the <span class="highlighted">Accept button</span> when an email appear <b>genuine</b>.`,
        image: "screenshot2.png",
        divider: 1,
      },
      {
        dangerText: "The screenshot below shows information on how cues are displayed. You can recognize which text objects are selectable by placing your mouse over them. Hovering over cues gives the text an <b>orange</b> background and selecting a cue turns the background <b>blue</b> as shown in the screenshot. If there is a link URL present in the email you can see the real address pop up above it.",
        image: "screenshot1.png",
        divider: 1
      }
    ]

    this.consent = [
      {
        text: `I confirm that the research project “${this.projectTitle}” has been explained to me. I have had the opportunity to ask questions about the project and have had these answered satisfactorily.`,
      },
      {
        text: `I consent to the material I contribute being used to generate insights for the research project “${this.projectTitle}”.`
      },
      {
        text: "I understand that my participation in this research is voluntary and that I may withdraw from the research at any time (until the point of data analysis) without providing a reason."
      },
      {
        text: `I consent to allow the fully anonymised data to be used for future publications and other scholarly means of disseminating the findings from the research project.`
      },
      {
        text: 'I understand that the information/data acquired will be securely stored by researchers, but that appropriately anonymised data may in future be made available to others for research purposes. I understand that the University may publish appropriately anonymised data in its research repository for verification purposes and to make it accessible to researchers and other research users.'
      },
      {
        text: "I understand that for this survey to function it is important that I do not click refresh or the back button in my browser while the study is in progress. To the best of my knowledge I have not participated in this study before."
      }
    ]
  }
  
  createFormOfType(){
    let form = []
    let type = this.props.type;

    if (type === "participation"){
      form.push(
        <div>
            <div className="people-info" style={{marginBottom:"5px"}}>
              <p>PRINCIPAL INVESTIGATOR <br/>SUPERVISOR</p>
              <p>Denitsa Yanakieva <br/>JP Vargheese</p>
            </div>
            {/* <div className="people-info" style={{marginBottom:"5px"}}>
              <p>SUPERVISOR </p> <p>JP Vargheese</p>
            </div> */}
            <hr style={{marginBottom:"20px"}}/>
            <div>
              <p>
              I am Denitsa Yanakieva, a BSc student in the department of Computing Science.  I would like to invite you to consider participating in the research project <span className="bold-text"> “{this.projectTitle}”</span>
              <br/> Below is some information about the project, to help you decide whether you would like to take part.
              </p>
              {this.participationSection.map((subsection,i) =>
                this.createSubSection(subsection, i)
              )}
            </div>
            <hr/>
            <div>
              <p>
              Thank you for considering taking part in this research.
              If you have any questions about this research, please contact me,
              Denitsa Yanakieva, at <a href='mailto:u01ddy17@abdn.ac.uk?subject=Phishing research query'>u01ddy17@abdn.ac.uk</a>
              <br/>For any queries regarding ethical concerns you may contact the Convener of the Physical Sciences &amp; Engineering Ethics Board at the University of Aberdeen: <a href='mailto:copsethics@abdn.ac.uk?'>copsethics@abdn.ac.uk</a>
              
              <br></br>This research project was approved by the Physical Sciences &amp; Engineering Ethics Board on [to-be-announced]
              </p>
            </div>
          </div>
        )
      }
      else if (type === "intoduction"){
        this.introductionSection.map((element,i) => 
          form.push(
          <div key={"introduct-"+i}>
              {element.divider === 1? <hr className="solid"></hr> : null}
              {element.dangerText ? <p dangerouslySetInnerHTML={{ __html: element.dangerText }}></p>: <p>{element.text}</p> }  
              {element.image ? <img src={process.env.PUBLIC_URL + '/'+element.image} alt="SupportingImage"/>: null}
          </div>)
        );
      }
      else if (type === "consent"){
        form.push(
          <div>
            <p className="highlighted">
            Consent form for participation in the research project: <br/>“{this.projectTitle}”. 
            </p>
            <hr/> 
            <p>Please read the statements below and tick the final box to confirm you have read and understood the statements and upon doing so agree to participate in the project. </p>
            {this.consent.map((x,i) => 
              this.createSubConsentSection(x.text, i)
            )}
            <Survey surveyToLoad="consent" sendSurveyData={(stateName, data, bool) => {this.props.sendFormData(stateName, data, bool)}}/>
          </div>
        )
      }
      else if (type === "end"){
        form.push(
          <div>
            <p className="highlighted">
              Thank you for taking part in the research project. <br/>“{this.projectTitle}”. 
            </p>
            <hr/> 
            <p>
              You can now close this window.
            </p>
          </div>
        )
      }
    return form;
  }

  createSubSection = (subsection, key) => {
    return (
    <div className="sub-section" key={key}>
      <p className="highlighted">{subsection.title}</p>
      <p>{subsection.text}</p>{subsection.links === null ? '' : subsection.links}
    </div>)
  }

  createSubConsentSection = (text, key) => {
    return(
      <p key={key}> <br/> <i className="fas fa-fish"></i>{text}</p>
    )
  }

  getFormTextFromType(type){
    let formTypes = {
      participation: this.participationSection,
      introduction: this.introduction,
      consent: this.consent
    }
    return formTypes[type];
  }

  render() {  
    let formType = this.getFormTextFromType(this.props.type);
    return(
      <div className="form-body">
        {this.createFormOfType()}
      </div>
    );
  }

} 
export default Forms;
