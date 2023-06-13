let token = null;
let quote = null;
let ip = null;
let formDataQuote = null;
let profession = null;
let content = '';
let advices = null;
let formQuote = null;
let quoteReturned = null;
let quoteAndAdvice = null;
const queryParams = new URLSearchParams(window.location.search);


if (queryParams.has('token')) {
  token = queryParams.get('token');
}

async function getUserIp() {
  try {
    const response = await fetch('https://ipapi.co/json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const data = await response.json();
      return data.ip;
    }
  } catch (error) {
    console.log('There has been a problem with your fetch operation: ', error.message);
  }
}

async function main() {
  ip = await getUserIp();
  quote = await getQuoteByIpOrToken(token, ip);
  let content = '';
  if (!quote || quote.quote.quote === null) {
    content = formProfession;
  } else {
    let firstName = quote.user.first_name;
    if (firstName === null) {
      firstName = '';
    }
    content = `<h2>Welcome back ${firstName} !</h2>`;
    content = content.concat(continueButton);
  }
  document.getElementById('content').innerHTML = content;
  if (document.getElementById('FormProfession')) {
    document.getElementById('FormProfession').addEventListener('submit', handleSubmitProfessionInfo);
  }
}

async function getQuoteByIpOrToken(token, ip) {
  try {
    const response = await fetch(`http://localhost:3000/api/quotes?token=${token}&ip_address=${ip}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Origin': window.location.origin
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log('There has been a problem with your fetch operation: ', error.message);
  }
}

async function handleSubmitProfessionInfo(event) {
  event.preventDefault();

  profession = document.getElementById('profession').value
  advices = await getAdvices(profession);
  document.getElementById('content').innerHTML = buildFormQuote(advices);
  document.getElementById('FormQuote').addEventListener('submit', handleSubmitActivityInfo);
}

async function getAdvices(profession) {
  try {
    const response = await fetch(`http://localhost:3000/api/advices?profession=${profession}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Origin': window.location.origin
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log('There has been a problem with your fetch operation: ', error.message);
  }
}

async function handleSubmitActivityInfo(event) {
  event.preventDefault();
  formData = {
    annualRevenue: document.getElementById('annualRevenue').value,
    enterpriseNumber: document.getElementById('enterpriseNumber').value,
    legalName: document.getElementById('legalName').value,
    personType: document.getElementById('personType').value.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase(),
    deductibleFormula: document.getElementById('deductibleFormula').value,
    coverageCeilingFormula: document.getElementById('coverageCeilingFormula').value,
    token: token,
    ip_address: ip
  };
  formData.profession = profession;
  formData = transformEmptyStringToNull(formData);
  document.getElementById('content').innerHTML = formUser;
  document.getElementById('formUser').addEventListener('submit', handleSubmitUserInfo);
}

async function handleSubmitUserInfo(event) {
  event.preventDefault();
  formData.user_params = {
    first_name: document.getElementById('firstName').value,
    last_name: document.getElementById('lastName').value,
    phone_number: document.getElementById('phoneNumber').value,
    email: document.getElementById('email').value,
    profession: profession
  };
  formData.user_params = transformEmptyStringToNull(formData.user_params);
  document.getElementById('content').innerHTML = formAdress;
  document.getElementById('formAddress').addEventListener('submit', handleSubmitAddressInfo);
}

async function handleSubmitAddressInfo(event) {
  event.preventDefault();
  formData.user_params.address_attributes = {
    street_name: document.getElementById('street').value,
    house_number: document.getElementById('number').value,
    city: document.getElementById('city').value,
    postcode: document.getElementById('postalCode').value,
    box_number: document.getElementById('box').value,
    country: document.getElementById('country').value
  };

    quoteReturned = await sendQuoteRequest(formData);
    advices = await getAdvices(profession);
    quoteAndAdvice = `
    <h2>Here is your quote</h2>
    <p>coverage ceiling: ${quoteReturned.quote.coverageCeiling}</p>
    <p>deductible: ${quoteReturned.quote.deductible}</p>
    <p>after delivery: ${quoteReturned.quote.grossPremiums.afterDelivery}</p>
    <p>legal expenses: ${quoteReturned.quote.grossPremiums.legalExpenses}</p>
    <p>public liability: ${quoteReturned.quote.grossPremiums.publicLiability}</p>
    <p>entrusted objects: ${quoteReturned.quote.grossPremiums.entrustedObjects}</p>
    <p>professional indemnity: ${quoteReturned.quote.grossPremiums.professionalIndemnity}</p>
    <h2>As a ${profession}, we advice you to</h2>
    <p>choose ${advices.find(advice => advice.about === 'legal expenses').about} because ${advices.find(advice => advice.about === 'legal expenses').description}</p>
    `
    document.getElementById('content').innerHTML = quoteAndAdvice;
  }
  
  async function sendQuoteRequest(data) {
    try {
      const response = await fetch('http://localhost:3000/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': window.location.origin
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      alert(`error: ${error}`);
    }
  }
  
  function transformEmptyStringToNull(obj) {
    for (const [key, value] of Object.entries(obj)) {
    if (value === '') {
      obj[key] = null;
    }
  }
  return obj;
}

async function getBackResults() {
  profession = quote.user.profession;
  advices = await getAdvices(profession);
  quoteAndAdvice = `
    <h2>Here is your quote</h2>
    <p>coverage ceiling: ${quote.quote.quote.coverageCeiling}</p>
    <p>deductible: ${quote.quote.quote.deductible}</p>
    <p>after delivery: ${quote.quote.quote.grossPremiums.afterDelivery}</p>
    <p>legal expenses: ${quote.quote.quote.grossPremiums.legalExpenses}</p>
    <p>public liability: ${quote.quote.quote.grossPremiums.publicLiability}</p>
    <p>entrusted objects: ${quote.quote.quote.grossPremiums.entrustedObjects}</p>
    <p>professional indemnity: ${quote.quote.quote.grossPremiums.professionalIndemnity}</p>
    <h2>As a ${profession}, we advice you to</h2>
    <p>choose ${advices.find(advice => advice.about === 'legal expenses').about} because ${advices.find(advice => advice.about === 'legal expenses').description}</p>
    `
    document.getElementById('content').innerHTML = quoteAndAdvice;
}

function newQuote() {
  let content = '';
  content = formProfession;
  document.getElementById('content').innerHTML = content;
  document.getElementById('FormProfession').addEventListener('submit', handleSubmitProfessionInfo);
  if (token) {
    fetch(`http://localhost:3000/api/quotes/archive?token=${token}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Origin': window.location.origin
      }
    });
  } else if (ip) {
    fetch(`http://localhost:3000/api/quotes/archive?ip_address=${ip}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Origin': window.location.origin
      }
    });
  }
}

