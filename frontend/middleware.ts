import { NextRequest, NextResponse } from 'next/server';

const corsOptions = {
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Origin': '*',
};

export function middleware(request: NextRequest) {
    if (request.method === 'OPTIONS') {
        // Return preflight response immediately with CORS headers
        return new NextResponse(null, { headers: corsOptions });
    }

    // Process other requests normally
    const response = NextResponse.next();

    // Apply CORS headers to every response
    Object.entries(corsOptions).forEach(([key, value]) => {
        response.headers.set(key, value);
    });

    return response;
}

export const config = {
    matcher: '/api/:path*',
};
