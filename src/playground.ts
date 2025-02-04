import { db } from "./server/db.js";

await db.user.create({
    data: {
        emailAddress: "sadisatsowaladev1@gmail.com",
        firstName: "Dev",
        lastName: "Sadi",
    }
})

// console.log("Hello, tRPC!");
