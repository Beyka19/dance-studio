document.addEventListener('DOMContentLoaded', () => {

  // ===== МОДАЛЬНЫЕ ОКНА =====
  const modals = document.querySelectorAll('.modal');
  function openModal(id) {
    const modal = document.getElementById('modal-' + id);
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeModals() {
    modals.forEach(m => m.classList.remove('active'));
    document.body.style.overflow = '';
    const iframe = document.getElementById('video-frame');
    if (iframe) iframe.src = '';
  }
  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(btn.dataset.modal);
    });
  });
  document.querySelectorAll('[data-close]').forEach(el => {
    el.addEventListener('click', closeModals);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModals();
  });

  // ===== ВИДЕО В НАПРАВЛЕНИЯХ =====
  document.querySelectorAll('.direction-card').forEach(card => {
    card.addEventListener('click', () => {
      const url = card.dataset.video;
      if (!url) return;
      document.getElementById('video-frame').src = url + '?autoplay=1';
      openModal('video');
    });
  });

  // ===== ОТПРАВКА ФОРМЫ (ЧЕРЕЗ FORMSPREE) =====
  const form = document.getElementById('signup-form');
  const success = document.getElementById('signup-success');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Останавливаем перезагрузку страницы
      
      const formData = new FormData(form);
      
      // Отправляем данные в Formspree
      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          // Показываем сообщение об успехе
          form.style.display = 'none';
          success.classList.add('show');
          
          setTimeout(() => {
            closeModals();
            setTimeout(() => {
              form.style.display = '';
              success.classList.remove('show');
              form.reset();
            }, 500);
          }, 3000);
        } else {
          alert('Произошла ошибка. Пожалуйста, попробуйте позже.');
        }
      }).catch(error => {
        alert('Ошибка сети. Проверьте интернет.');
      });
    });
  }

  // ===== БУРГЕР =====
  const burger = document.querySelector('.burger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      mobileNav.classList.toggle('active');
    });
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('active');
        mobileNav.classList.remove('active');
      });
    });
  }

  // ===== РАСПИСАНИЕ: ТАБЫ =====
  const scheduleTabs = document.querySelectorAll('.schedule__tab');
  const scheduleTables = document.querySelectorAll('.schedule__table');
  scheduleTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const day = tab.dataset.day;
      scheduleTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      scheduleTables.forEach(table => {
        table.classList.toggle('active', table.dataset.dayContent === day);
      });
    });
  });

  // ===== ПЛАВНАЯ ПРОКРУТКА =====
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===== ПОЯВЛЕНИЕ СЕКЦИЙ =====
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }
});