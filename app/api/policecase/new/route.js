import { connectToDB } from "@/utils/database";
import PoliceCase from "@/models/PoliceCase";

export const POST = async (req) => {
    const caseData = await req.json();

    try {

        await connectToDB();
        // console.log(caseData.userId);

        const newCase = new PoliceCase({
            // creator: caseData.userId,
            creator: caseData.userEmail,
            caseNumber: caseData.caseNumber,
            reportedBy: caseData.reportedBy,
            dateReported: caseData.dateReported,
            incidentType: caseData.incidentType,
            location: {
                type: 'Point',
                coordinates: [caseData.longitude, caseData.latitude],
            },
            description: caseData.description,
            status: caseData.status,
            assignedOfficer: caseData.assignedOfficer,
            evidence: caseData.evidence,
        });

        // await newCase.save();
        console.log(newCase);

        await newCase.save()
            .then(savedCase => {
                console.log('Police case saved successfully:', savedCase);
            })
            .catch(error => {
                console.error('Error saving police case:', error);
            });

        return new Response(JSON.stringify(newCase), { status: 201 });

    } catch (error) {
        return new Response("Failed to create a new case", { status: 500 });
    }
}