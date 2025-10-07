/*=============== APPLY PAGE FUNCTIONALITY ===============*/

let selectedService = null;

/*=============== SERVICE SELECTION ===============*/
function selectService(serviceType) {
    selectedService = serviceType;
    
    // 서비스 카드 섹션 숨기기
    document.querySelector('.apply-section').style.display = 'none';
    
    // 약관 동의 섹션 보이기
    document.getElementById('agreement-section').style.display = 'block';
    
    // 약관 동의 내용 업데이트
    updateAgreementContent(serviceType);
    
    // 상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/*=============== UPDATE AGREEMENT CONTENT ===============*/
function updateAgreementContent(serviceType) {
    const agreementTitle = document.getElementById('agreement-title');
    const agreementSubtitle = document.getElementById('agreement-subtitle');
    const customRefundItem = document.querySelector('.agreement-custom-refund');
    const ponyobotRefundItem = document.querySelector('.agreement-ponyobot-refund');
    
    if (serviceType === 'ponyobot') {
        // 입퇴장봇 분양
        agreementTitle.textContent = '입퇴장봇 분양 신청';
        agreementSubtitle.textContent = '월 2,000원';
        
        // 제작 전용 환불 규정 숨기기
        customRefundItem.style.display = 'none';
        customRefundItem.querySelector('input').removeAttribute('required');
        
        // 입퇴장봇 환불 규정 보이기
        ponyobotRefundItem.style.display = 'flex';
        ponyobotRefundItem.querySelector('input').setAttribute('required', 'required');
        
    } else if (serviceType === 'custom') {
        // 맞춤 제작
        agreementTitle.textContent = 'irispy2 제작 신청';
        agreementSubtitle.textContent = '맞춤 견적';
        
        // 입퇴장봇 환불 규정 숨기기
        ponyobotRefundItem.style.display = 'none';
        ponyobotRefundItem.querySelector('input').removeAttribute('required');
        
        // 제작 전용 환불 규정 보이기
        customRefundItem.style.display = 'flex';
        customRefundItem.querySelector('input').setAttribute('required', 'required');
    }
}

/*=============== CHECK ALL AGREEMENTS ===============*/
function checkAllAgreements() {
    const agreeTerms = document.getElementById('agree-terms-pre').checked;
    const agreePrivacy = document.getElementById('agree-privacy-pre').checked;
    
    let allChecked = agreeTerms && agreePrivacy;
    
    // 환불 규정 동의 확인
    if (selectedService === 'ponyobot') {
        const agreeRefund = document.getElementById('agree-refund-pre').checked;
        allChecked = allChecked && agreeRefund;
    } else if (selectedService === 'custom') {
        const agreeCustomRefund = document.getElementById('agree-custom-refund-pre').checked;
        allChecked = allChecked && agreeCustomRefund;
    }
    
    // 모두 동의하면 성공 메시지 표시
    const successMessage = document.getElementById('agreement-success-message');
    if (allChecked) {
        successMessage.style.display = 'block';
    } else {
        successMessage.style.display = 'none';
    }
}

/*=============== PROCEED TO KAKAO CHAT ===============*/
function proceedToKakaoChat() {
    // 카카오톡 오픈채팅 링크로 이동
    window.open('https://open.kakao.com/me/ponyobot_apply', '_blank');
    
    // 약관 동의 체크박스 초기화
    document.querySelectorAll('.agreement-section input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // 성공 메시지 숨기기
    document.getElementById('agreement-success-message').style.display = 'none';
    
    // 메인 페이지로 이동
    backToServices();
}

/*=============== BACK TO SERVICES ===============*/
function backToServices() {
    // 약관 동의 섹션 숨기기
    document.getElementById('agreement-section').style.display = 'none';
    
    // 서비스 카드 섹션 보이기
    document.querySelector('.apply-section').style.display = 'block';
    
    // 체크박스 초기화
    document.querySelectorAll('.agreement-section input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // 성공 메시지 숨기기
    document.getElementById('agreement-success-message').style.display = 'none';
    
    selectedService = null;
    
    // 상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/*=============== INITIALIZE CHECKBOX LISTENERS ===============*/
document.addEventListener('DOMContentLoaded', function() {
    // 모든 체크박스에 이벤트 리스너 추가
    const checkboxes = document.querySelectorAll('.agreement-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', checkAllAgreements);
    });
});

/*=============== ESC KEY TO CLOSE MODAL ===============*/
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('apply-success-modal');
        if (modal.style.display === 'flex') {
            closeSuccessModal();
        }
    }
});