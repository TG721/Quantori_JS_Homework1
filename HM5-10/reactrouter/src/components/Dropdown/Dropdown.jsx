import { useState } from 'react';
import Button from '../Button/Button';
import './Dropdown.css';


export default function Dropdown(props) {
  const [selectedOption, setSelectedOption] = useState(props.selectedOption || props.tagList[0]);

  function handleOptionClick(option) {
    setSelectedOption(option);
    props.onSelect(option);
  }

  return (
    <div className="dropdown">
      <Button className={`dropbtn ${selectedOption==="No Filter" ? "noFilter" :  selectedOption==="home" ? "homeTag" : selectedOption}`} title={selectedOption} />
      <div className="dropdown-content">
        {props.tagList.map((option) => (
          <a 
            key={option}
            onClick={() => handleOptionClick(option)}
            className={selectedOption === option ?  "selected selecedOption" : ''}
          >
            {option}
          </a>
        ))}
      </div>
    </div>
  );
}
