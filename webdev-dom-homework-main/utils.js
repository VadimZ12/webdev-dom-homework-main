export const formattedDateTime = (time) => {
    let dateTime = new Date(time);
    return dateTime.toLocaleString('ru-Ru', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  export const sanitizeHtml = (htmlString) => {
    return htmlString
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("QUOTE_BEGIN", "<div class='quote'>")
    .replaceAll("QUOTE_END", "</div>")
  };