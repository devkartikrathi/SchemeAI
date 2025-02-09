'use client';

import React from 'react';

const Spinner = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="relative w-4 h-4">
                <div className="absolute border-2 border-gray-700 opacity-50 rounded-full animate-ping w-full h-full"></div>
                <div className="absolute border-2 border-gray-500 opacity-40 rounded-full animate-ping w-full h-full delay-150"></div>
            </div>
        </div>
    );
};

export default Spinner;