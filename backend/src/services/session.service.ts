import Event from "../models/Event";

export const getSessions = async (limit = 50, skip = 0) => {
  return Event.aggregate([
    {
      $group: {
        _id: "$sessionId",
        eventCount: { $sum: 1 },
        startedAt:  { $min: "$timestamp" },
        lastActivity: { $max: "$timestamp" },
      },
    },
    {
      $project: {
        _id: 0,
        sessionId: "$_id",
        eventCount: 1,
        startedAt: 1,
        lastActivity: 1,
      },
    },
    { $sort: { lastActivity: -1 } },
    { $skip: skip },
    { $limit: limit },
  ]);
};

export const getSessionEvents = async (sessionId: string) => {
  return Event.find({ sessionId }).sort({ timestamp: 1 }).lean();
};