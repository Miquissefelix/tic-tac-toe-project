import { useState } from "react";
export default function Player({initialName,symbol, isActive,onChageName}){

    // Estado local para armazenar o nome do jogador
    const [playerName,setPlayerName]=useState(initialName)
     //  o jogador está editando o nome
    const[isEditing,setIsEditing]=useState(false)

    function handleEditClick(){
      //true
        // setIsEditing (!isEditing)
        setIsEditing((editing)=>!editing)


        if(isEditing){
            // Se estava editando, salva o nome usando a função onChageName
        onChageName(symbol,playerName);
        }
    
    
    }

    //savefunction event alteration emitido pelo campo de input
    function handleChange(e){
         setPlayerName(e.target.value);
    }
// Variáveis condicionais com base no estado de edição
    let editableplayerName= <span className="player-name">{playerName}</span>
    let btnCaptioon= 'Edit';
    if(isEditing===true){
        editableplayerName= <input type="text" required value={playerName} onChange={handleChange}/>
        btnCaptioon="Save"
    }

      // Renderiza a estrutura do jogador
    return (
    
    <li className={isActive ? 'active' : undefined}>
    <span className="player">
     {editableplayerName}
      <span className="player-symbol">{symbol}</span>
    </span>
    <button onClick={handleEditClick}>{btnCaptioon}</button>
  </li>
    )
}