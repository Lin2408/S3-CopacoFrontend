
function Item({ name, code, details, price })  {

    return (
        <div className="item">
            <img src="https://www.copaco.com/Copaco/static/WFS/copaco-Nederland-Site/-/copaco/nl_NL/L/93093667_2865543118.jpg" alt="placeholder" />
            <div className="item-content">
                <h3>{name}</h3>
                <p className="item-code">{code}</p>

                <p className="item-details"> {details.join(' | ')}   </p>

                <p className="item-price">Price: ${price}</p>
            </div>

        </div>
    );
};

export default Item;