const myInfo = new URLSearchParams(window.location.search);

document.querySelector('#results').innerHTML = `<p>Appointment for ${myInfo.get('first')} ${myInfo.get('last')}</p>
<p>Your Phone: ${myInfo.get('phone')} ${myInfo.get('last')}</p>
<p>Proxy: ${myInfo.get('ordinance')}</p>
<Your Email: ${myInfo.get('email')}</p>
`