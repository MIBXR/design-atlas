const demos = [
  "caffeine-half-life",
  "movable-type",
  "pool-exhaustion",
  "orbit-spec",
  "linear-attention",
  "first-newsletter",
  "slow-breathing",
  "front-page",
  "geometry-of-meaning",
  "rate-limiter-spec",
  "color-clash"
];
const requested = new URLSearchParams(location.search).get('demo');
const selected = demos.includes(requested) ? requested : demos[0];
location.replace(new URL('./' + selected + '/index.html', location.href));
