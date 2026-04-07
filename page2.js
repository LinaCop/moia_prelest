document.addEventListener('DOMContentLoaded', () => {
  function fileNameFromPath(path) {
    const clean = (path || '').split('?')[0].split('#')[0];
    const parts = clean.split('/');
    return parts[parts.length - 1] || 'document.pdf';
  }

  async function forceDownload(pdfPath, fileName) {
    const resp = await fetch(pdfPath, { cache: 'no-store' });
    if (!resp.ok) throw new Error(`Не удалось скачать файл: HTTP ${resp.status}`);

    const blob = await resp.blob();
    const downloadBlob = new Blob([blob], { type: 'application/octet-stream' });

    const url = URL.createObjectURL(downloadBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;

    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
  }

  document.querySelectorAll('.js-pdf-view[data-pdf]').forEach((btn) => {
    const pdfPath = btn.dataset.pdf;
    btn.setAttribute('href', pdfPath);
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener');
  });

  document.querySelectorAll('.js-pdf-download[data-pdf]').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const pdfPath = btn.dataset.pdf;
      const fileName = btn.dataset.name || fileNameFromPath(pdfPath);

      try {
        await forceDownload(pdfPath, fileName);
      } catch (err) {
        alert(
          'Скачивание не получилось. Открой консоль браузера, чтобы посмотреть причину ошибки.'
        );
      }
    });
  });
});


