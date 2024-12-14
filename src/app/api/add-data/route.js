import { connectToDatabase } from '../../../lib/mongodb';
import Freshness from '../models/Freshness';

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const body = await req.json(); // Parse request body
    await connectToDatabase();
    const newEntry = new Freshness(body);
    await newEntry.save();

    return new Response(JSON.stringify({ message: 'Data saved successfully', newEntry }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error saving data', error: error.message }), {
      status: 500,
    });
  }
}