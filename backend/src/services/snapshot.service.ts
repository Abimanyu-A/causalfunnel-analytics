import PageSnapshot from "../models/PageSnapshot";

interface SnapshotPayload {
  pageUrl: string;
  pageHeight: number;
  viewportWidth: number;
  elements: { tag: string; x: number; y: number; w: number; h: number }[];
}

// first capture ia stored; subsequent visits skip storage
export const upsertSnapshot = async (payload: SnapshotPayload) => {
  return PageSnapshot.updateOne(
    { pageUrl: payload.pageUrl },
    { $setOnInsert: payload },
    { upsert: true }
  );
};

export const getSnapshot = async (pageUrl: string) => {
  return PageSnapshot.findOne({ pageUrl }).lean();
};