(() => {
  'use strict';

  const data = window.PORTFOLIO || {};
  const featured = Array.isArray(data.featured) ? data.featured : [];
  const additional = Array.isArray(data.additional) ? data.additional : [];
  const clientWork = Array.isArray(data.clientWork) ? data.clientWork : [];
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const safeId = (value, fallback) => /^[a-z][a-z0-9-]*$/.test(String(value)) ? String(value) : fallback;

  function safeUrl(value, image = false) {
    const input = String(value ?? '').trim();
    if (!input) return '';
    try {
      const url = new URL(input, document.baseURI);
      const relativeFile = url.protocol === 'file:' && !/^[a-z][a-z0-9+.-]*:|^\/\//i.test(input) && new URL(document.baseURI).protocol === 'file:';
      const allowed = ['https:', 'http:'].includes(url.protocol) || (!image && url.protocol === 'mailto:') || relativeFile;
      return allowed ? input : '';
    } catch {
      return '';
    }
  }

  const tags = items => `<div class="tags">${(Array.isArray(items) ? items : []).map(item => `<span class="tag">${escape(item)}</span>`).join('')}</div>`;
  const imagesFor = item => (Array.isArray(item.images) ? item.images : []).filter(image => safeUrl(image.src, true));

  function imageFigure(image, hidden = false) {
    const src = escape(safeUrl(image.src, true));
    const caption = escape(image.caption || 'Project interface');
    return `<figure${hidden ? ' hidden' : ''}><button type="button" class="image-button" data-image="${src}" data-caption="${caption}" aria-label="Enlarge image: ${caption}"><img src="${src}" alt="${caption}" loading="lazy" decoding="async"></button><figcaption>${caption}<span class="expand-label">Open full image ↗</span></figcaption></figure>`;
  }

  function mainGallery(item, id) {
    const images = (Array.isArray(item.screenshots) ? item.screenshots : []).filter(image => safeUrl(image.src, true));
    if (!images.length) return '';
    const limited = images.length > 4;
    return `<h3 class="subhead">A closer look</h3><div class="gallery" id="gallery-${id}">${images.map((image, index) => imageFigure(image, index >= 4)).join('')}</div>${limited ? `<div class="gallery-controls"><p id="gallery-count-${id}" class="gallery-count">4 of ${images.length} images</p><button type="button" class="secondary-button" data-gallery-toggle="${id}" data-image-total="${images.length}" aria-expanded="false" aria-controls="gallery-${id}">Show all ${images.length} images</button></div>` : ''}`;
  }

  document.querySelector('#project-index').innerHTML = featured.map((item, index) => {
    const id = safeId(item.id, `case-${index + 1}`);
    return `<a class="project-preview" href="#${id}"><img src="${escape(safeUrl(item.cover, true))}" alt="Project workflow illustration: ${escape(item.title)}" ${index ? 'loading="lazy"' : ''}><span class="mini-title">${escape(item.title)} <span aria-hidden="true">↗</span></span><small>${escape(item.eyebrow)}</small></a>`;
  }).join('');

  const recovery = `<div class="recovery"><div class="recovery-top"><div><span class="eyebrow">Interactive walkthrough · synthetic data</span><h3>What happens when an event arrives twice?</h3></div><button type="button" id="replay-event">Receive the event</button></div><p id="recovery-status" class="recovery-status" aria-live="polite">A fictional contact update is ready. Follow its first delivery, then replay the same event.</p><div class="recovery-track"><div data-stage="0">Receive event</div><div data-stage="1">Claim lease</div><div data-stage="2">Resolve identity</div><div data-stage="3">Apply & record</div></div><p class="scope-note">A simplified explanation of implemented recovery concepts. This does not contact either platform or display live records.</p></div>`;

  document.querySelector('#case-studies').innerHTML = featured.map((item, index) => {
    const id = safeId(item.id, `case-${index + 1}`);
    const sourceFile = /^[a-z0-9-]+\.md$/.test(String(item.md)) ? item.md : '';
    const source = sourceFile ? `https://github.com/MeguMax/MeguMax/blob/main/case-studies/${sourceFile}` : 'https://github.com/MeguMax/MeguMax';
    return `<section class="case-section" id="${id}" aria-labelledby="title-${id}"><div class="wrap"><div class="case-head"><div><span class="case-number">Case ${String(index + 1).padStart(2, '0')}</span><span class="eyebrow">${escape(item.eyebrow)}</span><h2 id="title-${id}">${escape(item.title)}</h2></div><div><p class="case-summary">${escape(item.summary)}</p><p class="role"><strong>My role</strong> / ${escape(item.role)}</p>${tags(item.stack)}</div></div><div class="case-problem"><strong>The problem to solve</strong>${escape(item.problem)}</div><figure class="diagram-figure"><button type="button" class="image-button" data-image="${escape(safeUrl(item.architecture, true))}" data-caption="${escape(item.title)} — simplified implementation architecture." aria-label="Enlarge architecture of ${escape(item.title)}"><img src="${escape(safeUrl(item.architecture, true))}" alt="Architecture of ${escape(item.title)}" loading="lazy"></button><figcaption>Simplified implementation architecture. Select the diagram to enlarge.</figcaption></figure><h3 class="subhead">Decisions behind the system</h3><div class="decision-grid">${(item.decisions || []).map(decision => `<div class="decision"><h3>${escape(decision.title)}</h3><p>${escape(decision.text)}</p></div>`).join('')}</div>${id === 'patientnow' ? recovery : ''}${mainGallery(item, id)}<h3 class="subhead">Validation and scope</h3><div class="validation">${(item.validation || []).map(validation => `<div><h3>${escape(validation.title)}</h3><p>${escape(validation.text)}</p></div>`).join('')}</div><p class="scope-note">${escape(item.boundary)}</p><div class="case-links"><a class="text-link" href="${source}">Read the full case ↗</a><p>${escape(item.sourceNote)}</p></div></div></section>`;
  }).join('');

  document.querySelectorAll('[data-gallery-toggle]').forEach(button => {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') !== 'true';
      const id = button.dataset.galleryToggle;
      const gallery = document.getElementById(`gallery-${id}`);
      const total = Number(button.dataset.imageTotal);
      Array.from(gallery.children).forEach((figure, index) => { figure.hidden = !expanded && index >= 4; });
      button.setAttribute('aria-expanded', String(expanded));
      button.textContent = expanded ? 'Show fewer images' : `Show all ${total} images`;
      document.getElementById(`gallery-count-${id}`).textContent = `${expanded ? total : 4} of ${total} images`;
    });
  });

  const categoryOrder = ['All', 'Client work', 'Application', 'Research', 'Assessment'];
  document.querySelector('#filters').innerHTML = categoryOrder.map((category, index) => `<button type="button" data-filter="${escape(category)}" aria-pressed="${index === 0}">${escape(category)}</button>`).join('');
  document.querySelector('#additional-projects').innerHTML = additional.map(item => {
    const href = safeUrl(item.link);
    return `<article class="additional-card" data-category="${escape(item.category)}"><span class="eyebrow">${escape(item.category)}</span><h3>${escape(item.title)}</h3><p class="card-role">${escape(item.role)}</p><p class="card-summary">${escape(item.summary)}</p>${tags(item.stack)}${item.scope ? `<p class="scope">${escape(item.scope)}</p>` : ''}${href ? `<a href="${escape(href)}">View project ↗</a>` : ''}</article>`;
  }).join('');
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    document.querySelectorAll('[data-category]').forEach(card => { card.hidden = button.dataset.filter !== 'All' && card.dataset.category !== button.dataset.filter; });
  }));

  const imageDialog = document.querySelector('#image-viewer');
  const clientDialog = document.querySelector('#client-project-dialog');
  const modalOpeners = new WeakMap();

  function openDialog(dialog, opener) {
    if (dialog.open) return;
    modalOpeners.set(dialog, opener || document.activeElement);
    dialog.showModal();
    document.body.classList.add('modal-open');
    dialog.querySelector('button')?.focus({ preventScroll: true });
  }

  function wireDialog(dialog, closeButton) {
    closeButton.addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => {
      if (!document.querySelector('dialog[open]')) document.body.classList.remove('modal-open');
      const opener = modalOpeners.get(dialog);
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
    dialog.addEventListener('keydown', event => {
      if (event.key !== 'Tab') return;
      const focusable = Array.from(dialog.querySelectorAll('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter(element => !element.disabled && element.getClientRects().length);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first) { event.preventDefault(); return; }
      if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
        event.preventDefault(); first.focus();
      }
    });
  }

  wireDialog(imageDialog, document.querySelector('#close-viewer'));
  wireDialog(clientDialog, document.querySelector('#close-client-project'));

  document.addEventListener('click', event => {
    const button = event.target.closest?.('[data-image]');
    if (!button) return;
    const src = safeUrl(button.dataset.image, true);
    if (!src) return;
    const caption = button.dataset.caption || 'Project image';
    imageDialog.querySelector('img').src = src;
    imageDialog.querySelector('img').alt = caption;
    imageDialog.querySelector('p').textContent = caption;
    openDialog(imageDialog, button);
  });

  const clientSection = document.querySelector('#client-work');
  const clientGrid = document.querySelector('#client-projects');
  const clientCount = document.querySelector('#client-count');
  const showAllClients = document.querySelector('#client-show-all');
  const clientCategories = ['All', 'Funnels & websites', 'CRM & integrations', 'Payments & commerce'];
  let selectedClientCategory = 'All';
  let clientSearch = '';
  let allClientsVisible = false;
  const initialClientCount = 9;

  document.querySelector('#client-filters').innerHTML = clientCategories.map((category, index) => `<button type="button" data-client-filter="${escape(category)}" aria-pressed="${index === 0}">${escape(category)}</button>`).join('');

  function clientCard(item, sourceIndex) {
    const image = imagesFor(item)[0];
    const title = escape(item.title);
    const media = image
      ? `<span class="client-card-media"><img src="${escape(safeUrl(image.src, true))}" alt="${escape(image.caption || item.title)}" loading="lazy" decoding="async"></span>`
      : `<span class="client-card-media client-card-no-image"><span class="client-fallback-platform">${escape(item.stack?.[0] || item.category)}</span><span class="client-fallback-title">${title}</span><span class="client-fallback-link">Explore the workflow ↗</span></span>`;
    return `<article class="client-card"><button type="button" class="client-card-open" data-client-index="${sourceIndex}" aria-haspopup="dialog" aria-controls="client-project-dialog" aria-label="View ${title}">${media}<span class="client-card-body"><span class="eyebrow">${escape(item.category)}</span><span class="client-card-title">${title}</span><span class="client-card-summary">${escape(item.summary)}</span><span class="client-card-tools">${escape((item.stack || []).slice(0, 3).join(' · '))}</span><span class="client-card-action">View case <span aria-hidden="true">↗</span></span></span></button></article>`;
  }

  function renderClientCards() {
    if (!clientWork.length) { clientSection.hidden = true; return; }
    clientSection.hidden = false;
    const terms = clientSearch.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
    const matches = clientWork.map((item, index) => ({ item, index })).filter(({ item }) => {
      if (selectedClientCategory !== 'All' && item.category !== selectedClientCategory) return false;
      const searchable = [item.title, item.titleOriginal, item.originalTitle, item.role, item.summary, item.category, ...(item.stack || [])].join(' ').toLocaleLowerCase();
      return terms.every(term => searchable.includes(term));
    });
    const visible = allClientsVisible ? matches : matches.slice(0, initialClientCount);
    clientGrid.innerHTML = visible.map(({ item, index }) => clientCard(item, index)).join('');
    clientCount.textContent = `Showing ${visible.length} of ${matches.length} ${terms.length || selectedClientCategory !== 'All' ? 'matching ' : ''}published entries${matches.length !== clientWork.length ? ` · ${clientWork.length} in the full collection` : ''}`;
    document.querySelector('#client-empty').hidden = matches.length !== 0;
    showAllClients.hidden = matches.length <= initialClientCount;
    showAllClients.setAttribute('aria-expanded', String(allClientsVisible));
    showAllClients.textContent = allClientsVisible ? 'Show fewer entries' : `Show all ${matches.length} entries`;
  }

  document.querySelectorAll('[data-client-filter]').forEach(button => button.addEventListener('click', () => {
    selectedClientCategory = button.dataset.clientFilter;
    allClientsVisible = false;
    document.querySelectorAll('[data-client-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    renderClientCards();
  }));
  document.querySelector('#client-search').addEventListener('input', event => {
    clientSearch = event.target.value;
    allClientsVisible = false;
    renderClientCards();
  });
  showAllClients.addEventListener('click', () => { allClientsVisible = !allClientsVisible; renderClientCards(); });

  clientGrid.addEventListener('click', event => {
    const button = event.target.closest?.('[data-client-index]');
    if (!button) return;
    const item = clientWork[Number(button.dataset.clientIndex)];
    if (!item) return;
    const images = imagesFor(item);
    const href = safeUrl(item.link);
    const originalTitle = item.titleOriginal || item.originalTitle;
    document.querySelector('#client-project-content').innerHTML = `<div class="client-detail-heading"><span class="eyebrow">${escape(item.category)}</span><h2 id="client-project-title">${escape(item.title)}</h2>${originalTitle ? `<p class="client-original-title"><strong>Published as</strong> ${escape(originalTitle)}</p>` : ''}<p class="client-detail-role">${escape(item.role)}</p></div><p class="client-detail-summary">${escape(item.summary)}</p>${tags(item.stack)}${item.scope ? `<p class="client-detail-scope">${escape(item.scope)}</p>` : ''}${href ? `<a class="text-link client-source-link" href="${escape(href)}" target="_blank" rel="noopener noreferrer" aria-label="View original case on Upwork, opens in a new tab">View original case on Upwork ↗</a>` : ''}${images.length ? `<div class="client-detail-gallery">${images.map(image => imageFigure(image)).join('')}</div>` : ''}`;
    document.querySelector('#client-project-content').scrollTop = 0;
    openDialog(clientDialog, button);
  });

  renderClientCards();

  let step = 0;
  const messages = [
    'Event received. A durable receipt claims processing, the worker resolves the linked identity, applies the update and records completion.',
    'The same event is delivered again. Its completed receipt is found, so the worker skips a second destination write.',
    'A missed calendar change needs a different path: reconciliation compares source state and brings it back into review. Duplicate detection alone cannot repair a missing event.'
  ];
  document.querySelector('#replay-event')?.addEventListener('click', () => {
    document.querySelector('#recovery-status').textContent = messages[step];
    document.querySelectorAll('[data-stage]').forEach(item => item.classList.add('active'));
    document.querySelector('#replay-event').textContent = ['Replay the same event', 'Explore a missed event', 'Restart walkthrough'][step];
    step = (step + 1) % 3;
    if (step === 0) document.querySelectorAll('[data-stage]').forEach(item => item.classList.remove('active'));
  });
})();
