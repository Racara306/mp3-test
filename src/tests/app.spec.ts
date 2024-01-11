import request from "supertest";
import { app } from "..";

describe("POST /file-upload", () => {
  it("should return 400 if no file is uploaded", async () => {
    const response = await request(app).post("/file-upload");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "No file uploaded");
  });

  it("should return 400 if the file format is not MP3", async () => {
    const response = await request(app)
      .post("/file-upload")
      .attach("mp3" as string, Buffer.from("dummydata"), {
        filename: "dummy.txt",
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Invalid file format. Please upload an MP3 file."
    );
  });

  it("should return the frame count if a valid MP3 file is uploaded", async () => {
    const mp3Buffer = Buffer.from("dummydata");
    const response = await request(app)
      .post("/file-upload")
      .attach("mp3" as string, mp3Buffer, { filename: "dummy.mp3" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("frameCount", 0);
  });
});
