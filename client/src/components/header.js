import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
    return (<>
        <div>
            <nav>
                <ul className='nav-bar'>
                    <li>
                        <Link className='a' to="/">Customers</Link>
                    </li>
                    <li>
                        <Link className='a' to="/addCustomer">Add Customer</Link>
                    </li>
                </ul>
            </nav>
        </div>
    </>);
};

export default Header;
