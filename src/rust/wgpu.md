# wgpu

Wgpu (opens new window)is a Rust implementation of the WebGPU API spec (opens new window).
WebGPU is a specification published by the GPU for the Web Community Group. It aims to allow
web code access to GPU functions in a safe and reliable manner. It does this by mimicking the
Vulkan API, and translating that down to whatever API the host hardware is using (ie. DirectX,
Metal, Vulkan).

## Library output requirements 
We need rlib if we want to run wgpu in a desktop environment. We need cdylib to create the 
Web Assembly that the browser will run.
