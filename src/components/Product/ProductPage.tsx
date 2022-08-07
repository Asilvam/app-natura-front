import { useState} from "react";
import {useQuery} from 'react-query';

import {Drawer} from "@mui/material";
import {LinearProgress} from "@mui/material";
import {Grid} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from "@mui/material/Badge";

import {StyledButton, Wrapper} from "./ProductPage.styles";
import Item from "../Item/Item";
import Cart from "../Cart/Cart";

import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export type CartItemType = {
    _id: string;
    category: string;
    description: string;
    path: string;
    price: number;
    title: string;
    inStock: number;
    amount: number;
}

const getProducts = async (limit, page) => {
    const resp = await fetch(`https://app-natura-backend.herokuapp.com/api/products?limit=${limit}&page=${page}`);
    return await (resp).json();
}


const ProductPage = () => {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([] as CartItemType[]);
    const [limit, setLimit] = useState(24);
    const [page, setPage] = useState(1);
    const {data, isLoading, error, isError} = useQuery(['products'], () => getProducts(limit, page));
    console.log('data---> ', data);
    console.log('isLoading---> ', isLoading);
    console.log('isError---> ', isError);
    console.log('error---> ', error);

    const getTotalItems = (items: CartItemType[]) =>
        items.reduce((ack: number, item) => ack + item.amount, 0);

    const handleAddToCart = (clickedItem: CartItemType) => {
        setCartItems(prev => {
            // 1. Is the item already added in the cart?
            const isItemInCart = prev.find(item => item._id === clickedItem._id);

            if (isItemInCart) {
                return prev.map(item =>
                    item._id === clickedItem._id
                        ? {...item, amount: item.amount + 1}
                        : item
                );
            }
            // First time the item is added
            return [...prev, {...clickedItem, amount: 1}];
        })
    };

    const handleRemoveFromCart = (id: string) => {
        setCartItems(prev =>
            prev.reduce((ack, item) => {
                if (item._id === id) {
                    if (item.amount === 1) return ack;
                    return [...ack, {...item, amount: item.amount - 1}];
                } else {
                    return [...ack, item];
                }
            }, [] as CartItemType[])
        );
    };

    if (isLoading) return <LinearProgress/>;
    if (error) return <div>Something went wrong!</div>;
    return (
        <Wrapper>
            <Drawer anchor={"right"} open={cartOpen} onClose={() => setCartOpen(false)}>
                <Cart
                    cartItems={cartItems}
                    addToCart={handleAddToCart}
                    removeFromCart={handleRemoveFromCart}
                />
            </Drawer>
            <StyledButton onClick={() => setCartOpen(true)}>
                <Badge badgeContent={getTotalItems(cartItems)} color={'error'}>
                    <ShoppingCartIcon fontSize="large"/>
                </Badge>
            </StyledButton>
            <Grid container spacing={3}>
                {data?.docs.map(item => (
                    <Grid item key={item._id} xs={12} sm={4}>
                        <Item item={item} handleAddToCart={handleAddToCart}/>
                    </Grid>
                ))}
            </Grid>
            <Stack spacing={4}>
                <Pagination
                    count={data?.totalPages}
                    renderItem={(item) => (
                        <PaginationItem
                            components={{previous: ArrowBackIcon, next: ArrowForwardIcon}}
                            {...item}
                        />
                    )}
                />
            </Stack>
        </Wrapper>
    )
};

export default ProductPage;