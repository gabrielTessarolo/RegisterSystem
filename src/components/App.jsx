import { useState } from 'react'
import Register from './Register'
import Infos from './Infos'
import '../styles/App.css'

function App() {
  const [curriculumInfo, updCurr] = useState({
    firstName: "",
    lastName: "",
    age: "",
    position: "",
    phone: "",
    email: "",
    exps: {
      academic: [
        // {"titleStudy":"Bacharelado em Engenharia de Software","schoolName":"Universidade Federal de Goiás","initDate":"2024","finishDate":"2028"},
        // {"titleStudy":"Ensino Médio Completo","schoolName":"Colégio Delta Anápolis","initDate":"2021","finishDate":"2023"}
        ],
      professional: [],
    }
  });
  
  function handleInput(info, e){
    const newCurr = {...curriculumInfo}
    newCurr[info] = e.target.value;
    updCurr(newCurr);
  }
  function handleExp(type = "academic", exp = {}, action="add", indexOfExp=0){
    const newCurr = {...curriculumInfo}
    const emptyExps = newCurr.exps[type].filter(emptyExp => Object.getOwnPropertyNames(emptyExp).length==0)
    if(action=="add"){
      if(emptyExps.length<=0){
        newCurr.exps[type] = newCurr.exps[type].concat({});
      }else{
        alert("Preencha todas os campos de experiência para adicionar mais um.")
      }
    }else if(action=="save"){
        newCurr.exps[type][indexOfExp] = {...exp};
    }else{  
      if(emptyExps.length<=0){
        const list = newCurr.exps[type]
        newCurr.exps[type] = list.slice(0,indexOfExp).concat(list.slice(indexOfExp+1, list.length));
      }else{
        alert(`Salve todas as suas ${["formações", "experiências"][+(type=="professional")]} para poder deletar.`)
      }
    }
    updCurr(newCurr);
  }

  const handles = {
    forInput: handleInput,
    forExp: handleExp,
  }

  return (
    <div className="main">
      <Register handles={handles} curr={curriculumInfo}/>
      <Infos curr={curriculumInfo}/>
    </div>
  )
}

export default App
