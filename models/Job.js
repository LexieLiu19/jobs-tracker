import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide company name'],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, 'Please provide position'],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ['Interview', 'Declined', 'Pending'],
      default: 'Pending',
    },
    jobType: {
      type: String,
      enum: ['Full-Time', 'Part-Time', 'Remote', 'Internship'],
      default: 'Full-Time',
    },
    jobLocation: {
      type: String,
      default: 'my city',
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Job', JobSchema);
