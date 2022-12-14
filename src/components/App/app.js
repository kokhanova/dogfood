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

function App() {
    const [cards, setCards] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const debounceSearchQuery = useDebounce(searchQuery, 500);

    const handleRequest = () => {
        // const filterCards = cards.filter( item => item.name.toUpperCase().includes(searchQuery.toUpperCase()));
        // setCards(filterCards);
        api.search(debounceSearchQuery)
            .then((searchResult) => {
                setCards(searchResult);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        console.log(123);
        Promise.all([api.getProductList(), api.getUserInfo()])
            .then(([productData, userData]) => {
                setCurrentUser(userData);
                setCards(productData.products);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        handleRequest();
        console.log("INPUT", debounceSearchQuery);
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
                    console.log('???????????????? ???? ????????????', cardState);
                    console.log('???????????????? ?? ??????????????', newCard);
                    return cardState._id === newCard._id ? newCard : cardState;
                })

                setCards(newProducts);
            })
    }

    return (
        <>
            <Header user={currentUser} onUpdateUser={handleUpdateUser}>
                <>
                    <Logo className="logo logo_place_header" href="/" />
                    <Search
                        onSubmit={handleFormSubmit}
                        onInput={handleInputChange}
                    />
                </>
            </Header>
            <main className="content container">
                {/* <button className="btn" onClick={()=> console.log("?????????? ????????")}>{'?????????? ????????'}</button> */}
                <SearchInfo
                    searchCount={cards.length}
                    searchText={searchQuery}
                />
                <Sort />
                <div className="content__cards">
                    <CardList goods={cards} onProductLike={handleProductLike} currentUser={currentUser}/>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default App;
