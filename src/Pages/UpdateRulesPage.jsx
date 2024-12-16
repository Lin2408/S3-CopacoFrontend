import React from 'react';
import { useParams } from 'react-router-dom';

const UpdateRulesPage = () => {
    const { ruleId } = useParams();

    return (
        <div>
            <h1>Update Rule</h1>
            <p>Rule ID: {ruleId}</p>
        </div>
    );
};

export default UpdateRulesPage;