import './ItemDetailsPage.css';

const ItemDetailsPage = () => {
    return (
        <div className="product-container">
            <div className="product-image">
                <img src="path_to_your_image.jpg" alt="AMD Ryzen 7 7800X3D 4.2 GHz 8-Core Processor" />
            </div>
            <div className="product-details">
                <h1>AMD Ryzen 7 7800X3D 4.2 GHz 8-Core Processor</h1>
                <div className="features">
                    <h2>Features</h2>
                    <ul>
                        <li>Processor Speed: 4.20 GHz</li>
                        <li>Processor Cores: 8</li>
                        <li>Socket: AM5</li>
                    </ul>
                </div>
                <div className="price">
                    <p>€558.58</p>
                </div>
                <button className="add-to-cart">Add to Cart</button>
            </div>
        </div>
    );
};

export default ItemDetailsPage;