import { Request, Response } from "express";
import { db } from "../database";
import { vaults } from "../database/schemas";

const createbox = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nickname } = req.body;

        if (!nickname) {
            res.status(400).json({ msg: "nickname is required" });
            return;
        }

        console.log("req.userId:", req.userId); // Depura aquí

        const newBox = await db.insert(vaults).values({
            nickname: nickname,
            status: true,
            userId: req.userId // Usamos el id del token
        }).returning();

        if (!newBox) {
            res.status(401).json({ msg: "Error creating box" });
            return;
        }

        res.status(200).json({
            msg: "Box created successfully",
            box: newBox
        });
        console.log("Box created successfully");
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
};
export { createbox };