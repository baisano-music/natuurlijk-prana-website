import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import * as http from 'http';

const XML_FILE = '/Users/Gebruiker/Downloads/prana.WordPress.2026-02-07.xml';
const OUTPUT_DIR = './wp-images';

async function extractImageUrls(xmlContent: string): Promise<string[]> {
  const urls: string[] = [];

  // Match attachment_url elements
  const attachmentUrlRegex = /<wp:attachment_url><!\[CDATA\[(.*?)\]\]><\/wp:attachment_url>/g;
  let match;

  while ((match = attachmentUrlRegex.exec(xmlContent)) !== null) {
    const url = match[1];
    // Filter for image files
    if (/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(url)) {
      urls.push(url);
    }
  }

  // Also find images in content (img src)
  const imgSrcRegex = /src=["'](https?:\/\/natuurlijkprana\.nl\/wp-content\/uploads\/[^"']+\.(jpg|jpeg|png|gif|webp|svg))["']/gi;
  while ((match = imgSrcRegex.exec(xmlContent)) !== null) {
    const url = match[1];
    if (!urls.includes(url)) {
      urls.push(url);
    }
  }

  return urls;
}

function downloadFile(url: string, destPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(destPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Skip if file already exists
    if (fs.existsSync(destPath)) {
      console.log(`  ⏭  Skipped (exists): ${path.basename(destPath)}`);
      resolve();
      return;
    }

    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(destPath);

    const request = protocol.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          file.close();
          fs.unlinkSync(destPath);
          downloadFile(redirectUrl, destPath).then(resolve).catch(reject);
          return;
        }
      }

      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(destPath);
        reject(new Error(`Failed to download ${url}: HTTP ${response.statusCode}`));
        return;
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`  ✓  Downloaded: ${path.basename(destPath)}`);
        resolve();
      });
    });

    request.on('error', (err) => {
      file.close();
      if (fs.existsSync(destPath)) {
        fs.unlinkSync(destPath);
      }
      reject(err);
    });

    request.setTimeout(30000, () => {
      request.destroy();
      reject(new Error(`Timeout downloading ${url}`));
    });
  });
}

function getLocalPath(url: string): string {
  // Extract path after /wp-content/uploads/
  const match = url.match(/\/wp-content\/uploads\/(.+)$/);
  if (match) {
    return path.join(OUTPUT_DIR, match[1]);
  }
  // Fallback: use filename only
  return path.join(OUTPUT_DIR, path.basename(url));
}

async function main() {
  console.log('WordPress Image Extractor\n');
  console.log(`Reading XML file: ${XML_FILE}`);

  const xmlContent = fs.readFileSync(XML_FILE, 'utf-8');
  console.log(`XML file size: ${(xmlContent.length / 1024 / 1024).toFixed(2)} MB\n`);

  console.log('Extracting image URLs...');
  const urls = await extractImageUrls(xmlContent);
  console.log(`Found ${urls.length} unique images\n`);

  if (urls.length === 0) {
    console.log('No images found!');
    return;
  }

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log(`Downloading to: ${path.resolve(OUTPUT_DIR)}\n`);

  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const localPath = getLocalPath(url);

    console.log(`[${i + 1}/${urls.length}] ${url}`);

    try {
      const existed = fs.existsSync(localPath);
      await downloadFile(url, localPath);
      if (existed) {
        skipped++;
      } else {
        downloaded++;
      }
    } catch (error) {
      console.log(`  ✗  Error: ${(error as Error).message}`);
      failed++;
    }

    // Small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n--- Summary ---');
  console.log(`Downloaded: ${downloaded}`);
  console.log(`Skipped:    ${skipped}`);
  console.log(`Failed:     ${failed}`);
  console.log(`Total:      ${urls.length}`);
}

main().catch(console.error);
