import { connectToDatabase } from '../../../lib/mongodb';
import Freshness from '../models/Freshness';

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();
    const data = await Freshness.find().sort({ timestamp: -1 });

    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error fetching data', error: error.message }), {
      status: 500,
    });
  }
}
