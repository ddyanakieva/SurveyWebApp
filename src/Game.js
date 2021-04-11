import React, {Component} from "react";
import './App.css';
import Unity, {UnityContent, UnityContext} from "react-unity-webgl";

class Game extends Component{
    constructor(){
        super();
        this.state = {
            isGameOver: false,
            outputData: ""
        };
         
        const unityBuildDirPath = process.env.PUBLIC_URL + '/unity/Build/';
        this.unityContext = new UnityContext({
            loaderUrl: `${unityBuildDirPath + "unity.loader.js"}`,
            dataUrl: `${unityBuildDirPath + "unity.data"}`,
            frameworkUrl: `${unityBuildDirPath + "unity.framework.js"}`,
            codeUrl: `${unityBuildDirPath + "unity.wasm"}`,
        });      
        this.unityContext.on("debug", (message) => {
            console.log(message);
        });
        this.unityContext.on("SaveGameData", (stringEmailData, stringCueData) => {
            let data = stringEmailData + "\n" + stringCueData;
            console.log(data);
            this.props.sendGameData(data);
          });  
    }

    render(){
    return(        
        <div className="game-container">
            <Unity 
                unityContext={this.unityContext}
                style={{
                    height: "100%",
                    width: "100%",
                    background: "black",
                }}
            />
        </div>
    )
    }
}
export default Game;
