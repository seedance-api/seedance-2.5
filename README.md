# SeeDance 2.5 (Seedance 2.5): Ultimate Character Motion Transfer & AI Dance Video Generator

[![GitHub stars](https://img.shields.io/github/stars/seedance-api/seedance-2.5?style=social)](https://github.com/seedance-api/seedance-2.5)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](./LICENSE)
[![Seedance Version](https://img.shields.io/badge/model-seedance--2.5--ultra-purple)](https://seedance2.ai)

<p align="center">
  <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80" alt="SeeDance 2.5 Ultimate AI Dance & Pose Motion Transfer Banner" width="100%" style="border-radius: 10px;" />
</p>

Welcome to the **SeeDance 2.5 (Seedance 2.5)** developer repository. Developed on top of next-generation temporal attention and pose guidance diffusion networks, **Seedance 2.5** is ByteDance's flagship AI model for high-fidelity character consistency and ultra-realistic character motion transfer (Pose-to-Video, Video-to-Video).

This repository is designed to be the ultimate developer portal, featuring model architectures, local inference scripts, API wrappers, and integration guidelines for ByteDance's revolutionary model.

---

## 🌟 Seedance 2.5 & SeeDance 2.5 Key Features

*   **Zero-Shot Identity Preservation:** Inject a single static human profile, anime avatar, or 3D render, and Seedance 2.5 generates coherent videos without requiring prior fine-tuning (LoRA).
*   **Advanced Pose and Gesture Matching (Skeletal-to-Video):** High-fidelity tracking of keypoints, supporting intricate breakdance routines, traditional dances, and complex athletic motions.
*   **Intricate Hand-Pose Refiner:** Solves the classic "AI hands" warping problem with dedicated finger-tracking grids and custom regional loss functions.
*   **Coherent Temporal Overlays:** State-of-the-art optical-flow prediction maps that ensure smooth transitions across frames at 60 FPS without background warping or morphing.
*   **Multi-Character Interaction Support:** Seamlessly coordinate multiple subjects dancing together with precise spatial boundaries and depth maps.

---

## ⚡ Quickstart Guide

### Installation

```bash
# Clone the repository
git clone https://github.com/seedance-api/seedance-2.5.git
cd seedance-2.5

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install required packages
pip install -r requirements.txt
```

### Basic Inference (Python SDK)

To generate an AI dance video with Seedance 2.5, run:

```python
import seedance

# Initialize Seedance Client
client = seedance.Client(api_key="your_bytedance_seedance_api_key")

# Submit character and motion source
response = client.video.generate(
    character_image="assets/character_avatar.jpg",
    motion_video="assets/hiphop_dance_skeleton.mp4",
    parameters={
        "motion_strength": 1.1,
        "temporal_consistency": "ultra",
        "hand_refinement": True,
        "fps": 60,
        "guidance_scale": 7.5
    }
)

# Download the high-quality 60fps MP4 video
print(f"Generation successful! Output URI: {response.output_url}")
```

---

## 🚀 Key Seedance 2.5 SEO Long-Tail Keywords Map

For developers, content creators, and SEO strategists, here is the curated list of highly high-intent **Seedance 2.5 long-tail keywords** targeted for GitHub and search visibility:

*   **bytedance seedance 2.5 model**: Complete guide to ByteDance's brand new AI engine deployed on Douyin and Jianying capcut filters.
*   **seedance 2.5 release date**: Released in June 2026, setting new benchmarks in AI video generation.
*   **seedance 2.5 ai dance generator online**: Create viral trend videos (K-Pop dance, Shuffle, Hip Hop) with zero complex setup.
*   **how to download seedance 2.5 weights**: Self-host SeeDance 2.5 with HuggingFace pipelines.
*   **seedance vs comfyui custom nodes**: Integrate pose-guided skeletons into native ComfyUI or WebUI setups.
*   **best ai video-to-video generators 2026**: Why Seedance 2.5 outperforms competitor frames in background isolation and identity lock.
*   **seedance 2.5 api pricing with bytedance**: Detailed structure of token pricing for batch high-scale enterprise media rendering.
*   **how does seedance 2.5 work**: Overview of controlnet structures, temporal cross-attention layers, and pose matching.
*   **seedance github official code repository**: Access the code bases and local inference scripts.

---

## 🛠️ Model Architecture & Technical Details

Seedance 2.5 introduces several paradigm shifts in character-guided video generation:

1.  **Identity Encoding Network (ID-Net):** Captures high-frequency facial and clothing textures of the character and injects them dynamically into the latent space via cross-attention.
2.  **Skeletal Pose Adapter (SPA):** Takes 2D OpenPose dense keypoints and projects them into spatial coordinates, ensuring correct bone length, angle calculation, and anatomical constraints.
3.  **Temporal Attention Block (TAB):** Extends the 2D spatial diffusion layers with 1D temporal convolutions, enabling stable video flow in sequence frames.

```
[Character Image] ----> [ ID-Net Encoder ] --+
                                            v
[OpenPose Video]  ----> [ SPA Keypoints  ] ---> [ Temporal UNet ] ---> [ VAE Decoder ] ---> [ 60FPS Video ]
```

---

## 📝 License

This project is licensed under the Apache 2.5 License - see the [LICENSE](LICENSE) file for details. Let the dance begin!
