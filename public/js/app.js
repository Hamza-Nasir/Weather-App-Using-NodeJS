console.log("Client side JS File!");



const weatherForm = document.querySelector('form');
const msg1 = document.getElementById('message-1');
const msg2 = document.getElementById('message-2');

msg1.textContent = 'From JavaScript';


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const input = document.querySelector('input').value;
    

    const url = `http://localhost:3000/weather?address=${input}`;
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

            console.log(data);
        }
    })
})
})