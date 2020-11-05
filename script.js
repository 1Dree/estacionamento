(() => {
  const input = document.querySelectorAll("form input"),
    addBtn = document.querySelector("form button"),
    tbody = document.querySelector("table tbody"),
    rEgx = /[A-Z]{3}[-]{1}[0-9]{4}$/;
  garage = JSON.parse(localStorage.getItem("garage")) || [];

  function saveToStorage() {
    localStorage.setItem("garage", JSON.stringify(garage));
  }

  function isEmpty(el) {
    return el.value !== "";
  }

  function isRegex(regex, el) {
    return regex.test(el);
  }

  function resetValue(el) {
    el.length === undefined
      ? (el.value = "")
      : el.forEach((item) => (item.value = ""));
  }

  function trEl(vector) {
    return vector.map((item) => {
      const tr = document.createElement("tr"),
        pos = vector.indexOf(item);
      let deleteBtn;

      tr.innerHTML = `
        <td>${item.name}</td>
        <td>${item.plate}</td>
        <td>${item.entry[0]}:${item.entry[1]}</td>
        <td><a href="#" class="delete">delete</a href="#"></td>
      `;

      deleteBtn = tr.querySelector("a.delete");

      removeItem(deleteBtn, pos);

      return tr;
    });
  }

  function renderTable() {
    const trs = trEl(garage);

    tbody.innerHTML = "";
    trs.forEach((tr) => tbody.appendChild(tr));
  }

  function addCar(veicle) {
    garage.push(veicle);

    renderTable();
    resetValue(input);
    saveToStorage();
  }

  function removeItem(el, pos) {
    el.addEventListener("click", () => {
      garage.splice(pos, 1);

      renderTable();
      saveToStorage();
    });
  }

  function formValidation() {
    const time = new Date(),
      car = {
        name: input[0].value,
        plate: input[1].value,
        entry: [time.getHours(), time.getMinutes()],
      };

    isEmpty(car.name) && isRegex(rEgx, car.plate)
      ? addCar(car)
      : alert("Preencha os campos");
  }

  renderTable();

  addBtn.addEventListener("click", () => {
    formValidation();
  });
})();
