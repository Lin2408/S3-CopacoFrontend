import './AdminPage.css';

const AdminPage = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-column">
                    <label htmlFor="ruleName">Rule Name</label>
                    <input type="text" id="ruleName" placeholder="Enter rule name" required />
                </div>
                <div className="form-column">
                    <label htmlFor="ruleCondition">Rule Condition</label>
                    <select id="ruleCondition" required>
                        <option value="">Select condition</option>
                        {/* Add options here */}
                    </select>
                </div>
            </div>

            <div className="form-row">
                <div className="form-column">
                    <label htmlFor="discountPercentage">Discount Percentage</label>
                    <input type="number" id="discountPercentage" placeholder="Enter percentage" min="0" required />
                </div>
                <div className="form-column">
                    <label htmlFor="discountValue">Discount Value</label>
                    <input type="number" id="discountValue" placeholder="Enter value" min="0" required />
                </div>
            </div>

            <div className="button-row">
                <button type="submit" className="create-btn">Create item</button>
                <button type="button" className="import-btn">Import</button>
            </div>
        </form>
    );
};

export default AdminPage;