import { NextRequest, NextResponse } from 'next/server';

const allowedOrigins = ['https://scheme-ai.vercel.app'];

const corsOptions = {
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Origin': '*',
};

export function middleware(request: NextRequest) {
    // Extract the Origin header
    const origin = request.headers.get('origin') ?? '';

    // Check if the request's origin is allowed
    const isAllowedOrigin = allowedOrigins.includes(origin);

    // Handle preflight (CORS OPTIONS) requests
    if (request.method === 'OPTIONS') {
        const preflightHeaders = {
            ...(isAllowedOrigin ? { 'Access-Control-Allow-Origin': origin } : {}),
            ...corsOptions,
        };
        return new NextResponse(null, { headers: preflightHeaders });
    }

    // Handle normal API requests
    const response = NextResponse.next();

    if (isAllowedOrigin) {
        response.headers.set('Access-Control-Allow-Origin', origin);
    }

    Object.entries(corsOptions).forEach(([key, value]) => {
        response.headers.set(key, value);
    });

    return response;
}

export const config = {
    matcher: '/api/:path*',
};
