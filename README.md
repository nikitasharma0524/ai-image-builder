# 🎨 AI Image Builder

> Transform your images with professional AI-powered editing tools. Built with Next.js 15 and Cloudinary AI.

![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

---

## ✨ Features

### 🤖 AI-Powered Tools
- **🖼️ Background Removal** - Instantly remove backgrounds with one click, perfect for product photos and portraits
- **🎭 Smart Object Removal** - Remove any unwanted objects using AI by simply describing what to remove
- **🌅 AI Background Replace** - Replace backgrounds with AI-generated scenes (beaches, offices, forests, etc.)
- **📏 Generative Fill** - Expand your canvas and let AI fill the extra space intelligently

### 🎯 Professional Features
- **📚 Layer Management** - Non-destructive editing with unlimited layers
- **⚖️ Before/After Comparison** - Interactive slider to compare edits side-by-side
- **🌓 Dark Mode** - Beautiful dark/light themes with system preference detection
- **💾 Auto-Save** - Your work is automatically saved to localStorage
- **📱 Responsive Design** - Works beautifully on desktop and tablet devices
- **⚡ Real-time Preview** - See your changes instantly

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- A Cloudinary account (free tier available)
- npm or yarn package manager

### 1. Clone & Install

```bash
# Navigate to the project directory
cd ai-image-builder-app

# Install dependencies
npm install
# or
yarn install
```

### 2. Configure Cloudinary

Create a `.env.local` file in the root directory:

```env
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
CLOUDINARY_UPLOAD_PRESET=your_unsigned_upload_preset
```

**How to get these values:**

1. Go to [Cloudinary](https://cloudinary.com/) and create a free account
2. Navigate to **Dashboard** to find your:
   - Cloud Name
   - API Key
   - API Secret
3. Go to **Settings** → **Upload** → **Upload Presets**
4. Create a new **unsigned** upload preset and copy its name

### 3. Run the App

```bash
# Development mode with Turbopack
npm run dev

# The app will open at http://localhost:3000
```

### 4. Build for Production

```bash
# Create optimized build
npm run build

# Start production server
npm start
```

---

## 📖 How to Use

### Step 1: Upload an Image
- **Drag & drop** an image onto the upload area, or **click to browse**
- Supported formats: `.jpg`, `.png`, `.webp`, `.jpeg`

### Step 2: Choose an AI Tool

#### 🖼️ Background Remove
1. Click the **Background Remove** button
2. Click **Remove Background**
3. Your image background is instantly removed (transparent PNG)

#### 🎭 Smart Remove
1. Click the **Smart Remove** button
2. Type what you want to remove (e.g., "person", "car", "watermark")
3. Click **Magic Remove**
4. AI intelligently removes the object

#### 🌅 BG Replace
1. Click the **BG Replace** button
2. Describe the new background (e.g., "sunset beach", "modern office")
3. Click **Replace Background**
4. AI generates a contextual background

#### 📏 Generative Fill
1. Click the **Generative Fill** button
2. Adjust width/height sliders to expand canvas
3. Preview shows the expansion area in blue
4. Click **Apply Generative Fill**
5. AI fills the expanded area seamlessly

### Step 3: Manage Layers
- Each transformation creates a new layer (non-destructive)
- Click any layer to make it active
- Click the **⋯** icon to view layer info or delete
- Use **Compare Layers** to see before/after with an interactive slider

---

## 🏗️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library with latest features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Zustand** - Lightweight state management
- **Radix UI** - Accessible component primitives

### Image Processing
- **Cloudinary AI** - Cloud-based image transformations
  - Background removal API
  - Generative AI for object removal
  - AI-powered background replacement
  - Generative fill for canvas expansion

### UI Components
- **Lucide React** - Beautiful icon library
- **React Hook Form** - Efficient form handling
- **React Dropzone** - Drag-and-drop file upload
- **React Compare Slider** - Before/after comparison
- **Next Themes** - Dark mode support

---

## 📁 Project Structure

```
ai-image-builder-app/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main editor page
│   └── globals.css         # Global styles
│
├── components/
│   ├── editor.tsx          # Main editor layout
│   ├── active-image.tsx    # Image display area
│   ├── loading-screen.tsx  # AI processing dialog
│   │
│   ├── toolbar/            # AI editing tools
│   │   ├── bg-remove.tsx
│   │   ├── bg-replace.tsx
│   │   ├── gen-remove.tsx
│   │   └── generative-fill.tsx
│   │
│   ├── layers/             # Layer management
│   │   ├── layers.tsx
│   │   ├── layer-image.tsx
│   │   ├── layer-info.tsx
│   │   └── image-comparision.tsx
│   │
│   ├── upload/             # File upload
│   │   ├── upload-form.tsx
│   │   └── upload-image.tsx
│   │
│   ├── theme/              # Theme system
│   │   ├── theme-provider.tsx
│   │   └── mode-toggle.tsx
│   │
│   └── ui/                 # Reusable components
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       └── ...
│
├── lib/
│   ├── layer-store.tsx     # Layer state management
│   ├── image-store.ts      # Generation state
│   ├── zustand-context.tsx # Context wrapper
│   ├── check-processing.ts # Image polling utility
│   └── utils.ts            # Helper functions
│
├── server/                 # Server actions
│   ├── upload-image.ts
│   ├── bg-remove.ts
│   ├── bg-replace.ts
│   ├── gen-remove.ts
│   └── gen-fill.ts
│
└── .env.local             # Environment variables
```

---

## 🎨 Available Scripts

```bash
# Development with Turbopack (faster)
npm run dev

# Create production build
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

---

## 🔧 Configuration

### Cloudinary Transformations

The app uses Cloudinary's URL-based transformations:

| Feature | Transformation | Example |
|---------|---------------|---------|
| **BG Remove** | `e_background_removal` | Removes background, outputs PNG |
| **Gen Remove** | `e_gen_remove:{prompt}` | Removes specified objects |
| **BG Replace** | `e_gen_background_replace:prompt_{text}` | AI-generated backgrounds |
| **Gen Fill** | `ar_{ratio},b_gen_fill,c_pad,w_{w},h_{h}` | Expands canvas with AI |

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `CLOUDINARY_NAME` | Your Cloudinary cloud name | ✅ Yes |
| `CLOUDINARY_KEY` | Cloudinary API key | ✅ Yes |
| `CLOUDINARY_SECRET` | Cloudinary API secret | ✅ Yes |
| `CLOUDINARY_UPLOAD_PRESET` | Unsigned upload preset name | ✅ Yes |

---

## 💡 How It Works

### Image Upload Flow
1. User uploads image via drag-drop or file picker
2. File is sent to Cloudinary via server action
3. Cloudinary returns URL + metadata (dimensions, format, etc.)
4. New layer is created with image data
5. Image displays in the editor

### AI Transformation Flow
1. User selects AI tool and provides input (if needed)
2. Server action constructs Cloudinary transformation URL
3. Backend polls URL every 500ms until processing completes (max 20 attempts)
4. New layer is created with transformed image
5. User can compare with original or continue editing

### Layer System
- Each edit creates a new layer (non-destructive)
- Layers stored in Zustand with localStorage persistence
- Can switch between layers, compare them, or delete
- Original image is never modified

---

## 🎯 Use Cases

### E-Commerce
- Remove product backgrounds for clean white backgrounds
- Expand product images to match platform requirements
- Remove unwanted elements from product photos

### Photography
- Remove photobombers or unwanted objects
- Replace boring backgrounds with scenic ones
- Expand portrait crops for different aspect ratios

### Social Media
- Create transparent PNGs for graphics
- Remove watermarks or text overlays
- Generate backgrounds for profile pictures

### Design
- Prepare images for presentations
- Create mockups with clean backgrounds
- Extend images to fit design layouts

---

## 🐛 Troubleshooting

### Image not uploading
- Check that `.env.local` has correct Cloudinary credentials
- Ensure upload preset is **unsigned** in Cloudinary settings
- Verify file size is under Cloudinary's free tier limit (10MB)

### AI transformation stuck
- Transformations typically take 5-15 seconds
- If stuck over 30 seconds, refresh and try again
- Complex images may take longer to process

### Dark mode not working
- Clear localStorage and refresh
- Check browser compatibility (modern browsers only)

### Images not displaying
- Verify Cloudinary domain is in `next.config.ts` → `images.remotePatterns`
- Check browser console for CORS errors
- Ensure Cloudinary images are publicly accessible

---

## 🚀 Performance Tips

1. **Optimize uploads** - Compress large images before uploading
2. **Use appropriate tools** - BG removal is faster than generative tools
3. **Limit layers** - Delete unused layers to keep localStorage clean
4. **Test on fast connection** - AI processing requires stable internet

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🙏 Acknowledgments

- **Cloudinary** - AI image transformation APIs
- **Vercel** - Next.js framework and deployment
- **Radix UI** - Accessible component primitives
- **shadcn/ui** - Component design inspiration

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Cloudinary documentation at [cloudinary.com/documentation](https://cloudinary.com/documentation)
3. Open an issue on GitHub with detailed error logs

---

## 🎉 Start Creating!

Ready to transform your images with AI? Run `npm run dev` and start editing!

**Happy Editing! 🎨✨**
