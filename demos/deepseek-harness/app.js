const React = harnessRequire(88557);
const locale = new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : 'zh';
const override = (id, exports) => { harnessCache[id] = { exports }; };
const trackExports = {};
for (const key of ['uG', 'kO', 'v8', 'bq', 'X0', 'FA', 'U0', 'Ry', 'jS', 'QX']) trackExports[key] = () => {};
override(90542, new Proxy(trackExports, { get: (target, key) => target[key] || (() => {}) }));
override(48161, { E: () => ({ isLoading: false, countryCode: 'CN', isMainland: true, error: null }), e: () => false });
override(37059, {
  jD: () => '/harness',
  rU: React.forwardRef(function SourceLink({ href, locale: linkLocale, prefetch, ...props }, ref) {
    const path = typeof href === 'string' ? href : href.pathname;
    const target = path === '/harness' ? `index.html${linkLocale === 'en' ? '?lang=en' : ''}` : new URL(path, 'https://www.deepseek.com').href;
    return React.createElement('a', { ...props, href: target, ref });
  })
});
override(74577, { useParams: () => ({ locale }), useRouter: () => ({ replace: path => { location.href = path.startsWith('/en/') ? '?lang=en' : 'index.html'; } }) });
override(16586, { Z: { set() {} } });
const productLinks = harnessRequire(1881);
override(1881, { ...productLinks, gq: path => `assets/harness${path}` });
override(26599, (load, options) => {
  const Component = React.lazy(() => load().then(module => ({ default: module.default || module })));
  return props => React.createElement(React.Suspense, { fallback: null }, React.createElement(Component, props));
});
const IntlProvider = harnessRequire(89652).NextIntlClientProvider;
const Harness = harnessRequire(92502).HarnessContent;
const root = harnessRequire(29294).createRoot(document.getElementById('demo-root'));
document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en';
root.render(React.createElement(IntlProvider, { locale, messages: harnessMessages[locale], timeZone: 'Asia/Shanghai' }, React.createElement(Harness)));
document.body.dataset.runtime = 'mounted';
document.addEventListener('click', event => {
  const link = event.target.closest('a[href]');
  if (!link) return;
  const href = link.getAttribute('href');
  if (href.startsWith('/') && !href.startsWith('//')) { event.preventDefault(); window.open(`https://www.deepseek.com${href}`, '_blank', 'noopener'); }
});
