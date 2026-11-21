(function () {
  var CDN = (function () {
    var s = document.currentScript && document.currentScript.src;
    return s ? s.replace(/[^\/]*$/, '') : '';
  })();
  var CAT = { pajamas: '', robes: '', news: '', gifts: '', all: '' };
  var PAGES = {
    fabric: 'our-fabric/page-2005490027',
    contact: 'contact-us/page-1096185972',
    shipping: 'shipping-and-delivery/page-322733941',
    returns: 'exchange-and-returns/page-1830397558',
    privacy: 'privacy/page-1031992856'
  };
  var IG = 'https://www.instagram.com/silora_sa/';
  var PDF = CDN + 'img/oeko-tex-certificate.pdf';
  var COLORS = [
    { k: 'blue me away', ar: 'سماوي', c: '#BFDCEF', side: 'يسار الصورة' },
    { k: 'pink about it', ar: 'وردي فاتح', c: '#F6D5D8', side: 'يمين الصورة' },
    { k: 'mint to be', ar: 'نعناعي', c: '#CFE3CF' },
    { k: 'butter me up', ar: 'زبدي', c: '#F2E3A9' },
    { k: 'pink me later', ar: 'كاروهات وردي', c: '#EEC3D3' }
  ];
  var RAIL_ORDER = ['blue me away', 'pink about it', 'mint to be', 'butter me up', 'pink me later'];
  var FALLBACK = {
    '93545949': 'Blue Me Away', '1133289926': 'Pink About It', '1729481504': 'Mint To Be',
    '1436896160': 'Butter Me Up', '690540196': 'Pink Me Later'
  };
  var MATERIAL = 'بامبو';
  var FIT = { shorts: ['blue me away', 'pink about it'], wide: ['blue me away', 'pink about it'] };
  var CHART = {
    robe: { t: 'الروب', rows: [['الطول', 83.5, 86, 88.5], ['نصف الصدر', 53, 55, 57], ['عرض الكتف', 48, 50, 52], ['طول الكم', 38.5, 40.5, 42.5], ['نصف الخصر', 56, 58, 60], ['عرض الأسفل', 68, 70, 72]] },
    wide: { t: 'الروب', rows: [['الطول', 82, 84.5, 87], ['نصف الصدر', 54, 56, 58], ['عرض الكتف', 48.5, 50.5, 52.5], ['طول الكم', 49, 51, 53], ['نصف الخصر', 56.5, 58.5, 60.5], ['عرض الأسفل', 68, 70, 72]] },
    top: { t: 'التوب', rows: [['الطول', 44, 46, 48], ['نصف الصدر', 42, 44, 46], ['طول الحمالة', 40, 41, 42], ['عرض الأسفل', 45, 47, 49]] },
    pants: { t: 'البنطلون', rows: [['الطول', 95, 98, 101], ['نصف الخصر', 36.5, 38.5, 40.5], ['نصف الورك', 50.5, 52.5, 54.5], ['فتحة الرجل', 18.5, 19, 19.5], ['الحِجر الأمامي', 29.5, 30.5, 31.5]] },
    shorts: { t: 'الشورت', rows: [['الطول', 32.5, 34, 35.5], ['نصف الخصر', 36.5, 38.5, 40.5], ['نصف الورك', 56, 58, 60], ['فتحة الرجل', 37, 38, 39], ['الحِجر الأمامي', 30, 31, 32]] }
  };
  var KINDS = {
    set: { label: 'طقم بنطلون', card: 'طقم توب وبنطلون', parts: ['top', 'pants'] },
    shorts: { label: 'طقم شورت', card: 'طقم توب وشورت', parts: ['top', 'shorts'] },
    robe: { label: 'روب', card: 'روب يُلبس فوق الطقم', parts: ['robe'] },
    wide: { label: 'روب بأكمام واسعة', card: 'روب بأكمام واسعة', parts: ['wide'] }
  };

  var I = {
    user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.6"/><path d="M4.8 20c.9-3.6 3.7-5.6 7.2-5.6s6.3 2 7.2 5.6"/></svg>',
    heart: '<svg viewBox="0 0 24 24"><path d="M12 20s-7.5-4.6-7.5-10.1A4.2 4.2 0 0 1 12 7.4a4.2 4.2 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z"/></svg>',
    bag: '<svg viewBox="0 0 24 24"><path d="M5.5 8.5h13l-1 11.5h-11z"/><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5"/></svg>',
    search: '<svg viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.3"/><path d="M15.5 15.5 20 20"/></svg>',
    menu: '<svg viewBox="0 0 24 24"><path d="M3.5 7h17M3.5 12h17M3.5 17h17"/></svg>',
    close: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    down: '<svg viewBox="0 0 24 24" width="14" height="14" style="stroke:currentColor;stroke-width:1.5;fill:none"><path d="m6 9 6 6 6-6"/></svg>',
    prev: '<svg viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg>',
    next: '<svg viewBox="0 0 24 24"><path d="m15 6-6 6 6 6"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" width="16" height="16" style="stroke:currentColor;stroke-width:1.5;fill:none"><path d="M19 12H5m5-5-5 5 5 5"/></svg>',
    plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
    pause: '<svg viewBox="0 0 24 24"><path d="M9.5 6v12M14.5 6v12"/></svg>',
    play: '<svg viewBox="0 0 24 24"><path d="M8 6l10 6-10 6z"/></svg>',
    gift: '<svg viewBox="0 0 24 24"><rect x="3.5" y="8" width="17" height="4"/><path d="M5 12v8.5h14V12M12 8v12.5M12 8S10.8 3.5 8.2 4.2C6.4 4.7 7 8 12 8zm0 0s1.2-4.5 3.8-3.8C17.6 4.7 17 8 12 8z"/></svg>',
    doc: '<svg viewBox="0 0 24 24"><path d="M7 3.5h7l4 4V20.5H7z"/><path d="M14 3.5v4h4M9.5 12h6M9.5 15.5h6"/></svg>'
  };

  function cfg(k, d) { try { var v = window.salla && salla.config && salla.config.get(k); return v == null ? d : v; } catch (e) { return d; } }
  function storeBase() { var u = cfg('store.url', location.origin + '/'); return u.charAt(u.length - 1) === '/' ? u : u + '/'; }
  var PREVIEW = location.hostname === 'salla.sa';
  function U(path) {
    if (!path) return PREVIEW ? storeBase() : location.origin + '/ar';
    if (/^https?:/.test(path)) return path;
    return PREVIEW ? storeBase() + path : location.origin + '/ar/' + path;
  }
  function productUrl(u) {
    if (!u) return '#';
    if (!PREVIEW) return u;
    try { var p = new URL(u).pathname.replace(/^\/(ar|en)\//, ''); return storeBase() + p.replace(/^\//, ''); } catch (e) { return u; }
  }
  function catUrl(k) { return CAT[k] ? U(CAT[k]) : U('search') + '?q=silora&sl=' + k; }
  var COLS = {
    news: { t: 'وصل حديثاً', s: 'أحدث قطع سيلورا، لطقسكِ المفضل القادم.' },
    pajamas: { t: 'بيجامات', s: 'أطقم ناعمة للحظاتكِ الهادئة.' },
    robes: { t: 'أرواب', s: 'أرواب خفيفة تُكمل أطقمكِ المفضلة، بنفس النعومة.' },
    gifts: { t: 'هدايا', s: 'هدية ناعمة لمن تحبين — أو لكِ أنتِ.' },
    all: { t: 'تسوقي الكل', s: 'كل قطع سيلورا في مكان واحد.' }
  };
  function colKey() { try { var k = new URLSearchParams(location.search).get('sl'); return COLS[k] ? k : ''; } catch (e) { return ''; } }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function h(html) { var t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; }
  function img(n) { return CDN + 'img/' + n; }

  var LOGO = '';
  function logo() { return '<span class="sl-logo-svg">' + LOGO + '</span>'; }
  function loadLogo() {
    return fetch(img('logo.svg')).then(function (r) { return r.text(); }).then(function (t) {
      LOGO = t.replace(/fill="#352A30"/i, '').replace(/width="[^"]*"/, '').replace(/height="[^"]*"/, '').replace('<svg', '<svg aria-hidden="true" focusable="false"');
    }).catch(function () { LOGO = '<span style="font-family:var(--sl-serif);font-size:34px;line-height:1">Silora</span>'; });
  }

  function colorOf(name) {
    var n = String(name || '').toLowerCase();
    for (var i = 0; i < COLORS.length; i++) if (n.indexOf(COLORS[i].k) > -1) return COLORS[i];
    return null;
  }
  function isRobe(name) { return /روب|robe/i.test(String(name || '')); }
  function baseName(name) { return String(name || '').replace(/^\s*روب\s*/, '').replace(/\s*robe\s*$/i, '').trim(); }
  function kindOf(name) {
    var n = String(name || '').toLowerCase();
    var has = function (a) { return a.some(function (k) { return n.indexOf(k) > -1; }); };
    if (isRobe(name)) return has(FIT.wide) ? 'wide' : 'robe';
    return has(FIT.shorts) ? 'shorts' : 'set';
  }
  function blurb(name) {
    var k = kindOf(name), b = baseName(name);
    if (k === 'robe') return 'روب خفيف يُلبس فوق طقم ' + b + ' ليكمل الإطلالة.';
    if (k === 'wide') return 'روب بأكمام واسعة يُلبس فوق طقم ' + b + ' ليكمل الإطلالة.';
    if (k === 'shorts') return 'طقم بيجامة: توب بحمالات وشورت.';
    return 'طقم بيجامة: توب بحمالات وبنطلون طويل.';
  }
  function price(p) {
    var v = p && (p.sale_price && p.is_on_sale ? p.sale_price : p.price);
    if (v && typeof v === 'object') v = v.amount;
    return (v == null ? '102' : Number(v).toLocaleString('en-US')) + ' ر.س';
  }
  function pimg(p) { return (p && p.image && p.image.url) || (p && p.original_image) || ''; }

  function card(p) {
    var c = colorOf(p.name) || { ar: '', c: '#eee' };
    return '<article class="sl-card">' +
      '<a class="sl-card__media" href="' + esc(productUrl(p.url)) + '" aria-label="' + esc(p.name) + '">' +
      '<img loading="lazy" src="' + esc(pimg(p)) + '" alt="' + esc(p.name) + '">' +
      '<span class="sl-badge">جديد</span></a>' +
      '<button class="sl-wish" type="button" data-id="' + esc(p.id) + '" aria-label="أضيفي إلى المفضلة">' + I.heart + '</button>' +
      '<a href="' + esc(productUrl(p.url)) + '" class="sl-card__name">' + esc(p.name) + '</a>' +
      '<div class="sl-card__desc">' + KINDS[kindOf(p.name)].card + '</div>' +
      (c.ar ? '<div class="sl-card__color"><i style="background:' + c.c + '"></i>' + c.ar + '</div>' : '') +
      '<div class="sl-card__mat">الخامة: ' + MATERIAL + '</div>' +
      '<div class="sl-card__price">' + price(p) + '</div></article>';
  }

  function header(home) {
    var el = h('<div class="sl sl-header' + (home ? ' is-clear' : '') + '" role="banner"><div class="sl-header__in">' +
      '<div class="sl-start"><nav class="sl-nav" aria-label="القائمة الرئيسية">' +
      '<a href="' + catUrl('news') + '">وصل حديثاً</a>' +
      '<div class="sl-nav__dd"><button type="button" aria-expanded="false">تسوقي ' + I.down + '</button>' +
      '<div class="sl-dd"><a href="' + catUrl('pajamas') + '">بيجامات</a><a href="' + catUrl('robes') + '">أرواب</a><a href="' + catUrl('news') + '">وصل حديثاً</a><a href="' + catUrl('all') + '">تسوقي الكل</a></div></div>' +
      '<a href="' + U('') + '#sl-story">قصتنا</a>' +
      '<a href="' + catUrl('gifts') + '">هدايا</a></nav>' +
      '<button class="sl-ic sl-burger" type="button" data-sl-open="menu" aria-label="القائمة">' + I.menu + '</button></div>' +
      '<a class="sl-logo" href="' + U('') + '" aria-label="Silora">' + logo() + '</a>' +
      '<div class="sl-icons">' +
      '<button class="sl-ic" type="button" data-sl-search aria-label="بحث">' + I.search + '</button>' +
      '<button class="sl-ic sl-hide-m" type="button" data-sl-account aria-label="حسابي">' + I.user + '</button>' +
      '<a class="sl-ic sl-hide-m" href="' + U('wishlist') + '" aria-label="المفضلة">' + I.heart + '</a>' +
      '<a class="sl-ic" href="' + U('cart') + '" aria-label="السلة">' + I.bag + '<span class="sl-count" data-sl-count>0</span></a>' +
      '</div></div></div>');
    return el;
  }

  function menuDrawer() {
    return h('<div class="sl sl-drawer sl-drawer--menu" data-sl-drawer="menu" aria-hidden="true">' +
      '<div class="sl-drawer__scrim" data-sl-close></div>' +
      '<div class="sl-drawer__panel" role="dialog" aria-modal="true" aria-label="القائمة">' +
      '<div class="sl-m__head"><span></span><a class="sl-logo" href="' + U('') + '">' + logo() + '</a><button class="sl-x" type="button" data-sl-close aria-label="إغلاق">' + I.close + '</button></div>' +
      '<form class="sl-m__search" data-sl-searchform>' + I.search + '<input type="search" name="q" placeholder="ابحثي عن بيجامات، أرواب، ألوان…" aria-label="بحث"></form>' +
      '<div class="sl-m__list">' +
      '<div class="sl-m__item"><a href="' + catUrl('news') + '">وصل حديثاً</a></div>' +
      '<div class="sl-m__item"><button type="button" data-sl-acc aria-expanded="false">تسوقي ' + I.plus + '</button><div class="sl-m__sub"><div>' +
      '<a href="' + catUrl('all') + '">تسوقي الكل</a><a href="' + catUrl('news') + '">وصل حديثاً</a><a href="' + catUrl('pajamas') + '">بيجامات</a><a href="' + catUrl('robes') + '">أرواب</a></div></div></div>' +
      '<div class="sl-m__item"><a href="' + U('') + '#sl-story" data-sl-close>قصتنا</a></div>' +
      '<div class="sl-m__item"><a href="' + catUrl('gifts') + '">هدايا</a></div>' +
      '</div>' +
      '<div class="sl-m__foot"><a href="#" data-sl-account>حسابي</a><a href="' + U('wishlist') + '">المفضلة</a><a href="' + U(PAGES.contact) + '">تواصلي معنا</a></div>' +
      '</div></div>');
  }

  function drawer(id, title, body) {
    return h('<div class="sl sl-drawer" data-sl-drawer="' + id + '" aria-hidden="true">' +
      '<div class="sl-drawer__scrim" data-sl-close></div>' +
      '<div class="sl-drawer__panel" role="dialog" aria-modal="true" aria-labelledby="sl-t-' + id + '">' +
      '<div class="sl-drawer__head"><h2 class="sl-drawer__title" id="sl-t-' + id + '">' + title + '</h2><button class="sl-x" type="button" data-sl-close aria-label="إغلاق">' + I.close + '</button></div>' +
      '<div class="sl-drawer__body">' + body + '</div></div></div>');
  }

  function certBody() {
    return '<div class="sl-cert-d">' +
      '<h3><span class="sl-latin">OEKO-TEX® STANDARD 100</span> — شهادة القماش</h3>' +
      '<p>تؤكد هذه الشهادة أن القماش المحبوك الذي ينتجه موردنا، شركة Shantou Mingda Textile، تم اختباره للتأكد من خلوّه من المواد الضارة وفق معايير OEKO-TEX® STANDARD 100. رقم الشهادة HK015 266400، وهي سارية حتى 31 يوليو 2027. تشمل الشهادة القماش فقط، وليس القطعة النهائية.</p>' +
      '<table class="sl-table"><tbody>' +
      '<tr><th>رقم الشهادة</th><td><span class="sl-ltr">HK015 266400</span></td></tr>' +
      '<tr><th>حامل الشهادة</th><td><span class="sl-ltr">Shantou Mingda Textile Co., Ltd.</span> — الصين (مورد القماش)</td></tr>' +
      '<tr><th>جهة الإصدار</th><td><span class="sl-ltr">TESTEX AG</span>، المعهد السويسري لاختبار المنسوجات، نيابةً عن <span class="sl-ltr">OEKO-TEX® Service GmbH</span></td></tr>' +
      '<tr><th>صالحة حتى</th><td>31 يوليو 2027</td></tr>' +
      '<tr><th>فئة المنتج</th><td>I — الفئة الأكثر صرامة (منتجات الرضّع)</td></tr>' +
      '<tr><th>النطاق</th><td>أقمشة محبوكة تشمل الفيسكوز/السباندكس، مبيّضة ومصبوغة ومجهّزة (ضمن خلطات أخرى مذكورة في الشهادة)</td></tr>' +
      '</tbody></table>' +
      '<div class="sl-cert-d__cover"><b>ما القطع التي تشملها الشهادة؟</b><span>القطع المصنوعة من هذا القماش المعتمد فقط هي التي يظهر في صفحتها رابط «عرض شهادة الخامة».</span></div>' +
      '<div class="sl-cert-d__files"><img src="' + img('certificate.jpg') + '" alt="معاينة شهادة OEKO-TEX" data-sl-zoom loading="lazy">' +
      '<div><a class="sl-btn" href="' + PDF + '" target="_blank" rel="noopener">فتح الملف</a><a class="sl-btn" href="' + PDF + '" download="Silora-OEKO-TEX-certificate.pdf">تحميل الملف</a></div></div>' +
      '</div>';
  }

  function chartTable(k) {
    var c = CHART[k];
    return '<div class="sl-sc__part"><h4>' + c.t + '</h4><table><thead><tr><th>القياس</th><th>S</th><th>M</th><th>L</th></tr></thead><tbody>' +
      c.rows.map(function (r) { return '<tr><th>' + r[0] + '</th><td>' + r[1] + '</td><td>' + r[2] + '</td><td>' + r[3] + '</td></tr>'; }).join('') +
      '</tbody></table></div>';
  }
  function chartKind(k) { return KINDS[k].parts.map(chartTable).join(''); }
  var sizeName = '';
  function sizeModal() {
    var m = document.querySelector('.sl-sc');
    if (!m) {
      m = h('<div class="sl sl-sc" role="dialog" aria-modal="true" aria-labelledby="sl-sc-t" aria-hidden="true"><div class="sl-sc__scrim" data-sl-sc-x></div>' +
        '<div class="sl-sc__box" tabindex="-1"><div class="sl-sc__head"><div><h3 id="sl-sc-t">جدول المقاسات</h3><p data-sl-sc-name></p></div><button type="button" class="sl-sc__x" data-sl-sc-x aria-label="إغلاق">' + I.close + '</button></div>' +
        '<div class="sl-sc__chips" data-sl-sc-chips></div><div class="sl-sc__body" data-sl-sc-body></div>' +
        '<p class="sl-sc__note">القياسات بالسنتيمتر والقطعة مفرودة، وقد تختلف بين 0.5 و2 سم.</p></div></div>');
      document.body.appendChild(m);
      m.addEventListener('click', function (e) {
        if (e.target.closest('[data-sl-sc-x]')) { closeSize(); return; }
        var chip = e.target.closest('[data-sl-sc-k]'); if (!chip) return;
        m.querySelectorAll('[data-sl-sc-k]').forEach(function (b) { var on = b === chip; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', on); });
        m.querySelector('[data-sl-sc-body]').innerHTML = chartKind(chip.getAttribute('data-sl-sc-k'));
      });
    }
    var chips = m.querySelector('[data-sl-sc-chips]');
    if (sizeName) {
      m.querySelector('[data-sl-sc-name]').textContent = sizeName;
      chips.innerHTML = ''; chips.hidden = true;
      m.querySelector('[data-sl-sc-body]').innerHTML = chartKind(kindOf(sizeName));
    } else {
      m.querySelector('[data-sl-sc-name]').textContent = 'بيجامات وأرواب سيلورا';
      chips.hidden = false;
      chips.innerHTML = Object.keys(KINDS).map(function (k, i) { return '<button type="button" data-sl-sc-k="' + k + '" aria-pressed="' + (i === 0) + '"' + (i === 0 ? ' class="is-on"' : '') + '>' + KINDS[k].label + '</button>'; }).join('');
      m.querySelector('[data-sl-sc-body]').innerHTML = chartKind('set');
    }
    if (openDrawer) close();
    lastFocus = document.activeElement;
    m.setAttribute('aria-hidden', 'false');
    document.body.classList.add('sl-lock');
    requestAnimationFrame(function () { m.classList.add('is-open'); m.querySelector('.sl-sc__box').focus({ preventScroll: true }); });
  }
  function closeSize() {
    var m = document.querySelector('.sl-sc.is-open'); if (!m) return false;
    m.classList.remove('is-open'); m.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('sl-lock');
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    return true;
  }

  function heroSlides() {
    var s = [
      ['hero-1.jpg', 'hero-2.jpg', 1],
      ['split-pajamas.jpg', 'split-robes.jpg', 0],
      ['story.jpg', 'paris.jpg', 0]
    ];
    return s.map(function (x, i) {
      return '<div class="sl-hero__slide' + (i === 0 ? ' is-on' : '') + '" aria-hidden="' + (i !== 0) + '">' +
        '<figure class="' + (x[2] === 0 ? 'sl-m' : '') + '"><img src="' + img(x[0]) + '" alt="" ' + (i === 0 ? 'fetchpriority="high"' : 'loading="lazy"') + '></figure>' +
        '<figure class="' + (x[2] === 1 ? 'sl-m' : '') + '"><img src="' + img(x[1]) + '" alt="" ' + (i === 0 ? 'fetchpriority="high"' : 'loading="lazy"') + '></figure></div>';
    }).join('');
  }

  function home() {
    var mq = ['نعومة في كل تفصيلة', 'طقسكِ اليومي', 'لحظة لكِ'];
    var lane = '';
    for (var r = 0; r < 6; r++) mq.forEach(function (t) { lane += '<span>' + t + '</span><i></i>'; });
    return h('<div class="sl sl-home">' +
      '<section class="sl-hero" aria-roledescription="carousel" aria-label="سيلورا">' + heroSlides() +
      '<div class="sl-hero__copy"><span class="sl-eyebrow sl-reveal">بيجامات وملابس نوم</span>' +
      '<h1 class="sl-hero__title sl-reveal" data-d="1">جانبكِ الأنعم<br>في كل يوم.</h1>' +
      '<a class="sl-btn sl-reveal" data-d="2" href="' + catUrl('news') + '">تسوقي الجديد</a></div>' +
      '<div class="sl-hero__ctrl"><button class="sl-round" type="button" data-sl-hero="-1" aria-label="السابق">' + I.prev + '</button><button class="sl-round" type="button" data-sl-hero="1" aria-label="التالي">' + I.next + '</button></div>' +
      '<div class="sl-dots"><button type="button" class="is-on" aria-label="1"></button><button type="button" aria-label="2"></button><button type="button" aria-label="3"></button></div>' +
      '</section>' +
      '<section class="sl-rail" aria-labelledby="sl-new-t"><div class="sl-rail__head"><div class="sl-reveal"><h2 class="sl-h2" id="sl-new-t">وصل حديثاً</h2><p class="sl-sub">طقسكِ المفضل القادم.</p></div>' +
      '<div class="sl-rail__ctrl sl-reveal" data-d="1"><a class="sl-link" href="' + catUrl('news') + '">عرض الكل ' + I.arrow + '</a>' +
      '<button class="sl-round" type="button" data-sl-rail="-1" aria-label="السابق">' + I.prev + '</button><button class="sl-round" type="button" data-sl-rail="1" aria-label="التالي">' + I.next + '</button></div></div>' +
      '<div class="sl-track" data-sl-track></div><div class="sl-progress"><i data-sl-prog></i></div></section>' +
      '<section class="sl-quote" aria-label="سيلورا">' +
      '<div class="sl-st sl-st--clip" data-sl-par="0.06"><span><img src="' + img('st-clip.webp') + '" alt="" loading="lazy"></span></div>' +
      '<div class="sl-st sl-st--pajama" data-sl-par="-0.05"><span><img src="' + img('st-pajama.webp') + '" alt="" loading="lazy"></span></div>' +
      '<div class="sl-st sl-st--mask" data-sl-par="0.08"><span><img src="' + img('st-mask.webp') + '" alt="" loading="lazy"></span></div>' +
      '<div class="sl-st sl-st--bow" data-sl-par="-0.07"><span><img src="' + img('st-bow.webp') + '" alt="" loading="lazy"></span></div>' +
      '<div class="sl-st sl-st--slot" data-sl-par="0.05"><span><img src="' + img('st-slot.webp') + '" alt="" loading="lazy"></span></div>' +
      '<div class="sl-quote__text"><p class="sl-reveal">قليلٌ من النعومة… وقليلٌ أكثر منكِ.</p><p class="sl-reveal" data-d="1">للحظاتكِ الهادئة، ولتلك التي تشاركينها.</p></div></section>' +
      '<section class="sl-split">' +
      '<a class="sl-split__panel" href="' + catUrl('pajamas') + '"><img src="' + img('split-pajamas.jpg') + '" alt="بيجامات سيلورا" loading="lazy"><div class="sl-split__copy"><h3 class="sl-reveal">بيجامات</h3><span class="sl-btn sl-btn--ghost sl-btn--sm sl-reveal" data-d="1">تسوقي البيجامات</span></div></a>' +
      '<a class="sl-split__panel" href="' + catUrl('robes') + '"><img src="' + img('split-robes.jpg') + '" alt="أرواب سيلورا" loading="lazy"><div class="sl-split__copy"><h3 class="sl-reveal">أرواب</h3><span class="sl-btn sl-btn--ghost sl-btn--sm sl-reveal" data-d="1">تسوقي الأرواب</span></div></a>' +
      '</section>' +
      '<section class="sl-marquee" aria-label="نعومة في كل تفصيلة"><div class="sl-marquee__lane" aria-hidden="true">' + lane + '</div>' +
      '<button class="sl-marquee__pause" type="button" data-sl-mq aria-label="إيقاف الحركة">' + I.pause + '</button></section>' +
      '<section class="sl-camp"><div class="sl-camp__media"><img src="' + img('paris.jpg') + '" alt="روب Blue Me Away وروب Pink About It في باريس" loading="lazy" data-sl-par-img="0.12">' +
      '<div class="sl-camp__copy"><span class="sl-eyebrow sl-reveal">تسوقي الإطلالة</span><h2 class="sl-reveal" data-d="1">اللحظات<br>بين الخطط.</h2>' +
      '<a class="sl-btn sl-btn--ghost sl-reveal" data-d="2" href="' + catUrl('robes') + '">تسوقي الإطلالة</a></div></div>' +
      '<div class="sl-camp__cards" data-sl-camp></div></section>' +
      '<section class="sl-cert" id="sl-material"><span class="sl-mark sl-reveal">OEKO-TEX® STANDARD 100</span>' +
      '<h2 class="sl-reveal">“نعومة تستطيعين الوثوق بها”</h2>' +
      '<p class="sl-reveal" data-d="1">قماشنا حاصل على شهادة <span class="sl-latin">OEKO-TEX® STANDARD 100</span>، أي أنه تم اختباره للتأكد من خلوّه من المواد الضارة، لتكون القطعة التي تلامس بشرتك لطيفة كما تشعرين بها.</p>' +
      '<button class="sl-btn sl-reveal" data-d="2" type="button" data-sl-open="cert">عرض الخامة</button></section>' +
      '<section class="sl-story" id="sl-story"><div class="sl-story__copy">' +
      '<div class="sl-story__logo sl-reveal"><img src="' + img('logo-framed.jpg') + '" alt="Silora" loading="lazy"></div>' +
      '<span class="sl-eyebrow sl-reveal">قصتنا</span>' +
      '<h2 class="sl-reveal" data-d="1">طريقةٌ أنعم<br>للانتماء.</h2>' +
      '<p class="sl-reveal" data-d="2">تعكس سيلورا إحساساً بالراحة والنعومة والأنوثة — بيجامات وملابس نوم صُممت للحظات اليومية الدافئة. مستوحاة من الأمسيات الهادئة والتفاصيل الرقيقة والأجواء الحالمة، لتمنحكِ الاسترخاء والراحة في كل يوم.</p>' +
      '<a class="sl-btn sl-reveal" data-d="3" href="' + U(PAGES.fabric) + '">قصتنا</a></div>' +
      '<div class="sl-story__img sl-reveal"><img src="' + img('story.jpg') + '" alt="لحظة من سيلورا" loading="lazy" data-sl-par-img="0.08"></div></section>' +
      '</div>');
  }

  function news() {
    return h('<section class="sl sl-news"><div class="sl-news__script sl-reveal">رسالة صغيرة من سيلورا</div>' +
      '<h2 class="sl-reveal" data-d="1">هنا مكانٌ لكِ.</h2>' +
      '<p class="sl-reveal" data-d="2">كوني أول من يعرف عن الجديد وعن رسائل سيلورا الصغيرة.</p>' +
      '<form class="sl-reveal" data-d="3" data-sl-news novalidate><label for="sl-email">البريد الإلكتروني</label>' +
      '<div class="sl-news__row"><input id="sl-email" type="email" name="email" placeholder="you@example.com" dir="ltr" required autocomplete="email"><button class="sl-btn" type="submit">انضمي إلى دائرة سيلورا</button></div>' +
      '<div class="sl-news__legal">بالاشتراك، توافقين على استلام رسائل من سيلورا. يمكنكِ إلغاء الاشتراك في أي وقت. <a href="' + U(PAGES.privacy) + '">سياسة الخصوصية</a></div>' +
      '<div class="sl-news__ok" role="status">شكراً لكِ، أنتِ الآن في دائرة سيلورا.</div></form></section>');
  }

  function footer() {
    return h('<footer class="sl sl-footer"><div class="sl-footer__top">' +
      '<div class="sl-footer__brand"><a class="sl-logo" href="' + U('') + '" aria-label="Silora">' + logo() + '</a>' +
      '<div class="sl-footer__tag">لحظات ناعمة… صُنعت لكِ.</div>' +
      '<a class="sl-footer__ig" href="' + IG + '" target="_blank" rel="noopener">إنستغرام <b>@silora_sa</b></a></div>' +
      '<div><h4>تسوقي</h4><ul><li><a href="' + catUrl('news') + '">وصل حديثاً</a></li><li><a href="' + catUrl('pajamas') + '">بيجامات</a></li><li><a href="' + catUrl('robes') + '">أرواب</a></li><li><a href="' + catUrl('gifts') + '">هدايا</a></li></ul></div>' +
      '<div><h4>اكتشفي</h4><ul><li><a href="' + U('') + '#sl-story">قصتنا</a></li><li><a href="' + U(PAGES.fabric) + '">قماشنا</a></li><li><a href="#" data-sl-open="cert">شهادة الخامة (قماش <span class="sl-latin">OEKO-TEX®</span>)</a></li></ul></div>' +
      '<div><h4>المساعدة</h4><ul><li><a href="#" data-sl-open="size">جدول المقاسات</a></li><li><a href="' + U(PAGES.shipping) + '">الشحن والتوصيل</a></li><li><a href="' + U(PAGES.returns) + '">الاستبدال والاسترجاع</a></li><li><a href="' + U(PAGES.contact) + '">تواصلي معنا</a></li></ul></div>' +
      '<div><h4>قانوني</h4><ul><li><a href="' + U(PAGES.privacy) + '">سياسة الخصوصية</a></li></ul></div>' +
      '</div><div class="sl-footer__bot"><span>© ' + new Date().getFullYear() + ' سيلورا، المملكة العربية السعودية</span><span class="sl-pay"><span>دفع آمن عبر سلة</span><salla-payments></salla-payments></span></div></footer>');
  }

  function pdpBlock(name) {
    return h('<div class="sl sl-pdp">' +
      '<div class="sl-gift" data-sl-giftbox hidden><div><h3>اهدِ من تحب</h3><p>أرسلي هذه القطعة كهدية تُسعد من تحبين، بخطوات بسيطة.</p></div><button type="button" class="sl-btn" data-sl-gift>' + I.gift + 'أرسلي كهدية</button></div>' +
      '<div class="sl-pdp__row"><button type="button" class="sl-link" data-sl-open="size">جدول المقاسات</button></div>' +
      '<div class="sl-fabric"><div><small>الخامة</small><span>' + MATERIAL + '</span></div><button type="button" data-sl-open="cert">' + I.doc + 'عرض شهادة الخامة</button></div>' +
      '<div class="sl-ship">التوصيل لجميع مناطق المملكة خلال ٣–٧ أيام عمل، برسوم ٣٠ ر.س<br>الاستبدال أو الاسترجاع خلال ٧ أيام — غير مستخدمة، غير مغسولة، مع البطاقات.<br><a href="' + U(PAGES.returns) + '">سياسة الاستبدال والاسترجاع</a></div>' +
      '<div class="sl-acc is-open"><button type="button" aria-expanded="true">الخامة <i></i></button><div><div><p>الخامة: ' + MATERIAL + '</p></div></div></div>' +
      '<div class="sl-acc"><button type="button" aria-expanded="false">المقاس والقصّة <i></i></button><div><div><p>قصّة مريحة للحظات الاسترخاء. المقاسات المتوفرة S وM وL، راجعي <a href="#" data-sl-open="size" style="text-decoration:underline">جدول المقاسات</a> لاختيار مقاسكِ.</p></div></div></div>' +
      '<div class="sl-acc"><button type="button" aria-expanded="false">التوصيل والاسترجاع <i></i></button><div><div><p>تجهيز الطلب خلال ١–٢ يوم، والتوصيل خلال ٣–٧ أيام عمل لجميع مناطق المملكة برسوم ٣٠ ر.س. الاستبدال أو الاسترجاع خلال ٧ أيام من الاستلام، والتواصل عبر إنستغرام <span class="sl-ltr">@silora_sa</span>.</p></div></div></div>' +
      '</div>');
  }

  var openDrawer = null, lastFocus = null;
  function open(id) {
    var d = document.querySelector('[data-sl-drawer="' + id + '"]');
    if (!d) return;
    if (openDrawer) close();
    lastFocus = document.activeElement;
    d.classList.add('is-open'); d.setAttribute('aria-hidden', 'false');
    document.body.classList.add('sl-lock');
    openDrawer = d;
    setTimeout(function () { var f = d.querySelector('.sl-x'); if (f) f.focus({ preventScroll: true }); }, 60);
  }
  function close() {
    if (!openDrawer) return;
    openDrawer.classList.remove('is-open'); openDrawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('sl-lock');
    openDrawer = null;
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  function account() {
    if (cfg('user.type', 'guest') === 'guest') {
      try { salla.event.dispatch('login::open'); return; } catch (e) { }
      var b = document.querySelector('salla-login-modal'); if (b && b.open) { b.open(); return; }
    }
    location.href = U('customer/profile');
  }
  function search() {
    try { salla.event.dispatch('search::open'); return; } catch (e) { }
    var s = document.querySelector('salla-search'); if (s && s.open) s.open();
  }

  function wire() {
    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-sl-open],[data-sl-close],[data-sl-account],[data-sl-search],[data-sl-acc],.sl-acc>button,[data-sl-tab],[data-sl-unit],[data-sl-zoom],.sl-wish,[data-sl-mq]');
      if (!t) return;
      if (t.hasAttribute('data-sl-open')) { e.preventDefault(); if (t.getAttribute('data-sl-open') === 'size') sizeModal(); else open(t.getAttribute('data-sl-open')); }
      else if (t.hasAttribute('data-sl-close')) { if (t.tagName !== 'A' || t.getAttribute('href').indexOf('#') > -1) close(); }
      else if (t.hasAttribute('data-sl-account')) { e.preventDefault(); close(); account(); }
      else if (t.hasAttribute('data-sl-search')) { e.preventDefault(); search(); }
      else if (t.hasAttribute('data-sl-acc') || t.parentNode.classList.contains('sl-acc')) {
        var it = t.parentNode; var on = !it.classList.contains('is-open');
        it.classList.toggle('is-open', on); t.setAttribute('aria-expanded', on);
      }
      else if (t.hasAttribute('data-sl-tab')) {
        var root = t.closest('.sl-size'); var k = t.getAttribute('data-sl-tab');
        root.querySelectorAll('[data-sl-tab]').forEach(function (b) { b.classList.toggle('is-on', b === t); });
        root.querySelectorAll('[data-sl-pane]').forEach(function (p) { p.classList.toggle('is-on', p.getAttribute('data-sl-pane') === k); });
      }
      else if (t.hasAttribute('data-sl-unit')) {
        t.parentNode.querySelectorAll('button').forEach(function (b) { b.classList.toggle('is-on', b === t); });
      }
      else if (t.hasAttribute('data-sl-zoom')) {
        var lb = document.querySelector('.sl-lightbox');
        if (!lb) { lb = h('<div class="sl sl-lightbox" role="dialog" aria-label="الشهادة"><img alt=""></div>'); document.body.appendChild(lb); lb.addEventListener('click', function () { lb.classList.remove('is-open'); }); }
        lb.querySelector('img').src = t.src; requestAnimationFrame(function () { lb.classList.add('is-open'); });
      }
      else if (t.classList.contains('sl-wish')) {
        e.preventDefault();
        var id = t.getAttribute('data-id');
        try {
          var on2 = !t.classList.contains('is-on');
          (on2 ? salla.wishlist.add(id) : salla.wishlist.remove(id)).then(function () { t.classList.toggle('is-on', on2); }).catch(function () { });
        } catch (er) { }
      }
      else if (t.hasAttribute('data-sl-mq')) {
        var m = t.closest('.sl-marquee'); var p = !m.classList.contains('is-paused');
        m.classList.toggle('is-paused', p); t.innerHTML = p ? I.play : I.pause;
        t.setAttribute('aria-label', p ? 'تشغيل الحركة' : 'إيقاف الحركة');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { if (closeSize()) return; close(); var lb = document.querySelector('.sl-lightbox.is-open'); if (lb) lb.classList.remove('is-open'); }
      if (e.key === 'Tab' && openDrawer) {
        var f = openDrawer.querySelectorAll('a[href],button,input');
        if (!f.length) return;
        var a = f[0], z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    });
    document.addEventListener('submit', function (e) {
      var f = e.target;
      if (f.hasAttribute('data-sl-searchform')) {
        e.preventDefault();
        var q = f.q.value.trim(); if (!q) return;
        location.href = U('search') + '?q=' + encodeURIComponent(q);
      }
      if (f.hasAttribute('data-sl-news')) {
        e.preventDefault();
        var inp = f.email;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value.trim())) { inp.focus(); inp.style.borderColor = '#9E4468'; return; }
        inp.style.borderColor = '';
        f.closest('.sl-news').classList.add('is-done');
        f.querySelector('.sl-news__row').style.display = 'none';
      }
    });
    document.querySelectorAll('.sl-nav__dd').forEach(function (dd) {
      var b = dd.querySelector('button');
      b.addEventListener('click', function () { var o = !dd.classList.contains('is-open'); dd.classList.toggle('is-open', o); b.setAttribute('aria-expanded', o); });
      document.addEventListener('click', function (e) { if (!dd.contains(e.target)) { dd.classList.remove('is-open'); b.setAttribute('aria-expanded', 'false'); } });
    });
  }

  function headerScroll(hd, homePage) {
    var last = 0, ticking = false;
    var bar = document.querySelector('salla-maintenance-alert');
    function upd() {
      var y = window.scrollY;
      if (bar) { var bt = Math.max(0, bar.getBoundingClientRect().bottom); hd.style.top = bt + 'px'; }
      if (homePage) hd.classList.toggle('is-clear', y < 40);
      hd.classList.toggle('is-hidden', y > 400 && y > last && !openDrawer && !hd.matches(':hover'));
      last = y; ticking = false;
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
    upd();
  }

  function cartCount() {
    var el = document.querySelector('[data-sl-count]'); if (!el) return;
    function set(n) {
      n = parseInt(String(n == null ? '' : n).replace(/[\u0660-\u0669]/g, function (d) { return d.charCodeAt(0) - 1632; }).replace(/[\u06F0-\u06F9]/g, function (d) { return d.charCodeAt(0) - 1776; }).replace(/[^0-9]/g, ''), 10) || 0;
      var prev = parseInt(el.textContent, 10) || 0;
      el.textContent = n; el.classList.toggle('is-on', n > 0);
      if (n > prev) { el.classList.remove('is-bump'); void el.offsetWidth; el.classList.add('is-bump'); }
    }
    function read() {
      var src = document.querySelector('.s-cart-summary-count, salla-cart-summary .s-cart-summary-count');
      if (src) set(src.textContent);
    }
    read();
    var host = document.querySelector('salla-cart-summary');
    if (host) new MutationObserver(read).observe(host, { subtree: true, childList: true, characterData: true });
    try { salla.cart.event.onUpdated(function (c) { if (c && c.count != null) set(c.count); }); } catch (e) { }
    try { salla.event.on('cart::item.added', function (r) { var c = r && r.data && r.data.cart; if (c && c.count != null) set(c.count); }); } catch (e) { }
  }

  function reveal(root) {
    var els = (root || document).querySelectorAll('.sl-reveal:not(.is-in)');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('is-in'); }); return; }
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('is-in'); io.unobserve(x.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    els.forEach(function (e) { io.observe(e); });
  }

  function parallax() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var st = [].slice.call(document.querySelectorAll('[data-sl-par]'));
    var im = [].slice.call(document.querySelectorAll('[data-sl-par-img]'));
    var ticking = false;
    function upd() {
      var vh = innerHeight;
      st.forEach(function (e) { var r = e.getBoundingClientRect(); var c = r.top + r.height / 2 - vh / 2; e.style.transform = 'translate3d(0,' + (c * parseFloat(e.getAttribute('data-sl-par'))).toFixed(1) + 'px,0)'; });
      im.forEach(function (e) { var r = e.parentNode.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return; var p = (r.top + r.height / 2 - vh / 2) / vh; e.style.transform = 'translate3d(0,' + (p * -100 * parseFloat(e.getAttribute('data-sl-par-img'))).toFixed(2) + '%,0)'; });
      ticking = false;
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
    upd();
  }

  function heroCarousel(root) {
    var slides = root.querySelectorAll('.sl-hero__slide'), dots = root.querySelectorAll('.sl-dots button');
    var i = 0, timer;
    function go(n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle('is-on', k === i); s.setAttribute('aria-hidden', k !== i); });
      dots.forEach(function (d, k) { d.classList.toggle('is-on', k === i); });
      restart();
    }
    function restart() { clearInterval(timer); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(function () { go(i + 1); }, 6500); }
    root.querySelectorAll('[data-sl-hero]').forEach(function (b) { b.addEventListener('click', function () { go(i + parseInt(b.getAttribute('data-sl-hero'), 10)); }); });
    dots.forEach(function (d, k) { d.addEventListener('click', function () { go(k); }); });
    var sx = null;
    root.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    root.addEventListener('touchend', function (e) { if (sx == null) return; var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) go(i + (dx > 0 ? 1 : -1)); sx = null; });
    document.addEventListener('visibilitychange', function () { if (document.hidden) clearInterval(timer); else restart(); });
    restart();
  }

  function rail(root) {
    var tr = root.querySelector('[data-sl-track]'), bar = root.querySelector('[data-sl-prog]');
    var btns = root.querySelectorAll('[data-sl-rail]');
    function upd() {
      var max = tr.scrollWidth - tr.clientWidth; var x = Math.abs(tr.scrollLeft);
      var w = tr.clientWidth / tr.scrollWidth;
      bar.style.width = (Math.min(1, w) * 100) + '%';
      bar.style.transform = 'translateX(' + (-(max ? x / max : 0) * (1 - w) / w * 100) + '%)';
      btns[0].disabled = x < 4; btns[1].disabled = x > max - 4;
    }
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        var c = tr.querySelector('.sl-card'); var step = c ? c.getBoundingClientRect().width + 24 : 330;
        tr.scrollBy({ left: -parseInt(b.getAttribute('data-sl-rail'), 10) * step, behavior: 'smooth' });
      });
    });
    tr.addEventListener('scroll', function () { requestAnimationFrame(upd); }, { passive: true });
    window.addEventListener('resize', upd);
    var down = false, sx = 0, sl = 0, moved = false;
    tr.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse') return; down = true; moved = false; sx = e.clientX; sl = tr.scrollLeft; });
    window.addEventListener('pointermove', function (e) { if (!down) return; var dx = e.clientX - sx; if (Math.abs(dx) > 5) { moved = true; tr.classList.add('is-drag'); } tr.scrollLeft = sl - dx; });
    window.addEventListener('pointerup', function () { if (!down) return; down = false; setTimeout(function () { tr.classList.remove('is-drag'); }, 30); });
    tr.addEventListener('click', function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
    tr.addEventListener('dragstart', function (e) { e.preventDefault(); });
    upd();
    return upd;
  }

  function products() {
    return new Promise(function (res) {
      try {
        salla.api.product.fetch({ source: 'latest', limit: 30 }).then(function (r) { res((r && r.data) || []); }).catch(function () { res([]); });
      } catch (e) { res([]); }
    });
  }

  function fillHome(root, list) {
    var sets = list.filter(function (p) { return !isRobe(p.name); });
    var robes = list.filter(function (p) { return isRobe(p.name); });
    function find(arr, k) { for (var i = 0; i < arr.length; i++) if (String(arr[i].name).toLowerCase().indexOf(k) > -1) return arr[i]; return null; }
    var railP = RAIL_ORDER.map(function (k) { return find(sets, k); }).filter(Boolean);
    sets.forEach(function (p) { if (railP.indexOf(p) < 0) railP.push(p); });
    if (!railP.length) railP = Object.keys(FALLBACK).map(function (id) { return { id: id, name: FALLBACK[id], url: '#', price: 102 }; });
    var tr = root.querySelector('[data-sl-track]');
    tr.innerHTML = railP.map(card).join('');
    tr.querySelectorAll('.sl-card').forEach(function (c, k) { c.classList.add('sl-reveal'); c.setAttribute('data-d', Math.min(k, 4)); });
    var camp = root.querySelector('[data-sl-camp]');
    var picks = [find(robes, 'blue me away'), find(robes, 'pink about it')];
    camp.innerHTML = picks.map(function (p, k) {
      var c = COLORS[k];
      if (!p) return '';
      return '<a class="sl-mini sl-reveal" data-d="' + (k + 1) + '" href="' + esc(productUrl(p.url)) + '"><img src="' + esc(pimg(p)) + '" alt="' + esc(p.name) + '" loading="lazy"><div>' +
        '<div class="sl-mini__n">' + esc(p.name) + '</div><div class="sl-mini__m">' + c.ar + '، ' + c.side + '</div>' +
        '<div class="sl-mini__p">' + price(p) + '</div><span class="sl-link">عرض المنتج ' + I.arrow + '</span></div></a>';
    }).join('');
    try {
      salla.api.wishlist && salla.storage && (function () {
        var ids = (salla.storage.get('salla::wishlist') || []).map(String);
        root.querySelectorAll('.sl-wish').forEach(function (b) { if (ids.indexOf(b.getAttribute('data-id')) > -1) b.classList.add('is-on'); });
      })();
    } catch (e) { }
    reveal(root);
  }

  function enhanceSizes() {
    var box = [].slice.call(document.querySelectorAll('.s-product-options-option-container')).find(function (c) {
      var sl = c.querySelector('select');
      return sl && (/المقاس|size/i.test((c.querySelector('label') || {}).textContent || '') || [].slice.call(sl.options).some(function (o) { return /^(XS|S|M|L|XL)$/.test(o.textContent.trim()); }));
    });
    if (!box || box.querySelector('.sl-sizes')) return !!box;
    var sel = box.querySelector('select');
    var label = box.querySelector('.s-product-options-option-label');
    box.classList.add('sl-sizebox');
    var head = h('<div class="sl sl-sizes__head"><span>المقاس: <b data-sl-size>اختاري مقاسكِ</b></span><button type="button" class="sl-link sl-sizes__chart" data-sl-open="size">جدول المقاسات</button></div>');
    var grid = h('<div class="sl sl-sizes" role="radiogroup" aria-label="المقاس"></div>');
    [].slice.call(sel.options).forEach(function (o) {
      if (!o.value) return;
      var btn = h('<button type="button" role="radio" aria-checked="false" class="sl-sz" data-v="' + o.value + '">' + esc(o.textContent.trim()) + '</button>');
      if (o.disabled) { btn.disabled = true; btn.classList.add('is-out'); }
      grid.appendChild(btn);
    });
    grid.addEventListener('click', function (e) {
      var b = e.target.closest('.sl-sz'); if (!b || b.disabled) return;
      sel.value = b.getAttribute('data-v');
      sel.dispatchEvent(new Event('input', { bubbles: true }));
      sel.dispatchEvent(new Event('change', { bubbles: true }));
      grid.querySelectorAll('.sl-sz').forEach(function (x) { var on = x === b; x.classList.toggle('is-on', on); x.setAttribute('aria-checked', on); });
      head.querySelector('[data-sl-size]').textContent = b.textContent;
      box.classList.remove('sl-need');
    });
    sel.addEventListener('invalid', function () { box.classList.add('sl-need'); });
    if (label) label.style.display = 'none';
    sel.parentNode.parentNode.insertBefore(head, sel.parentNode);
    sel.parentNode.parentNode.insertBefore(grid, sel.parentNode);
    sel.parentNode.classList.add('sl-hidden-select');
    var row = document.querySelector('.sl-pdp__row'); if (row) row.style.display = 'none';
    var form = document.querySelector('form.product-form');
    if (form) form.addEventListener('submit', function () { if (!sel.value) { box.classList.add('sl-need'); box.scrollIntoView({ behavior: 'smooth', block: 'center' }); } }, true);
    return true;
  }
  function watchSizes() {
    if (enhanceSizes()) return;
    var n = 0, t = setInterval(function () { if (enhanceSizes() || ++n > 30) clearInterval(t); }, 400);
  }

  var PAIR = {
    'blue me away': { bg: '#BFDCEF', ar: 'باللون السماوي' },
    'pink about it': { bg: '#F6D5D8', ar: 'باللون الوردي الفاتح' },
    'mint to be': { bg: '#CFE3CF', ar: 'باللون النعناعي' },
    'butter me up': { bg: '#F2E3A9', ar: 'باللون الزبدي' },
    'pink me later': { bg: '#EEC3D3', ar: 'بالكاروهات الوردي' }
  };
  function pairSection(name) {
    var n = String(name || '').toLowerCase(), key = null;
    Object.keys(PAIR).forEach(function (k) { if (n.indexOf(k) > -1) key = k; });
    if (!key || document.querySelector('.sl-pair')) return;
    var robe = isRobe(name);
    var anchor = document.querySelector('.container--product-details') || document.querySelector('main');
    var heroImg = (document.querySelector('.container--product-details .sidebar img') || {}).src || '';
    products().then(function (list) {
      var mate = list.filter(function (p) { return String(p.name).toLowerCase().indexOf(key) > -1 && isRobe(p.name) !== robe; })[0];
      if (!mate) return;
      var c = colorOf(mate.name) || { ar: '', c: PAIR[key].bg };
      var title = mate.name;
      var text = robe ? 'الطقم المطابق لهذا الروب، ' + PAIR[key].ar + ' وبنفس لمسات الدانتيل.' : 'الروب المطابق لهذا الطقم، ' + PAIR[key].ar + ' ومزيّن بدانتيل مطابق.';
      var sec = h('<section class="sl sl-pair" style="--sl-tint:' + PAIR[key].bg + '">' +
        (heroImg ? '<div class="sl-pair__bg" style="background-image:url(\'' + heroImg + '\')"></div>' : '') +
        '<div class="sl-pair__in"><div class="sl-pair__copy"><h2 class="sl-reveal">أكملي لحظتكِ</h2><p class="sl-reveal" data-d="1">' + esc(text) + '</p><span class="sl-pair__script sl-reveal" data-d="2">صُنعا ليُلبسا معاً</span></div>' +
        '<div class="sl-pair__card sl-reveal" data-d="2">' + card(mate) + '</div></div></section>');
      var cn = sec.querySelector('.sl-card__name'); if (cn) cn.textContent = robe ? title : mate.name;
      sec.querySelector('.sl-pair__copy').appendChild(h('<a class="sl-btn sl-pair__more sl-reveal" data-d="3" href="' + esc(productUrl(mate.url)) + '">مزيد من التفاصيل</a>'));
      if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(sec, anchor.nextSibling);
      reveal(sec);
    });
  }

  function alsoLove(name) {
    var main = document.querySelector('main'); if (!main || main.querySelector('.sl-also')) return;
    var cm = main.querySelector('salla-comments');
    var tidy = function () {
      if (cm && !cm.querySelector('.s-comments-item, .s-comment, li, article') && !cm.innerText.trim()) cm.classList.add('sl-gone');
      [].slice.call(main.querySelectorAll('.container')).forEach(function (c) { if (/منتجات قد تعجبك/.test(c.textContent) && !c.querySelector('img')) c.classList.add('sl-gone'); });
    };
    tidy(); setTimeout(tidy, 2500); setTimeout(tidy, 6000);
    var n = String(name || '').toLowerCase(), key = null;
    Object.keys(PAIR).forEach(function (k) { if (n.indexOf(k) > -1) key = k; });
    var robe = isRobe(name);
    products().then(function (list) {
      var picks = list.filter(function (p) { var pn = String(p.name).toLowerCase(); return !(key && pn.indexOf(key) > -1) && isRobe(p.name) === robe; });
      list.forEach(function (p) { if (picks.length < 4 && picks.indexOf(p) < 0 && !(key && String(p.name).toLowerCase().indexOf(key) > -1)) picks.push(p); });
      picks = picks.slice(0, 4); if (!picks.length) return;
      var sec = h('<section class="sl sl-also"><h2 class="sl-h2 sl-reveal">قد يعجبكِ أيضاً</h2><div class="sl-grid sl-also__grid">' + picks.map(card).join('') + '</div></section>');
      sec.querySelectorAll('.sl-card').forEach(function (c, i) { c.classList.add('sl-reveal'); c.setAttribute('data-d', i); });
      var after = main.querySelector('.s-blocks-wrapper.s-after-related') || main.lastElementChild;
      main.insertBefore(sec, after);
      reveal(sec);
    });
  }

  var FAST_CSS = 'button{height:52px!important;min-height:52px!important;width:100%!important;border-radius:0!important;background:#352A30!important;border:1px solid #352A30!important;color:#fff!important;font-family:"Noto Naskh Arabic",serif!important;font-size:15px!important;font-weight:500!important;box-shadow:none!important;display:flex!important;align-items:center;justify-content:center;gap:8px;cursor:pointer;transition:background .35s cubic-bezier(.22,.61,.36,1)!important}button:hover{background:#4a3b43!important;border-color:#4a3b43!important}button *,button svg{color:#fff!important}';
  function squareFast() {
    document.querySelectorAll('salla-mini-checkout-widget').forEach(function (m) {
      if (!m.shadowRoot || m.shadowRoot.querySelector('style[data-sl]')) return;
      var st = document.createElement('style'); st.setAttribute('data-sl', ''); st.textContent = FAST_CSS;
      m.shadowRoot.appendChild(st);
    });
  }
  function watchFast() {
    squareFast();
    var n = 0, t = setInterval(function () { squareFast(); if (++n > 20) clearInterval(t); }, 500);
    var ap = document.querySelector('salla-add-product-button');
    if (ap) new MutationObserver(squareFast).observe(ap, { childList: true, subtree: true });
  }

  function pdp() {
    var mc = document.querySelector('.main-content');
    if (!mc || mc.querySelector('.sl-pdp')) return;
    var h1 = mc.querySelector('h1');
    var name = h1 ? h1.textContent.trim() : '';
    var form = mc.querySelector('form.product-form');
    var blk = pdpBlock(name);
    if (form && form.nextSibling) form.parentNode.insertBefore(blk, form.nextSibling); else mc.appendChild(blk);
    sizeName = name;
    if (h1 && !mc.querySelector('.sl-pdp-sub')) h1.insertAdjacentElement('afterend', h('<p class="sl sl-pdp-sub">' + esc(blurb(name)) + '</p>'));
    var c = colorOf(name);
    if (c && h1 && !mc.querySelector('.sl-pdp-color')) {
      var col = h('<div class="sl sl-pdp-color" style="display:flex;align-items:center;gap:10px;margin:8px 0 18px;font-size:14px;color:var(--sl-ink2)">اللون: <span style="color:var(--sl-ink)">' + c.ar + '</span><i style="width:26px;height:26px;border-radius:50%;background:' + c.c + ';box-shadow:0 0 0 1.5px #fff,0 0 0 2.5px #352A30"></i></div>');
      var desc = mc.querySelector('.product__description');
      (desc || mc.querySelector('.sl-pdp-sub') || h1).insertAdjacentElement('afterend', col);
    }
    var idIn = document.querySelector('form.product-form input[name="id"]');
    var pid = idIn ? idIn.value : '';
    var box = blk.querySelector('[data-sl-giftbox]');
    var giftEl = document.querySelector('salla-gifting');
    function showGift() {
      if (!pid) return;
      if (!giftEl) { giftEl = document.createElement('salla-gifting'); giftEl.setAttribute('product-id', pid); document.body.appendChild(giftEl); }
      box.hidden = false;
      box.querySelector('[data-sl-gift]').addEventListener('click', function () {
        try { if (giftEl.open) { giftEl.open(); return; } } catch (e) { }
        try { salla.event.dispatch('gifting::open', { product_id: pid }); } catch (e) { }
      });
    }
    if (window.customElements && customElements.get('salla-gifting')) showGift();
    else if (window.customElements) Promise.race([customElements.whenDefined('salla-gifting'), new Promise(function (r) { setTimeout(function () { r('x'); }, 6000); })]).then(function (v) { if (v !== 'x') showGift(); });
  }

  function category() {
    var main = document.querySelector('main');
    if (!main || main.querySelector('.sl-cathead')) return;
    var t = document.querySelector('main h1, .page-title');
    var title = t ? t.textContent.trim() : document.title.split('|')[0].trim();
    if (t) t.style.display = 'none';
    var bc = main.querySelector('.container--breadcrumbs, nav.breadcrumbs');
    var hd = h('<div class="sl sl-cathead"><h1 class="sl-reveal">' + esc(title) + '</h1><p class="sl-reveal" data-d="1">بيجامات وأرواب صُنعت للحظاتكِ الهادئة.</p></div>');
    if (bc && bc.parentNode === main) bc.insertAdjacentElement('afterend', hd); else main.insertBefore(hd, main.firstChild);
  }

  function collection(k) {
    var main = document.querySelector('main'); if (!main) return;
    document.body.classList.add('sl-col');
    var c = COLS[k];
    document.title = c.t + ' | Silora';
    var el = h('<div class="sl sl-colpage"><div class="sl-cathead"><h1 class="sl-reveal">' + c.t + '</h1><p class="sl-reveal" data-d="1">' + c.s + '</p></div>' +
      '<div class="sl-colbar"><div class="sl-chips">' + ['all', 'news', 'pajamas', 'robes'].map(function (x) { return '<a href="' + catUrl(x) + '"' + (x === k ? ' class="is-on"' : '') + '>' + COLS[x].t + '</a>'; }).join('') + '</div><span data-sl-n></span></div>' +
      '<div class="sl-grid" data-sl-grid><div class="sl-grid__load"></div></div></div>');
    main.insertBefore(el, main.firstChild);
    products().then(function (l) {
      var list = l.filter(function (p) { return k === 'pajamas' ? !isRobe(p.name) : k === 'robes' ? isRobe(p.name) : true; });
      var order = function (p) { var n = String(p.name).toLowerCase(); for (var i = 0; i < RAIL_ORDER.length; i++) if (n.indexOf(RAIL_ORDER[i]) > -1) return i * 2 + (isRobe(p.name) ? 1 : 0); return 99; };
      list.sort(function (a, b) { return order(a) - order(b); });
      var g = el.querySelector('[data-sl-grid]');
      g.innerHTML = list.length ? list.map(card).join('') : '<p class="sl-empty">لا توجد قطع هنا بعد.</p>';
      g.querySelectorAll('.sl-card').forEach(function (cd, i) { cd.classList.add('sl-reveal'); cd.setAttribute('data-d', i % 4); });
      el.querySelector('[data-sl-n]').textContent = list.length + ' قطع';
      reveal(el);
    });
  }

  function boot() {
    if (document.body.classList.contains('sl-on')) return;
    var b = document.body;
    var isHome = b.classList.contains('index');
    var isPdp = b.classList.contains('product-single');
    var isCat = b.classList.contains('product-index');
    b.classList.add('sl-on');
    document.querySelectorAll('.silora-story, .silora-below, .silora-ig').forEach(function (e) { e.remove(); });
    var app = document.querySelector('.app-inner') || b;
    var hd = header(isHome);
    app.insertBefore(hd, app.firstChild);
    var main = document.querySelector('main');
    var homeEl = null;
    if (isHome && main) { homeEl = home(); main.insertBefore(homeEl, main.firstChild); }
    var tail = document.createDocumentFragment();
    tail.appendChild(news()); tail.appendChild(footer());
    var oldF = document.querySelector('footer.store-footer');
    if (oldF && oldF.parentNode) oldF.parentNode.insertBefore(tail, oldF); else app.appendChild(tail);
    b.appendChild(menuDrawer());
    b.appendChild(drawer('cert', 'شهادة الخامة', certBody()));
    wire();
    headerScroll(hd, isHome);
    cartCount();
    if (isPdp) { pdp(); watchFast(); watchSizes(); pairSection((document.querySelector('.main-content h1') || {}).textContent); alsoLove((document.querySelector('.main-content h1') || {}).textContent); }
    var ck = colKey();
    if (ck) collection(ck); else if (isCat) category();
    if (homeEl) {
      heroCarousel(homeEl.querySelector('.sl-hero'));
      var upd = rail(homeEl.querySelector('.sl-rail'));
      fillHome(homeEl, []);
      upd();
      var ready = function () { products().then(function (l) { if (l.length) { fillHome(homeEl, l); upd(); } }); };
      if (window.salla && salla.onReady) salla.onReady(ready); else ready();
    }
    reveal(document);
    parallax();
    if (location.hash === '#sl-story' || location.hash === '#sl-material') setTimeout(function () { var t = document.querySelector(location.hash); if (t) t.scrollIntoView({ behavior: 'smooth' }); }, 400);
    document.documentElement.classList.add('sl-ready');
  }

  function start() {
    loadLogo().then(boot, boot);
    setTimeout(function () { document.documentElement.classList.add('sl-ready'); }, 4000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
