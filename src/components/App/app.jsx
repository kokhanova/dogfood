import { useEffect, useState } from "react";
import CardList from "../CardList/cardList";
import Footer from "../Footer/footer";
import Header from "../Header/header";
import Sort from "../Sort/sort";
import Logo from "../Logo/logo";
import Search from "../Search/search";
import "./styles.css";
// import data from '../../assets/data.json';
import SearchInfo from "../SearchInfo/searchInfo";
import api from "../../utils/api";
import useDebounce from "../../hooks/useDebounce";
import { isLiked } from "../../utils/product";
import Spinner from "../Spinner/spinner";

function App() {
    const [cards, setCards] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const debounceSearchQuery = useDebounce(searchQuery, 500);

    const handleRequest = () => {
        setIsLoading(true);
        // const filterCards = cards.filter( item => item.name.toUpperCase().includes(searchQuery.toUpperCase()));
        // setCards(filterCards);
        api.search(debounceSearchQuery)
            .then((searchResult) => {
                setCards(searchResult);
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        setIsLoading(true);
        Promise.all([api.getProductList(), api.getUserInfo()])
            .then(([productData, userData]) => {
                setCurrentUser(userData);
                setCards(productData.products);
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        handleRequest();
        // console.log("INPUT", debounceSearchQuery);
    }, [debounceSearchQuery]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleRequest();
    };

    const handleInputChange = (inputValue) => {
        setSearchQuery(inputValue);
    };
    
    function handleUpdateUser(userUpdateData) {
        api.setUserInfo(userUpdateData)
        .then((newUserData) => {
            setCurrentUser(newUserData);
        });
    }

    function handleProductLike(product) {
        const liked = isLiked(product.likes, currentUser._id);
        
        api.changeLikeProduct(product._id, liked)
            .then((newCard) => {
                const newProducts = cards.map(cardState => {
                    // console.log('Карточка из стейта', cardState);
                    // console.log('Карточка с сервера', newCard);
                    return cardState._id === newCard._id ? newCard : cardState;
                })

                setCards(newProducts);
            })
    }

    return (
        <>
            <Header>
                <>
                    <Logo className="logo logo_place_header" href="/" />
                    <Search
                        onSubmit={handleFormSubmit}
                        onInput={handleInputChange}
                    />
                </>
            </Header>
            <main className="content container">
                {/* <button className="btn" onClick={()=> console.log("Нажми меня")}>{'Нажми меня'}</button> */}
                <SearchInfo
                    searchCount={cards.length}
                    searchText={searchQuery}
                />
                <Sort />
                <div className="content__cards">
                    {isLoading 
                    ? <Spinner/>
                    : <CardList goods={cards} onProductLike={handleProductLike} currentUser={currentUser}/>
                    }
                    </div>
            </main>
            <Footer/>
        </>
    );
}

export default App;
