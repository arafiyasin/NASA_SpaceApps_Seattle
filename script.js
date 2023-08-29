document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

const slider = document.querySelector('.slider');
const handle = document.querySelector('.handle');
const sun = document.querySelector('.sun');
const output = document.getElementById('output');

let angle = 0; // Angle in degrees

function updateSliderPosition() {
    const radius = slider.clientWidth / 2;
    const x = radius * Math.cos(angle * (Math.PI / 180));
    const y = radius * Math.sin(angle * (Math.PI / 180));

    handle.style.transform = `translate(${x}px, ${y}px)`;
    output.textContent = `Angle: ${angle}°`;

    // Update other information or trigger actions based on the angle
    // For example, you can display the picture of the sun based on the angle.
}

function dragSlider(event) {
    event.preventDefault();

    const sliderRect = slider.getBoundingClientRect();
    const center = { x: sliderRect.left + sliderRect.width / 2, y: sliderRect.top + sliderRect.height / 2 };

    const dx = event.clientX - center.x;
    const dy = event.clientY - center.y;

    angle = (Math.atan2(dy, dx) * 180 / Math.PI) + 90;

    updateSliderPosition();
}

handle.addEventListener('mousedown', () => {
    document.addEventListener('mousemove', dragSlider);
    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', dragSlider);
    });
});

// Initialize the slider position
updateSliderPosition();
