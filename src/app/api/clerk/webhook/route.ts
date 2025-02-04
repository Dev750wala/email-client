// api/clerk/webhook

import { db } from "@/server/db"

export const POST = async (req: Request) => {
    const { data } = await req.json()
    // console.log("webhook data", data);

    const emailAddress = data.email_addresses[0].email_address
    const firstname = data.first_name
    const lastname = data.last_name
    const imageUrl = data.image_url
    const id = data.id
    
    await db.user.create({
        data: {
            id: id,
            emailAddress: emailAddress,
            firstName: firstname,
            lastName: lastname,
            imageUrl: imageUrl
        }
    })

    return new Response("ok", {status: 200})
    
}
