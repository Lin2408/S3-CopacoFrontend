import {NavLink} from "react-router-dom";
import {Fragment} from "react";
import "../../Pages/CSS/DetailedItemOverview.css";

function DetailedItem( { name, code, details, price  }) {

  return (
      <div className="itemDI">
          <NavLink to="/Item">
              <img
                  src="https://www.copaco.com/Copaco/static/WFS/copaco-Nederland-Site/-/copaco/nl_NL/L/93093667_2865543118.jpg"
                  alt="placeholder"/>
          </NavLink>
          <div className="item-content">
              <div className="item-top">
                  <NavLink to="/Item"><h3>{name}</h3></NavLink>
                  <div className="item-buttonprice">

                  </div>
              </div>
              <p className="item-code">{code}</p>
              <p className="itemDI-details">
                   <span className="details">
                                <span className="detail-title">Price: </span>€{price.toFixed(2)}</span>
              </p>

              <p className="itemDI-details">
                  {details.map((detail, index) => (
                      <Fragment key={index}>
                            <span className="details">
                                <span className="detail-title">{detail.title}</span> {detail.description}</span>
                          {index < details.length - 1 && <span className="item-divider">|</span>}
                      </Fragment>
                  ))}
              </p>

          </div>
      </div>
  );
}

export default DetailedItem;