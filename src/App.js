import React from "react";
// import Mealie from "./Mealie";
import Marvel from "./Marvel";
import "bootstrap/dist/css/bootstrap.min.css";

function App(){
  
  // Called when an "Edit" button is pushed
  const editCharacter = (character) => {
    setCharacterToEdit(character)
    setEditMode(true)
  }

  const cancelEdit = () => {
    setCharacterToEdit(defaultChar)
    setEditMode(false);
  } 

  return (
    <div> 
      <Marvel />
    </div>
  )
}

export default App;
