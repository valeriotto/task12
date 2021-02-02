// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  fruitsList.textContent = '';

  for (let i = 0; i < fruits.length; i++) {
    // формируем новый элемент <li> при помощи document.createElement,
    let newLi = document.createElement('li');
    let newDiv = document.createElement('div');
    newLi.classList.add('fruit__item');
    newDiv.classList.add('fruit__info');
    newLi.innerHTML = `<div>index: ${i}</div><div>kind: ${fruits[i].kind}</div><div>color: ${fruits[i].color}</div><div>weight (кг): ${fruits[i].weight}</div>`;

    switch (fruits[i].color) {
      case 'фиолетовый':
        newLi.classList.add('fruit_violet');
        break;
      case 'зеленый':
        newLi.classList.add('fruit_green');
        break;
      case 'розово-красный':
        newLi.classList.add('fruit_carmazin');
        break;
      case 'желтый':
        newLi.classList.add('fruit_yellow');
        break;
      case 'светло-коричневый':
        newLi.classList.add('fruit_lightbrown');
        break;
      default:
        newLi.classList.add('fruit_new');

    }

    // и добавляем в конец списка fruitsList при помощи document.appendChild
    fruitsList.appendChild(newLi);
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];

  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
    let index = getRandomInt(0, fruits.length - 1);
    let indexFruit = fruits[index];
    fruits.splice(index, 1);
    result.push(indexFruit);
  }

  fruits = result;
};

shuffleButton.addEventListener('click', () => {
  if (fruits.length <= 1) {
    alert('Нечего перемешивать!');
    return false;
  }
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  let result = fruits.filter((item) => {
    // TODO: допишите функцию
    let min = document.querySelector(".minweight__input").value,
      max = document.querySelector(".maxweight__input").value;
    return item.weight >= min && item.weight <= max;
  });
  fruits = result.slice();
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  const priority = ['зеленый', 'желтый', 'розово-красный', 'светло-коричневый', 'фиолетовый']; //сортировка по алфавиту
  const priority1 = priority.indexOf(a.color);
  const priority2 = priority.indexOf(b.color);
  return priority1 > priority2;
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
    const n = arr.length;
    // внешняя итерация по элементам
    for (let i = 0; i < n - 1; i++) {
      // внутренняя итерация для перестановки элемента в конец массива
      for (let j = 0; j < n - 1 - i; j++) {
        // сравниваем элементы
        if (comparation(arr[j], arr[j + 1])) {
          // делаем обмен элементов
          let temp = arr[j + 1];
          arr[j + 1] = arr[j];
          arr[j] = temp;
        }
      }
    }
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
    const sortedArray = arr;

    const recursiveSort = (start, end) => {
      if (end - start < 2) {
        return;
      }
      const pivotValue = sortedArray[end];
      let splitIndex = start;
      for (let i = start; i < end; i++) {
        const sort = comparation(sortedArray[i], pivotValue);
        if (!sort) {
          if (splitIndex !== i) {
            const temp = sortedArray[splitIndex];
            sortedArray[splitIndex] = sortedArray[i];
            sortedArray[i] = temp;
          }
          splitIndex++;
        }
      };

      sortedArray[end] = sortedArray[splitIndex];
      sortedArray[splitIndex] = pivotValue;

      recursiveSort(start, splitIndex - 1);
      recursiveSort(splitIndex + 1, end);
    };

    recursiveSort(0, arr.length - 1);
    return sortedArray;
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
    sortTimeLabel.textContent = sortTime;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  if (sortKind === 'bubbleSort') {
    sortKind = 'quickSort';
  } else {
    sortKind = 'bubbleSort'
  }
  sortKindLabel.textContent = sortKind;
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  if (kindInput.value && colorInput.value && weightInput.value) {
    fruits.push({
      kind: kindInput.value,
      color: colorInput.value,
      weight: weightInput.value
    });
  } else {
    alert('Не все поля заполнены!');
  }

  kindInput.value = '';
  colorInput.value = '';
  weightInput.value = '';

  display();
});
