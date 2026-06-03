// Grab the parameters directly from the browser window's URL string
const myInfo = new URLSearchParams(window.location.search);

// Query your target rendering node container
document.querySelector('#registrationSummaryData').innerHTML = `
    <tr>
        <td><strong>Full Name:</strong></td>
        <td>${myInfo.get('firstName')} ${myInfo.get('lastName')}</td>
    </tr>
    <tr>
        <td><strong>Business Name:</strong></td>
        <td>${myInfo.get('organization')}</td>
    </tr>
    <tr>
        <td><strong>Email Address:</strong></td>
        <td>${myInfo.get('email')}</td>
    </tr>
    <tr>
        <td><strong>Mobile Number:</strong></td>
        <td>${myInfo.get('phone')}</td>
    </tr>
    <tr>
        <td><strong>Membership Level:</strong></td>
        <td>${myInfo.get('membershipLevel')}</td>
    </tr>
    <tr>
        <td><strong>Submission Timestamp:</strong></td>
        <td>${new Date(myInfo.get('timestamp')).toLocaleString()}</td>
    </tr>
`;