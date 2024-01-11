import mongoose from "mongoose"

const policeCaseSchema = new mongoose.Schema({
    // creator: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    // },
    creator: {
        type: String,
        // ref: "User",
    },
    caseNumber: {
        type: String,
        required: true,
        unique: true,
    },
    reportedBy: {
        type: String,
        required: true,
    },
    dateReported: {
        type: Date,
        default: Date.now,
    },
    incidentType: {
        type: String,
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Investigating', 'Closed'],
        default: 'Pending',
    },
    assignedOfficer: {
        type: String,
    },
    evidence: {
        type: [String],
    },

});

policeCaseSchema.index({ location: '2dsphere' });

const PoliceCase = mongoose.models.PoliceCase || mongoose.model('PoliceCase', policeCaseSchema);

export default PoliceCase;
