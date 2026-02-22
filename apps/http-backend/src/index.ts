import express, { json } from "express"
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { CreateUserSchema, SignInSchema, CreateRoomSchema } from "@repo/common/types";
import { middleware } from "./middleware";
import { prismaClient } from "@repo/db/client";
const app = express();
app.use(express.json())
app.post("/signup", async (req, res) => {
    const parsedData = CreateUserSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message: "Invalid inputs"
        })
        return;
    }

    try{
        const user = await prismaClient.user.create({
            data: {
                email: parsedData.data.username,
                // TODO hash the passowrd 
                password: parsedData.data.password,
                name: parsedData.data.name
            }
        })
        res.json({
            userId: user.id
        })
    }catch(e){
        res.status(411).json({
            message: "User already exits with this username"
        })
    }
});

app.post("/signin", async (req, res) => {

    const parsedData = SignInSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message : "Invalid inputs"
        })
        return;
    }

    // TODO comapre the hashed passwords here
    const user = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username,
            password: parsedData.data.password
        }
    })

    if(!user){
        res.status(411).json({
            message: "Not authorized"
        })
        return;
    }

    const token = jwt.sign({
        userId: user?.id
    }, JWT_SECRET);

    res.json({
        token
    })

});

app.post("/room",middleware, async(req, res) => {

    const parsedData = CreateRoomSchema.safeParse(req.body);
    if(!parsedData.success){
       res.json({
        message: "Invalid inputs"
       })
       return;
    }

    // @ts-ignore // TODO: fix this
    const userId = req.userId
    try{
        const room = await prismaClient.room.create({
        data: {
            slug: parsedData.data.name,
            adminId: userId
        }
    })

    res.json({
        roomId: room.id
    })
}catch(e){
    res.status(411).json({
        message: "Room alerady exists with this name"
    })
}
});

app.get("/chat/:roomId", async(req, res) => {
    const roomId = Number(req.params.roomId);
    const messages = await prismaClient.chat.findMany({
        where: {
            roomId: roomId
        },
        orderBy: {
            id: "desc"
        },
        take: 50
    })

    res.json({
        messages
    })
})

function main(){
console.log(`Listeing on port 3001`)
app.listen(3001);
}

main();