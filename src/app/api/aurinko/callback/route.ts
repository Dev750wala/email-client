// /api/aurinko/callback

import { exchangeCodeForToken, getAccountDetails } from "@/lib/aurinko";
import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server";
import { waitUntil } from "@vercel/functions"
import axios from "axios";

export const GET = async (req: NextRequest, res: Response) => {
    const { userId } = await auth();
    if(!userId) NextResponse.json({message: 'Unauthorized'}, {status: 401});
    
    const params = req.nextUrl.searchParams;
    const status = params.get('status');
    if(status !== 'success') return NextResponse.json({message: 'Failed to link account'}, {status: 400});
    
    // code to exchange for access token
    const code = params.get('code')
    if(!code) return NextResponse.json({message: 'Code not found'}, {status: 400});
    
    const token = await exchangeCodeForToken(code)
    if(!token) return NextResponse.json({message: 'Failed to exchange code for token'}, {status: 400});
    
    const accountDetails = await getAccountDetails(token.accessToken)
    
    console.log("userId", userId); 
    console.log("accountDetails", accountDetails);
    console.log("token", token);
    console.log("userId", userId);
    
    await db.account.upsert({
        where: {
            id: token.accountId.toString()
        },
        update: {
            accessToken: token.accessToken,
        },
        create: {
            id: token.accountId.toString(),
            userId: userId as string,
            emailAddress: accountDetails?.email!,
            name: accountDetails?.name!,
            accessToken: token.accessToken,
        }
    })
    
    // trigger initia-sync route
    waitUntil(
        axios.post(`${process.env.NEXT_PUBLIC_URL}/api/initial-sync`, {
            accountId: token.accountId.toString(),
            userId
        }).then(response => {
            console.log("INITIAL SYNC TRIGGERED", response.data);
            
        })
    )

    return NextResponse.redirect(new URL("/mail", process.env.NEXT_PUBLIC_URL).toString(), {status: 302});

}