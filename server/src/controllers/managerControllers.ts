import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { wktToGeoJSON } from "@terraformer/wkt";

const prisma = new PrismaClient()

export const getManager = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cognitoId } = req.params
        const manager = await prisma.manager.findUnique({
            where: { cognitoId },
        })
        if (manager) {
            res.json(manager)
        } else {
            res.status(404).json({ message: "Manager not found" })
        }
    } catch (error) {
        res.status(500).json({ message: `Error retrieving Manager ${error.message}` })
    }
}
export const createManager = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cognitoId, name, email, phoneNumber } = req.body
        const manager = await prisma.manager.create({
            data: {
                cognitoId,
                name,
                email,
                phoneNumber
            }
        })
        res.status(201).json(manager)
    } catch (error) {
        res.status(500).json({ message: `Error creating Manager ${error.message}` })
    }
}

export const upadteManager = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cognitoId } = req.params
        const { name, email, phoneNumber } = req.body
        console.log(cognitoId, name, email, phoneNumber)
        const updateManager = await prisma.tenant.update({
            where: { cognitoId },
            data: {
                cognitoId,
                name,
                email,
                phoneNumber
            }
        })
        res.status(201).json(updateManager)
    } catch (error) {
        res.status(500).json({ message: `Error updating Manager ${error.message}` })
    }
}

export const getManagerProperties = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    const properties = await prisma.property.findMany({
      where: { managerCognitoId: cognitoId },
      include: {
        location: true,
      },
    });

    const propertiesWithFormattedLocation = await Promise.all(
      properties.map(async (property) => {
        const coordinates: { coordinates: string }[] =
          await prisma.$queryRaw`SELECT ST_asText(coordinates) as coordinates from "Location" where id = ${property.location.id}`;

        const geoJSON: any = wktToGeoJSON(coordinates[0]?.coordinates || "");
        const longitude = geoJSON.coordinates[0];
        const latitude = geoJSON.coordinates[1];

        return {
          ...property,
          location: {
            ...property.location,
            coordinates: {
              longitude,
              latitude,
            },
          },
        };
      })
    );

    res.json(propertiesWithFormattedLocation);
  } catch (err: any) {
    res
      .status(500)
      .json({ message: `Error retrieving manager properties: ${err.message}` });
  }
};