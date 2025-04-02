import { Link } from "react-router";

type IHeader = {
    value: string,
    setValue: (val: string) => void,
    setIsOpen: (open: boolean) => void;
}

export const Header: React.FC<IHeader> = (props) => {
    const {value, setValue, setIsOpen} = props
    return (
        <header className="header">
                <div>
               <Link to="/" style={{color: "white", textDecoration: 'none'}}><h1>Culture Spirit</h1></Link>
                <p>Лучший магазин спорт товаров</p>
                </div>
                <div className="search">
                    <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Найти что нибудь" className="search-input"/>
                    {value && <img onClick={() => setValue('')} style={{cursor: 'pointer', position: 'absolute', marginLeft: '420px'}} src="/img/cross.png" width={20} height={20} alt="cross"/>}
                    <img src="/img/search.png" width={30} height={30} alt="search"/>
                </div>
                <ul className="header__list">
                   <Link to="/dds"><li className="header__item"><img src="/img/user.png" width={30} height={30} alt="profile"/></li></Link>
                   <Link to="/orders"><li className="header__item"><img src="/img/box.png" width={30} height={30} alt="orders"/></li></Link>
                   <Link to="/favorites"><li className="header__item"><img src="/img/favorites.png" width={30} height={30} alt="favorites"/></li></Link>
                    <li onClick={() => setIsOpen(true)} className="header__item"><img src="/img/cart.png" width={30} height={30} alt="cart"/></li>
                </ul>
            </header>
    )
}