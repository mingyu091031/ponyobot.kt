/*=============== THEME DROPDOWN ===============*/
const dropdownBtn = document.getElementById('theme-dropdown-btn');
const themeOptions = document.getElementById('theme-options');
const themeOptionItems = document.querySelectorAll('.theme-option');
const selectedThemeText = document.getElementById('selected-theme');

// 드롭다운 토글
if (dropdownBtn) {
    dropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        themeOptions.classList.toggle('show');
        dropdownBtn.querySelector('.ri-arrow-down-s-line').style.transform = 
            themeOptions.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0deg)';
    });
}

// 외부 클릭 시 드롭다운 닫기
document.addEventListener('click', () => {
    if (themeOptions && themeOptions.classList.contains('show')) {
        themeOptions.classList.remove('show');
        if (dropdownBtn) {
            dropdownBtn.querySelector('.ri-arrow-down-s-line').style.transform = 'rotate(0deg)';
        }
    }
});

/*=============== THEME SELECTION ===============*/
const themeNames = {
    'auto': '기기 테마',
    'light': '밝은 모드',
    'dark': '어두운 모드'
};

// 시스템 테마 감지
const getSystemTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// 테마 적용
const applyTheme = (mode) => {
    let actualTheme;
    
    if (mode === 'auto') {
        actualTheme = getSystemTheme();
    } else {
        actualTheme = mode;
    }
    
    // dark-theme 클래스 적용
    if (actualTheme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
    
    // 선택된 테마 텍스트 업데이트
    if (selectedThemeText) {
        selectedThemeText.textContent = themeNames[mode];
    }
    
    // 체크 표시 업데이트
    themeOptionItems.forEach(option => {
        const optionTheme = option.getAttribute('data-theme');
        if (optionTheme === mode) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
    
    // localStorage에 저장
    localStorage.setItem('selected-theme-mode', mode);
};

// 테마 옵션 클릭 이벤트
themeOptionItems.forEach(option => {
    option.addEventListener('click', () => {
        const theme = option.getAttribute('data-theme');
        applyTheme(theme);
        themeOptions.classList.remove('show');
        if (dropdownBtn) {
            dropdownBtn.querySelector('.ri-arrow-down-s-line').style.transform = 'rotate(0deg)';
        }
    });
});

// 시스템 테마 변경 감지
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const savedMode = localStorage.getItem('selected-theme-mode') || 'auto';
    if (savedMode === 'auto') {
        applyTheme('auto');
    }
});

// 페이지 로드 시 저장된 테마 적용
const savedMode = localStorage.getItem('selected-theme-mode') || 'auto';
applyTheme(savedMode);