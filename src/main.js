const form = document.getElementById('rss-form');
const feedback = document.getElementById('feedback');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const url = document.getElementById('rss-url').value.trim();

  if (!url) {
    showMessage('URL не может быть пустым', 'danger');
    return;
  }

  validateUrl(url)
    .then(() => {
      return fetchRss(url);
    })
    .then(data => {
      showMessage(`RSS успешно добавлен: ${data.title}`, 'success');
    })
    .catch(error => {
      showMessage(`Ошибка: ${error.message}`, 'danger');
    });
});

function validateUrl(url) {
  return new Promise((resolve, reject) => {
    try {
      new URL(url);
      resolve();
    } catch (e) {
      reject(new Error('Некорректный URL'));
    }
  });
}

function fetchRss(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.3) {
        resolve({ title: 'Пример RSS-фида' });
      } else {
        reject(new Error('Ошибка загрузки RSS'));
      }
    }, 1000);
  });
}

function showMessage(text, type) {
  feedback.innerHTML = `
    <div class="alert alert-${type}" role="alert">
      ${text}
    </div>
  `;
}
