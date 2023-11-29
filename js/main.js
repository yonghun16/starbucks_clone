/* 헤더 돋보기 이펙트*/
const searchEl = document.querySelector(".search");
const searchInputEl = searchEl.querySelector("input");

searchEl.addEventListener("click", function () {
  //searchEl 요소를 클릭하면, input요소(searchInputEl)이 focus를 활성화 함.
  searchInputEl.focus();
});

searchInputEl.addEventListener("focus", function () {
  //searchInputEl의 focus가 활성화 된다면, focused 클래스를 추가함.
  searchEl.classList.add("focused");
  //setAttribute = html의 속성(Attribute)를 설정함.
  searchInputEl.setAttribute("placeholder", "통합검색");
});

searchInputEl.addEventListener("blur", function () {
  searchEl.classList.remove("focused");
  searchInputEl.setAttribute("placeholder", "");
});


/* 뱃지 이펙트(gsap) & to-top 효과(gsap scrollTo) */
const badgeEl = document.querySelector("header .badges");
const toTopEl = document.querySelector('#to-top');

window.addEventListener(
  "scroll",
  // _.throttle(함수, 시간(밀리세컨 단위))
  // lodash.js 사용, 0.3초 마다 부하를 줘서 스크롤 이벤트 중복 발생 억제
  _.throttle(function () {
    if (window.scrollY > 500) {
      // 배지 숨기기
      // 요소를 자연스럽게 숨기기 위해서 and 숨김 요소를 클릭을 방지하기 위해 gsap.js 사용 
      //gsap.to(요소, 지속시간, 옵션);
      gsap.to(badgeEl, .6, {
        opacity: 0,
        display: 'none'
      });
      // Scroll-to 버튼 보이기
      gsap.to(toTopEl, .2, {
        x: 0
      });
    } else {
      // 배지 보이기
      gsap.to(badgeEl, .6, {
        opacity: 1,
        display: 'block'
      });
      // Scroll-to 버튼 숨기기
      gsap.to(toTopEl, .2, {
        x: 100
      });
    }
  }, 300)
);

toTopEl.addEventListener('click', function() {
  gsap.to(window, .7, {
    scrollTo: 0
  });
});


/* fade in 이펙트 */
const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl, index) {
  // gasp.to(요소, 지속시간, 옵션);
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7,  // 0.7s, 1.4s, 2.1s, 2.7s 딜레이되면서 작동
    opacity: 1
  });
});


/* Swiper 이펙트 */
// new Swiper(선택자, 옵션) 
const swiper = new Swiper('.notice-line .swiper', {
  direction: 'vertical',
  autoplay: true,
  loop: true
});
const swiper2 = new Swiper('.promotion .swiper', {
  slidesPerView: 3,  // 한번에 보여줄 슬라이드 개수
  spaceBetween: 10,  // 슬라이드 사이 여백
  centeredSlides: true, // 1번 슬라이드가 가운데 보이기
  loop: true,
  autoplay: {
    delay: 5000     // 5초에 한 번씩 슬라이딩
  },
  pagination: {
    el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자 
    clickable: true // 사용자의 페이지 번호 요소 제어
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});
const swiper3 = new Swiper('.awards .swiper', {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});


/* 토글 프로모션 */
const promotionEl = document.querySelector('.promotion');
const promotionToogleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;

promotionToogleBtn.addEventListener('click', function() {
  isHidePromotion = !isHidePromotion;  
  if (isHidePromotion) {
    // 숨김 처리!
    promotionEl.classList.add('hide');
  } else {
    // 보임 처리!
    promotionEl.classList.remove('hide');
  }
});


/* youtube 위 그림 애니메이션 */
// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // '.toFixed()'를 통해 반환된 무낮 데이터를,
  // 'parseFloat()'를 통해 소수점을 가지는 숫자 데이터로변환
  return parseFloat((Math.random() * (max-min) + min).toFixed(2));
}

//오브젝트 띄우기
function floatingObject(selector, delay, size) {
  // gsap.to(요소, 지속시간, 옵션);
  gsap.to(
    selector,         // 선택자
    random(1.5, 2.5), // 애니메이션 동작시간
    {
      y: size,        // 아래로 20만큼 움직이기
      repeat: -1,     // 무한반복
      yoyo: true,     // 요요처럼 왔다 갔다 움직이기
      ease: "power1.inOut",
      delay: random(0, delay),
    }
  );
}
floatingObject('.floating1',   1, 15);
floatingObject('.floating2',  .5, 15);
floatingObject('.floating3', 1.5, 20);


/* Scroll Magic */
const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl){
  new ScrollMagic
    .Scene({
      triggerElement: spyEl,  // 보여짐 여부를 감시할 요소를 지정
      triggerHook: .8,
    })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller());
});


/* Copy Right year */
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();

