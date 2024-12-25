"use server"

import { prismaClient } from "@/lib/db";
import { InboxProps } from "@/utils/types";
import { revalidatePath } from "next/cache";

export async function createInboxMessage(data: InboxProps) {

    console.log("Payload check:", data);
    
    if (data) {
        try {
            const newMessage = await prismaClient.inbox.create({
                data,
            })
            revalidatePath("/dashboard/doctor/inbox")
            console.log("New Message:", newMessage);
            return {
                data: newMessage,
                status: 201,
                error: null,
            };
            
        } catch (error) {
            console.log("Error creating message:", error);
            return {
                data: null,
                error: "Failed to create message",
                status: 500,
            };
        }
    }
    

}

export async function getInboxMessages(recieverId: string) {
    
    try {

        const messages = await prismaClient.inbox.findMany({
            orderBy: {
                createdAt: "desc",
            },
            where: {
                recieverId: recieverId
            }

        });
        return {
            data: messages,
            status: 200,
            error: null,

        };
        
    } catch (error) {
        console.log("Error getting messages:", error);
        return {
            data: null,
            error: "Failed to get messages",
            status: 500,
        };

    }
}

export async function getInboxMessageById(id: string) {
    
    try {

        const message = await prismaClient.inbox.findUnique({
            where: {
                id,
            }

        });
        return message
        
    } catch (error) {
        console.log("Error getting message:", error);
        return null;

    }
}

export async function getInboxSentMessages(senderId: string) {
    
    try {

        const messages = await prismaClient.inbox.findMany({
            orderBy: {
                createdAt: "desc",
            },
            where: {
                senderId: senderId
            }

        });
        return {
            data: messages,
            status: 200,
            error: null,

        };
        
    } catch (error) {
        console.log("Error getting messages:", error);
        return {
            data: null,
            error: "Failed to get messages",
            status: 500,
        };

    }
}

export async function deleteInboxMessage(id: string) {
    
    try {

        const message = await prismaClient.inbox.delete({
            where: {
                id,
            }
            
        });
        revalidatePath("/dashboard/doctor/inbox");
        return {
            ok: true,
            status: 200,
            error: null,

        };
        
    } catch (error) {
        console.log("Error deleting message:", error);
        return {
            data: null,
            error: "Failed to delete message",
            status: 500,
        };

    }

}