import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const post = await prisma.user.create({
        data: {
            id: "1",
            name: "Johnny",
            email: "john1@gmail.com",
            phone: "+66(098)7895995",
            emailVerified: "13:00 PM",
            image: "",
            role: "USER",
            password: "87654321",
            accounts: {},
            sessions: {}, 
            isVerfied: false,
            token: 1,
            createdAt: "",
            updatedAt: "",
        }
    });
    console.log(post);
    
}

main()