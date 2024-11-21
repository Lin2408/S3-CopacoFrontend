import {NavLink} from "react-router-dom";
import {Fragment} from "react";
import "../../Pages/CSS/DetailedItemOverview.css";
import placeholder from "../../assets/placeholder.png";

function DetailedItem({image, name, manufacturer, price, specifications}) {

    return (
        <div className="itemDI">
            <NavLink to="/Item">
                <img
                    src={image && !image.includes('https://inishop.com') ? image : placeholder}
                    alt="item image"/>
            </NavLink>
            <div className="item-content">
                <div className="item-top">
                    <NavLink to="/Item"><h3>{name}</h3></NavLink>
                    <div className="item-buttonprice">

                    </div>
                </div>
                 <p className="item-code">{manufacturer}-{name}</p>
                <p className="itemDI-details">
                   <span className="details">
                                <span className="detail-title">Price: </span>€{parseFloat(price).toFixed(2)}</span>
                </p>

                <p className="itemDI-details">
                    {specifications.slice(0, 3).map((detail, index) => (
                        <Fragment key={index}>
                <span className="details">
                <span className="detail-title">{detail.name}</span> {detail.presentationValue}</span>
                            {index < 2 && <span className="item-divider">|</span>}
                        </Fragment>
                    ))}
                </p>
                {/* <p className="itemDI-details">
              {details.map((detail, index) => (
                  <Fragment key={index}>
                            <span className="details">
                                <span className="detail-title">{detail.title}</span> {detail.description}</span>
                      {index < details.length - 1 && <span className="item-divider">|</span>}
                  </Fragment>
              ))}
          </p>*/}

            </div>
        </div>
    );
}

export default DetailedItem;