import { useState } from "react"

type IButton = {
    onClickAdd: () => void;
}

export const Button: React.FC<IButton> = (props) => {
    const {onClickAdd} = props
    const [status, setStatus] = useState('buy')


    const onClickButton = () => {
        if (status === 'buy') {
            setStatus('loading')
        }
        setTimeout(() => {
            setStatus('checkout')
        }, 1200)
    }
    return (
        <>
        {status === 'loading' ? (<div className="add"><span className="spin"></span></div>) : status === 'buy' ? (<div onClick={onClickButton}><div onClick={onClickAdd} className="add">Купить</div></div>) : (<div className="added">Оформить</div>)}
        </>
    )
}