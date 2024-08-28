import { useState } from "react";
import '../styles/Infos.css'
import { Arrow } from "./Register";

function CurrField({index, handles, curr}){
    if(index==0){
        return(
            <div id="currField">
                <Curriculum currInfos={curr} index={index}/>
            </div>
        )
    }else if(index==1){
        return(
            <div id="currField">

            </div>
        )
    }else{
        return(
            <div id="currField">

            </div>
        )
    }
}

function Curriculum({currInfos, index="1"}){
    return(
        <div id="modelCurr">
            <div id="header">
                <h1 id="name">{currInfos.firstName+"\n"+currInfos.lastName}</h1>
                <h1 id="age">{currInfos.age}{currInfos.age!="" ? " anos" : ""}</h1>
                <h1 id="age">{currInfos.position}</h1>
                <h1 id="contact">{currInfos.phone}{currInfos.phone!=""&&currInfos.email!="" ? " | " : ""}{currInfos.email}</h1>
            </div>
            <div id="exps">
                <h1 className="subtitle">Formação Acadêmica</h1>
                {currInfos.exps.academic.map(exp=>Object.getOwnPropertyNames(exp).length!=0?<div className="expDiv" style={{backgroundColor: "rgb(255, 197, 121)"}}>
                    <h1>{exp.titleStudy}{new Date().getFullYear()-parseInt(exp.finishDate, 10)<0? " [cursando]" : ""}</h1>
                    <h2>{exp.schoolName}, de {exp.initDate} a {exp.finishDate}</h2>
                </div>:null)}
                <hr></hr>
                <h1 className="subtitle">Experiência Profissional</h1>
                {currInfos.exps.professional.map(exp=>Object.getOwnPropertyNames(exp).length!=0?<div className="expDiv" style={{backgroundColor: "rgb(105, 197, 221)"}}>
                    <h1>{exp.positionTitle}{new Date().getFullYear()-parseInt(exp.finishDate, 10)<0? " [trabalhando]" : ""}</h1>
                    <h2>{exp.company}, de {exp.initDate} a {exp.finishDate}</h2>
                </div>:null)}
            </div>
        </div>
    )
}

export default function Infos({curr, handles}){
    const [actRegs, updateRegs] = useState(0)
    return (
      <div className="mainDivs" id="infos">
        <p>Veja seu currículo</p>
        <p className='subtitle'>Escolha seu modelo</p>
        <CurrField index={actRegs} handles={handles} curr={curr}/>
        <div id="arrows">
            <Arrow dir={0} action={updateRegs} index={actRegs}/>
            <Arrow dir={1} action={updateRegs} index={actRegs}/>
        </div>
      </div>
    )
}