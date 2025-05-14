import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { createUserSchema } from "../validators/user.validator.js"
import prisma from '../lib/prisma.js'
import { ApiResponse } from "../utils/ApiResponse.js"
import { hashPassword } from "../utils/password.js"

export const loginUser = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required")
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if (!user) {
        throw new ApiError(401, "Invalid email or password")
    }

    // Check if password is correct
    const isMatch = hashPassword(password, user.password)

    if (!isMatch) {
        throw new ApiError(401, "Invalid email or password")
    }

    res.status(200).json(
        new ApiResponse(200, {user}, "Login successful")
    )
})

export const registerUser = asyncHandler(async (req, res) => {
        const {firstName, lastName, email, password, phone, role,} = createUserSchema.parse(req.body)

        const userExists = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (userExists) {
         throw new ApiError(400, "User already exists")
        }

        // Hash the password
        const hashedPassword = hashPassword(password)

        const createdUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                phone,
                role
            }
        })

        res.status(201).json(
           new ApiResponse(200,createdUser, "User created successfully")
        )
   
}
)