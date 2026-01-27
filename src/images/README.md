# Avatar Images

## How to Add Your Own Avatar Images

1. **Add 2 images to this folder:**
   - `avatar-1.jpg` or `avatar-1.png` - Your first outfit/style
   - `avatar-2.jpg` or `avatar-2.png` - Your second outfit/style

2. **Update the SimpleAvatar component:**

Open `src/components/SimpleAvatar.jsx` and replace the placeholder image URLs:

```javascript
const avatars = [
  {
    id: 0,
    name: "Developer Mode",
    image: "/src/images/avatar-1.png",  // Update this path
    gradient: "from-orange-500 to-orange-600"
  },
  {
    id: 1,
    name: "Creative Mode",
    image: "/src/images/avatar-2.png",  // Update this path
    gradient: "from-grey-600 to-orange-500"
  }
];
```

## Image Recommendations

- **Format:** PNG or JPG
- **Size:** 800x800px or 1000x1000px (square)
- **Background:** Transparent PNG works best
- **Style:** Professional photos, illustrated avatars, or cartoon versions of yourself
- **Theme:** Keep them consistent with the black + orange + grey color palette

## Tips

- Use the same pose/angle for both images for smooth transitions
- Make sure images are optimized (< 500KB each)
- Consider using tools like [remove.bg](https://remove.bg) to remove backgrounds
- For illustrated avatars, try [Avataaars Generator](https://getavataaars.com/) or similar tools
