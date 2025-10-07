<?php
// DB 연결
require_once __DIR__ . '/../config/connect.php';

// 업데이트 목록 가져오기 (최신순)
$query = "SELECT * FROM updates ORDER BY date DESC";
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
    <!-- 업데이트 페이지 스타일 -->
    <link rel="stylesheet" href="../assets/css/update-styles.css">

    <title>업데이트 - ponyobot</title>
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

                        <a href="/notice/" class="sidebar__link">
                            <i class="ri-megaphone-line"></i>
                            <span>공지사항</span>
                        </a>

                        <a href="/update/" class="sidebar__link active-link">
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
        <div class="update-header">
            <h1>업데이트</h1>
            <p class="update-subtitle">ponyobot의 최신 업데이트 내역을 확인하세요</p>
        </div>

        <div class="update-container">
            <?php if ($result && $result->num_rows > 0): ?>
                <?php 
                $counter = 1;
                while($update = $result->fetch_assoc()): 
                    // 해당 업데이트의 항목들 가져오기
                    $update_id = $update['id'];
                    $items_query = "SELECT * FROM update_items WHERE update_id = ? ORDER BY sort_order";
                    $stmt = $conn->prepare($items_query);
                    $stmt->bind_param("i", $update_id);
                    $stmt->execute();
                    $items = $stmt->get_result();
                ?>
                    <div class="update-item">
                        <div class="update-header-item" data-target="update-<?php echo $counter; ?>">
                            <div class="update-info">
                                <h3 class="update-title"><?php echo htmlspecialchars($update['title']); ?></h3>
                                <span class="update-date">
                                    <?php 
                                    // 한국 시간 형식으로 날짜 표시
                                    $date = new DateTime($update['date']);
                                    echo $date->format('Y년 n월 j일');
                                    ?>
                                </span>
                            </div>
                            <i class="ri-arrow-down-s-line update-arrow"></i>
                        </div>
                        <div class="update-content" id="update-<?php echo $counter; ?>">
                            <div class="update-body">
                                <?php if ($items->num_rows > 0): ?>
                                    <?php while($item = $items->fetch_assoc()): ?>
                                        <h4><?php echo htmlspecialchars($item['subtitle']); ?></h4>
                                        <ul>
                                            <?php 
                                            // 내용을 줄바꿈으로 분리하여 리스트로 표시
                                            $content_lines = explode("\n", trim($item['content']));
                                            foreach($content_lines as $line):
                                                $line = trim($line);
                                                if (!empty($line)):
                                            ?>
                                                <li><?php echo htmlspecialchars($line); ?></li>
                                            <?php 
                                                endif;
                                            endforeach; 
                                            ?>
                                        </ul>
                                    <?php endwhile; ?>
                                <?php else: ?>
                                    <p style="text-align: center; color: var(--text-color); opacity: 0.7;">
                                        등록된 업데이트 항목이 없습니다.
                                    </p>
                                <?php endif; ?>
                                
                                <!-- 푸터 정보 -->
                                <div class="update-footer">
                                    <span class="update-number">#<?php echo $update['id']; ?></span>
                                    <span class="update-updated">
                                        최종 수정: <?php echo date('Y.m.d', strtotime($update['updated_at'])); ?>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                <?php 
                $stmt->close();
                $counter++;
                endwhile; 
                ?>
            <?php else: ?>
                <!-- 업데이트가 없는 경우 -->
                <div class="update-item">
                    <div class="update-body" style="text-align: center; padding: 3rem;">
                        <i class="ri-information-line" style="font-size: 3rem; color: var(--first-color); margin-bottom: 1rem;"></i>
                        <h3 style="color: var(--title-color); margin-bottom: 0.5rem;">등록된 업데이트가 없습니다</h3>
                        <p style="color: var(--text-color);">곧 새로운 업데이트로 찾아뵙겠습니다.</p>
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
    <script src="../assets/js/update.js"></script>
    <script src="../assets/js/theme.js"></script>
</body>

</html>
<?php
$conn->close();
?>