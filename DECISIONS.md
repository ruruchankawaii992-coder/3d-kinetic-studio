# Project Decisions

Architectural and design decisions made during development.
All agents should read this before starting work and log new decisions here.

## Texture: Support 3D 4K custom model material mapping with GPU safety
**When**: 2026-09-12 08:25:42

To provide 3D 4K custom albedo/diffuse texture map uploads that apply directly to the 3D typography model surface, with real-time GPU limit checking, auto-scaling, thumbnail generation, and leak-free memory management.

**Impact**: Adds custom texture upload features with GPU downscaling, tiling/offset/rotation controls to useStudioStore, Text3DMesh, and ControlDrawer.
