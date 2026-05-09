# Dynamic Open Graph Meta Tags Guide

This guide explains how to implement and manage dynamic Open Graph meta tags for your Astro project.

## Overview

The system consists of:
1. **Enhanced Layout Component** (`src/layouts/Layout.astro`) - Accepts meta tag props
2. **Meta Utility** (`src/utils/meta.ts`) - Manages meta data configuration
3. **Page Implementation** - Each page defines its specific meta data

## How It Works

### 1. Layout Component Enhancement

The `Layout.astro` component now accepts these props:

```typescript
interface Props {
  title: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  ogUrl?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}
```

### 2. Meta Utility Functions

The `src/utils/meta.ts` file provides:

- **SITE_CONFIG**: Global site configuration
- **PAGE_META**: Predefined meta data for common pages
- **createPageMeta()**: Helper function to generate complete meta data

### 3. Usage in Pages

#### Option A: Using the Utility (Recommended)

```astro
---
import Layout from '../layouts/Layout.astro';
import { createPageMeta, PAGE_META } from '../utils/meta';
import heroImage from '../assets/page-hero.jpg';

// Generate meta data for this page
const metaData = createPageMeta("/page-path", PAGE_META.pageName, heroImage);
---

<Layout {...metaData}>
  <!-- Page content -->
</Layout>
```

#### Option B: Manual Configuration

```astro
---
import Layout from '../layouts/Layout.astro';
import heroImage from '../assets/page-hero.jpg';

const pageTitle = "Page Title - Granar-Te";
const pageDescription = "Page description for SEO and social sharing";
---

<Layout 
  title={pageTitle}
  description={pageDescription}
  ogTitle={pageTitle}
  ogDescription={pageDescription}
  ogImage={`https://granar-te.com${heroImage.src}`}
  ogType="website"
  ogUrl="https://granar-te.com/page-path"
  twitterTitle={pageTitle}
  twitterDescription={pageDescription}
  twitterImage={`https://granar-te.com${heroImage.src}`}
>
  <!-- Page content -->
</Layout>
```

## Configuration

### Site Configuration

Update `SITE_CONFIG` in `src/utils/meta.ts`:

```typescript
export const SITE_CONFIG = {
  name: "Granar-Te",
  url: "https://your-actual-domain.com", // ⚠️ Update with your real domain
  defaultDescription: "Your default site description",
  defaultImage: "/default-og-image.jpg", // ⚠️ Add this image to public folder
  locale: "es_ES",
};
```

### Adding New Pages

To add meta data for a new page, update `PAGE_META` in `src/utils/meta.ts`:

```typescript
export const PAGE_META = {
  // ... existing pages
  "new-page": {
    title: "New Page Title - Granar-Te",
    description: "New page description for SEO and social sharing",
    ogType: "article" as const, // Use "article" for content pages, "website" for landing pages
  },
} as const;
```

Then in your page file:

```astro
---
import { createPageMeta, PAGE_META } from '../utils/meta';
import heroImage from '../assets/new-page-hero.jpg';

const metaData = createPageMeta("/new-page", PAGE_META["new-page"], heroImage);
---

<Layout {...metaData}>
  <!-- Page content -->
</Layout>
```

## Generated Meta Tags

The system automatically generates these meta tags:

### SEO
- `<title>`
- `<meta name="description">`

### Open Graph (Facebook)
- `<meta property="og:type">`
- `<meta property="og:url">`
- `<meta property="og:title">`
- `<meta property="og:description">`
- `<meta property="og:image">`
- `<meta property="og:site_name">`
- `<meta property="og:locale">`

### Twitter Cards
- `<meta property="twitter:card">`
- `<meta property="twitter:url">`
- `<meta property="twitter:title">`
- `<meta property="twitter:description">`
- `<meta property="twitter:image">`

## Best Practices

### 1. Content Types

Use appropriate `ogType` values:
- `"website"` - For landing pages, home page
- `"article"` - For blog posts, content pages
- `"profile"` - For about/team pages

### 2. Images

- **Size**: 1200x630px (optimal for social sharing)
- **Format**: JPG or PNG
- **Quality**: High quality but optimized for web
- **Content**: Ensure images look good when cropped to different aspect ratios

### 3. Text Content

- **Titles**: 50-60 characters max
- **Descriptions**: 150-160 characters max
- **Be specific**: Each page should have unique, descriptive content

### 4. URLs

- Always use absolute URLs for images and canonical URLs
- Ensure your domain is correctly set in `SITE_CONFIG.url`

## Testing

Test your meta tags using these tools:
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

## Required Setup

1. **Update Site URL**: Change `SITE_CONFIG.url` to your actual domain
2. **Add Default Image**: Add `/public/default-og-image.jpg` (1200x630px)
3. **Update Existing Pages**: Apply the new system to all your pages

## Examples

Check these implemented examples:
- `src/pages/index.astro` - Home page using utility
- `src/pages/landing-descubre-el-poder.astro` - Landing page with article type
- `src/pages/te-ayudo.astro` - Services page

## Troubleshooting

### Images Not Showing
- Verify image paths are correct
- Ensure images are accessible via absolute URLs
- Check that images are optimized and not too large

### Meta Tags Not Updating
- Clear social platform caches using their debugging tools
- Verify the meta tags are actually rendered in your HTML source
- Check for any TypeScript errors in your meta configuration 