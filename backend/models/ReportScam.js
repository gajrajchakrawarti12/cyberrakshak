import mongoose from "mongoose";
const reportScamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/ // Basic email validation
    },
    phone: {
        type: String,
        required: false,
        match: /^\+?[1-9]\d{1,14}$/ // E.164 format for phone numbers
    },
    scamType: {
        type: String,
        required: true,
    },
    incidentDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    amountLost: {
        type: Number,
        required: false,
        min: 0 // Ensure amount is non-negative
    },
    description: {
        type: String,
        required: true,
        maxlength: 1000
    },
    evidence: {
        type: String,
        required: false,
        maxlength: 500 // URL or description of evidence
    },
    reportedToPolice: {
        type: Boolean,
        default: false // Whether the user has informed authorities
    },
    consent: {
        type: Boolean,
        required: true,
        default: false // User consent for data processing
    },
    
    status: {
        type: String,
        enum: ['Pending', 'In Review', 'Resolved', 'Rejected'],
        default: 'Pending'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: false
    },
    location: {
        longitude: {
            type: Number,
            required: false
        },
        latitude: {
            type: Number,
            required: false
        }
    },
}, {
    timestamps: true
});
const ReportScam = mongoose.model('ReportScam', reportScamSchema);
export default ReportScam;