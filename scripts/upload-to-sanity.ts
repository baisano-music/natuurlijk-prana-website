import { createClient } from '@sanity/client';
import * as fs from 'fs';
import * as path from 'path';

const client = createClient({
  projectId: '0xp96ddy',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

const IMAGES_DIR = './wp-images';
const PROGRESS_FILE = './wp-images/.upload-progress.json';

interface ProgressData {
  uploaded: string[];
  failed: { file: string; error: string }[];
}

function loadProgress(): ProgressData {
  if (fs.existsSync(PROGRESS_FILE)) {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf-8'));
  }
  return { uploaded: [], failed: [] };
}

function saveProgress(data: ProgressData) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(data, null, 2));
}

function getAllImageFiles(dir: string): string[] {
  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllImageFiles(fullPath));
    } else if (/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

async function uploadImage(filePath: string): Promise<string> {
  const fileBuffer = fs.readFileSync(filePath);
  const filename = path.basename(filePath);

  const asset = await client.assets.upload('image', fileBuffer, {
    filename,
    contentType: getMimeType(filePath),
  });

  return asset._id;
}

async function main() {
  console.log('Sanity Image Uploader\n');

  if (!process.env.SANITY_API_TOKEN) {
    console.error('Error: SANITY_API_TOKEN environment variable is required');
    console.log('Run with: SANITY_API_TOKEN=your-token npx tsx scripts/upload-to-sanity.ts');
    process.exit(1);
  }

  console.log(`Scanning ${IMAGES_DIR} for images...`);
  const allFiles = getAllImageFiles(IMAGES_DIR);
  console.log(`Found ${allFiles.length} images\n`);

  const progress = loadProgress();
  const filesToUpload = allFiles.filter(f => !progress.uploaded.includes(f));

  console.log(`Already uploaded: ${progress.uploaded.length}`);
  console.log(`To upload: ${filesToUpload.length}\n`);

  if (filesToUpload.length === 0) {
    console.log('All images already uploaded!');
    return;
  }

  let uploaded = 0;
  let failed = 0;

  for (let i = 0; i < filesToUpload.length; i++) {
    const file = filesToUpload[i];
    const relativePath = path.relative(IMAGES_DIR, file);

    console.log(`[${i + 1}/${filesToUpload.length}] Uploading: ${relativePath}`);

    try {
      const assetId = await uploadImage(file);
      console.log(`  ✓  Uploaded: ${assetId}`);
      progress.uploaded.push(file);
      uploaded++;
    } catch (error) {
      const errorMsg = (error as Error).message;
      console.log(`  ✗  Failed: ${errorMsg}`);
      progress.failed.push({ file, error: errorMsg });
      failed++;
    }

    // Save progress after each upload
    saveProgress(progress);

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  console.log('\n--- Summary ---');
  console.log(`Uploaded: ${uploaded}`);
  console.log(`Failed:   ${failed}`);
  console.log(`Total:    ${allFiles.length}`);

  if (progress.failed.length > 0) {
    console.log('\nFailed uploads:');
    for (const f of progress.failed) {
      console.log(`  - ${f.file}: ${f.error}`);
    }
  }
}

main().catch(console.error);
