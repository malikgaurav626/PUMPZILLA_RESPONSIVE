import { NextResponse } from 'next/server';  // Import the Next.js server response
import database from '../db';  // Import the PostgreSQL database connection

// Define the GET handler for the /api/tokens endpoint
export async function GET() {
    try {
        // Query to fetch all token metadata from the "token_metadata" table
        const query = `
            SELECT token_address, pool_address, name, description, image, website, telegram, twitter, creator, created_at
            FROM token_metadata;
        `;

        const result = await database.query(query);

        if (result.rows.length === 0) {
            return NextResponse.json(
                { success: false, message: 'No token metadata found' },
                { status: 404 }
            );
        }

        // Return the result as JSON
        return NextResponse.json(
            { success: true, data: result.rows },
            { status: 200 }
        );
    } catch (error) {
        // If something goes wrong, return a 500 error
        console.error('Error fetching token metadata:', error);
        return NextResponse.json(
            { success: false, message: 'Error fetching token metadata' },
            { status: 500 }
        );
    }
}
