const apiKey = "7e23a689eae29ab7e9138a4f9794eb02&units=imperial";
//button action

document.getElementById("generate").addEventListener("click", () => {
  const input = document.getElementById("zip").value;
  const textarea = document.getElementById("feelings").value;
  if (input != "") {
    getWeatherByZip(input, textarea);
  } else {
    console.log("plzz provide zip code");
  }
});
/// Helper function
async function getWeatherByZip(zip, pop) {
  try {
    const response = await fetch(`http://localhost:1350/primo/${zip}`);
    const responseData = await response.json();
    document.getElementById("date").innerHTML = "Date : " + responseData.date;
    document.getElementById("temp").innerHTML =
      "Temperature : " + responseData.temp;
    document.getElementById("country").innerHTML =
      "Location : " + responseData.country + " " + responseData.city;
    document.getElementById("description").innerHTML =
      "description : " + responseData.description;
    const data = responseData;
    postData("http://localhost:1350/dod", data);
    if (pop != "") {
      document.getElementById("content").innerHTML =
        "You are feeling " + pop + " today";
    }
  } catch (error) {
    console.log(error);
  }
}
//////////////////////////

const postData = (url, data) => {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(data);
};
