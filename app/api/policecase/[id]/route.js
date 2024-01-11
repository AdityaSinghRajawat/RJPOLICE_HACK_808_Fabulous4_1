import { connectToDB } from "@/utils/database";
import PoliceCase from "@/models/PoliceCase";

// GET (read)

export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        const policecase = await PoliceCase.findById(params.id);

        if (!policecase) return Response("Police Case not found", { status: 404 });

        return new Response(JSON.stringify(policecase), { status: 200 });

    } catch (error) {
        return new Response("Failed to fetch Police Case", { status: 500 });
    }
}

// PATCH (update)

export const PATCH = async (req, { params }) => {

    const caseData = await req.json();

    try {
        await connectToDB();
        const existingCase = await PoliceCase.findById(params.id);

        if (!existingCase) return Response("Police Case not found", { status: 404 });

        existingCase.caseNumber = caseData.caseNumber;
        existingCase.reportedBy = caseData.reportedBy;
        existingCase.dateReported = caseData.dateReported;
        existingCase.incidentType = caseData.incidentType;
        existingCase.location = {
            type: 'Point',
            coordinates: [caseData.longitude, caseData.latitude]
        }
        existingCase.description = caseData.description;
        existingCase.status = caseData.status;
        existingCase.assignedOfficer = caseData.assignedOfficer;
        existingCase.evidence = caseData.evidence;

        await existingCase.save();

        return new Response(JSON.stringify(existingCase), { status: 200 });

    } catch (error) {
        return new Response("Failed to update Police Case", { status: 500 });
    }
}

// DELETE (delete)

export const DELETE = async (req, { params }) => {

    try {
        await connectToDB();
        await PoliceCase.findByIdAndDelete(params.id);

        return new Response("Police Case deleted successfully", { status: 200 });

    } catch (error) {
        return new Response("Failed to delete Police Case", { status: 500 });
    }
}