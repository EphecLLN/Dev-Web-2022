import React from "react";
import styled from "styled-components";


const Container = styled.div`
    text-align: center;
`

const Data = () => {
    const [list, setList] = React.useState(null);
    const [orders, setOrders] = React.useState(null);
    const [cart, setCart] = React.useState(null);

    React.useEffect(() => {
        fetch("/flowerlist")
            .then((res) => res.json())
            .then((list) => setList([list.flower1.name, ' ', list.flower1.color, ' ', list.flower1.price, ' ', list.flower2.name, ' ', list.flower2.color, ' ', list.flower2.price, ' ', list.flower3.name, ' ', list.flower3.color, ' ', list.flower3.price]))
    }, [setList]);

    React.useEffect(() => {
        fetch("/orderhistory")
            .then((res) => res.json())
            .then((orders) => setOrders(orders.message))
    }, [setOrders]);

    React.useEffect(() => {
        fetch("/cart")
            .then((res) => res.json())
            .then((cart) => setCart(cart.message))
    }, [setCart]);

    return (
        <div className="Data">
            <Container>
                <p>{!list ? "loading..." : list}</p><br/>
                <p>{!orders ? "loading..." : orders}</p><br/>
                <p>{!cart ? "loading..." : cart}</p>
            </Container>
        </div>
    );
}

export default Data;