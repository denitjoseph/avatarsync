const fs = require('fs');
const path = require('path');

const path2 = './OutApp/packages';

// Check if directory exists
if (!fs.existsSync(path2)) {
    // Create directory
    fs.mkdirSync(path2, { recursive: true });
    console.log(`Directory ${path2} created`);
} else {
    console.log(`Directory ${path2} already exists`);
}

// Config object
let config = {
  title: 'AvatarSync-macOS-x64',
  format: "ULMO",
  contents: [
    { x: 448, y: 196, type: 'link', path: '/Applications' },
    {
      x: 192,
      y: 196,
      type: 'file',
      path: path.join(process.cwd(), 'OutApp/AvatarSync-darwin-x64/AvatarSync.app')
    }
  ],
  background: path.join(process.cwd(), 'icons/dmgbg.png'),
  // icon: path.join(process.cwd(), 'icons/sysmocap.icns'),
  'icon-size': 80
};

// Get current directory
const currentDir = process.cwd();

// Replace path function
function replacePath(obj, oldPath, newPath) {
  for (let key in obj) {
    if (typeof obj[key] === 'string' && obj[key].includes(oldPath)) {
      obj[key] = obj[key].replace(oldPath, newPath);
    } else if (typeof obj[key] === 'object') {
      replacePath(obj[key], oldPath, newPath);
    }
  }
}

// Replace path
replacePath(config, '/Users/xianfei/Documents/GitHub/SysMocap', currentDir);

console.log(config);

// Output new config object
const outputPath = path.join(currentDir, 'dmgcfg.json');
fs.writeFileSync(outputPath, JSON.stringify(config));