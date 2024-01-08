import { connectToDB } from "@/utils/database";
import PoliceCase from "@/models/PoliceCase";

export const GET = async (req) => {
    try {
        await connectToDB();
        const cases = await PoliceCase.find({});

        return new Response(JSON.stringify(cases), { status: 200 });

    } catch (error) {
        return new Response("Failed to fetch all reports", { status: 500 });
    }
}