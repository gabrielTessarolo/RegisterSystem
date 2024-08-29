import { useState } from 'react'
import Register from './Register'
import Infos from './Infos'
import '../styles/App.css'

// Componente padrão App, cujo estado é baseado na própria variável currículo
function App() {
  // Variável de estado curriculumInfo que contém as informações fornecidas, atualizada com updCurr
  const [curriculumInfo, updCurr] = useState({
    firstName: "",
    lastName: "",
    age: "",
    position: "",
    phone: "",
    email: "",
    exps: {
      academic: [],
      professional: [],
    }
  });
  
  // handleInput utilizado para atualizar dinamicamente a variável de estado com base na mudança dos inputs principais do Register
  function handleInput(info, e){
    const newCurr = {...curriculumInfo}
    newCurr[info] = e.target.value;
    updCurr(newCurr);
  }
  // handleExp atualiza a variável de estado com base em três ações nos campos de experiências: add (invocada pelo addExp), save (pelo SaveButton no estado "save") e del (pelo SaveButton no estado "del")
  function handleExp(type = "academic", exp = {}, action="add", indexOfExp=0){
    const newCurr = {...curriculumInfo}
    // Verificação se a experiência está vazia de informações (retorna uma lista com as experiências vazias)
    const emptyExps = newCurr.exps[type].filter(emptyExp => Object.getOwnPropertyNames(emptyExp).length==0)
    if(action=="add"){
      // Caso não existam experiências vazias já presentes, é adicionado um novo campo de experiência
      // Caso contrário é emitido um alerta de informação ao usuário
      if(emptyExps.length<=0){
        newCurr.exps[type] = newCurr.exps[type].concat({});
      }else{
        alert("Preencha todas os campos de experiência para adicionar mais um.")
      }
    }else if(action=="save"){
        // Lógica para o estado save construída dentro do componente SaveButton
        newCurr.exps[type][indexOfExp] = {...exp};
    }else{  
      // Caso não existam experiências vazias já presentes, é construída uma nova lista sem a experiência que foi deletada
      // Caso contrário é emitido um alerta de informação ao usuário
      if(emptyExps.length<=0){
        const list = newCurr.exps[type]
        newCurr.exps[type] = list.slice(0,indexOfExp).concat(list.slice(indexOfExp+1, list.length));
      }else{
        alert(`Salve todas as suas ${["formações", "experiências"][+(type=="professional")]} para poder deletar.`)
      }
    }
    // A variável de estado (objeto do currículo) é atualizada com as novas experiências
    updCurr(newCurr);
  }

  // Objeto contendo os handles que será fornecido via props aos componentes filhos
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
