import "./styles.css";
import {ReactComponent as SearchIcon} from './ic-search.svg';
import {ReactComponent as CloseIcon} from './ic-close-input.svg';
import { useState } from "react";

function Search({onSubmit: propsOnSubmit, onInput}) {
    const [inputText, setInputText] = useState('')
    const handleInput = (e) => {
        setInputText(e.target.value);
        onInput && onInput(e.target.value);
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();
        propsOnSubmit(inputText);
        setInputText("");
    }

    const handleClearInput = (e) => {
        e.stopPropagation();
        setInputText("");
    }

    return (
        <form className="search" onSubmit={handleFormSubmit}>
            <input type="text" value={inputText} className="search__input" placeholder="Поиск" onInput={handleInput}/>
            <button type='button' className="search__btn">
                {!inputText && <SearchIcon/>}
                {inputText && <CloseIcon onClick={handleClearInput}/>}
            </button>
        </form>
    );
}

export default Search;