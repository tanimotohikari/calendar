$(function() {
  const weeks = ['日', '月', '火', '水', '木', '金', '土'];
	const date = new Date();
  const $prev = $('#prev');
  const $next = $('#next');
  const $calendar = $('#calendar');

  let currentYear = date.getFullYear();  // 年の取得
  let currentMonth = date.getMonth() + 1; // 返される値は 0～11なので+1する

	// ▼new Date()で第一引数に年、第二引数に月、第三引数に-1で月の最初,0で月の最後を取得できる
	// うるう年も簡単に判定できる　
  // Date(currentYear, currentMonth, 0).getDate() === 29
  
  function renderCalendar() {

    if(currentMonth === 13) {
      currentMonth = 1;
      currentYear = currentYear + 1;
    } else if(currentMonth < 1) {
      currentMonth = 12;
      currentYear = currentYear - 1;
    }

    let startDate = new Date(currentYear, currentMonth - 1, 1);
    let startDate2 = new Date(currentYear, currentMonth, 1);
    let endDate = new Date(currentYear, currentMonth, 0);
    
    let endDayCount = endDate.getDate(); // 月の末日
    let startDay = startDate.getDay(); // 月の最初の日の曜日を取得
    
    let dayCount = 1; // 日にちのカウント
    let calendarHtml = ''; // HTMLを組み立てる変数

    // TODO テンプレートリテラルで書き直す
    calendarHtml += '<h1 class="l-bottom">' + currentYear + '/' + currentMonth + '</h1>';
    calendarHtml += '<table class="l-full l-calendar">';

    // 曜日の行を作成
    for (let i = 0; i < weeks.length; i++) {
      calendarHtml += `<td>${ weeks[i] }</td>`;
    }

    for (let w = 0; w < 6; w++) {
      calendarHtml += '<tr>';

      for (let d = 0; d < 7; d++) {
        if (w == 0 && d < startDay) {
          // 1行目で1日の曜日の前
          calendarHtml += '<td></td>';
        } else if (dayCount > endDayCount) {
          // 末尾の日数を超えた
          calendarHtml += '<td></td>';
        } else {
          calendarHtml += '<td>' + dayCount + '</td>';
          dayCount++;
        }
      }
      calendarHtml += '</tr>';
    }
    calendarHtml += '</table>';

    $calendar.html(calendarHtml);
  }

  function nextMonth() {
    currentMonth = currentMonth + 1;
    renderCalendar();
  }

  function prevMonth() {
    currentMonth = currentMonth - 1;
    renderCalendar();
  }

  renderCalendar();

  $next.on('click', nextMonth);
  $prev.on('click', prevMonth);
});
