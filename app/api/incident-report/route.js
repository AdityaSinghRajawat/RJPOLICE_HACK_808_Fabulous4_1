import { connectToDB } from "@/utils/database";
import Report from '@/models/Report';
import { NextResponse } from "next/server";
import CitizenDetail from "@/components/CitizenDetail";

export async function GET(req) {
  try {
    await connectToDB();
    const incidentReports = await Report.find();
    return NextResponse.json(incidentReports, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching incident reports." }, { status: 500 });
  }
}

export async function POST(req) {
    try {
      await connectToDB();
      const reportData = await req.json();
      console.log(reportData);
      const { incidentDetails, citizenInformation } = reportData.reportData;
      console.log(incidentDetails,citizenInformation);
      
      try {
        if (
          !incidentDetails ||
          !incidentDetails.type ||
          !incidentDetails.description ||
          !incidentDetails.dateTime ||
          !incidentDetails.location ||
          !incidentDetails.location.coordinates ||
          !incidentDetails.location.coordinates.latitude ||
          !incidentDetails.location.coordinates.longitude ||
          !incidentDetails.location.address ||
          !citizenInformation ||
          !citizenInformation.name ||
          !citizenInformation.contact ||
          !citizenInformation.contact.phone ||
          !citizenInformation.contact.email ||
          !citizenInformation.aadharId
        ) {
          throw new Error('Invalid data format. Please provide all required fields.');
        }
  

        const generateRandomId = (length) => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let randomId = '';
            for (let i = 0; i < length; i++) {
                randomId += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return randomId;
        };
  
        let reportId;
        let isIdUnique = false;
  
        while (!isIdUnique) {
            reportId = generateRandomId(16); 
            const existingReport = await Report.findOne({ reportId }); 
  
            if (!existingReport) {
                isIdUnique = true; 
            }
        }
  
        const createdReport = await Report.create({
            incidentDetails,
            citizenInformation,
            reportId,
        });
  
  
        return NextResponse.json({
          status: 'success',
          message: 'Incident report submitted successfully.',
          reportId: createdReport.reportId,
        }, { status: 201 });
      } catch (error) {
        console.error('Validation Error:', error);
        return NextResponse.json({ message: error.message || 'An error occurred during validation.' }, { status: 400 });
      }
    } catch (error) {
      console.error('Database Connection Error:', error);
      return NextResponse.json({ message: 'An error occurred while connecting to the database.' }, { status: 500 });
    }
  }
  

export async function PUT(req) {
  try {
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An error occurred while processing the request.' }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An error occurred while processing the request.' }, { status: 500 });
  }
}
