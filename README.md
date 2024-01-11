# MP3 Test

A small application used to return the frame count of an uploaded MP3 file.
Specifically MPEG Version 1 Audio Layer 3 files

# Disclaimer

I was unable to spend nearly as much time on this application as I would have liked to, due to being our of office the day after receiving the assessment document. Tried to do as much as I could in the limited time that I had. I am aware it does not return accurate results after running the file through the provided mediaInfo tool.

# Initial line of thinking

Initially after reading the spec and reading up on MP3 files, my first line of thought was to attempt to count the amount of frame sync markers, as with this specific file type, it is to my understanding they are always consistent, but this didn't provide a correct answer.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Running Tests](#running-tests)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repository.git
   ```

2. Install packages:
   ```bash
   npm install
   ```

## Usage

1. Run against your local host and test through Postman application
2. make a post request to the '/file-upload' endpoint, with an MP3 file as the body as form data, with the key 'mp3'.
   ```bash
   http://localhost:3000/file-upload
   ```

## Tests

1. Run npm test for basic Jest testing

## License

1. This project is licensed under the MIT License.
