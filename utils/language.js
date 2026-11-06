module.exports = {
    languages: {
        zh: {
            app: {
                name: "AvatarSync — Real-Time AI Motion Capture & 3D Avatar Platform",
            },
            titlebar: {
                modelLib: "library",
                mocap: "mocap",
                settings: "setting",
            },
            tabModelLib: {
                userModel: "User's Models",
                buildinModel: "Built-in Models",
                optAdd: "Import",
                optHide: "Hide",
                dragModel: "Drag model here",
                suppotFormat: "Supported VRM/GLB/GLTF/FBX, details see",
                here: " here",
                dragImage: "Drag image here",
                open: "Open",
                setAsDefault: "Set as default",
                showInFinder: "Show in Finder",
                remove: "Remove",
            },
            tabMocap: {
                chooseModel: "3D Model：",
                dataSource: "Source：",
                camera: "Camera",
                videoFile: "Video File",
                start: "Start",
                stop: "Stop",
                chooseVideo: "Choose Video File",
                choosedVideo: "Choosed Video File: ",
                unchoosed: "Unchoosed",
                chooseCamera: "Choose Camera",
            },
            tabSettings: {
                disableUpdate: "Disable Checking Update Automatically",
                desc: "By Xianfei, as Undergraduate Graduation Design Works",
                document: {
                    name: "User Manual",
                    openDoc: "Show the User Manual",
                },
                ui: {
                    name: "Interface",
                    themeColor: "Themed Color",
                    isDark: "Use Dark Mode",
                    useGlass: "Use Frosted Glass Effect",
                    language: "Language",
                },
                preview: {
                    name: "Real-time Preview",
                    showSketelonOnInput: "Show Bones Skeleton on Input Source",
                    mirroringWhenCamera:
                        "Horizontal Mirror Flip when Camera as Input",
                    mirroringWhenVideoFile:
                        "Horizontal Mirror Flip when Video File as Input",
                },
                performance: {
                    name: "Performance",
                    gl: "Current GL Device: ",
                    forcedDGPU:
                        "Use Discrete Graphics when Dual GPU (Need Restart)",
                    useDescrertionProcess: "Use Dedicated Process for Motion Capture (Need Restart)",
                },
                output: {
                    name: "Virtual Character Output",
                    antialias: "Enable Antialias",
                    usePicInsteadOfColor:
                        "Use Picture as Background instead of Color",
                    bgColor: "Background Color",
                    bgPicPath: "Background Picture (click to change)",
                },
                forward: {
                    name: "Mocap Data Forward",
                    enableForwarding: "Enable Forward via HTTP & WebSocket",
                    port: "Port Number of HTTP & WebSocket",
                    useSSL: "Enable Security Protocol (HTTPS/WSS)",
                    supportForWebXR: "Support for WebXR (AR/VR)",
                    webXRtips: "WebXR needs HTTPS protocol, this system will listen to both HTTPS and HTTP at the same port.",
                },
                mediapipe: {
                    name: "Motion Capture",
                },
                input: {
                    name: "Input",
                },
                dev: {
                    name: "Developer",
                    allowDevTools: "Show Entrance for DevTools",
                    openDevToolsWhenMocap: "Open DevTools when Mocap Started",
                    showGpuInfo: "Open GPU Info Page",
                },
                about: {
                    name: "About",
                    paper: "Related Papers:",
                },
            },
            modelVierer: {
                fullSupport: "Full Mocap Support",
                partialSupport: "Partial Mocap Support",
                noSupport: "No Support",
                showSketelon: "Show Bones Controller",
                hideSketelon: "Hide Bones Controller",
                modifyDecoration: "Modify Decoration",
                back: "Save & Back",
                changeBonesBinding: "Change Bones Binding",
                edit: "Edit Avatar Info",
                hide: "Hide",
                show: "Show",
            },
            render: {
                resp: "Camera view (drag the character and use WASD)",
                tips: "Tips: Drag an image to the background to change it, press R to start recording",
                fullbody: "Full body",
                face: "Close-up",
                halfbody: "Half body",
                init: "Initializing motion capture engine...",
                rec: "Recording in progress, press R to stop",
            },
        },
        en: {
            app: {
                name: "AvatarSync — Real-Time AI Motion Capture & 3D Avatar Platform",
            },
            titlebar: {
                modelLib: "library",
                mocap: "mocap",
                settings: "setting",
            },
            tabModelLib: {
                userModel: "User's Models",
                buildinModel: "Built-in Models",
                optAdd: "Import",
                optHide: "Hide",
                dragModel: "Drag model here",
                suppotFormat: "Supported VRM/GLB/GLTF/FBX, details see",
                here: " here",
                dragImage: "Drag image here",
                open: "Open",
                setAsDefault: "Set as default",
                showInFinder: "Show in Finder",
                remove: "Remove",
            },
            tabMocap: {
                chooseModel: "3D Model：",
                dataSource: "Source：",
                camera: "Camera",
                videoFile: "Video File",
                start: "Start",
                stop: "Stop",
                chooseVideo: "Choose Video File",
                choosedVideo: "Choosed Video File: ",
                unchoosed: "Unchoosed",
                chooseCamera: "Choose Camera",
            },
            tabSettings: {
                disableUpdate:'Disable Checking Update Automatically',
                desc: "By Xianfei, as Undergraduate Graduation Design Works",
                document: {
                    name: "User Manual",
                    openDoc: "Show the User Manual",
                },
                ui: {
                    name: "Interface",
                    themeColor: "Themed Color",
                    isDark: "Use Dark Mode",
                    useGlass: "Use Frosted Glass Effect",
                    language: "Language",
                },
                preview: {
                    name: "Real-time Preview",
                    showSketelonOnInput: "Show Bones Sketelon on Input Source",
                    mirroringWhenCamera:
                        "Horizontal Mirror Flip when Camera as Input",
                    mirroringWhenVideoFile:
                        "Horizontal Mirror Flip when Video File as Input",
                },
                performance: {
                    name: "Performance",
                    gl: "Current GL Device: ",
                    forcedDGPU:
                        "Use Discrete Graphics when Dual GPU （Need Reopen）",
                        useDescrertionProcess: "Use Descretion Process for Motion Capture（Need Reopen）",
                },
                output: {
                    name: "Virtual Character Output",
                    antialias: "Enable Antialias",
                    usePicInsteadOfColor:
                        "Use Picture as Background instead of Color",
                    bgColor: "Background Color",
                    bgPicPath: "Background Picture (click to change)",
                },
                forward: {
                    name: "Mocap Data Forward",
                    enableForwarding: "Enable Forward via HTTP & WebSocket",
                    port: "Port Number of HTTP & WebSocket",
                    useSSL: "Enable Security Protocol（HTTPS/WSS）",
                    supportForWebXR: "Support for WebXR (AR/VR) ",
                    webXRtips:"WebXR needs HTTPS protocol, this system will listen both HTTPS and HTTP at same port.",
                },
                mediapipe: {
                    name: "Motion Capture",
                },
                input:{
                    name: "Input",
                },
                dev: {
                    name: "Developer",
                    allowDevTools: "Show Entrance for DevTools",
                    openDevToolsWhenMocap: "Open DevTools when Mocap Started",
                    showGpuInfo: "Open GPU Info Page",
                },
                about:{
                    name: "About",
                    paper:"Relation Papers:",
                }
            },
            modelVierer: {
                fullSupport: "Full Mocap Support",
                partialSupport: "Partial Mocap Support",
                noSupport: "No Support",
                showSketelon: "Show Bones Controller",
                hideSketelon: "Hide Bones Controller",
                modifyDecoration: "Modify Decoration",
                back: "Save & Back",
                changeBonesBinding: "Change Bones Binding",
                edit: "Edit Avatar Info",
                hide: "Hide",
                show: "Show",
            },
            render: {
                resp: "Camera view (drag the character and using AWSD)",
                tips: "Tips: Drag the image to the background to change it, press R to start recording",
                fullbody: "Full body",
                face: "Close-up",
                halfbody: "Half body",
                init: "Initializing motion capture engine...",
                rec: "Recording in progress, press R to stop"
            }
        },
    },
};
