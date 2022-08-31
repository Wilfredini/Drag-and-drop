const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richesPeople = [
  "Jeff Bezos",
  "Elon Musk",
  "Bernard Arnault",
  "Bill Gates",
  "Mark Zuckerberg",
  "Warren Buffet",
  "Larry Ellison",
  "Larry Page",
  "Sergey Brin",
];

const listItems = [];

let dragStartIndex;

createList();

function createList() {
  [...richesPeople]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement("li");

      listItem.setAttribute("data-index", index);

      listItem.innerHTML = `<span class ="number">${index + 1}</span>
    <div class="draggable" draggable=true>
    <p class="person-name">${person}</p>
    <i class="fa-solid fa-grip-lines"></i>
    </div>
    `;
      listItems.push(listItem);
      draggable_list.appendChild(listItem);
    });
  addEventListener();
}
function dragStart() {
  //   console.log("Event:", "dragstart");
  dragStartIndex = +this.closest("li").getAttribute("data-index");
  console.log(dragStartIndex);
}

function dragOver(e) {
  //   console.log("Event:", "dragover");
  e.preventDefault();
}

function dragEnter() {
  //   console.log("Event:", "dragenter");
  this.classList.add("over");
}

function dragDrop() {
  //   console.log("Event:", "drop");
  const dragEndIndex = +this.getAttribute("data-index");

  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove("over");
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector(".draggable").innerText.trim();
    if (personName !== richesPeople[index]) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}

function dragLeave() {
  //   console.log("Event:", "dragleave");
  this.classList.remove("over");
}

function addEventListener() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItem = document.querySelectorAll(".draggable-list li");

  draggables.forEach((dragable) => {
    dragable.addEventListener("dragstart", dragStart);
  });

  dragListItem.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

check.addEventListener("click", checkOrder);
