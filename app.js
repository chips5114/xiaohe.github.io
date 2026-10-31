(() => {
  const data = window.STUDY_DATA;
  const ids = Object.keys(data);
  const home = document.getElementById('home-view');
  const reading = document.getElementById('reading-view');
  const menu = document.getElementById('room-menu');
  const menuButton = document.querySelector('.menu-toggle');
  const themeButton = document.querySelector('.theme-toggle');
  const hint = document.querySelector('.scene-hint');
  let lastSection = null;
  let initialRoute = true;
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeURL = url => { try { const u = new URL(url, location.href); return ['https:','http:','mailto:'].includes(u.protocol) ? escape(u.href) : '#'; } catch { return '#'; } };
  const links = active => ids.map(id => `<a href="#${id}" ${id === active ? 'aria-current="page"' : ''}><span>${escape(data[id].label)}</span><span aria-hidden="true">↗</span></a>`).join('');
  menu.innerHTML = '<span class="menu-eyebrow">在书房里逛逛</span>' + links();
  function closeMenu() { menu.hidden = true; menuButton.setAttribute('aria-expanded', 'false'); }
  menuButton.addEventListener('click', () => { const open = menu.hidden; menu.hidden = !open; menuButton.setAttribute('aria-expanded', String(open)); });
  document.addEventListener('click', event => { if (!menu.contains(event.target) && !menuButton.contains(event.target)) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !menu.hidden) { closeMenu(); menuButton.focus(); } });
  function setTheme(night) {
    document.documentElement.dataset.theme = night ? 'night' : 'day';
    themeButton.setAttribute('aria-pressed', String(night));
    themeButton.setAttribute('aria-label', night ? '切换为午后模式' : '切换为夜晚模式');
    document.querySelector('.theme-label').textContent = night ? '夜晚' : '午后';
    document.querySelector('meta[name="theme-color"]').content = night ? '#303a32' : '#eee7d8';
  }
  try { setTheme(localStorage.getItem('study-theme') === 'night'); } catch { setTheme(false); }
  themeButton.addEventListener('click', () => { const night = document.documentElement.dataset.theme !== 'night'; setTheme(night); try { localStorage.setItem('study-theme', night ? 'night' : 'day'); } catch {} });
  document.querySelectorAll('[data-section]').forEach(link => {
    const showHint = () => { hint.textContent = data[link.dataset.section].note; };
    const resetHint = () => { hint.textContent = '每一件物品，都藏着一段故事。'; };
    link.addEventListener('pointerenter', showHint);
    link.addEventListener('focus', showHint);
    link.addEventListener('pointerleave', resetHint);
    link.addEventListener('blur', resetHint);
  });
  function renderEntries(section) {
    if (!section.entries.length) return `<div class="empty-page"><div class="empty-illustration" aria-hidden="true"><img src="assets/${section.asset}.svg" alt=""></div><p class="empty-title">这一页，正在慢慢整理。</p><p>${escape(section.note)}</p><div class="future-topics">${section.fields.map(f => `<span>${escape(f)}</span>`).join('')}</div></div>`;
    return `<div class="entries">${section.entries.map(entry => `<article class="entry">${entry.date ? `<time>${escape(entry.date)}</time>` : ''}<h2>${escape(entry.title)}</h2>${entry.subtitle ? `<p class="entry-subtitle">${escape(entry.subtitle)}</p>` : ''}${(entry.body || []).map(p => `<p>${escape(p)}</p>`).join('')}${entry.tags?.length ? `<div class="entry-tags">${entry.tags.map(t => `<span>${escape(t)}</span>`).join('')}</div>` : ''}${entry.links?.length ? `<div class="entry-links">${entry.links.map(l => `<a href="${safeURL(l.url)}" target="_blank" rel="noopener noreferrer">${escape(l.label)} ↗</a>`).join('')}</div>` : ''}</article>`).join('')}</div>`;
  }
  function route() {
    const id = location.hash.slice(1);
    const section = ids.includes(id) ? data[id] : null;
    closeMenu();
    const previousSection = lastSection;
    document.body.classList.toggle('is-reading', Boolean(section));
    home.hidden = Boolean(section);
    reading.hidden = !section;
    if (section) {
      const next = ids[(ids.indexOf(id) + 1) % ids.length];
      reading.innerHTML = `<a class="back-link" href="#">← 回到书房</a><div class="reading-layout"><aside class="reading-sidebar"><span class="eyebrow">THE COLLECTION</span><nav aria-label="各个部分">${links(id)}</nav><p>一些经历，<br>一些热爱，<br>和还在继续的故事。</p></aside><div class="reading-paper"><div class="paper-heading"><span class="eyebrow">${escape(section.english)}</span><span class="section-number">${String(ids.indexOf(id) + 1).padStart(2, '0')}</span></div><h1 id="section-title" tabindex="-1">${escape(section.label)}</h1><p class="section-intro">${escape(section.intro)}</p><div class="paper-divider" aria-hidden="true"><span>✳</span></div>${renderEntries(section)}<a class="next-section" href="#${next}"><span>继续逛逛</span><strong>${escape(data[next].label)} ↗</strong></a></div></div>`;
      document.title = `${section.label} · 我的书房`;
      lastSection = id;
      window.scrollTo({top: 0, behavior: 'instant'});
      if (!initialRoute) document.getElementById('section-title').focus({preventScroll: true});
    } else {
      if (id && id !== 'main') history.replaceState(null, '', location.pathname + location.search);
      document.title = '我的书房 · A Room of My Own';
      if (previousSection && !initialRoute) document.querySelector(`[data-section="${previousSection}"]`)?.focus({preventScroll: true});
      lastSection = null;
    }
    initialRoute = false;
  }
  window.addEventListener('hashchange', route);
  route();
})();
