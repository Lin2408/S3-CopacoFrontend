import {NavLink} from "react-router-dom";
import { Fragment } from 'react';

function Item({ name, details, price })  {

    return (

        <div className="item">
            <NavLink to="/Item">
                <img src="https://www.copaco.com/Copaco/static/WFS/copaco-Nederland-Site/-/copaco/nl_NL/L/93093667_2865543118.jpg"
                    alt="placeholder"/>
            </NavLink>
            <div className="item-content">
                <div className="item-top">
                    <NavLink to="/Item"><h3>{name}</h3></NavLink>
                    <div className="item-buttonprice">
                        <span className="item-price">${price}</span>
                        <button >Add</button>
                    </div>
                </div>
                {/*<p className="item-code">{code}</p>*/}

                <p className="item-details">
                    {details.map((detail, index) => (
                        <Fragment key={index}>
                            <span  className="details"><span
                                className="detail-title">{detail.title}</span> {detail.description}</span>
                                {index < details.length - 1 && <span className="item-divider">|</span>}
                        </Fragment>
                    ))}
                </p>

            </div>
        </div>

    );
};

export default Item;