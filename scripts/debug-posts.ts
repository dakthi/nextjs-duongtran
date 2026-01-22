import * as fs from 'fs';
import * as path from 'path';

const filePath = path.join(process.cwd(), 'posts-migrate', 'Duong Tran - Posts.txt');
const fileContent = fs.readFileSync(filePath, 'utf-8');

// Look for all lines with dashes
const lines = fileContent.split('\n');
console.log('Lines with dashes:');
lines.forEach((line, index) => {
  if (line.includes('—') || line.match(/^-{3,}/)) {
    console.log(`Line ${index + 1}: "${line}"`);
  }
});

// Try different split patterns
console.log('\n\nTrying split by double newline + dashes:');
const sections1 = fileContent.split(/\n\n—[-]+\n\n/);
console.log(`Found ${sections1.length} sections`);

console.log('\n\nTrying split by newline + dashes + newline:');
const sections2 = fileContent.split(/\n—[-]+\n/);
console.log(`Found ${sections2.length} sections`);

console.log('\n\nTrying split by any dashes:');
const sections3 = fileContent.split(/—[-]+/);
console.log(`Found ${sections3.length} sections`);

// Show first 200 chars of first 3 sections
console.log('\n\nFirst 3 sections preview (method 2):');
sections2.slice(0, 3).forEach((section, i) => {
  console.log(`\n=== Section ${i + 1} ===`);
  console.log(section.substring(0, 200));
});
