import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

// GET /api/stats - Fetch stats for the current user
export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    let userStats = await prisma.userStats.findUnique({
      where: { userId: session.user.id },
    });

    // If no stats exist for the user, create a default entry
    if (!userStats) {
      userStats = await prisma.userStats.create({
        data: {
          userId: session.user.id,
        },
      });
    }

    return NextResponse.json(userStats);
  } catch (error) {
    console.error('Failed to fetch or create user stats:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to process stats' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
