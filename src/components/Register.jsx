import { useState } from 'react'
import '../styles/Register.css'

function AddExp({type = "academic", act}){
    return (
        <div className="addExp" onClick={()=>{
                act(type, {}, "add")
            }}>+
        </div>
    )
}

function SaveButton({type, modelExp, experience, act, values, indexOfExp}){
    const hasValidInfos = () => ![modelExp[1], modelExp[2], modelExp[3], modelExp[4]].some(x=>(!experience.hasOwnProperty(x)||experience[x]==""))
    const isSet = () => [1,2,3,4].filter(x=> ((values[modelExp[x]]!="") && (values[modelExp[x]]!=undefined))).length>=4
    const [mode, changeMode] = useState(isSet()?"del":"save")
    function change(){
        mode=="save"?changeMode("del"):null;
    }
    // ! Corrigir a lógica de deletar.
    return (
        <button id="save_del" className={mode} onClick={(e)=>{
            if(mode=="save"){
                if(hasValidInfos()){
                    act(type, experience, "save", indexOfExp)
                    change();
                }
            }else{
                act(type, experience, "del", indexOfExp)
            }
        }}>{["Salvar","Deletar"][+!(mode=="save")]}</button>
    )
}

// Experience usado para representar formações acadêmicas ou experiências profissionais no currículo. 
// type = {"academic"||"professional"}
// act: função a ser chamada quando clicar em "Salvar"
function Experience({type = "academic", act, values, indexOfExp}){
    const types = [
        ["academic", "schoolName", "titleStudy", "initDate", "finishDate", ["a instituição de estudo", "o título da formação"]],
        ["professional", "company", "positionTitle", "initDate", "finishDate", ["a empresa empregadora", "o cargo exercido"]]];
    const experience = {};
    return (
        <div className="exp">
            {/* Compara o argumento com as informações ali e retorna se bater com o primeiro elemento */}
            {types.map(exp => type == exp[0]?<div style={{display:"inline-block"}}>
                    {/* Inputs que ao serem modificados definem as propriedades do objeto experiência, que ao salvar será adicionado ao currículo */}
                    <input value={values[exp[2]]} className={exp[2]} onChange={(e)=> {experience[exp[2]]=e.target.value}} placeholder={`Digite ${exp[5][1]}`} style={{width: "78.6%"}}></input>
                    <input value={values[exp[1]]} className={exp[1]} onChange={(e)=> {experience[exp[1]]=e.target.value}} placeholder={`Digite ${exp[5][0]}`} style={{width: "40%"}}></input>
                    
                    <div className="dateFields">
                        De <input value={values[exp[3]]} className="dateField" onChange={(e)=> {experience[exp[3]]=e.target.value}} minLength={4} maxLength={4}></input> -
                        Até <input value={values[exp[4]]} className="dateField" onChange={(e)=> {experience[exp[4]]=e.target.value}} minLength={4} maxLength={4}></input>
                    </div>
                    <SaveButton type={"academic"} modelExp={exp} experience={experience} act={act} values={values} indexOfExp={indexOfExp}/>
                    
            </div>:null)}
        </div>
    )
}

// Input básico customizado
// input = ["placeholder", "id", "prop do currículo"]
// act = função a ser chamada quando alterado
// value = valor igual à propriedade referente no currículo
function BasicInput({input, act, value}){
    return <input value={value} placeholder={`Digite ${input[0]}`} id={input[1]} onChange={(e)=>act(input[2], e)}></input>
}

// RegField muda de layout conforme o index fornecido pelo Register
// 0 -> Informações pessoais
// 1 -> Formações acadêmicas
// 2 -> Experiências profissionais
function RegField({index, handles, curr}){
    if(index==0){
        const inputs = [
            ["seu nome", "firstName", "firstName"],
            ["seu sobrenome", "lastName", "lastName"],
            ["sua idade", "age", "age"], 
            ["seu cargo profisisonal", "position", "position"], 
            ["seu número de telefone", "phonenumber", "phone"], 
            ["seu e-mail", "email", "email"]
        ]
        return(
            <div id="registerFields">
                {inputs.map(input => <BasicInput value={curr[input[2]]} input={input} act={handles.forInput}/>)}
            </div>
        )
    }else if(index==1){
        const listExps = curr.exps["academic"]
        return(
            <div id="registerFields">
                {listExps.map((exp,idx)=> <Experience values={exp} indexOfExp={idx} type="academic" act={handles.forExp}/>)}
                <AddExp type="academic" act={handles.forExp}/>
            </div>
        )
    }else{
        return(
            <div id="registerFields">

            </div>
        )
    }
}

// Arrow (seta) customizada de acordo com:
// direção (0 - left), (1 - right)
// action: função a ser chamada
// index do Register para aumenta-lo ou diminui-lo
function Arrow({dir, action, index}){
    // Dados de cada seta: [index, id, soma do indexRegister, graus de rotação de imagem, indexRegister em que são desativadas]
    const arrowData = [[0, "l", -1, 180, 0], [1, "r", 1, 0, 2]]
    return (
        <div style={{transform: `rotate(${arrowData[dir][3]}deg)`}} 
             className={"arrow"+(index==arrowData[dir][4]?" unabled":"")} id={arrowData[dir][1]}
             onClick={()=>index==arrowData[dir][4]?null:action(index+arrowData[dir][2])}
        >➜</div>
    )
}

// Componente principal Register
// Responsável pelas mofidicações no currículo
export default function Register({handles, curr}){
    const [actRegs, updateRegs] = useState(0)
    const pages = ["Informações pessoais", "Acadêmico", "Experiências profissionais"]
    return (
      <div className="mainDivs" id="register">
        <p>Preencha seu currículo</p>
        <p className='subtitle'>{pages[actRegs]}</p>
        <RegField index={actRegs} handles={handles} curr={curr}/>
        <div id="arrows">
            <Arrow dir={0} action={updateRegs} index={actRegs}/>
            <Arrow dir={1} action={updateRegs} index={actRegs}/>
        </div>
      </div>
    )
}



  