import type { User as PrismaUser, Role } from "@prisma/client"

declare module "next-auth" {
  interface User {
    id: string
    email: string
    name: string
    role: Role
    password?: string
    image?: string | null
  }

  interface Session {
    user: {
      id: string
      role: Role
      email?: string | null
      name?: string | null
      image?: string | null
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: Role
  }
}