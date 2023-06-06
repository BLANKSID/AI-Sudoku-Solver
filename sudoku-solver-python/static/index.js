const startButton = document.getElementById('startButton');
const captureButton = document.getElementById('captureButton');
const video = document.getElementById('myVideo');
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

startButton.onclick = () => {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
      video.play();
    })
    .catch((error) => {
      console.log('Error accessing camera:', error);
    });
};

captureButton.onclick = () => {
  // Pause the video to freeze the frame
  video.pause();

  // Draw the current frame on the canvas
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Create an anchor element and set the canvas image as its href
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/jpg');

  // Set the desired file name for the captured image
  const fileName = 'captured_image.jpg';
  link.download = fileName;

  // Programmatically click the anchor element to trigger the download
  link.click();

  // Resume video playback
  video.play();
};

function drawFrame() {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  requestAnimationFrame(drawFrame);
}

video.addEventListener('play', () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  requestAnimationFrame(drawFrame);
});





















document.querySelector('.btn').addEventListener('click', function() {
	const elementToScrollTo = document.querySelector('.main-work');
	window.scrollTo({
	  top: elementToScrollTo.offsetTop,
	  behavior: 'smooth'
	});
  });  


  document.querySelector('.ai-solve').addEventListener('click', function() {
	const elementToScrollTo = document.querySelector('.ai');
	window.scrollTo({
	  top: elementToScrollTo.offsetTop,
	  behavior: 'smooth'
	});
  });  


  document.querySelector('.play-game').addEventListener('click', function() {
	const elementToScrollTo = document.querySelector('.game');
	window.scrollTo({
	  top: elementToScrollTo.offsetTop,
	  behavior: 'smooth'
	});
  });  



const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', e => {
	cursor.setAttribute("style", "top: "+(e.pageY - 10)+"px; left: "+(e.pageX - 10)+"px;")
})


document.addEventListener('click', () => {
	cursor.classList.add("expand");

	setTimeout(() => {
		cursor.classList.remove("expand");
	}, 500);
})

































 






















  
  function generateSudokuGrid() {
	const grid = document.querySelector('.sudoku-grid');
	grid.innerHTML = '';
  
	const numbers = Array.from({ length: 9 }, (_, index) => index + 1);
  
	const shuffledNumbers = shuffleArray(numbers);
  
	const rows = Array.from({ length: 9 }, () => new Set());
	const columns = Array.from({ length: 9 }, () => new Set());
	const blocks = Array.from({ length: 9 }, () => new Set());
  
	for (let row = 0; row < 9; row++) {
	  for (let col = 0; col < 9; col++) {
		const cell = document.createElement('div');
		const input = document.createElement('input');
		input.type = 'text';
		input.maxLength = '1';
		cell.className = 'sudoku-cell';
  
		let number;
		let blockIndex;
  
		if (Math.random() < 0.3) {
		  do {
			number = shuffledNumbers.pop();
			shuffledNumbers.unshift(number);
  
			blockIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3);
		  } while (
			rows[row].has(number) ||
			columns[col].has(number) ||
			blocks[blockIndex].has(number)
		  );
  
		  rows[row].add(number);
		  columns[col].add(number);
		  blocks[blockIndex].add(number);
  
		  input.value = number;
		  input.readOnly = true;
		  cell.appendChild(input);
		} else {
		  input.value = '';
		  cell.appendChild(input);
		}
  
		grid.appendChild(cell);
	  }
	}
  }
  
  

  // Function to shuffle an array using Fisher-Yates algorithm
  function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
	  const j = Math.floor(Math.random() * (i + 1));
	  [array[i], array[j]] = [array[j], array[i]];
	}
	return array;
  }

  // Function to validate the Sudoku grid
  function validateSudoku() {
	const grid = document.querySelector('.sudoku-grid');
	const cells = grid.querySelectorAll('.sudoku-cell input');
	const message = document.querySelector('.validate-message');
	let isValid = true;
  
	for (let i = 0; i < cells.length; i++) {
	  const value = cells[i].value;
  
	  if (value === '') {
		isValid = false;
		break;
	  }
  
	  const row = Math.floor(i / 9);
	  const col = i % 9;
  
	  // Check for duplicate values in the same row or column
	  if (
		!isValueValid(cells, row, col, value) ||
		!isValueValid(cells, col, row, value)
	  ) {
		isValid = false;
		break;
	  }
	}
  
	message.textContent = isValid ? 'Sudoku is correct!' : 'Sudoku is incorrect!';
  }
  
  // Function to check if a value is valid at a given position in the Sudoku grid
  function isValueValid(grid, row, col, value) {
	const rowStart = Math.floor(row / 3) * 3;
	const colStart = Math.floor(col / 3) * 3;
  
	// Check for duplicate values in the same row
	for (let i = 0; i < 9; i++) {
	  const input = grid.children[row * 9 + i].querySelector('input');
	  if (input.value === value) {
		return false;
	  }
	}
  
	// Check for duplicate values in the same column
	for (let i = 0; i < 9; i++) {
	  const input = grid.children[i * 9 + col].querySelector('input');
	  if (input.value === value) {
		return false;
	  }
	}
  
	// Check for duplicate values in the same 3x3 block
	for (let i = rowStart; i < rowStart + 3; i++) {
	  for (let j = colStart; j < colStart + 3; j++) {
		const input = grid.children[i * 9 + j].querySelector('input');
		if (input.value === value) {
		  return false;
		}
	  }
	}
  
	return true;
  }
  
  
  

  // Function to reveal the answer of the Sudoku grid
  function revealAnswer() {
	const grid = document.querySelector('.sudoku-grid');
	grid.classList.add('answer');
	const cells = grid.querySelectorAll('.sudoku-cell');

	for (let i = 0; i < cells.length; i++) {
	  const input = cells[i].querySelector('input');
	  if (input.value === '') {
		const answer = generateRandomNumber(1, 9);
		input.value = answer;
		cells[i].classList.add('answer');
	  }
	}
  }

  // Function to refresh the Sudoku grid
  function refreshSudoku() {
	const grid = document.querySelector('.sudoku-grid');
	grid.innerHTML = '';
	grid.classList.remove('answer');
	generateSudokuGrid();
  }

  // Function to generate a random number between min and max (inclusive)
  function generateRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Generate a Sudoku grid on page load
	  window.addEventListener('load', generateSudokuGrid);



