document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const resultsGrid = document.getElementById('results');

    generateBtn.addEventListener('click', () => {
        resultsGrid.innerHTML = ''; // Clear previous results
        for (let i = 0; i < 5; i++) {
            const numbers = generateLottoNumbers();
            displayNumbers(numbers);
        }
    });

    function generateLottoNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNum = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNum);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    }

    function displayNumbers(numbers) {
        const resultCard = document.createElement('div');
        resultCard.classList.add('result-card');

        numbers.forEach(number => {
            const numberBall = document.createElement('div');
            numberBall.classList.add('number-ball');
            numberBall.textContent = number;
            numberBall.style.backgroundColor = getBallColor(number);
            resultCard.appendChild(numberBall);
        });

        resultsGrid.appendChild(resultCard);
    }

    function getBallColor(number) {
        if (number <= 10) return '#fbc400'; // Yellow
        if (number <= 20) return '#69c8f2'; // Blue
        if (number <= 30) return '#ff7272'; // Red
        if (number <= 40) return '#aaa'; // Gray
        return '#b0d840'; // Green
    }
});
