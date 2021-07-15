const fs = require('fs');

const folderName = process.argv[2] || 'Project';

try {
 fs.mkdirSync(folderName);

fs.writeFileSync(`${folderName}/index.html`,''.toString());
fs.writeFileSync(`${folderName}/style.css`,''.toString());
fs.writeFileSync(`${folderName}/script.js`,''.toString());   
} catch(err) {
    console.log('Error',err);
}