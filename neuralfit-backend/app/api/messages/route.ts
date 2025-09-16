import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

// GET /api/messages?spaceId=<spaceId>
export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const spaceId = searchParams.get('spaceId');

  if (!spaceId) {
    return NextResponse.json({ error: 'spaceId is required' }, { status: 400 });
  }

  try {
    const messages = await prisma.message.findMany({
      where: { spaceId },
      orderBy: { createdAt: 'asc' },
      include: { sender: { select: { id: true, name: true, image: true } } },
    });
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

// POST /api/messages
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { spaceId, body } = await request.json();

    if (!spaceId || !body) {
      return NextResponse.json({ error: 'spaceId and body are required' }, { status: 400 });
    }

    const newMessage = await prisma.message.create({
      data: {
        spaceId,
        body,
        senderId: session.user.id,
      },
      include: { sender: { select: { id: true, name: true, image: true } } },
    });

    // Note: Supabase Realtime is automatically handled by the database trigger.
    // We just need to insert the data, and the frontend will receive the update.

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error('Error creating message:', error);
    return NextResponse.json({ error: 'Failed to create message' }, { status: 500 });
  }
}
