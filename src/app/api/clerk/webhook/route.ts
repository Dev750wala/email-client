// api/clerk/webhook

import { db } from "@/server/db"

export interface RequestBody {
    data:             Data;
    event_attributes: EventAttributes;
    object:           string;
    timestamp:        number;
    type:             string;
}

export interface Data {
    birthday:                 string;
    created_at:               number;
    email_addresses:          EmailAddress[];
    external_accounts:        any[];
    external_id:              string;
    first_name:               string;
    gender:                   string;
    id:                       string;
    image_url:                string;
    last_name:                string;
    last_sign_in_at:          number;
    object:                   string;
    password_enabled:         boolean;
    phone_numbers:            any[];
    primary_email_address_id: string;
    primary_phone_number_id:  null;
    primary_web3_wallet_id:   null;
    private_metadata:         unknown;
    profile_image_url:        string;
    public_metadata:          unknown;
    two_factor_enabled:       boolean;
    unsafe_metadata:          unknown;
    updated_at:               number;
    username:                 null;
    web3_wallets:             any[];
}

export interface EmailAddress {
    email_address: string;
    id:            string;
    linked_to:     any[];
    object:        string;
    verification:  Verification;
}

export interface Verification {
    status:   string;
    strategy: string;
}

// export interface Metadata {
// }

export interface EventAttributes {
    http_request: HTTPRequest;
}

export interface HTTPRequest {
    client_ip:  string;
    user_agent: string;
}

export const POST = async (req: Request) => {
    const req1 = await req.json()
    const data: RequestBody = req1
    console.log("webhook data", data);

    const emailAddress = data.data.email_addresses[0]?.email_address! as string
    const firstname = data.data.first_name
    const lastname = data.data.last_name
    const imageUrl = data.data.image_url
    const id = data.data.id
    
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
