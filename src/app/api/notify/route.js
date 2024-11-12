// app/api/notify/route.js
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST() {
    try {
        // Call the /start-polling endpoint
        const workercall = await axios.get('http://3.134.243.51:3002/start-polling');

        // Return the response directly
        return NextResponse.json(workercall.data);
    } catch (error) {
        console.error('Error calling /start-polling:', error);

        // Return the error message directly as JSON
        return NextResponse.json({ message: error.message });
    }
}
