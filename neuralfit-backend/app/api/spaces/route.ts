import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const spaces = await prisma.space.findMany({
      include: {
        host: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        startTime: 'desc',
      },
    });

    return NextResponse.json(spaces);
  } catch (error) {
    console.error('Failed to fetch spaces:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch spaces' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
