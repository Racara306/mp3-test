import express, { Request, Response } from "express";
import multer from "multer";

const app = express();
const PORT = 3000;

const storage = multer.memoryStorage();

// This configuration stores the uploaded file in memory instead of saving it to the disk.
const upload = multer({ storage: storage });

app.use(express.json());

// Upload file under the name MP3 and use multer .single method to return the file
app.post(
  "/file-upload",
  upload.single("mp3"),
  (req: Request, res: Response) => {
    const mp3File = req.file;

    // Validate mp3File
    if (!mp3File) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Check if the uploaded file is an MP3 file
    if (!mp3File.mimetype.startsWith("audio/mpeg")) {
      return res
        .status(400)
        .json({ error: "Invalid file format. Please upload an MP3 file." });
    }

    // Read the file buffer and count the frames
    const frameCount = countMP3Frames(mp3File.buffer);

    console.log("MP3 file: ", mp3File);

    res.status(200).send({ frameCount });
  }
);

const countMP3Frames = (buffer: Buffer): number => {
  // MP3 audio frames: The actual compressed stream, broken into 'frames'. Each frame will begin with a sync bit pattern, 0xFFE.
  // Source: https://stackoverflow.com/questions/5005476/how-can-i-extract-the-audio-data-from-an-mp3-file
  const syncBitPattern = 0xffe;
  let frameCount = 0;

  for (let i = 0; i < buffer.length - 1; i++) {
    if ((buffer.readUInt16BE(i) & 0xffe) === syncBitPattern) {
      frameCount++;
    }
  }

  return frameCount;
};

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export { app, countMP3Frames };
