import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma  = new PrismaClient()

export const getManager = async (req:Request,res:Response) : Promise<void> => {
    try {
        const {cognitoId} = req.params
        const manager = await prisma.manager.findUnique({
            where:{cognitoId},
        })
        if(manager){
            res.json(manager)
        }else{
            res.status(404).json({message:"Manager not found"})
        }
    } catch (error) {
        res.status(500).json({message:`Error retrieving Manager ${error.message}`})
    }
}
export const createManager = async (req:Request,res:Response) : Promise<void> => {
    try {
        const {cognitoId,name,email,phoneNumber} = req.body
        const manager = await prisma.manager.create({
            data:{
                cognitoId,
                name,
                email,
                phoneNumber
            }
        })
        res.status(201).json(manager)
    } catch (error) {
        res.status(500).json({message:`Error creating Manager ${error.message}`})
    }
}

export const upadteManager = async (req:Request,res:Response) : Promise<void> => {
    try {
        const {cognitoId} = req.params
        const {name,email,phoneNumber} = req.body
        console.log(cognitoId,name,email,phoneNumber)
        const updateManager = await prisma.tenant.update({
            where:{cognitoId},
            data:{
                cognitoId,
                name,
                email,
                phoneNumber
            }
        })
        res.status(201).json(updateManager)
    } catch (error) {
        res.status(500).json({message:`Error updating Manager ${error.message}`})
    }
}