import express, { json } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "@repo/backend-common/config";
import {
  CreateUserSchema,
  SignInSchema,
  CreateRoomSchema,
} from "@repo/common/types";
import { middleware } from "./middleware";
import { prismaClient } from "@repo/db/client";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
app.post("/signup", async (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Invalid inputs",
    });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);
    const user = await prismaClient.user.create({
      data: {
        email: parsedData.data.username,
        password: hashedPassword,
        name: parsedData.data.name,
      },
    });

    const token = jwt.sign(
      {
        userId: user.id,
      },
      JWT_SECRET,
    );
    res.json({
      token,
      userId: user.id,
    });
  } catch (e) {
    res.status(411).json({
      message: "User already exits with this username",
    });
  }
});

app.post("/signin", async (req, res) => {
  const parsedData = SignInSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Invalid inputs",
    });
    return;
  }

  const user = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.username,
    },
  });

  if (!user) {
    res.status(411).json({
      message: "Not authorized",
    });
    return;
  }

  const passwordMatch = await bcrypt.compare(
    parsedData.data.password,
    user.password,
  );

  if (!passwordMatch) {
    res.status(403).json({
      message: "Not Authorized",
    });
    return;
  }

  const token = jwt.sign(
    {
      userId: user?.id,
    },
    JWT_SECRET,
  );

  res.json({
    token,
  });
});

app.post("/room", middleware, async (req, res) => {
  const parsedData = CreateRoomSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Invalid inputs",
    });
    return;
  }

  const userId = req.userId as string;
  try {
    const room = await prismaClient.room.create({
      data: {
        slug: parsedData.data.name,
        adminId: userId,
      },
    });

    res.json({
      roomId: room.id,
    });
  } catch (e) {
    res.status(411).json({
      message: "Room alerady exists with this name",
    });
  }
});

app.get("/chats/:roomId", async (req, res) => {
  try {
    const roomId = Number(req.params.roomId);
    const messages = await prismaClient.chat.findMany({
      where: {
        roomId: roomId,
      },
      orderBy: {
        id: "desc",
      },
      take: 1000,
    });
    res.json({
      messages,
    });
  } catch (e) {
    res.json({
      messages: [],
    });
  }
});

app.get("/room/:slug", async (req, res) => {
  const slug = req.params.slug;

  try {
    let room = await prismaClient.room.findFirst({
      where: {
        slug: slug,
      },
    });

    const isId = !isNaN(Number(slug));
    if (!room && isId) {
      room = await prismaClient.room.findFirst({
        where: {
          id: Number(slug),
        },
      });
    }

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    res.json({
      room,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

function main() {
  console.log(`Listeing on port 3001`);
  app.listen( process.env.PORT || 3001);
}

main();
