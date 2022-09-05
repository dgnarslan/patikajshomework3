let cardContainer = document.querySelector('.card-container');
let container = document.querySelector('.container');
let filterBtnBox = document.querySelector('.button-box');

let data = fetch('data/data.json')
  .then(response => response.json())
  .then(data => {
    let buttonText = [...new Set(data.cardContent.map(item => item.category))];

    data.cardContent.map(item => {
      cardContainer.innerHTML += addCard(item);
    });

    for (let i = 0; i < buttonText.length; i++) {
      let button = document.createElement('a');
      button.classList.add('btn');
      button.setAttribute('id', 'filterBtn');
      button.setAttribute('href', 'javascript:void(0)');
      button.innerHTML = buttonText[i];
      filterBtnBox.appendChild(button);
    }
    let filterBtn = document.querySelectorAll('.btn');
    filterBtn.forEach(btn => {
      btn.addEventListener('click', filterCategory);
      btn.addEventListener('click', function () {
        filterBtn.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
      });
    });
    function filterCategory(e) {
      let category = e.target.innerHTML;
      if (category === 'All') {
        cardContainer.innerHTML = '';
        data.cardContent.map(item => {
          cardContainer.innerHTML += addCard(item);
        });
      } else {
        for (let i = 0; i < buttonText.length; i++) {
          if (category === buttonText[i]) {
            cardContainer.innerHTML = '';
            data.cardContent.map(item => {
              if (item.category === buttonText[i]) {
                cardContainer.innerHTML += addCard(item);
              }
            });
          }
        }
      }
    }
  });

function addCard(item) {
  let card = `
  <div class="card-box">
  <div class="card-header">
    <div class="card-img">
      <img
        src="${item.img}"
        alt="card"
      />
    </div>
    <div class="card-categories">${item.category}</div>
  </div>
  <div class="card-body">
    <div class="card-txt">
      <h4 class="card-title">${item.title}</h4>
      <p class="card-description">
        ${item.desc}
      </p>
    </div>
  </div>
</div>
`;
  return card;
}

function changeTheme() {
  document.querySelector('.container').classList.toggle('dark-theme');
  document.querySelector('.theme-button').classList.toggle('dark-btn');
}
