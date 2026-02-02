$(function () {
  const $wrap = $("#link_slide");
  const $ul = $("#link_slide ul");
  const slideHeight = 40;
  const stay = 3000;     // 머무는 시간
  const speed = 400;     // 넘어가는 애니메이션 시간

  // 1) 첫 슬라이드 복제해서 마지막에 추가 (머무는 시간 차이 없음)
  const $firstLi = $ul.children("li").first().clone(true);
  $ul.append($firstLi);

  // 복제까지 포함한 a 목록
  const $slides = $ul.find("li a");
  const realCount = $slides.length - 1; // 실제 슬라이드 개수(복제 제외)

  let index = 0;
  let timer = null;

  function updateBg(i) {
    // 복제 슬라이드(맨 끝)는 0번과 동일하게 처리
    const realIndex = (i === realCount) ? 0 : i;
    const bg = $slides.eq(realIndex).css("background-color");
    $wrap.css("background-color", bg);
  }

  updateBg(0);

  function goNext() {
    index++;

    $ul.stop(true, true).animate(
      { marginTop: -(slideHeight * index) + "px" },
      speed,
      function () {
        // 2) 복제 슬라이드까지 애니메이션으로 도착하면
        //    애니메이션 끝난 직후 "조용히" 0으로 순간이동 (점프 티 안 남)
        if (index === realCount) {
          $ul.css("marginTop", 0);
          index = 0;
        }
        updateBg(index);

        // 3) 머무는 시간은 항상 동일
        timer = setTimeout(goNext, stay);
      }
    );
  }

  timer = setTimeout(goNext, stay);
});

