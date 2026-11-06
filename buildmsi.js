const { MSICreator } = require("electron-wix-msi");
const path = require("path");
const fs = require("fs-extra");

const arch = process.argv[2];

if (!arch || !["msil", "x86", "x64", "arm", "arm64", "ia64"].includes(arch)) {
    console.error(
        "Please input a valid arch: msil, x86, x64, arm, arm64, ia64"
    );
    process.exit(1);
}

const APP_DIR = path.join(__dirname, "/OutApp/AvatarSync-win32-" + arch);
const OUT_DIR = path.join(__dirname, "/OutApp/installers");

async function clean() {
    await fs.ensureDir(APP_DIR);
    await fs.emptyDir(OUT_DIR);
}

async function harness() {
    const msiCreator = new MSICreator({
        appDirectory: APP_DIR,
        exe: "AvatarSync.exe",
        name: "AvatarSync",
        arch: arch,
        manufacturer: "AvatarSync",
        icon: path.join(APP_DIR, "../../icons/sysmocap.ico"),
        outputDirectory: OUT_DIR,
        description: "AvatarSync",
        ui: {
            chooseDirectory: true,
            images: {
                background: path.join(APP_DIR, "../../icons/dlgbmp.jpg"),
                banner: path.join(APP_DIR, "../../icons/bannrbmp.jpg"),
            },
        },
        version: require("./package.json").version,
    });

    await clean();
    msiCreator.wixTemplate = msiCreator.wixTemplate
        .replaceAll(
            'Name = "{{ApplicationName}} (Machine - MSI)"',
            'Name = "{{ApplicationName}}"'
        )
        .replaceAll("{{ApplicationName}} (Machine)", "{{ApplicationName}}");
    await msiCreator.create();
    await msiCreator.compile();

    // Define source and target directories
    const sourceDir = path.join(__dirname, "OutApp/installers");
    const targetDir = path.join(__dirname, "OutApp/packages");

    // Check if target directory exists, create if not
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    // Read all files from source directory
    fs.readdir(sourceDir, (err, files) => {
        if (err) {
            console.error("Unable to read directory", err);
            return;
        }

        const exeFiles = files.filter((file) => path.extname(file) === ".msi");

        exeFiles.forEach((file) => {
            const sourceFile = path.join(sourceDir, file);
            const targetFile = path.join(
                targetDir,
                path.basename(file, ".msi") +
                    "-Windows-" +
                    arch +
                    "-installer.msi"
            );

            fs.rename(sourceFile, targetFile, (err) => {
                if (err) {
                    console.error(`Unable to move file ${file}`, err);
                } else {
                    console.log(`File ${file} moved to ${targetDir}`);
                }
            });
        });
    });
}

harness();
