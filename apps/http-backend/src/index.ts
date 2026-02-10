import express, { json } from "express"
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { CreateUserSchema, SignInSchema, CreateRoomSchema } from "@repo/common/types";
const app = express();

app.get("/signup", (req, res) => {
    const data = CreateUserSchema.safeParse(req.body);
    if(!data.success){
        res.json({
            message: "Invalid inputs"
        })
        return
    }
});

app.post("/signin", (req, res) => {

    const data = SignInSchema.safeParse(req.body);
    if(!data.success){
        res.json({
            message : "Invalid inputs"
        })
        return;
    }

    const userId = 1;
    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        token
    })

});

app.post("/room", (req, res) => {

    const data = CreateRoomSchema.safeParse(req.body);
    

});




function main(){
console.log(`Listeing on port 3001`)
app.listen(3001);
}

main();