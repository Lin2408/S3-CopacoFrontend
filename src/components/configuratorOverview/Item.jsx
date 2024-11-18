import {NavLink} from "react-router-dom";
import { Fragment } from 'react';

function Item({ part, onSelect}) {

    return (

        <div className="item">
            <NavLink to="/Item">
                <img src={part.image}
                    alt="placeholder"/>
            </NavLink>
            <div className="item-content">
                <div className="item-top">
                    <NavLink to="/Item"><h3>{part.name}</h3></NavLink>
                    <div className="item-buttonprice">
                        <span className="item-price">$ {parseFloat(part.price).toFixed(2)}</span>
                        <button onClick={() => onSelect(part)}>Add</button>
                    </div>
                </div>
                <p className="item-code">{part.manufacturer}-{part.name}</p>

                {/*<p className="item-details">
                    {details.map((detail, index) => (
                        <Fragment key={index}>
                            <span  className="details"><span
                                className="detail-title">{detail.title}</span> {detail.description}</span>
                                {index < details.length - 1 && <span className="item-divider">|</span>}
                        </Fragment>
                    ))}
                </p>*/}

            </div>
        </div>

    );
};

export default Item;