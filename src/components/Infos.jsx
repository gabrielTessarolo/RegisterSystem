import { useState } from "react";
import '../styles/Infos.css'
import { Arrow } from "./Register";
import html2canvas from "html2canvas";

// CurrField análogo ao RegisterField do componente Register, que mostrará as opções de modelo que o usuário pode escolher para seu currículo
function CurrField({index, handles, curr}){
    if(index==0){
        return(
            <div id="currField">
                <Curriculum currInfos={curr} index={index}/>
            </div>
        )
    }else{
        return(
            <div id="currField">

            </div>
        )
    }
}

// Curriculum que engloba a div#modelCurr e o botão de download do currículo em forma de PDF
// Aqui são utilizados jQuery para facilitar a seleção da div do currículo;
// html2canvas para converter o conteúdo da div em um imagem (jsPDF não consegue converter CSS) que será convertida em PDF;
// jsPDF para conversão em PDF e download.
function Curriculum({currInfos, index="0"}){
    return(
        <>
        <div id="modelCurr">
            <div id="header">
                <h1 id="name">{currInfos.firstName+"\n"+currInfos.lastName}</h1>
                <h1 id="age">{currInfos.age}{currInfos.age!="" ? " anos" : ""}</h1>
                <h1 id="age">{currInfos.position}</h1>
                <h1 id="contact">{currInfos.phone}{currInfos.phone!=""&&currInfos.email!="" ? " | " : ""}{currInfos.email}</h1>
            </div>
            <div id="exps">
                
                <h1 className="subtitle">Formação Acadêmica</h1>
                {currInfos.exps.academic.map(exp=>Object.getOwnPropertyNames(exp).length!=0?<div className="expDiv" style={{fontFamily:"Arial", backgroundColor: "rgb(255, 197, 121)"}}>
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
        <button id="downloadButton" onClick={(e)=>{
            html2canvas($("#modelCurr")[0]).then((canvas) => {
                    var imgData = canvas.toDataURL(
                        'image/png');              
                    var doc = new jsPDF('p', 'mm');
                    doc.addImage(imgData, 'PNG', 17.5, 25, 175, 247);
                    doc.save(`${currInfos.firstName}Curriculum_Md${index+1}.pdf`);
            })
        }}>🔗</button>
        </>
    )
}

// Infos componente padrão do arquivo, equivalente ao Register, que engloba os títulos, as setas para mudança do modelo e o componente CurrField
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