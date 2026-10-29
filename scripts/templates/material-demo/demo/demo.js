const selected = new URLSearchParams(location.search).get('demo') || 'card';
document.querySelectorAll('.sample').forEach(sample => { sample.hidden = true; });
document.getElementById(selected).hidden = false;
