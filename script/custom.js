//--------------------
// Resume Boxes
//--------------------
function animateResumeBoxes(sectionId) {
  const boxes = document.querySelectorAll(`#${sectionId} .resume_box`);
  boxes.forEach((box, i) => {
    box.style.transition = 'none';
    box.style.opacity = 0;
    box.style.transform = 'translateY(50px)';

    setTimeout(() => {
      box.style.transition = 'all 0.5s ease-out';
      box.style.opacity = 1;
      box.style.transform = 'translateY(0)';
    }, i * 100);
  });
}

function resetResumeBoxes(sectionId) {
  const boxes = document.querySelectorAll(`#${sectionId} .resume_box`);
  boxes.forEach((box) => {
    box.style.transition = 'all 0.3s ease-in';
    box.style.opacity = 0;
    box.style.transform = 'translateY(50px)';
  });
}

//--------------------
// Fullpage Initialization
//--------------------
var myFullpage = new fullpage('#fullpage', {
  verticalCentered: true,
  anchors: ['anchor1', 'anchor2', 'anchor3', 'anchor4', 'anchor5', 'anchor6', 'anchor7'],
  menu: '#menu',
  scrollOverflow: true,
  normalScrollElements: '#section3 .swiper, #section3 .swiper *',
  scrollingSpeed: 1000,
  navigation: true,
  navigationPosition: 'right',
  navigationTooltips: ['1', '2', '3', '4', '5', '6', '7', '8'],
  responsiveWidth: 999,

  afterLoad: function (origin, destination, direction) {
    // Resume Boxes
    if (destination.anchor === 'anchor5') animateResumeBoxes('section5');
    if (destination.anchor === 'anchor6') animateResumeBoxes('section6');
  },

  onLeave: function (origin, destination, direction) {
    setTimeout(() => {
      if (origin.anchor === 'anchor5') resetResumeBoxes('section5');
      if (origin.anchor === 'anchor6') resetResumeBoxes('section6');
    }, 300);
  },

  afterRender: function () {
    const activeSection = document.querySelector('.fp-section.active');
    if (activeSection.id === 'section5') animateResumeBoxes('section5');
  }
});

//--------------------
// 팝업 - 카드뉴스
//--------------------
$(document).on('click', '.art1', function (e) { e.preventDefault(); $('.pop1').fadeIn(); });
$(document).on('click', '.art2', function (e) { e.preventDefault(); $('.pop2').fadeIn(); });
$(document).on('click', '.art3', function (e) { e.preventDefault(); $('.pop3').fadeIn(); });
$(document).on('click', '.popup > p', function () { $(this).closest('.popup').fadeOut(); });

//--------------------
// 팝업 - 상세페이지
//--------------------
// $(document).on('click', '.detailed1', function (e) { e.preventDefault(); $('.detailed_pop1').fadeIn(); });
// $(document).on('click', '.detailed2', function (e) { e.preventDefault(); $('.detailed_pop2').fadeIn(); });
// $(document).on('click', '.detailed3', function (e) { e.preventDefault(); $('.detailed_pop3').fadeIn(); });
// $(document).on('click', '.popup > p', function () { $(this).closest('.popup').fadeOut(); });

// 팝업 슬라이드
$(function () {
  new Swiper('.popup_slide', {
    speed: 1000,
    navigation: { nextEl: '.popup .swiper-button-next', prevEl: '.popup .swiper-button-prev' },
    pagination: { el: '.popup .swiper-pagination', clickable: true },
  });
});

// Artworks swiper
document.querySelectorAll('.art_swiper').forEach((el) => {
  new Swiper(el, {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    watchSlidesProgress: true,
    observer: true,
    observeParents: true,
    preventClicks: false,
    preventClicksPropagation: false,
    coverflowEffect: { rotate: 50, stretch: 0, depth: 200, modifier: 1, slideShadows: true },
    pagination: { el: el.querySelector(".swiper-pagination"), clickable: true },
  });
});

//--------------------
// Section7 Skills (IntersectionObserver 적용)
//--------------------
function resetCircleSkills() {
  const circles = document.querySelectorAll("#section7 .circle");
  circles.forEach(circle => {
    circle.style.setProperty("--angle", "360deg");
    circle.querySelector(".percent").textContent = "0%";
  });
}

function resetBarSkills() {
  const bars = document.querySelectorAll("#section7 .bar_item");
  bars.forEach(bar => {
    bar.querySelector(".bar_fill").style.width = "0%";
    bar.querySelector(".bar_percent").textContent = "0%";
  });
}

function animateCircleSkills() {
  const circles = document.querySelectorAll("#section7 .circle");
  circles.forEach((circle, i) => {
    const target = parseFloat(circle.dataset.percent);

    setTimeout(() => {
      let current = 0;
      const timer = setInterval(() => {
        current = Math.min(current + 0.6, target);
        const angle = 360 - (current / 100) * 360;
        circle.style.setProperty("--angle", `${angle}deg`);
        circle.querySelector(".percent").textContent = current.toFixed(0) + "%";
        if (current >= target) clearInterval(timer);
      }, 10);
    }, i * 100);
  });
}

function animateBarSkills() {
  const bars = document.querySelectorAll("#section7 .bar_item");
  bars.forEach((bar, i) => {
    const target = parseInt(bar.dataset.percent);
    const fill = bar.querySelector(".bar_fill");
    const percentEl = bar.querySelector(".bar_percent");

    setTimeout(() => {
      let current = 0;
      const timer = setInterval(() => {
        current = Math.min(current + 1, target);
        fill.style.width = current + "%";      // 숫자와 bar 모두 1%씩 증가
        percentEl.textContent = current + "%";
        if (current >= target) clearInterval(timer);
      }, 15); // 속도 조절 가능
    }, i * 100);
  });
}

// IntersectionObserver: section7 진입 시 바로 애니메이션
const section7 = document.querySelector("#section7");
const observer7 = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 진입 시 애니메이션
      resetCircleSkills();
      resetBarSkills();
      animateCircleSkills();
      animateBarSkills();
    } else {
      // 떠날 때 초기화
      resetCircleSkills();
      resetBarSkills();
    }
  });
}, {
  threshold: 0.3 // 30% 이상 화면에 보이면 바로 실행
});
observer7.observe(section7);
