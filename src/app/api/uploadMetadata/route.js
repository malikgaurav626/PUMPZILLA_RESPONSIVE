import { NextResponse } from 'next/server';
import axios from 'axios';
import FormData from 'form-data';

// Replace this with your actual Pinata JWT
const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlZDcyZDg5ZC04Y2IwLTQ4NTktODQ5MC0wYjk4MzY5MzE0MjgiLCJlbWFpbCI6ImRldm9wcy53ZWIuZGV2QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI5NDE4NjdmYTFkYjI0ZjVkMmRkMCIsInNjb3BlZEtleVNlY3JldCI6IjY5NmI0YzI2OWEzNzUyM2NlMWI5Njk1ODE3YTJhNzk5M2FjNTg5OTA4YzcwYjAwZjNiM2JkMDcyOTYxYmYyYmIiLCJpYXQiOjE3MjU5NDE0MDd9.AYWVzBnxdRZA9m_d42-et6-RUdzgXHa8-Q2RjmiEP1w';

// Helper function to upload a file to IPFS using Pinata
const uploadFileToIPFS = async (fileBuffer, filename) => {
    const formData = new FormData();
    formData.append('file', fileBuffer, filename);

    try {
        const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
            maxBodyLength: 'Infinity',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`,
                'Authorization': `Bearer ${JWT}`,
            },
        });
        const ipfsHash = res.data.IpfsHash;
        return `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
    } catch (error) {
        console.error('Error uploading file to IPFS:', error);
        throw error;
    }
};

// Helper function to upload metadata to IPFS using Pinata
const uploadMetadataToIPFS = async (metadata) => {
    const formData = new FormData();
    formData.append('file', Buffer.from(JSON.stringify(metadata)), { filename: 'metadata.json' });

    try {
        const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
            maxBodyLength: 'Infinity',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`,
                'Authorization': `Bearer ${JWT}`,
            },
        });

        const ipfsHash = res.data.IpfsHash;
        return `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
    } catch (error) {
        console.error('Error uploading metadata to IPFS:', error);
        throw error;
    }
};

// API route to handle both image and metadata uploads
export async function POST(req) {
    try {
        const formData = await req.formData(); // Parse the incoming FormData

        // Get form data fields
        const imageFile = formData.get('image');
        const name = formData.get('name');
        const description = formData.get('description');
        const website = formData.get('website');
        const telegram = formData.get('telegram');
        const twitter = formData.get('twitter');
        const creator = formData.get('creator');
        // Removed initialBuy field

        // Ensure required fields are present
        if (!imageFile || !name || !description) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Handle the base64-encoded image
        const base64Image = imageFile.split(',')[1];  // Extract the base64 data
        const imageBuffer = Buffer.from(base64Image, 'base64');  // Convert base64 to buffer

        // Upload the image to IPFS
        const imageUrl = await uploadFileToIPFS(imageBuffer, 'uploaded_image.jpg'); // Use a generic file name or extract one if possible

        // Optionally, convert the image URL to IPFS URI
        const imageHash = imageUrl.split('/').pop(); // Extract the IPFS hash from the URL
        const imageIpfsUri = `ipfs://${imageHash}`;

        // Prepare the metadata object according to ERC-721 standard
        const metadata = {
            name: name,
            description: description,
            image: imageIpfsUri, // Use the IPFS URI format for the image
            website: website || '',
            telegram: telegram || '',
            twitter: twitter || '',
            creator
            // Removed initialBuy field from metadata
        };

        // Upload the metadata to IPFS
        const metadataIpfsUrl = await uploadMetadataToIPFS(metadata);

        const workercall = await axios.get('http://3.134.243.51:3002/start-polling');
        // Capture the response message from /start-polling
        const workermessage = workercall.data;
        console.log(workermessage);

        // Extract the IPFS hash from the metadata URL
        const metadataHash = metadataIpfsUrl.split('/').pop();
        const metadataIpfsUri = `ipfs://${metadataHash}`;

        // Respond with both the HTTP URL and the IPFS URI
        return NextResponse.json({
            success: true,
            metadataIpfsUrl: metadataIpfsUrl, // e.g., https://gateway.pinata.cloud/ipfs/QmakTsyRRmvihYwiAstYPYAeHBfaPYz3v9z2mkA1tYLA4w
            metadataIpfsUri: metadataIpfsUri,  // e.g., ipfs://QmakTsyRRmvihYwiAstYPYAeHBfaPYz3v9z2mkA1tYLA4w
            status: workermessage
        });
    } catch (error) {
        console.error('Error processing the request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

