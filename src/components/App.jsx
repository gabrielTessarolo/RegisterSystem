import { useState } from 'react'
import Register from './Register'
import '../styles/App.css'

function Infos(curr){
  return (
    <div id="infos" className='mainDivs'>
      <p>Pré-Visualização</p>
      <p style={{fontSize: "15px", backgroundColor: "none"}}>{JSON.stringify(curr)}</p>
    </div>
  )
}

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
    if(action=="add"){
      if(newCurr.exps[type].filter(emptyExp => Object.getOwnPropertyNames(emptyExp).length==0).length<=0){
        newCurr.exps[type] = newCurr.exps[type].concat({});
      }
    }else if(action=="save"){
      newCurr.exps[type][indexOfExp] = {...exp};
    }else{
      const list = newCurr.exps[type]
      newCurr.exps[type] = list.slice(0,indexOfExp).concat(list.slice(indexOfExp+1, list.length));
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
