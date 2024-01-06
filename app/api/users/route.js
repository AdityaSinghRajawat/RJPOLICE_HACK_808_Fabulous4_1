import User from "@/models/User"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectToDB } from "@/utils/database"

export async function POST(req) {
  try {
    await connectToDB()

    const userData = await req.json()

    //Confirm data exists
    if (!userData?.email || !userData.password) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      )
    }

    // check for duplicate emails
    const duplicate = await User.findOne({ email: userData.email })

    if (duplicate) {
      return NextResponse.json({ message: "Duplicate Email" }, { status: 409 })
    }

    const hashPassword = await bcrypt.hash(userData.password, 10)
    userData.password = hashPassword

    await User.create(userData)

    return NextResponse.json(
      { message: "User Created.", user: userData },
      { status: 201 }
    )
  } catch (error) {
    console.log(err)
    return NextResponse.json({ message: "Error", error }, { status: 500 })
  }
}
