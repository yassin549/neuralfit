import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

interface Params {
  params: { sessionId: string };
}

// GET /api/sessions/:sessionId/messages - Fetch messages for a session
export async function GET(request: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  const { sessionId } = params;

  if (!session?.user?.id) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const messages = await prisma.message.findMany({
      where: { therapistSessionId: sessionId, senderId: session.user.id },
      orderBy: { createdAt: 'asc' },
      include: { sender: { select: { name: true, image: true } } },
    });
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch messages' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// POST /api/sessions/:sessionId/messages - Create a new message in a session
export async function POST(request: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  const { sessionId } = params;

  if (!session?.user?.id) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { body } = await request.json();
    const newMessage = await prisma.message.create({
      data: {
        body,
        senderId: session.user.id,
        therapistSessionId: sessionId,
      },
    });
    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error('Failed to create message:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to create message' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
