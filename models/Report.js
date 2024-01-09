import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
 incidentDetails: {
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    location: {
      type: {
        coordinates: {
          latitude: Number,
          longitude: Number,
        },
        address: String,
      },
      required: true,
    },
    additionalDetails: {
      type: String,
      default: '',
    },
 },
 citizenInformation: {
    name: {
      type: String,
      required: true,
    },
    contact: {
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    otherIdentifiers: {
      type: String,
      default: '',
    },
 },
 reportId: {
    type: String,
    required: true,
    unique: true, 
    minlength: 16, 
    maxlength: 16, 
  },
});

export default mongoose.models.Report || mongoose.model("Report", ReportSchema);