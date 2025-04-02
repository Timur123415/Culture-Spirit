import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../store/store";
import { fetchProductsAddToOrders, fetchProductsCart, fetchProductsDeleteFromCart, selectProductsCart, selectProductsOrders } from "../store/product";




type IDrawer = {
    setIsOpen: (open: boolean) => void;
}


export const Drawer: React.FC<IDrawer> = (props) => {
    const {setIsOpen} = props
    const dispatch = useDispatch()
    const productsCart = useSelector(selectProductsCart)
    const orderId = useSelector(selectProductsOrders)
    const [status, setStatus] = useState(false)

    useEffect(() => {
        dispatch(fetchProductsCart())
    }, [fetchProductsCart])

    useEffect(() => {
        const closeCartByEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsOpen(false)
            }
        }
        document.addEventListener('keyup', closeCartByEsc)
        return () => {document.removeEventListener('keyup', closeCartByEsc)}
    }, [])

    const onClickDeleteFromCart = (id: string) => {
        dispatch(fetchProductsDeleteFromCart({id: id}))
    }

    const onClickMakeOrder = () => {
        dispatch(fetchProductsAddToOrders({obj: productsCart}))
        productsCart.forEach((product) => {
            dispatch(fetchProductsDeleteFromCart({id: product.id}))
        })
        setStatus(true)
    }

    return (
        <div className="overlay">
            <div className="drawer">
               {status ? <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '150px'}}><img src="/img/order.png" width={300} height={300} alt="order"/><p style={{color: 'black'}}>Ваш заказ № {orderId.map(obj => obj.id)} собирается</p> </div> : <><div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h3 style={{color: "black"}}>Корзина</h3>
                <img onClick={() => setIsOpen(false)} style={{cursor: 'pointer', alignSelf: 'center'}} src="/img/cross.png" width={30} height={30} alt="close"/>
                </div>
                {!productsCart.length ? <div style={{display: 'flex', marginTop: '100px', flexDirection: 'column', alignItems: 'center'}}><img src="/img/trash.png" width={300} height={300} alt="trash"/><p style={{color: 'black'}}>Ваша корзина сейчас пуста</p></div> :
                <><div className="carts">
                {productsCart.map((product) => (
                    <div className="cart" key={product.id}>
                        <img src={product.image[0]} width={150} height={200} alt="cart"/>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                        <h3>{product.title}</h3>
                        <p style={{color: 'gray'}}>Артикул: {product.art}</p>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                        <span className="price">{product.price}руб.</span>
                        <img onClick={() => onClickDeleteFromCart(product.id)} style={{cursor: 'pointer', alignSelf: 'center'}} src="/img/delete.png" width={30} height={30} alt="delete"/>
                    </div>
                    </div>

                ))}
            </div>
            <div className="order-box">
                <button onClick={onClickMakeOrder} className="order-btn">Оформить</button>
                <p style={{color: 'black'}}>Итого.................................................{productsCart.reduce((acc, obj) => acc + obj.price, 0)}руб.</p>
            </div></>}</>}
            </div>
        </div>
    )
}