/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

// Using the inquirer

import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'node:fs';

inquirer
  .prompt([
    {
      name: 'websiteURL',
      message: 'Write your website whose QR Code you need generated.\n',
      type: 'input'
    }
  ])
  .then( (answers) => {
    const image1 = qr.image(answers.websiteURL,{type:'png'});
    const qrFile = 'qrImage.png';

    image1.pipe(fs.createWriteStream(qrFile));  

    image1.on('end',() => {
      console.log(`QR Code generated and saved as ${qrFile}`);
    });

    image1.on('error',(err) =>  {
      console.log('Error generating QR code:', err);
    }); 

    fs.appendFileSync('savedURLS.txt', answers.websiteURL + '\n', 'utf8');
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment.");
    } else {
        console.log("An error occurred:", error);
    }
  });

