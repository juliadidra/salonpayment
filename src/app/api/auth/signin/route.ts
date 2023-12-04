import { NextRequest, NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const AUTH_TOKEN = process.env.AUTH_TOKEN as string

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
        where: {
            email
        },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            password: true
        }
    });

    if(user) {
        try {
            const check = await bcrypt.compare(password, user.password);
    
            if(check) {
                const { password, ...restUser } = user;
                const token = jwt.sign({ ...restUser  }, AUTH_TOKEN, {
                    expiresIn: 3600
                });

    
                return NextResponse.json({token, user: restUser});
            }
            
        } catch (error) {
            return NextResponse.json({message: "Usuário ou senha incorretos"}, { status: HttpStatusCode.Unauthorized });
        }
    }

    return NextResponse.json({message: "Usuário ou senha incorretos"}, { status: HttpStatusCode.Unauthorized });
}