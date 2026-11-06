# AvatarSync — Real-Time AI Motion Capture & 3D Avatar Platform

AvatarSync is an open-source, cross-platform, video-driven real-time **motion capture (MoCap)** and **3D avatar rendering system**. 

Using a standard RGB webcam (without specialized depth sensors or wearable hardware), AvatarSync tracks full-body poses, hand movements, and facial expressions in real-time, mapping these kinematics onto 3D humanoid avatars (**VRM** and **FBX** formats). It is tailored for **VTubers**, **live-streamers (OBS)**, **AR/VR developers**, and **WebXR applications**.

---

## Table of Contents

- [Features](#features)
- [Architecture & Workflow](#architecture--workflow)
- [Tech Stack](#tech-stack)
- [Supported 3D Model Formats](#supported-3d-model-formats)
- [Prerequisites](#prerequisites)
- [Installation & Quick Start](#installation--quick-start)
- [Running with Docker](#running-with-docker)
- [Usage Guide](#usage-guide)
  - [Webcam & Tracking Setup](#webcam--tracking-setup)
  - [Loading Custom Avatars](#loading-custom-avatars)
  - [OBS Studio Live Streaming](#obs-studio-live-streaming)
  - [Remote WebXR Motion Forwarding](#remote-webxr-motion-forwarding)
- [Project Structure](#project-structure)
- [Packaging & Building](#packaging--building)
- [License](#license)

---

## Features

- **RGB Webcam Motion Capture**: High-fidelity tracking of face, hands, and full body with zero specialized sensors.
- **AI-Powered Landmark Detection**: Powered by Google MediaPipe Holistic (468+ face landmarks, 33 body pose landmarks, 21 landmarks per hand).
- **Smooth Kinematics & Physics**: Kalidokit solves joint rotations and blendshapes with stabilization lerp and spring-bone hair/clothing physics.
- **Dual Format 3D Support**:
  - **VRM 0.x & 1.0**: Native blendshape facial expressions, eye gaze tracking, and spring bone physics.
  - **FBX**: Mixamo standard humanoid rigs and custom skeleton bone mapping.
- **OBS Studio VTuber Integration**: Dedicated transparent background rendering for chromakey-free streaming layers.
- **WebXR & Network Broadcasting**: Dual HTTP/HTTPS Socket.IO server for low-latency motion streaming to remote clients and VR headsets.
- **Modern UI**: Clean desktop interface built with Material Design 3 and responsive controls.

---

## Architecture & Workflow

```
┌──────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│  RGB Webcam  │ ──> │ Google MediaPipe    │ ──> │   Kalidokit         │
│  Video Feed  │     │ Holistic Pipeline   │     │ Kinematics Solver   │
└──────────────┘     └─────────────────────┘     └──────────┬──────────┘
                                                            │ Quaternions & Morphs
                                                            ▼
┌────────────────────────┐     ┌───────────────────────────────────────┐
│ Stream / Broadcast     │ <── │ Three.js & @pixiv/three-vrm           │
│ (OBS Studio / WebXR)   │     │ 3D Avatar Rendering Engine            │
└────────────────────────┘     └───────────────────────────────────────┘
```

1. **Webcam Feed**: Captures real-time video frames locally.
2. **MediaPipe Holistic**: Detects face mesh, body pose, and hand landmarks on GPU/CPU.
3. **Kalidokit Solver**: Translates vectors into bone quaternions, joint angles, and facial morph blendshapes.
4. **Three.js Engine**: Applies bone orientations to the 3D model with spring bone physics.
5. **Output**: Interactive desktop viewport, OBS Studio transparent layer, or WebXR network stream.

---

## Tech Stack

| Component | Technology |
|---|---|
| **Runtime** | Electron (v31.x), Node.js (ES6+) |
| **Computer Vision** | Google MediaPipe Holistic (`@mediapipe/holistic`) |
| **Kinematics & Solvers** | Kalidokit (`kalidokit`) |
| **3D Graphics & Physics** | Three.js (`v0.164.x`), `@pixiv/three-vrm` (`v2.1.x`) |
| **UI Framework** | MDUI (Material Design 3), Vue.js |
| **Networking & Streaming**| Express.js, Socket.IO, `express-ws` |

---

## Supported 3D Model Formats

1. **VRM (`.vrm`)**:
   - Supports **VRM 0.x** and **VRM 1.0** standards (compatible with [VRoid Studio](https://vroid.com/en/studio)).
   - Native humanoid bone rigging, facial blendshapes, eye gaze tracking, and secondary spring bone physics.
2. **FBX (`.fbx`)**:
   - Standard **Mixamo** humanoid bone naming conventions.
   - Interactive custom skeleton rig mapping.

---

## Prerequisites

- **Node.js**: v18.x or v20.x recommended
- **NPM**: v9.x or higher
- A functional **RGB Webcam**

---

## Installation & Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/denitjoseph/avatarsync.git
   cd avatarsync
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the application:**
   ```bash
   npm start
   ```

---

## Running with Docker

You can containerize and run AvatarSync using Docker:

### 1. Build the Docker Image
```bash
docker build -t avatarsync .
```

### 2. Run Headlessly (Virtual Framebuffer / Server Mode)
```bash
docker run -it --rm -p 8080:8080 -p 8443:8443 avatarsync
```

### 3. Run with GUI & Webcam (Linux Host)
```bash
docker run -it --rm \
  -e DISPLAY=$DISPLAY \
  -v /tmp/.X11-unix:/tmp/.X11-unix \
  --device /dev/video0:/dev/video0 \
  -p 8080:8080 -p 8443:8443 \
  avatarsync
```

---

## Usage Guide

### Webcam & Tracking Setup
1. On initial launch, grant camera permissions when prompted.
2. Ensure your upper body and hands are visible within the camera frame for optimal tracking.
3. Position yourself in good lighting for the best facial landmark detection.

### Loading Custom Avatars
- Use the built-in model browser to switch between sample avatars.
- To import your own avatar, load any `.vrm` (VRoid Studio export) or `.fbx` (Mixamo rig) model directly into the viewport.

### OBS Studio Live Streaming
1. Open **OBS Studio**.
2. Add a new **Game Capture** or **Window Capture** source.
3. Select the AvatarSync render window.
4. Check **Allow Transparency** in OBS source properties to display your avatar seamlessly over your stream without green screen chroma keying.

### Remote WebXR Motion Forwarding
- AvatarSync includes an integrated Socket.IO server (`webserv/`) that broadcasts motion capture frames over the network.
- Connect WebXR clients or external applications to the configured HTTP/HTTPS port to animate remote avatars.

---

## Project Structure

```text
.
├── main.js                   # Electron main process (lifecycle, IPC, window management)
├── package.json              # Project dependencies, scripts, and metadata
├── mainview/                 # Main desktop UI (Material Design 3 & controls)
├── mocap/                    # MediaPipe Holistic capture pipeline & Kalidokit solver
├── mocaprender/              # Three.js 3D rendering, bone binding, & physics
├── modelview/                # 3D model inspector & skeleton mapping
├── webserv/                  # Express & Socket.IO dual HTTP/HTTPS streaming server
├── utils/                    # Helper utilities (math, language, formatting)
├── models/                   # Sample humanoid models (.vrm, .fbx)
├── fonts/ & icons/           # UI typography and app icons
└── pdfs/                     # Reference documentation
```

---

## Packaging & Building

To generate standalone application packages for distribution:

### Windows
```bash
# Package Windows x64 unpacked application (OutApp/)
npm run package:win64

# Package Windows ARM64 build
npm run package:winarm

# Build Windows MSI Installer
npm run msix64
```

### macOS
```bash
# Package macOS Intel build
npm run package:mac64

# Package macOS Apple Silicon (M-series) build
npm run package:macarm

# Build macOS DMG installer
npm run dmg
```

---

## License

This project is licensed under the [Mozilla Public License 2.0](LICENSE).
