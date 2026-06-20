import { Schema, model } from "mongoose";
import { EventType } from "../types/event.types";

const eventSchema = new Schema(
  {
    sessionId: {
      type: String,
      required: true
    },

    eventType: {
      type: String,
      enum: Object.values(EventType),
      required: true
    },

    pageUrl: {
      type: String,
      required: true
    },

    timestamp: {
      type: Date,
      required: true
    },

    coordinates: {
      x: Number,
      y: Number
    },

    viewport: {
      width: Number,
      height: Number
    },

    device: {
      type: {
        type: String
      },

      userAgent: {
        type: String
      }
    }
  },
  {
    versionKey: false
  }
);

eventSchema.index({
  sessionId: 1
});

eventSchema.index({
  pageUrl: 1,
  eventType: 1
});

eventSchema.index({
  timestamp: -1
});

const Event = model("Event", eventSchema);

export default Event;