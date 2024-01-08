import { connectToDB } from "@/utils/database";
import PoliceCase from "@/models/PoliceCase";

export const POST = async (req) => {
    const reportData = await req.json();

    try {

        await connectToDB();

        const newCase = new PoliceCase({
            caseNumber: reportData.caseNumber,
            reportedBy: reportData.reportedBy,
            dateReported: reportData.dateReported,
            incidentType: reportData.incidentType,
            location: {
                type: 'Point',
                coordinates: [reportData.longitude, reportData.latitude],
            },
            description: reportData.description,
            status: reportData.status,
            assignedOfficer: reportData.assignedOfficer,
            evidence: reportData.evidence,
        });

        // await newCase.save();
        console.log(newCase);
        console.log(reportData.longitude);

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