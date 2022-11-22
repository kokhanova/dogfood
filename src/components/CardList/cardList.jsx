import Card from '../Card/card';
import "./styles.css";


function CardList ({goods}) {
    return (
        <div className='cards'>
            {
                goods.map((item, index) => <Card key={index} {...item}/>)
            }
        </div>
    );
}

export default CardList;