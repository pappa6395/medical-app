"use server"

import { TokenData } from "@/utils/types";
import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";



export async function generateSecureToken (data: TokenData) {

    const secret = process.env.HMS_SECRET;
    const apiKey = process.env.NEXT_PUBLIC_HMS_API_KEY;

    const { roomId, userName, role } = data;

    if (!secret || !apiKey) {
        console.log("Missing HMS_SECRET or NEXT_PUBLIC_HMS_API_KEY");
        
        return {
            token: null,
            status: 500,
            error: "Missing HMS api credentials.",
            
        };
    };

    try {
        //Generate token for the user
        const token = jwt.sign(
            {
                access_key: apiKey,
                room_id: roomId, //The room this user is allowed to access
                user_id: userName, //The user's name or ID
                role: role, // host or guest
                type: "app",
                version: 2,
                jti: uuidv4(), // Unique identifier for the token
                iat: Math.floor(Date.now() / 1000), //Issued at
                exp: Math.floor(Date.now() / 1000) + 60 * 60, // Expires in 1 hour
            },
            secret,
            { algorithm: "HS256" }
        );
        return {
            token,
            status: 200,
            error: null,
            
        };
        
    } catch (err) {
        console.log("Failed generating token:", err);
        return {
            token: null,
            status: 500,
            error: "Failed generating token",
            
        };
    };
};

export async function createRoom(roomName: string) {

    console.log("Payload checked:", roomName);
    const secret = process.env.HMS_SECRET;
    const apiKey = process.env.NEXT_PUBLIC_HMS_API_KEY;

    try {
        const token = jwt.sign(
            {
            access_key: apiKey,
            type: "management",
            jti: uuidv4(),
            },
            secret??"",
            { algorithm: "HS256", expiresIn: "1h" }
        )
        const res = await fetch("https://api.100ms.live/v2/rooms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: roomName, // The name of the appointment room
                description: "Doctor-Patient Appointment Room",
                template_id: "6773f3844b6eb78daeecd813", // optionally, use a predefined template
            }),
        })
        const roomData = await res.json();
        console.log("Room data:", roomData);
        
        if (res.ok) {
            return {
                roomId: roomData.id,
                status: 200,
                error: null,
            };
        } else {
            console.log("Failed creating room:", roomData);
            return {
                roomId: null,
                status: 500,
                error: "Failed creating room",
            };
        }
    } catch (err) {
        console.log("Room creation failed", err);
        return {
            roomId: null,
            status: 500,
            error: "Room creation failed",
        };
    }
}