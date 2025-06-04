import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma  = new PrismaClient()

export const getTenant = async (req:Request,res:Response) : Promise<void> => {
    try {
        const {cognitoId} = req.params
        const tenant = await prisma.tenant.findUnique({
            where:{cognitoId},
            include:{
                favorites:true,
            }
        })
        if(tenant){
            res.json(tenant)
        }else{
            res.status(404).json({message:"Tenant not found"})
        }
    } catch (error) {
        res.status(500).json({message:`Error retrieving Tenant ${error.message}`})
    }
}
export const createTenant = async (req:Request,res:Response) : Promise<void> => {
    try {
        const {cognitoId,name,email,phoneNumber} = req.body
        console.log(cognitoId,name,email,phoneNumber)
        const tenant = await prisma.tenant.create({
            data:{
                cognitoId,
                name,
                email,
                phoneNumber
            }
        })
        res.status(201).json(tenant)
    } catch (error) {
        res.status(500).json({message:`Error creating Tenant ${error.message}`})
    }
}

export const upadteTenant = async (req:Request,res:Response) : Promise<void> => {
    try {
        const {cognitoId} = req.params
        const {name,email,phoneNumber} = req.body
        console.log(cognitoId,name,email,phoneNumber)
        const updateTenant = await prisma.tenant.update({
            where:{cognitoId},
            data:{
                cognitoId,
                name,
                email,
                phoneNumber
            }
        })
        res.status(201).json(updateTenant)
    } catch (error) {
        res.status(500).json({message:`Error updating Tenant ${error.message}`})
    }
}

