
import { PrismaClient} from "@prisma/client"
const glabalForPrisma = global as unknown as {prisma?:PrismaClient}

const prisma= glabalForPrisma.prisma || new PrismaClient()

if(process.env.NODE_ENV ==="production") glabalForPrisma.prisma=prisma

export default prisma


