import Event from "../models/Event";

export const getSessions = async () => {
  return Event.aggregate([
    {
      $group: {
        _id: "$sessionId",

        eventCount: {
          $sum: 1
        },

        startedAt: {
          $min: "$timestamp"
        },

        lastActivity: {
          $max: "$timestamp"
        }
      }
    },
    {
      $project: {
        _id: 0,
        sessionId: "$_id",
        eventCount: 1,
        startedAt: 1,
        lastActivity: 1
      }
    },
    {
      $sort: {
        eventCount: -1
      }
    }
  ]);
};