import { z } from "zod";

export const CreateUserSchema = z.object({
    username: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(8, {message: "password should be greater than 8 chars"}).max(50),
    name:     z.string()
})

export const SignInSchema = z.object({
    username: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(8, {message: "password should be greater than 8 chars"}).max(50)
})

export const CreateRoomSchema = z.object({
    name: z.string().min(3, {message: "room name can't be empty"}).max(20)
})