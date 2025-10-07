<?php
// DB 연결
require_once __DIR__ . '/../config/connect.php';

// 공지사항 목록 가져오기 (최신순)
$query = "SELECT * FROM notice ORDER BY date DESC";
$result = $conn->query($query);
?>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!--=============== REMIXICONS ===============-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.2.0/remixicon.css">

    <!--=============== CSS FILES ===============-->
    <!-- 기본 스타일 -->
    <link rel="stylesheet" href="../assets/css/styles.css">
    <!-- 공지사항 페이지 스타일 -->
    <link rel="stylesheet" href="../assets/css/notice-styles.css">

    <title>공지사항 - ponyobot</title>
</head>

<body>
    <!--=============== HEADER ===============-->
    <header class="header" id="header">
        <div class="header__container">
            <a href="/setting/" class="header__logo">
                <i class="ri-settings-3-line"></i>
            </a>

            <button class="header__toggle" id="header-toggle">
                <i class="ri-menu-line"></i>
            </button>
        </div>
    </header>

    <!--=============== SIDEBAR ===============-->
    <nav class="sidebar" id="sidebar">
        <div class="sidebar__container">
            <div class="sidebar__content">
                <div>
                    <h3 class="sidebar__title">메뉴</h3>

                    <div class="sidebar__list">
                        <a href="/" class="sidebar__link">
                           <i class="ri-home-3-line"></i>
                           <span>홈</span>
                        </a>

                        <a href="/notice/" class="sidebar__link active-link">
                            <i class="ri-megaphone-line"></i>
                            <span>공지사항</span>
                        </a>

                        <a href="/update/" class="sidebar__link">
                            <i class="ri-refresh-line"></i>
                            <span>업데이트</span>
                        </a>

                        <a href="/apply/" class="sidebar__link">
                            <i class="ri-file-list-3-line"></i>
                            <span>분양신청</span>
                        </a>

                        <a href="https://blog.ponyobot.kr/posts/cmd/" class="sidebar__link">
                            <i class="ri-terminal-box-line"></i>
                            <span>명령어</span>
                        </a>

                        <a href="https://status.ponyobot.kr/" class="sidebar__link">
                            <i class="ri-pulse-line"></i>
                            <span>상태페이지</span>
                        </a>

                        <a href="https://cs.ponyobot.kr/" class="sidebar__link">
                            <i class="ri-customer-service-2-line"></i>
                            <span>고객센터</span>
                        </a>

                        <a href="https://blog.ponyobot.kr/" class="sidebar__link">
                            <i class="ri-blogger-line"></i>
                            <span>블로그</span>
                        </a>

                        <a href="/profile/" class="sidebar__link">
                            <i class="ri-user-3-line"></i>
                            <span>개발자 프로필</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <!--=============== MAIN ===============-->
    <main class="main container" id="main">
        <div class="notice-header">
            <h1>공지사항</h1>
            <p class="notice-subtitle">ponyobot의 최신 공지사항을 확인하세요</p>
        </div>

        <div class="notice-container">
            <?php if ($result && $result->num_rows > 0): ?>
                <?php 
                $counter = 1;
                while($notice = $result->fetch_assoc()): 
                ?>
                    <div class="notice-item">
                        <div class="notice-header-item" data-target="notice-<?php echo $counter; ?>">
                            <div class="notice-info">
                                <h3 class="notice-title"><?php echo htmlspecialchars($notice['title']); ?></h3>
                                <span class="notice-date">
                                    <?php 
                                    // 한국 시간 형식으로 날짜 표시
                                    $date = new DateTime($notice['date']);
                                    echo $date->format('Y년 n월 j일 H:i');
                                    ?>
                                </span>
                            </div>
                            <i class="ri-arrow-down-s-line notice-arrow"></i>
                        </div>
                        <div class="notice-content" id="notice-<?php echo $counter; ?>">
                            <div class="notice-body">
                                <?php 
                                // 내용을 줄바꿈 처리하여 표시
                                echo nl2br(htmlspecialchars($notice['content']));
                                ?>
                                <div class="notice-footer">
                                    <span class="notice-number">#<?php echo $notice['id']; ?></span>
                                    <span class="notice-updated">
                                        최종 수정: <?php echo date('Y.m.d', strtotime($notice['updated_at'])); ?>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                <?php 
                $counter++;
                endwhile; 
                ?>
            <?php else: ?>
                <!-- 공지사항이 없는 경우 -->
                <div class="notice-item">
                    <div class="notice-body" style="text-align: center; padding: 3rem;">
                        <i class="ri-information-line" style="font-size: 3rem; color: var(--first-color); margin-bottom: 1rem;"></i>
                        <h3 style="color: var(--title-color); margin-bottom: 0.5rem;">등록된 공지사항이 없습니다</h3>
                        <p style="color: var(--text-color);">곧 새로운 소식으로 찾아뵙겠습니다.</p>
                    </div>
                </div>
            <?php endif; ?>
        </div>
    </main>

    <!--=============== FOOTER ===============-->
    <footer class="footer" id="footer">
        <div class="footer__container">
            <p class="footer__copyright">© 2025 PonyoBot. All Rights Reserved.</p>
        </div>
    </footer>

    <!--=============== MAIN JS ===============-->
    <script src="../assets/js/main.js"></script>
    <script src="../assets/js/notice.js"></script>
    <script src="../assets/js/theme.js"></script>
</body>

</html>
<?php
$conn->close();
?>