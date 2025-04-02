import { useState } from "react"
import { ICard } from "../types/data"
import { Button } from "./ui/Button"

export const Card: React.FC<ICard> = (props) => {
    const {id, image, title, art, price, onPlus, onFav} = props
    const [currentImage, setCurrentImage] = useState(0)
    const [isFav, setIsFav] = useState(false)


    const onClickFav = () => {
        onFav({id, image, title, art, price, onFav, onPlus})
        setIsFav(true)
    }

    const onClickAdd = () => {
        onPlus({id, image, title, art, price, onPlus, onFav})
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
        const {clientX, currentTarget} = e
        const {width, left} = currentTarget.getBoundingClientRect()
        const offsetX = clientX - left
        const persentage = offsetX / width

        const newIndex = Math.floor(persentage * image.length)
        setCurrentImage(Math.min(newIndex, image.length - 1))
    }
    return (
        <div className="card" key={id}>
        {isFav ? <img src="/img/favorited.png" width={30} height={30} alt="favorited"/> : <img onClick={onClickFav} style={{cursor: 'pointer'}} src="/img/favorite.png" width={30} height={30} alt="favorite"/>}
        <img onMouseMove={handleMouseMove} src={image[currentImage]} width={200} height={300} alt="card"/>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '7px'}}>
            {image.map((_, index) => (
                <div onClick={() => setCurrentImage(index)} style={{
                    width: '5px',
                    height: '5px',
                    backgroundColor: currentImage === index ? "orange" : "gray",
                    borderRadius: '10px'
                }}>
                </div>
            ))}
        </div>
        <h3 style={{height: '100px'}}>{title}</h3>
        <p style={{color: 'gray', fontSize: '11px', height: '30px'}}>Артикул:{art}</p>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <span>{price}руб.</span>
        <Button onClickAdd={onClickAdd}/>
        </div>
        </div>
    )
}