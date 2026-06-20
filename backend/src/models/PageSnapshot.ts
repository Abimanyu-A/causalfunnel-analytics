import { Schema, model } from "mongoose";

const elementSchema = new Schema(
  {
    tag: String,
    x: Number,
    y: Number,
    w: Number,
    h: Number,
  },
  { _id: false }
);

const pageSnapshotSchema = new Schema(
  {
    pageUrl: { type: String, required: true, unique: true },
    pageHeight: Number,
    viewportWidth: Number,
    elements: [elementSchema],
    capturedAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export default model("PageSnapshot", pageSnapshotSchema);