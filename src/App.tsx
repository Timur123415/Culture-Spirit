import { useEffect, useState } from "react"
import { Header } from "./components/Header"
import { useDispatch, useSelector } from "./store/store"
import { fetchProducts, fetchProductsAddToCart, fetchProductsAddToFavorites, selectError, selectLoading, selectProducts } from "./store/product"
import { ICard } from "./types/data"
import { Drawer } from "./components/Drawer"
import { Route, Routes } from "react-router"
import { Home } from "./pages/Home"
import { Favorites } from "./pages/Favorites"
import { Orders } from "./pages/Orders"
import { NotFound } from "./pages/NotFound"

export const App: React.FC = () => {
    const [value, setValue] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()
    const products = useSelector(selectProducts)
    const loading = useSelector(selectLoading)
    const error = useSelector(selectError)


    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto"
    })

    useEffect(() => {
        dispatch(fetchProducts())
    }, [fetchProducts])


    const onClickAddToCart = (obj: ICard) => {
        dispatch(fetchProductsAddToCart({obj: obj}))
    }

    const onClickAddToFavorites = (obj: ICard) => {
        dispatch(fetchProductsAddToFavorites({obj: obj}))
    }

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    return (
        <div className="main">
            {isOpen ? <Drawer setIsOpen={setIsOpen}/> : null}
            <Header setIsOpen={setIsOpen} value={value} setValue={setValue}/>
            <Routes>
                <Route path="*" element={<NotFound/>}/>
                <Route path="/" element={<Home products={products} onClickAddToCart={onClickAddToCart} onClickAddToFavorites={onClickAddToFavorites} value={value}/>}/>
                <Route path="/favorites" element={<Favorites/>}/>
                <Route path="/orders" element={<Orders/>}/>
            </Routes>
        </div>
    )
}