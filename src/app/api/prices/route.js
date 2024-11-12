// Next.js API Route to return current and yesterday's price data for two tokens
import { NextResponse } from 'next/server';

export async function GET() {
    // Hardcoded current and yesterday's prices for the tokens
    const prices = [
        {
            name: "ExampleToken1",
            symbol: "EXT1",
            token_address: "0x1234567890abcdef1234567890abcdef12345678",
            current_price: 100.50, // Example current price
            yesterday_price: 98.75 // Example yesterday price
        },
        {
            name: "ExampleToken2",
            symbol: "EXT2",
            token_address: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
            current_price: 200.00, // Example current price
            yesterday_price: 195.00 // Example yesterday price
        }
    ];

    // Send response with hardcoded prices
    return NextResponse.json(prices);
}

