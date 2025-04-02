export interface ICard {
    id: string,
    image: string[],
    title: string,
    art: string,
    price: number,
    onPlus: (obj: ICard) => void,
    onFav: (obj: ICard) => void;
}


export interface ICards {
    id: number,
    items: ICard[]
}