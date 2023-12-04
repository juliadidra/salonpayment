import { NextRequest, NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const ADMIN_AUTH = process.env.ADMIN_AUTH as string;

export async function POST(req: NextRequest) {
    const { email, name, password } = await req.json();
    const auth = req.headers.get("auth")

    if(auth !== ADMIN_AUTH) {
        return NextResponse.json({message: "Token Inválido"}, { status: HttpStatusCode.Unauthorized });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
        data: {
            email,
            name,
            password: hashedPassword
        }
    });

    return NextResponse.json({message: "success"});
}