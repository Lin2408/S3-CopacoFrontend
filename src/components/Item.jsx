
function Item({ name, type, price })  {
    return (
        <div className="computer-part">
            <h3>{name}</h3>
            <p>Type: {type}</p>
            <p>Price: ${price}</p>
        </div>
    );
};

export default Item;