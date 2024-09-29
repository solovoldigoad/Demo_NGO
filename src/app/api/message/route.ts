// src/app/api/message/route.ts

import { NextResponse } from 'next/server';
import { Message } from '@/models/Message';
import dbConnect from '@/lib/mongodb';

// Handle GET requests
export async function GET() {
  await dbConnect(); // Ensure database connection

  try {
    // Fetch all messages from the database
    const messages = await Message.find().sort({ date: -1 }).limit(5); // Fetch last 5 messages
    return NextResponse.json({ messages }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// Handle POST requests
export async function POST(req: Request) {
  await dbConnect(); // Ensure database connection

  try {
    const body = await req.json(); // Extract the JSON body from the request
    const { text } = body;

    // Ensure text is provided
    if (!text) {
      return NextResponse.json({ message: 'Text is required' }, { status: 400 });
    }

    // Check how many messages are in the database
    const messageCount = await Message.countDocuments();

    // If there are already 5 messages, delete the oldest one
    if (messageCount >= 5) {
      // Find the oldest message by sorting by date (ascending) and remove it
      await Message.findOneAndDelete({}, { sort: { date: 1 } });
    }

    // Create a new message instance
    const newMessage = new Message({
      text: text,
      date: Date.now(), // Use current date if date not provided
    });

    // Save the new message in the database
    await newMessage.save();

    return NextResponse.json({ message: 'Message saved successfully', data: newMessage }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
