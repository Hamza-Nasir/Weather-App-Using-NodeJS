const weatherForm = document.querySelector('form');
const msg1 = document.getElementById('message-1');
const msg2 = document.getElementById('message-2');
const weather_icon = document.getElementById('weather-icon');

msg1.textContent = 'From JavaScript';


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const input = document.querySelector('input').value;
    

    const url = `/weather?address=${input}`;
    msg1.textContent = "From JavaScript";
    msg2.textContent = "Fetching data...";

    // console.log(input);
    // console.log(url);
    fetch(url).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            msg1.textContent = "From JavaScript";
            msg2.textContent = data.error;
            console.log(data.error);
        }

        else {
            msg1.textContent = `${data.address}, ${data.country}`;
            msg2.textContent = `${data.weather_desc}, ${data.data.temperature} C`;
            weather_icon.src = data.data.weather_icons[0];

            console.log(data);
        }
    })
})
})