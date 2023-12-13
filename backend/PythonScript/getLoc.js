const { exec } = require('child_process');

const pythonCommand = 'python3';
const pythonScriptPath = '/Users/abhi/Desktop/getLocationsPython.py';

exec(`${pythonCommand} ${pythonScriptPath}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing Python script: ${error}`);
    return;
  }

  const pythonOutput = stdout.trim();
  console.log('Python script output:', pythonOutput);

  if (stderr) {
    console.error(`Python script error: ${stderr}`);
  }
});
