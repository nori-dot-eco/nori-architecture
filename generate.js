const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const diagramOutput = path.join(__dirname, 'diagrams');
const mermaidInput = path.join(__dirname, 'mermaid');
const config = path.join(__dirname, 'config.json');
const bg = 'white';

// Loop through all the files in the temp directory
fs.readdir(mermaidInput, function(err, files) {
  if (err) {
    console.error('Could not list the current directory.', err);
    process.exit(1);
  }

  files.forEach(file => {
    const [fileName] = file.split('.');
    const fileExt = '.png';
    const toPath = path.join(diagramOutput, `${fileName}${fileExt}`);
    const fromPath = path.join(mermaidInput, file);
    const mmdc = execSync(
      `./node_modules/.bin/mmdc -c ${config} -b ${bg} -i ${fromPath} -o ${toPath} -w 3068 -H 2304`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
      }
    );
  });
});
