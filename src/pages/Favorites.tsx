import { useEffect } from "react"
import { fetchProductsDeleteFromFavorites, fetchProductsFavorites, selectProductsFavorites } from "../store/product"
import { useDispatch, useSelector } from "../store/store"

export const Favorites: React.FC = () => {
    const dispatch = useDispatch()
    const productsFavorites = useSelector(selectProductsFavorites)


    useEffect(() => {
        dispatch(fetchProductsFavorites())
    }, [fetchProductsFavorites])

    const onClickDeleteFromFavorites = (id: string) => {
        dispatch(fetchProductsDeleteFromFavorites({id: id}))
    }

    return (
        <div className="content">
            <h2>Избранное</h2>
            <div className="cards">
            {productsFavorites.map((product) => (
                <div className="card" key={product.id}>
                    <img onClick={() => onClickDeleteFromFavorites(product.id)} style={{cursor: 'pointer'}} src="/img/favorited.png" width={30} height={30} alt="favorites"/>
                    <img src={product.image[0]} width={200} height={300} alt="card"/>
                    <h3>{product.title}</h3>
                    <p style={{color: 'gray'}}>Артикул:{product.art}</p>
                    <span>{product.price}руб.</span>
                </div>
            ))}
            </div>
        </div>
    )
}