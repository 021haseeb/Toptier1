const fs = require('fs');
const file = 'client/src/components/home/HeroSection.jsx';
let content = fs.readFileSync(file, 'utf8');

// Find the last </div> before </section> and insert a </div> after it
const lastDivBeforeSection = content.lastIndexOf('</div>', content.indexOf('</section>'));
if (lastDivBeforeSection > 0 && lastDivBeforeSection === content.lastIndexOf('</div>', content.indexOf('</section>') - 1)) {
  // Check if there's already a closing div for section-padding
  const textBetween = content.substring(lastDivBeforeSection + 6, content.indexOf('</section>')).trim();
  if (!textBetween.includes('</div>')) {
    // Insert the missing </div>
    content = content.slice(0, lastDivBeforeSection + 6) + '\n      </div>' + content.slice(lastDivBeforeSection + 6);
  }
}

// Alternative approach: find and replace specific pattern
content = content.replace(
  '        </div>\n\n      <ScrollIndicator />',
  '        </div>\n      </div>\n\n      <ScrollIndicator />'
);

fs.writeFileSync(file, content);
console.log('Patched');
