(function () {
  'use strict';

  // ===== SIDEBAR RENDERER =====
  var sidebar = document.getElementById('sidebar');
  if (sidebar && typeof window.SIDEBAR_CONFIG !== 'undefined') {
    sidebar.innerHTML = '';
    sidebar.setAttribute('id', 'sidebar');

    var searchHtml =
      '<div class="sidebar-search">' +
        '<input type="text" class="sidebar-search__input" id="sidebarSearchInput" placeholder="Поиск по разделу..." autocomplete="off" />' +
        '<div class="sidebar-search__results" id="sidebarSearchResults"></div>' +
      '</div>';
    sidebar.insertAdjacentHTML('afterbegin', searchHtml);

    window.SIDEBAR_CONFIG.forEach(function (group) {
      var groupEl = document.createElement('div');
      groupEl.className = 'doc-sidebar__group';

      var titleEl = document.createElement('span');
      titleEl.className = 'doc-sidebar__title';
      titleEl.textContent = group.title;
      groupEl.appendChild(titleEl);

      group.links.forEach(function (link) {
        var a = document.createElement('a');
        a.href = link.href;
        a.className = 'doc-sidebar__link';
        a.textContent = link.label;
        groupEl.appendChild(a);
      });

      sidebar.appendChild(groupEl);
    });
  }

  // ===== ACTIVE SIDEBAR LINK =====
  var sidebarLinks = document.querySelectorAll('.doc-sidebar__link');
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';

  sidebarLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    }
  });

  // ===== SIDEBAR TOGGLE (mobile) =====
  var sidebarToggle = document.getElementById('sidebarToggle');
  var sidebarOverlay = document.getElementById('sidebarOverlay');

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', function () {
      sidebar.classList.toggle('open');
      if (sidebarOverlay) sidebarOverlay.classList.toggle('open');
    });
    if (sidebarOverlay) {
      sidebarOverlay.addEventListener('click', function () {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('open');
      });
    }
  }

  // ===== FULL-SITE SEARCH =====
  var searchInput = document.getElementById('sidebarSearchInput');
  var searchResults = document.getElementById('sidebarSearchResults');

  if (searchInput && searchResults && typeof window.SEARCH_INDEX !== 'undefined') {
    var debounceTimer = null;

    function escRegex(s) {
      return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    searchInput.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        var query = searchInput.value.toLowerCase().trim();

        if (query.length < 2) {
          searchResults.innerHTML = '';
          searchResults.style.display = 'none';
          return;
        }

        var matches = [];
        var seen = {};

        window.SEARCH_INDEX.forEach(function (page) {
          var score = 0;
          var sections = [];

          // Check page title
          if ((page.t || page.h1 || '').toLowerCase().indexOf(query) !== -1) {
            score = 3;
            sections.push({ text: page.t || page.h1, tag: 'page' });
          }

          // Check h2 headings
          (page.h2 || []).forEach(function (h) {
            var lower = h.toLowerCase();
            if (lower.indexOf(query) !== -1) {
              score = Math.max(score, 2);
              sections.push({ text: h, tag: 'h2' });
            }
          });

          // Check h3 headings
          (page.h3 || []).forEach(function (h) {
            var lower = h.toLowerCase();
            if (lower.indexOf(query) !== -1) {
              score = Math.max(score, 1);
              sections.push({ text: h, tag: 'h3' });
            }
          });

          if (score > 0) {
            var key = page.f + '|' + score;
            if (!seen[key]) {
              seen[key] = true;
              matches.push({
                file: page.f,
                title: page.t || page.h1 || page.f,
                sections: sections.slice(0, 3),
                score: score
              });
            }
          }
        });

        // Sort: highest score first, then alphabetically
        matches.sort(function (a, b) {
          if (b.score !== a.score) return b.score - a.score;
          return a.title.localeCompare(b.title);
        });

        if (matches.length === 0) {
          searchResults.innerHTML = '<div class="sidebar-search__empty">Ничего не найдено</div>';
        } else {
          var html = '';
          matches.forEach(function (m, idx) {
            if (idx >= 15) return;
            var hlTitle = m.title.replace(new RegExp('(' + escRegex(query) + ')', 'gi'), '<strong>$1</strong>');
            html += '<a href="' + m.file + '" class="sidebar-search__item sidebar-search__item--link">';
            html += '<span class="sidebar-search__page">' + hlTitle + '</span>';
            if (m.sections.length > 0) {
              html += '<span class="sidebar-search__sub">';
              var subText = m.sections[0].text;
              if (subText.length > 50) subText = subText.slice(0, 50) + '…';
              html += subText.replace(new RegExp('(' + escRegex(query) + ')', 'gi'), '<strong>$1</strong>');
              html += '</span>';
            }
            html += '</a>';
          });
          searchResults.innerHTML = html;
        }

        searchResults.style.display = 'block';
      }, 200);
    });

    searchResults.addEventListener('mousedown', function (e) {
      // Allow click to propagate to links
    });

    searchInput.addEventListener('blur', function () {
      setTimeout(function () {
        searchResults.style.display = 'none';
      }, 300);
    });

    searchInput.addEventListener('focus', function () {
      if (searchInput.value.trim().length >= 2) {
        searchResults.style.display = 'block';
      }
    });
  }

  // ===== CODE BLOCK COPY BUTTONS =====
  document.querySelectorAll('.code-block').forEach(function (block) {
    var btn = document.createElement('button');
    btn.className = 'code-block__copy';
    btn.textContent = 'Копировать';
    btn.type = 'button';
    block.appendChild(btn);

    btn.addEventListener('click', function () {
      var code = block.querySelector('code');
      if (!code) return;
      var text = code.textContent;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          showCopied(btn);
        });
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showCopied(btn);
      }
    });
  });

  function showCopied(btn) {
    btn.textContent = 'Скопировано!';
    btn.classList.add('copied');
    setTimeout(function () {
      btn.textContent = 'Копировать';
      btn.classList.remove('copied');
    }, 2000);
  }

  // ===== SVG ICON COPY =====
  document.querySelectorAll('.svg-item').forEach(function (item) {
    item.addEventListener('click', function () {
      var svg = item.querySelector('svg');
      if (!svg) return;
      var html = svg.outerHTML;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(html).then(function () {
          var msg = item.querySelector('.svg-copied');
          if (msg) {
            msg.classList.add('show');
            setTimeout(function () { msg.classList.remove('show'); }, 1500);
          }
        });
      }
    });
  });

})();
