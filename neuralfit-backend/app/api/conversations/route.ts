import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

// GET /api/conversations - Fetch all conversations for the current user
export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        participants: {
          some: {
            userId: session.user.id,
          },
        },
      },
      include: {
        participants: {
          include: {
            user: {
              select: { id: true, name: true, image: true },
            },
          },
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });
    return NextResponse.json(conversations);
  } catch (error) {
    console.error('Failed to fetch conversations:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch conversations' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// POST /api/conversations - Create a new conversation
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { participantIds, name } = await request.json();
    const allParticipantIds = [...new Set([session.user.id, ...participantIds])];

    // For 1-on-1 chats, check if a conversation already exists
    if (allParticipantIds.length === 2) {
      const existingConversation = await prisma.conversation.findFirst({
        where: {
          AND: [
            { participants: { some: { userId: allParticipantIds[0] } } },
            { participants: { some: { userId: allParticipantIds[1] } } },
            { participants: { every: { userId: { in: allParticipantIds } } } },
          ],
        },
      });

      if (existingConversation) {
        return NextResponse.json(existingConversation);
      }
    }

    // If no existing conversation, create a new one
    const newConversation = await prisma.conversation.create({
      data: {
        name,
        participants: {
          create: allParticipantIds.map((id) => ({ userId: id })),
        },
      },
    });

    return NextResponse.json(newConversation, { status: 201 });
  } catch (error) {
    console.error('Failed to create conversation:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to create conversation' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
