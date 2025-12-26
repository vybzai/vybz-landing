// Calendar View Toggle
      function switchCalendarView(mode) {
          const iframe = document.getElementById('vybz-calendar-iframe');
          if (!iframe) return;

          const baseUrl = 'https://calendar.google.com/calendar/embed?src=c_c509d130c8fc6794b48e4b6dd03e51b4faccbeb6afc3993cc442110c28ee968e%40group.calendar.google.com&ctz=Europe%2FLondon&showTitle=0&showNav=1&showPrint=0&showTabs=0&showCalendars=0&mode=';
          iframe.src = baseUrl + mode;

          // Update button styles
          const monthBtn = document.getElementById('cal-month-btn');
          const agendaBtn = document.getElementById('cal-agenda-btn');

          if (mode === 'MONTH') {
              monthBtn.className = 'inline-flex items-center gap-2 bg-main-purple text-white px-4 py-2 rounded-full text-sm font-medium cursor-pointer hover:opacity-90 transition-all';
              agendaBtn.className = 'inline-flex items-center gap-2 bg-white/10 text-zinc-400 px-4 py-2 rounded-full text-sm font-medium cursor-pointer hover:bg-white/20 transition-all';
          } else {
              agendaBtn.className = 'inline-flex items-center gap-2 bg-main-purple text-white px-4 py-2 rounded-full text-sm font-medium cursor-pointer hover:opacity-90 transition-all';
              monthBtn.className = 'inline-flex items-center gap-2 bg-white/10 text-zinc-400 px-4 py-2 rounded-full text-sm font-medium cursor-pointer hover:bg-white/20 transition-all';
          }
      }

      
