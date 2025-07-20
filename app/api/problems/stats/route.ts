import { Redis } from '@upstash/redis';
import { NextRequest } from 'next/server';

const redis = new Redis({
  url: process.env.REDIS_URL!,
  token: process.env.REDIS_TOKEN!,
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const problemSlug = searchParams.get('slug');

  if (!problemSlug) {
    return new Response(JSON.stringify({ error: 'Problem slug is required' }), { status: 400 });
  }

  const problemKey = `problem:${problemSlug}`;

  try {
    const [solvedCountRaw, avgTimeRaw] = await Promise.all([
        redis.hget(problemKey, 'solvedCount'),
        redis.hget(problemKey, 'avgTime'),
    ]);
    //@ts-ignore
    const solvedCount = parseInt(solvedCountRaw);
    const avgTime = typeof avgTimeRaw === 'string' ? parseFloat(avgTimeRaw) : 0;

    console.log("Solved:", solvedCount, "Avg:", avgTime);

    return new Response(
    JSON.stringify({ solvedCount, avgTime }),
    { status: 200 }
    );
  } catch (err: any) {
    console.error('Redis fetch error:', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch problem stats' }), { status: 500 });
  }
}
