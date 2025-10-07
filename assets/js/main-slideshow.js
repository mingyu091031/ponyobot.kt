/*=============== IMAGE SLIDESHOW ===============*/
document.addEventListener('DOMContentLoaded', function() {
    // 이미지 데이터
    const slideshowImages = [
        {
            url: 'https://ponyobot.kr/images/banner1.jpg',
            title: '포뇨봇이란?',
            description: '오픈채팅방 관리를 위한 최적화된 서비스를 제공하는봇'
        },
        {
            url: 'https://ponyobot.kr/images/banner2.jpg',
            title: '주요 기능',
            description: '입퇴장 감지, 유저정보, 방 관리 등 편리한 기능들'
        },
        {
            url: 'https://ponyobot.kr/images/banner3.jpg',
            title: '포뇨봇 신청',
            description: '메뉴 > 분양신청을 통해 쉽고 빠르게 신청 가능'
        },
        {
            url: 'https://ponyobot.kr/images/banner4.jpg',
            title: '안정적인 서비스',
            description: '24시간 무중단 운영과 지속적인 업데이트로 안정성 보장'
        },
        {
            url: 'https://ponyobot.kr/images/banner5.jpg',
            title: '고객 지원',
            description: '빠른 문의 응답과 전문적인 기술 지원 서비스 제공'
        }
    ];

    let currentSlide = 0;
    let slideInterval;

    // 슬라이드쇼 컨테이너 생성
    function createSlideshow() {
        const mainContainer = document.getElementById('main');
        const h1 = mainContainer.querySelector('h1');
        
        // 이미 슬라이드쇼가 존재하는지 확인
        if (document.getElementById('slideshow-container')) {
            return;
        }
        
        // 슬라이드쇼 HTML 생성
        const slideshowHTML = `
            <div class="slideshow-container" id="slideshow-container">
                ${slideshowImages.map((img, index) => `
                    <img src="${img.url}" 
                         alt="${img.title}" 
                         class="slideshow-image ${index === 0 ? 'active' : ''}"
                         data-index="${index}"
                         loading="lazy"
                         decoding="async">
                `).join('')}
                
                <div class="slideshow-overlay">
                    <h3 class="slideshow-title" id="slideshow-title">${slideshowImages[0].title}</h3>
                    <p class="slideshow-description" id="slideshow-description">${slideshowImages[0].description}</p>
                </div>
                
                <div class="slideshow-indicators" id="slideshow-indicators">
                    ${slideshowImages.map((_, index) => `
                        <span class="indicator ${index === 0 ? 'active' : ''}" data-slide="${index}"></span>
                    `).join('')}
                </div>
                
                <button class="slideshow-nav prev" id="prev-btn">‹</button>
                <button class="slideshow-nav next" id="next-btn">›</button>
            </div>
        `;

        // H1 다음에 슬라이드쇼 삽입
        h1.insertAdjacentHTML('afterend', slideshowHTML);

        // 이미지 미리 로드
        slideshowImages.slice(1).forEach((img) => {
            const preloadImg = new Image();
            preloadImg.src = img.url;
        });
    }

    // 슬라이드 변경 함수
    function showSlide(n) {
        const images = document.querySelectorAll('.slideshow-image');
        const indicators = document.querySelectorAll('.indicator');
        const title = document.getElementById('slideshow-title');
        const description = document.getElementById('slideshow-description');

        if (n >= slideshowImages.length) currentSlide = 0;
        if (n < 0) currentSlide = slideshowImages.length - 1;

        images.forEach(img => img.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        if (images[currentSlide] && indicators[currentSlide]) {
            images[currentSlide].classList.add('active');
            indicators[currentSlide].classList.add('active');
            
            title.textContent = slideshowImages[currentSlide].title;
            description.textContent = slideshowImages[currentSlide].description;
        }
    }

    function nextSlide() {
        currentSlide++;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide--;
        showSlide(currentSlide);
    }

    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 4000);
    }

    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    function restartSlideshow() {
        stopSlideshow();
        startSlideshow();
    }

    // 슬라이드쇼 초기화
    function initSlideshow() {
        createSlideshow();

        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                restartSlideshow();
            });

            nextBtn.addEventListener('click', () => {
                nextSlide();
                restartSlideshow();
            });
        }

        document.querySelectorAll('.indicator').forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
                restartSlideshow();
            });
        });

        startSlideshow();
    }

    initSlideshow();
});