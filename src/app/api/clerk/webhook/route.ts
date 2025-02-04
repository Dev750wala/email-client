// api/clerk/webhook

export const POST = async (req: Request, res: Response) => {
    const { data } = await req.json()
    console.log("webhook data", data);

    return new Response("ok", {status: 200})
    
}
