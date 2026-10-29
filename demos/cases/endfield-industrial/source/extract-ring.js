const ring = document.querySelector('[class*="Operator_switchItem"] svg').cloneNode(true);
ring.removeAttribute('class');
ring.querySelectorAll('[class]').forEach(element => element.removeAttribute('class'));
const ringText = new XMLSerializer().serializeToString(ring).replaceAll('currentColor', '#cccccc');
const ringLink = document.createElement('a');
ringLink.href = URL.createObjectURL(new Blob([ringText], { type: 'image/svg+xml' }));
ringLink.download = 'operator-selected-ring.svg';
ringLink.click();
URL.revokeObjectURL(ringLink.href);
