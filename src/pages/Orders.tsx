import { useEffect } from "react"
import { fetchProductsOrders, selectProductsOrders } from "../store/product"
import { useDispatch, useSelector } from "../store/store"

export const Orders: React.FC = () => {
    const dispatch = useDispatch()
    const productsOrders = useSelector(selectProductsOrders)


    useEffect(() => {
        dispatch(fetchProductsOrders())
    }, [fetchProductsOrders])

    return (
        <div className="content">
            <h2>История заказов</h2>
            <div className="orders">
                {productsOrders.map((obj) => (
                    <div className="order" key={obj.id}>
                        <h3>Заказ №{obj.id}</h3>
                        <div className="cards">
                            {obj.items.map((item) => (
                                <div key={item.id} className="card">
                                    <img src={item.image[0]} width={200} height={300} alt="card"/>
                                    <h3>{item.title}</h3>
                                    <p style={{color: 'gray'}}>Артикул:{item.art}</p>
                                    <span>{item.price}руб.</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}