$(function() {
  const weeks = ['日', '月', '火', '水', '木', '金', '土'];
  const date = new Date();
  const $prev = $('#js-btn-prev');
  const $next = $('#js-btn-next');
  const $calendar = $('#js-calendar');
  const thisMonth = date.getMonth() + 1; //本日の日付を取得
  const thisDay = date.getDay(); //本日の日付を取得

  let selectedDays = []; // 選択した希望日を格納する配列
  let currentYear = date.getFullYear();  // 年の取得
  let currentMonth = date.getMonth() + 1; // 返される値は 0～11なので+1する
  let lastMonthEndDate = new Date(currentYear, currentMonth - 1, 0); // 前月の最後の日
  let lastMonthendDayCount = lastMonthEndDate.getDate(); // 前月の末日

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
    let startDay = startDate.getDay(); // 月の最初の日の曜日を取得

    let endDate = new Date(currentYear, currentMonth, 0);
    let endDayCount = endDate.getDate(); // 月の末日

    let dayCount = 1; // 日にちのカウント
    let calendarHtml = ''; // HTMLを組み立てる変数

    calendarHtml += `<div class='calendar-header'>${ currentYear }年${ currentMonth }月</div>`;
    calendarHtml += `<table id='js-calendar-table' class='calendar-table'>`;
    calendarHtml += `<thead>`;

    // 曜日の行を作成
    for (let i = 0; i < weeks.length; i++) {
      if (i === 0) {
        calendarHtml += `<th class='calendar-sunday'>${ weeks[i] }</th>`;
      } else if (i === 6) {
        calendarHtml += `<th class='calendar-saturday'>${ weeks[i] }</th>`;
      } else {
        calendarHtml += `<th>${ weeks[i] }</th>`;
      }
    }

    calendarHtml += `</thead>`;
    calendarHtml += `<tbody>`;

    for (let w = 0; w < 6; w++) {
      calendarHtml += '<tr>';

      for (let d = 0; d < 7; d++) {
        if (w == 0 && d < startDay) {
          // 1行目で1日の曜日の前
          let num = lastMonthendDayCount - startDay + d + 1;
          calendarHtml += `<td class='text-disable is-disable'>${ num }</td>`;
        } else if (dayCount > endDayCount) {
          // 末尾の日数を超えた場合
          let num = dayCount - endDayCount;
          calendarHtml += `<td class='text-disable is-disable'>${ num }</td>`;
          dayCount++;
        } else if (thisDay > dayCount && thisMonth === currentMonth) {
          // 本日より前の日程を選択できないようにする
          calendarHtml += `<td class='text-disable is-disable'>${dayCount }</td>`;
          dayCount++;
        } else {
          calendarHtml += `<td data-month='${currentMonth}' data-year='${currentYear }'>${ dayCount }</td>`;
          dayCount++;
        }
      }
      calendarHtml += '</tr>';
    }
    calendarHtml += `</tbody>`;
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

  function selectDay() {
    let selectDay = Number($(this).text());
    let selectDate = ([currentYear, currentMonth, selectDay]).toString();
    
    if(selectedDays.indexOf(selectDate) === -1) {
      // 配列に同じ数値が入ってなかったら追加する
      selectedDays.push(selectDate);
      $(this).addClass('is-selected');
    } else {
      // 配列に同じ数値が入っていた場合は削除する
      let arrayIndex = selectedDays.indexOf(selectDate);
      selectedDays.splice(arrayIndex, 1); 
      $(this).removeClass('is-selected');
    }
    console.log(selectedDays);
    // 配列の中身を昇順に並び替える うまくできてない
    // selectedDays = selectedDays.sort();
  }

  renderCalendar();

  $next.on('click', nextMonth);
  $prev.on('click', prevMonth);
  $('#js-calendar-table td').on('click', selectDay);
});
