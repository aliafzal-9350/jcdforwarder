const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://ddpchain.com/wp-content/plugins/ddpchain-world-ports/';
const TARGET_DIR = path.join(__dirname, '../public/data/seaports');

function fetchFile(url, destPath) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        resolve({ url, status: res.statusCode });
        return;
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        fs.writeFileSync(destPath, buffer);
        resolve({ url, status: 200, size: buffer.length });
      });
    }).on('error', (err) => {
      resolve({ url, status: 'error', error: err.message });
    });
  });
}

async function main() {
  console.log('Starting World Seaport Database Ingestion...');

  // 1. Download primary index files
  console.log('1. Downloading index.json...');
  const indexRes = await fetchFile(
    `${BASE_URL}data/index.json`,
    path.join(TARGET_DIR, 'index.json')
  );
  console.log(' - index.json status:', indexRes.status, 'size:', indexRes.size);

  console.log('2. Downloading search-index.json...');
  const searchRes = await fetchFile(
    `${BASE_URL}data/search-index.json`,
    path.join(TARGET_DIR, 'search-index.json')
  );
  console.log(' - search-index.json status:', searchRes.status, 'size:', searchRes.size);

  console.log('3. Downloading world-countries.geojson...');
  const mapRes = await fetchFile(
    `${BASE_URL}assets/map/world-countries.geojson`,
    path.join(TARGET_DIR, 'world-countries.geojson')
  );
  console.log(' - world-countries.geojson status:', mapRes.status, 'size:', mapRes.size);

  // 2. Read countries list
  const indexData = JSON.parse(fs.readFileSync(path.join(TARGET_DIR, 'index.json'), 'utf8'));
  const countries = indexData.countries || [];
  console.log(`Found ${countries.length} countries to ingest.`);

  // 3. Batch download country and detail files
  let completedCountries = 0;
  let completedDetails = 0;

  const CONCURRENCY = 8;
  for (let i = 0; i < countries.length; i += CONCURRENCY) {
    const chunk = countries.slice(i, i + CONCURRENCY);
    await Promise.all(
      chunk.map(async (c) => {
        const iso = c.iso2;
        // Country file
        const cPath = path.join(TARGET_DIR, 'countries', `${iso}.json`);
        const cRes = await fetchFile(`${BASE_URL}data/countries/${iso}.json`, cPath);
        if (cRes.status === 200) completedCountries++;

        // Detail file
        const dPath = path.join(TARGET_DIR, 'details', `${iso}.json`);
        const dRes = await fetchFile(`${BASE_URL}data/details/${iso}.json`, dPath);
        if (dRes.status === 200) completedDetails++;
      })
    );
    process.stdout.write(`\rProgress: ${Math.min(i + CONCURRENCY, countries.length)} / ${countries.length} countries processed.`);
  }

  console.log(`\n\nIngestion Complete!`);
  console.log(`- Countries JSON files saved: ${completedCountries} / ${countries.length}`);
  console.log(`- Technical Details JSON files saved: ${completedDetails}`);
}

main().catch(console.error);
