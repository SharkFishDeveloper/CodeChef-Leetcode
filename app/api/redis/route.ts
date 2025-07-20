import { Redis } from '@upstash/redis';
import { NextRequest } from 'next/server';

const redis = new Redis({
  url: process.env.REDIS_URL!,
  token: process.env.REDIS_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { problemSlug, timeTaken } = body;

    if (!problemSlug || typeof timeTaken !== "number") {
      return new Response(JSON.stringify({ error: "Invalid input" }), { status: 400 });
    }

    const problemKey = `problem:${problemSlug}`;

    // Increment solvedCount
    const newSolvedCount = await redis.hincrby(problemKey, 'solvedCount', 1);

    // Get previous totalTime
    const prevTime = await redis.hget(problemKey, 'totalTime');
    const prevTotalTime = parseFloat(typeof prevTime === 'string' ? prevTime : '0');

    // Calculate updated values
    const updatedTotalTime = prevTotalTime + timeTaken;
    const avgTime = updatedTotalTime / newSolvedCount;

    // Save totalTime and avgTime
    await redis.hset(problemKey, {
      totalTime: updatedTotalTime.toFixed(2),
      avgTime: avgTime.toFixed(2),
    });

    return new Response(JSON.stringify({
      message: "Updated successfully",
      solvedCount: newSolvedCount,
      avgTime: avgTime.toFixed(2),
    }), { status: 200 });

  } catch (err: any) {
    console.error("POST Error:", err?.message);
    return new Response(JSON.stringify({ error: "Failed to update problem stats" }), {
      status: 500,
    });
  }
}
