"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

// Define the message type
interface Message {
  text: string;
  date: string; // You might want to use Date if it's a Date object
}

export function InfiniteMovingCardsDemo() {
  // Type the messages state as an array of Message objects
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessage = async () => {
      const response = await fetch("/api/message");
      const data = await response.json();
      setMessages(data.messages);
    };
    fetchMessage();
  }, []);

  return (
    <div className="h-[18rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden ">
      <InfiniteMovingCards
        items={messages.map((message) => ({
          quote: "new Updates", // message content
          name: new Date(message.date).toLocaleDateString(), // formatted date
          title: message.text, // static title or dynamic if needed
        }))}
        direction="right"
        speed="normal"
      />
    </div>
  );
}

