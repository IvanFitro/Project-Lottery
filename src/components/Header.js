import React from "react";
import { Menu, Button, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";

export default() => {
    return (
        
        <Menu stackable style={{marginTop: "50px"}}>

            <Button color="blue" as={Link} to="/">
                Token ERC20 Managment
            </Button>

            <Button color="green" as={Link} to="/loteria">
                Lottery Tickets Managment
            </Button>

            <Button color="orange" as={Link} to="/premios">
                Lottery Awards
            </Button>

            <Button color="twitter" href="https://twitter.com/FitroIvan">
                <Icon name="twitter"> </Icon> Twitter
            </Button>


        </Menu>
        
    );
}
