# AvatarSync - Comprehensive Project Guide

## 1. Executive Summary

**AvatarSync** is an open-source, cross-platform, video-driven real-time **motion capture (MoCap)** and **3D avatar rendering system**. 

Using a standard RGB webcam (without specialized depth sensors or wearable hardware), AvatarSync tracks full-body poses, hand movements, and facial expressions in real-time, mapping these kinematics onto 3D humanoid avatars (**VRM** and **FBX** formats). It is tailored for **VTubers**, **live-streamers (OBS)**, **AR/VR developers**, and **WebXR applications**.

---

## 2. Technology Stack & Programming Languages

### Programming Languages
- **JavaScript (Node.js & Modern ES6+)**: Main process, worker threads, kinematics math, Three.js rendering, and IPC communication.
- **HTML5 & CSS3**: Desktop user interface, Material Design 3 components, animations, and canvas overlays.

### Core Frameworks & Libraries
- **Desktop Runtime**: [Electron 31.1.0](https://www.electronjs.org/) + `@electron/remote`
- **3D Graphics Engine**: [Three.js (v0.164.1)](https://threejs.org/)
- **Avatar Loading & Physics**: [`@pixiv/three-vrm (v2.1.2)`](https://github.com/pixiv/three-vrm) (VRM 0.x / 1.0 specification + Spring Bone physics)
- **UI Framework & Design**: [MDUI 1.0.2](https://www.mdui.org/), [Vue 2.7](https://vuejs.org/), `@material/material-color-utilities` (Material Design 3 color palette generation), `lil-gui`
- **Networking & Forwarding**: [Express 4](https://expressjs.com/), [Socket.IO 4](https://socket.io/), dual HTTP/HTTPS server (`httpx.js`) for WebXR streaming

---

## 3. AI & Computer Vision Models Used

AvatarSync utilizes lightweight, edge-based computer vision and kinematic models that execute locally on the user's GPU/CPU:

### 1. Google MediaPipe Holistic (`@mediapipe/holistic`)
Combines separate neural network models into a unified pipeline running in real-time on webcam video:
- **Face Mesh**: Extracts 468+ 3D facial landmark points (captures eye blinks, gaze direction, mouth shapes, and head orientation).
- **Pose Estimation (BlazePose)**: Extracts 33 2D and 3D body landmark points across hips, spine, shoulders, elbows, wrists, knees, and ankles.
- **Hand Tracking**: Extracts 21 3D landmarks per hand (finger joints and wrist orientation).

### 2. Kalidokit (`kalidokit`)
- **Kinematic Solver**: Translates raw 2D/3D landmark vectors from MediaPipe into Euler angle rotations and Quaternions for humanoid bones.
- **BlendShape Calculator**: Computes facial blendshapes / morph targets (e.g., `blinkLeft`, `blinkRight`, `mouthOpen`, `jawOpen`, `smile`).
- **Stabilization & Smoothing**: Implements lerp (linear interpolation), clamping, and range remapping to prevent jitter in video feeds.

---

## 4. Supported 3D Model Formats

1. **VRM (`.vrm`)**:
   - Supports **VRM 0.x** and **VRM 1.0** standards (compatible with [VRoid Studio](https://vroid.com/en/studio)).
   - Native support for humanoid bone rigging, facial blendshapes, eye gaze tracking, and spring bone hair/clothing physics.
2. **FBX (`.fbx`)**:
   - Supports standard **Mixamo** humanoid bone naming conventions.
   - Supports **Custom Skeleton Rigging** via interactive manual bone mapping.

---

## 5. Project Directory & File Structure

```text
anime/
│
├── main.js                   # Electron main process (lifecycle, windows, GPU flags, TouchBar)
├── package.json              # Project dependencies, build scripts, and metadata
├── package-lock.json         # Pinned dependency versions
├── buildmsi.js               # Windows MSI installer build configuration
├── builddmgjsonx86.js        # macOS Intel DMG build configuration
├── builddmgjsonarm.js        # macOS Apple Silicon DMG build configuration
├── entitlements.mac.plist    # macOS camera and hardware entitlements
├── LICENSE                   # Open-source license (Mozilla Public License 2.0)
├── README.md                 # Project README (English)
├── README.zh-cn.md           # Project README (Chinese)
│
├── fonts/                    # Embedded local fonts
├── icons/                    # App icons (.ico, .icns, .png)
├── models/                   # Built-in sample 3D models (.vrm, .fbx)
├── pdfs/                     # Documentation PDF files
│
├── mainview/                 # Main User Interface
│   ├── framework.html        # Main app UI structure (Material Design 3)
│   ├── framework.js          # UI controller, model library, custom rig mapping, Vue state
│   └── style.css             # Main UI styles & animations
│
├── mocap/                    # Motion Capture Pipeline
│   ├── mocap.html            # Hidden capture window with video & landmark canvas
│   └── mocap.js              # MediaPipe Holistic loop + Kalidokit solver + IPC emission
│
├── mocaprender/              # 3D Rendering & Animation
│   ├── render.html           # 3D viewport canvas window
│   ├── script.js             # Three.js render loop, VRM/FBX bone binding, camera controls
│   ├── mocapWorker.js        # Dedicated worker for render tasks
│   └── style.css             # Viewport layout and OBS transparency styling
│
├── modelview/                # Model Inspector & Customizer
│   └── modelview.html        # 3D viewer for bone structure inspection & clothing toggles
│
├── render/                   # Secondary / standalone 3D rendering module
│   ├── render.html
│   ├── render.js
│   └── render.css
│
├── webserv/                  # Remote Forwarding & WebXR Server
│   ├── server.js             # Express + Socket.IO dual HTTP/HTTPS server
│   ├── httpx.js              # Dual SSL/TLS listener
│   ├── worker.js             # Worker thread hosting the web server
│   ├── ssl/                  # Local SSL certificates for HTTPS/WebXR
│   └── public/               # WebXR / remote web viewer client assets
│
├── pdfviewer/                # Integrated PDF Document Viewer
│   └── viewer.html
│
└── utils/                    # Shared Helper Utilities
    ├── language.js           # Multi-language dictionary (English & Chinese)
    ├── setting.js            # User settings management & persistence
    ├── model-importer.js     # Model drag-and-drop & file loader
    ├── mdc.js / mdc-bundle.js# Material Design color utilities
    ├── RecordRTC.js          # Video recording utility
    └── html2canvas.js        # Screenshot utility
```

---

## 6. Runtime Architecture & Data Flow

```
+-----------------------------------------------------------------------------------+
|                                 AvatarSync Runtime                                |
|                                                                                   |
|  +--------------------+         +-----------------------+                         |
|  |  Webcam Video Feed | ------> |  MediaPipe Holistic   |                         |
|  +--------------------+         |  - Face Mesh (468 pts)|                         |
|                                 |  - Pose (33 pts)      |                         |
|                                 |  - Hands (21 pts x 2) |                         |
|                                 +-----------+-----------+                         |
|                                             | (Raw Landmark Vectors)              |
|                                             v                                     |
|                                 +-----------------------+                         |
|                                 |       Kalidokit       |                         |
|                                 |  - Kinematics Solver  |                         |
|                                 |  - Blendshape Calc    |                         |
|                                 +-----------+-----------+                         |
|                                             | (Rigged Rotation & Morph Data)      |
|                         +-------------------+-------------------+                 |
|                         | (IPC: sendRenderData)                 | (WebSocket)     |
|                         v                                       v                 |
|            +-------------------------+             +-------------------------+    |
|            |  Three.js Render Engine |             | WebServer (worker.js)   |    |
|            |  - @pixiv/three-vrm     |             | - Express + Socket.IO   |    |
|            |  - VRM/FBX Bone Updates |             | - WebXR Stream Forward  |    |
|            |  - Spring Bone Physics  |             +------------+------------+    |
|            +------------+------------+                          |                 |
|                         |                                       |                 |
+-------------------------|---------------------------------------|-----------------+
                          v                                       v
               +----------------------+               +-----------------------+
               | Window / OBS Stream  |               | Remote WebXR Headset  |
               +----------------------+               +-----------------------+
```

---

## 7. How to Run & Build the Project

### Prerequisites
1. **Node.js**: Recommended version `Node 18.x` or `Node 20.x`.
2. **Webcam**: Any connected USB or built-in RGB camera.

### 1. Installation & Local Execution
```bash
# 1. Install all required dependencies
npm install

# 2. Launch the desktop application in development mode
npm start
```

### 2. Building Standalone Installers

#### Windows:
```bash
# Package into Windows x64 executable folder
npm run package:win64

# Package into Windows ARM64 executable folder
npm run package:winarm

# Create 7-Zip release archive
npm run 7z:win64

# Build standalone MSI installer
npm run msix64
```

#### macOS:
```bash
# Package into macOS x64 (Intel)
npm run package:mac64

# Package into macOS ARM64 (Apple Silicon M1/M2/M3/M4)
npm run package:macarm

# Create DMG disk image
npm run dmg       # Intel
npm run dmgarm    # Apple Silicon
```

---

## 8. Key Features & Controls

- **Drag-and-Drop 3D Models**: Drag any `.vrm` or `.fbx` avatar directly into the UI to load it into the avatar library.
- **OBS Studio Live Streaming**: Transparent background rendering allows adding AvatarSync as a Game/Window Capture layer in OBS without chroma key artifacts.
- **Dedicated GPU Acceleration**: Automatic high-performance discrete GPU prioritization switch (`force_high_performance_gpu`).
- **WebXR Motion Forwarding**: Live streaming motion capture packets over HTTPS/WSS for virtual reality headsets.
- **Custom Rig Mapping**: Interactive joint assignment tool to map non-standard FBX rigs to standard humanoid motions.