const formProfession = `
<h2>What is your profession ?</h2>
<form id="FormProfession">
<label for="Profession">Profession:</label>
<select id="profession" name="profession" required>
<option value="doctor">Doctor</option>
</select><br><br>
<input type="submit" value="Start a new simulation">
</form>
`

function buildFormQuote(advices) {
  return `
  <h2>We need some informations about your activity</h2>
  <form id="FormQuote">
  <label for="annualRevenue">What is your annual revenue ?</label><br>
  <input type="number" id="annualRevenue" name="annualRevenue" required><br><br><br><br>
  
  <label for="enterpriseNumber">What is your enterprise number ? (has to start by 0 and a total of 10 digits)</label><br>
  <input type="text" id="enterpriseNumber" name="enterpriseNumber" placeholder="0123456789" required><br><br><br><br>
  
  <label for="legalName">What is youe legal Name ?</label><br>
  <input type="text" id="legalName" name="legalName" placeholder="John Doe" required><br><br><br><br>
  
  <label for="personType">Are you a legal person or a natural person ?</label><br>
  <select id="personType" name="personType" required>
  <option value="legalPerson">Legal Person</option>
  <option value="naturalPerson">Natural Person</option>
  </select><br><br><br><br>
  
  <label for="deductibleFormula">Deductible Formula:</label><br>
  <p>As a ${profession}, we suggest to choose '${advices.find(advice => advice.about === 'deductibleFormula').value}': 
  ${advices.find(advice => advice.about === 'deductibleFormula').description}</p>
  <select id="deductibleFormula" name="deductibleFormula">
  <option value="">Select an option</option>
  <option value="small">Small</option>
  <option value="medium">Medium</option>
  <option value="large">Large</option>
  </select><br><br><br><br>
  
  <label for="coverageCeilingFormula">Coverage Ceiling Formula:</label><br>
  <p>As a ${profession}, we suggest to choose '${advices.find(advice => advice.about === 'coverageCeilingFormula').value}': 
  ${advices.find(advice => advice.about === 'coverageCeilingFormula').description}</p>
  <select id="coverageCeilingFormula" name="coverageCeilingFormula">
  <option value="">Select an option</option>
  <option value="small">Small</option>
  <option value="large">Large</option>
  </select><br><br><br><br>
  
  <input type="submit" value="Submit">
  </form>`
}

const formUser = `
<h2>We also need some basic infos about you</h2>
<form id="formUser">
<label for="first_name">First Name:</label>
<input type="text" id="firstName" name="firstName" required><br><br>
<label for="last_name">last Name:</label>
<input type="text" id="lastName" name="lastName" required><br><br>
<label for="phone_number">phone number:</label>
<input type="text" id="phoneNumber" name="phone number" required><br><br>
<label for="email">email:</label>
<input type="text" id="email" name="email" required><br><br>
<input type="submit" value="Submit">
</form>
`

const formAdress = `
<h2>And finaly we need your address</h2>
<form id="formAddress">
<label for="street">Street:</label>
<input type="text" id="street" name="street" required><br><br>
<label for="number">Number:</label>
<input type="text" id="number" name="number" required><br><br>
<label for="box">Box:</label>
<input type="text" id="box" name="box"><br><br>
<label for="city">City:</label>
<input type="text" id="city" name="city" required><br><br>
<label for="postalCode">Postal Code:</label>
<input type="text" id="postalCode" name="postalCode" required><br><br>
<label for="country">Country:</label>
<input type="text" id="country" name="country" required><br><br>
<input type="submit" value="Submit">
</form>
`


const continueButton = `
<h3>Do you want to continue where you were ?</h3>
<button id="continueButton" onclick="getBackResults()">Continue</button>
<h3>Or do a new quote ?</h3>
<button id="newQuote" onclick="newQuote()">New quote</button>
`

main();