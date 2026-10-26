
const bmiForm = document.getElementById("bmi-form");
const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");

const resultBox = document.getElementById("bmi-result");
const bmiValue = document.getElementById("bmi-value");
const bmiMessage = document.getElementById("bmi-message");
const errorMessage = document.getElementById("bmi-error");

const adviceBox = document.createElement("div");
adviceBox.className = "wellness-advice";
adviceBox.innerHTML = `
    <h3 id="advice-title">Your Wellness Guide</h3>
    <p id="advice-description"></p>
    <h4>What can you do?</h4>
    <ul id="advice-list"></ul>
`;
resultBox.appendChild(adviceBox);

const adviceDescription =
    adviceBox.querySelector("#advice-description");
const adviceList = adviceBox.querySelector("#advice-list");

bmiForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const height = Number(heightInput.value);
    const weight = Number(weightInput.value);

    resultBox.classList.add("hidden");
    errorMessage.classList.add("hidden");

    if (
        !Number.isFinite(height) ||
        !Number.isFinite(weight) ||
        height <= 0 ||
        weight <= 0
    ) {
        errorMessage.textContent =
            "Please enter a valid height and weight.";
        errorMessage.classList.remove("hidden");
        return;
    }

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    let category;
    let description;
    let tips = [];

    if (bmi < 18.5) {
        category = "Underweight";
        description =
            "Your BMI is below the standard adult healthy-weight range. " +
            "BMI alone cannot determine whether you are getting enough nutrition.";

        tips = [
            "Eat regular meals with a variety of nutritious foods.",
            "Include carbohydrates, protein, healthy fats, fruits, and vegetables.",
            "Talk to a healthcare professional if you have concerns about your nutrition or weight."
        ];

    } else if (bmi < 25) {
        category = "Healthy-weight range";
        description =
            "Your BMI falls within the standard healthy-weight range for adults. " +
            "BMI is only one measure and does not describe your overall health.";

        tips = [
            "Enjoy regular, balanced meals.",
            "Choose a variety of foods to help meet your nutritional needs.",
            "Stay hydrated, get enough sleep, and enjoy movement that feels good."
        ];

    } else if (bmi < 30) {
        category = "Overweight";
        description =
            "Your BMI is above the standard adult healthy-weight range. " +
            "This is a screening result, not a diagnosis of your health.";

        tips = [
            "Focus on balanced meals rather than strict diets.",
            "Include a variety of nutritious foods and drink water regularly.",
            "Consider asking a healthcare professional how to interpret your result."
        ];

    } else {
        category = "Obesity range";
        description =
            "Your BMI falls within the adult obesity range. " +
            "BMI cannot determine your health on its own, so individual guidance can help.";

        tips = [
            "Build sustainable eating and daily activity habits that suit you.",
            "Avoid extreme diets or trying to change your weight quickly.",
            "Consider discussing your result with a healthcare professional for personalized guidance."
        ];
    }

    bmiValue.textContent = bmi.toFixed(2);
    bmiMessage.textContent = category;
    adviceDescription.textContent = description;

    adviceList.replaceChildren();

    tips.forEach(function (tip) {
        const item = document.createElement("li");
        item.textContent = tip;
        adviceList.appendChild(item);
    });

    resultBox.classList.remove("hidden");
});

