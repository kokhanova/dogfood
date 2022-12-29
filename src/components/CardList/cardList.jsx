import Card from '../Card/card';
import "./styles.css";


function CardList ({goods, onProductLike, currentUser}) {
    return (
        <div className='cards'>
            {
                goods.map((item, index) => <Card key={item._id} {...item} onProductLike={onProductLike} currentUser={currentUser}/>)
            }
        </div>
    );
}

export default CardList;