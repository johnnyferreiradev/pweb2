import React from 'react';

import './style.css';

export function TextBlue({ children }) {
    return (
        <span className="text-blue">{children}</span>
    );
};

export function TextRed({ children }) {
    return (
        <span className="text-red">{children}</span>
    );
};
