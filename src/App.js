import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState } from 'react';
import TablePerson from './TablePerson';
function App() {
const [idToFunction, setidToFunction] = useState(null);
const [mode, setMode] = useState(null);
const [personDetail, setpersonDetail] = useState(() => {
  const stored = window.localStorage.getItem('persons');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error("Failed to parse persons from localStorage:", error);
      return [];
    }
  }
  return [];
});
const [userInput,setUserInput]= useState ({id:'',name:'',age:''});

    function handleChange(event,proper){
      const newValue= event.target.value ;
    const e= setUserInput({...userInput,[proper]:newValue});
    }

   
  function add() {  
 // Get the id of the last object in personDetail. But if there is no last object (or it has no id), then use 0
  const newArray = [...personDetail, { ...userInput, id: (personDetail.at(-1)?.id ?? 0) + 1}]; //.at(-1) is a cleaner shorthand for array[array.length - 1]
  setpersonDetail(newArray);
  window.localStorage.setItem('persons', JSON.stringify(newArray));
  setUserInput({ name: '', age: '' }); 
  setMode(null); 
}
function handleclear() {
  setpersonDetail([]);
  console.log('Data is cleared');
  setMode(null);
    setidToFunction(null);
}

const handleDelete = (idToFunction) => {
 const person = personDetail.find(p => p.id === idToFunction);
    if (person) {
      setUserInput({ name: person.name, age: person.age });
       setMode('delete');
    }
    console.log("Deleting id:", idToFunction);
setidToFunction(idToFunction); 
  };
  function handleconfirmDelete(){
      const newArr = personDetail.filter(item => item.id !== idToFunction);
      setpersonDetail(newArr);

    setUserInput({ name: "", age: "" }); 
    setidToFunction(null);
    
    }
 const handleUpdate = (idToFunction) =>{
const person = personDetail.find(p => p.id === idToFunction);
    if (person) {
      setUserInput({ name: person.name, age: person.age });
       }
       setidToFunction(idToFunction);
        setMode('edit');
  }
  function handleConfirmUpdate(){
   
  const updatedArr= personDetail.map(person => {
    if (person.id === idToFunction) {
      return {
        ...person,
        name: userInput.name,
        age: userInput.age
      };
    } else {
      return person;
    }
  });

  setpersonDetail(updatedArr);
  setUserInput({ id: "", name: "", age: "" });
  setidToFunction(null);
  
  }
  return (
    <div >
      <h1> Personal Information Form</h1>
      <h3>Name: </h3>
       <input type="text" value={userInput.name} onChange={(a)=>handleChange(a,'name')} placeholder="Enter your name" />
      
      <h3>Age: </h3>
      <input type="number" value= {userInput.age} onChange={(b)=>{handleChange(b,'age')}} placeholder="Enter your age" />
          {mode === null && <button onClick={add}>ADD</button>}
      {mode === 'edit' && <button onClick={handleConfirmUpdate}>Confirm Edit</button>}
      {mode === 'delete' && <button onClick={ handleconfirmDelete}>Confirm Delete</button>}
         <br></br><button onClick={handleclear}>Clear All</button><br></br>
        
        <h2>Entered Data</h2>
         <TablePerson data= {personDetail}  onDelete={handleDelete} onUpdate={handleUpdate}/>
      
    </div> 
  );
}
export default App;