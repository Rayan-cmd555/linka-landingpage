// Contador regressivo para efeito FOMO
document.addEventListener("DOMContentLoaded", function () {
  // Inicializa o contador com um valor aleatório entre 85 e 100
  const remainingSpots = Math.floor(Math.random() * (100 - 85 + 1) + 85);

  // Atualiza todos os contadores na página
  const counters = document.querySelectorAll(
    "#spots-counter, #spots-counter-2, #spots-counter-3, #spots-counter-4"
  );
  counters.forEach((counter) => {
    counter.textContent = remainingSpots;
  });

  // Efeito de scroll suave para os links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Toggle FAQ
  document.querySelectorAll(".faq-item h3").forEach((question) => {
    question.addEventListener("click", () => {
      const faqItem = question.parentElement;
      faqItem.classList.toggle("active");
    });
  });

  // Ativar animações ao scrollar
  const fadeElements = document.querySelectorAll(
    ".feature-card, .beta-card, .testimonial-card"
  );
  fadeElements.forEach((el) => {
    el.classList.add("fade-in");
  });

  // Detectar elementos no viewport para animação
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.3 }
  );

  fadeElements.forEach((el) => {
    observer.observe(el);
  });

  // Lidando com o formulário
  document.getElementById("lead-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const form = this;
    const formData = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Mostrar mensagem de sucesso
        form.innerHTML =
          '<div class="success-message"><i class="fas fa-check-circle"></i><h3>Sucesso!</h3><p>O checklist foi enviado para seu email. Confira sua caixa de entrada!</p></div>';
      })
      .catch((error) => {
        console.error("Error:", error);
        // Em produção, conectar ao Formspree ou Netlify Forms
        form.innerHTML =
          '<div class="success-message"><i class="fas fa-check-circle"></i><h3>Sucesso!</h3><p>O checklist foi enviado para seu email. Confira sua caixa de entrada!</p></div>';
      });
  });

  // Redirecionamento dos CTAs para o formulário de lead
  const ctaButtons = document.querySelectorAll(
    "#hero-cta, #beta-cta, #faq-cta"
  );
  ctaButtons.forEach((button) => {
    button.addEventListener("click", () => {
      document.getElementById("lead-magnet").scrollIntoView({
        behavior: "smooth",
      });
    });
  });
});
