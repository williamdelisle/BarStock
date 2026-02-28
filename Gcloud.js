// Initialize the token client
const client = google.accounts.oauth2.initTokenClient({
  client_id: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
  scope: 'https://www.googleapis.com/auth/datastore', // adjust scope to your API
  callback: (tokenResponse) => {
    const accessToken = tokenResponse.access_token;
    // Now use this token to call Google Cloud APIs
    callGoogleCloudAPI(accessToken);
  }
});

// Trigger login
client.requestAccessToken();

async function callGoogleCloudAPI(token) {
  const res = await fetch('https://datastore.googleapis.com/v1/projects/YOUR_PROJECT:runQuery', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ /* your query */ })
  });
  const data = await res.json();
  console.log(data);
}