/**
 * RASEL Trader - Signal Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const getSignalBtn = document.getElementById('getSignalBtn');
    const loader = document.getElementById('loader');
    const resultArea = document.getElementById('resultArea');
    const signalDirection = document.getElementById('signalDirection');
    const confidenceValue = document.getElementById('confidenceValue');
    const marketSelect = document.getElementById('marketSelect');
    const timeframeSelect = document.getElementById('timeframeSelect');

    // State Logic
    let lastSignal = null;
    let repeatCounter = 0;

    getSignalBtn.addEventListener('click', () => {
        // UI Interaction: Start Analysis
        prepareAnalysis();

        // Simulate intelligent analysis delay (2-3 seconds)
        const processTime = Math.floor(Math.random() * 1000) + 2000;

        setTimeout(() => {
            generateSignal();
        }, processTime);
    });

    function prepareAnalysis() {
        // Disable button
        getSignalBtn.disabled = true;
        getSignalBtn.innerText = "ANALYZING...";

        // Reset UI
        resultArea.classList.add('hidden');
        loader.classList.remove('hidden');
    }

    function generateSignal() {
        const market = marketSelect.value;
        const timeframe = timeframeSelect.value;

        // 1. Logic: Weighted Direction
        let currentSignal = Math.random() > 0.5 ? 'UP' : 'DOWN';

        // 2. Logic: Prevent more than 3 repeats
        if (currentSignal === lastSignal) {
            repeatCounter++;
        } else {
            repeatCounter = 1;
        }

        if (repeatCounter > 3) {
            currentSignal = (currentSignal === 'UP') ? 'DOWN' : 'UP';
            repeatCounter = 1;
        }

        lastSignal = currentSignal;

        // 3. Logic: Confidence Calculation (60% - 92%)
        let confidence = Math.floor(Math.random() * (92 - 60 + 1)) + 60;

        // 4. Logic: Market Influence (OTC slightly reduces confidence consistency)
        if (market.includes('(OTC)')) {
            confidence -= Math.floor(Math.random() * 5);
        }

        // 5. Logic: Timeframe Bias 
        // Shorter timeframes (5s-30s) are more volatile, slight confidence penalty
        const shortTimes = ['5s', '10s', '15s', '30s'];
        if (shortTimes.includes(timeframe)) {
            confidence -= 2;
        }

        // Update UI with result
        displayResult(currentSignal, confidence);
    }

    function displayResult(direction, confidence) {
        // Hide loader
        loader.classList.add('hidden');

        // Setup Text and Color
        signalDirection.innerText = direction;
        signalDirection.className = 'signal-text'; // reset
        signalDirection.classList.add(direction.toLowerCase());

        // Setup Confidence
        confidenceValue.innerText = `${confidence}%`;

        // Show result card
        resultArea.classList.remove('hidden');

        // Reset Button
        getSignalBtn.disabled = false;
        getSignalBtn.innerText = "GET SIGNAL";
    }
});