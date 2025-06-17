import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";
import { wktToGeoJSON } from "@terraformer/wkt";

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



export const getCurrentResidences = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cognitoId } = req.params
        const properties = await prisma.property.findMany({
            where: {tenants:{some:{cognitoId}} },
            include: {
                location: true
            }
        })
        const residencesWithFormattedLocationn = await Promise.all(
            properties.map(async (property) => {
                const coordinates: { coordinates: string }[] = await prisma.$queryRaw`SELECT ST_asText(coordinates) as coordinates 
            from Location where id = ${property.location.id}`
                const geoJSON: any = wktToGeoJSON(coordinates[0]?.coordinates || "")
                const longitude = geoJSON.coordinates[0]
                const latitude = geoJSON.coordinates[1]
                return {
                    ...property,
                    location: {
                        ...property.location,
                        coordinates: {
                            longitude,
                            latitude
                        }
                    }
                }
            })
        )
        res.json(residencesWithFormattedLocationn)
    } catch (error) {
        res.status(500).json({ message: `Error Retrieving Property ${error.message}` })
    }
}

export const addFavoriteProperty = async (req: Request, res: Response): Promise<void> => {
    try {
        const {cognitoId,propertId} = req.params
        const tenant = await prisma.tenant.findUnique({
            where:{cognitoId},
            include:{
                favorites:true
            }
        })
        const propertyIdNumber = Number(propertId)
        const existingFavorites = tenant?.favorites || []
        if(!existingFavorites.some((fav) => fav.id === propertyIdNumber)){
            const updatedTanent = await prisma.tenant.update({
                where:{cognitoId},
                data:{
                    favorites:{connect:{id:propertyIdNumber}}
                }
            })
            res.json(updatedTanent)
        }else{
            res.status(409).json({message:"Property alraedy added to favourites"})
        }
    }catch (error) {
        res.status(500).json({ message: `Error Adding favorite property ${error.message}` })
    }

}
export const removeFavoriteProperty = async (req: Request, res: Response): Promise<void> => {
    try {
        const {cognitoId,propertId} = req.params
        const propertyIdNumber = Number(propertId)
        const updatedTenant = await prisma.tenant.update({
                where:{cognitoId},
                data:{
                    favorites:{disconnect:{id:propertyIdNumber}}
                },
                include:{favorites:true}
            })
        res.json(updatedTenant)
    }catch (error) {
        res.status(500).json({ message: `Error Removing favorite property ${error.message}` })
    }

}
