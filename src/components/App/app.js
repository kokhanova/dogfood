import {useEffect, useState} from 'react';
import CardList from "../CardList/cardList";
import Footer from "../Footer/footer";
import Header from "../Header/header";
import Sort from "../Sort/sort";
import Logo from "../Logo/logo";
import Search from "../Search/search";
import "./styles.css";
import data from '../../assets/data.json';
import SearchInfo from '../SearchInfo/searchInfo';

function App() {
    const [cards, setCards] = useState(data);
    const [searchQuery, setSearchQuery] = useState('');

    const handleRequest = () => {
        const filterCards = data.filter( item => item.name.toUpperCase().includes(searchQuery.toUpperCase()));
        setCards(filterCards);
    }

    useEffect(()=>{
        handleRequest();
    }, [searchQuery]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleRequest();
    }

    const handleInputChange = (inputValue) => {
        setSearchQuery(inputValue);
    }

    return (
        <>
            <Header>
                <>
                    <Logo />
                    <Search onSubmit={handleFormSubmit} onInput={handleInputChange}/>
                </>
            </Header>
            <main className="content container">
                {/* <button className="btn" onClick={()=> console.log("Нажми меня")}>{'Нажми меня'}</button> */}
                <SearchInfo searchCount={cards.length} searchText={searchQuery}/>
                <Sort />
                <div className="content__cards">
                    <CardList  goods={cards}/>
                </div>
            </main> 
            <Footer />
        </>
    );
}

export default App;
