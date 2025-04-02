import { Card } from "../components/Card";
import { ICard } from "../types/data"

type IHome = {
    products: ICard[],
    value: string,
    onClickAddToCart: (obj: ICard) => void,
    onClickAddToFavorites: (obj: ICard) => void;
}


export const Home: React.FC<IHome> = (props) => {
    const {products, value, onClickAddToCart, onClickAddToFavorites} = props
    return (
        <div className="content">
        <h2>Товары</h2>
        <div className="cards">
            {products.filter((product) => product.title.toLowerCase().includes(value.toLowerCase())).map((product) => <Card key={product.id} onFav={onClickAddToFavorites} onPlus={onClickAddToCart} id={product.id} image={product.image} title={product.title} art={product.art} price={product.price}/>)}
        </div>
    </div>
    )
}