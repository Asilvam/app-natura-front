import {Button} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
// Types
import { CartItemType } from '../Product/ProductPage';
// Styles
import { Wrapper } from './CartItem.styles';
import React from "react";

type Props = {
    item: CartItemType;
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: string) => void;
};

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => (
    <Wrapper>
        <div>
            <h4>{item.title}</h4>
            <div className='information'>
                <p>Price: ${item.price}</p>
                <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
            </div>
            <div className='buttons'>
                <Button
                    size='small'
                    disableElevation
                    variant='contained'
                    onClick={() => removeFromCart(item._id)}
                >
                    <RemoveCircleOutlineIcon/>
                </Button>
                <p>{item.amount}</p>
                <Button
                    size='small'
                    disableElevation
                    variant='contained'
                    onClick={() => addToCart(item)}
                >
                    <AddCircleOutlineIcon/>
                </Button>
            </div>
        </div>
        <img src={item.path} alt={item.title} />
    </Wrapper>
);

export default CartItem;