const contetnt = document.querySelector('.content');

let data = fetch('data.json')
  .then(response => response.json())
  .then(data => {
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      let div = document.createElement('div');
      div.classList.add('item');
      div.innerHTML = `
        <img src="${item.img}" alt="">
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
      `;
      contetnt.appendChild(div);
    }
  });
