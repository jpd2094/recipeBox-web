/* RecipeBox Marketing Site — JS */

(function () {
  'use strict';

  /* --- Scroll fade-in animations --- */
  var fadeEls = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    fadeEls.forEach(function (el) { observer.observe(el); });
  } else {
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* --- Mobile nav toggle --- */
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      links.classList.toggle('open');
    });

    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.classList.remove('active');
        links.classList.remove('open');
      });
    });
  }

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = 80;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* --- Sous Chef typewriter effect --- */
  var replyText = 'Great question! You can use 1 tsp dried rosemary — it\'s more concentrated than fresh. Or try dried thyme, which is already in the recipe and will complement the lemon beautifully.';
  var typingEl = document.querySelector('.typing-text');
  var cursorEl = document.querySelector('.cursor');
  var chatAction = document.getElementById('chat-action');
  var hasTyped = false;

  if (typingEl) {
    var typingObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !hasTyped) {
          hasTyped = true;
          typingObserver.unobserve(entry.target);
          typeText(replyText, typingEl, cursorEl, chatAction);
        }
      });
    }, { threshold: 0.5 });

    typingObserver.observe(document.querySelector('.chat-assistant'));
  }

  function typeText(text, el, cursor, action) {
    var i = 0;
    var interval = setInterval(function () {
      el.textContent = text.slice(0, i + 1);
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        if (cursor) cursor.style.display = 'none';
        if (action) {
          setTimeout(function () {
            action.classList.add('visible');
          }, 400);
        }
      }
    }, 25);
  }
})();
