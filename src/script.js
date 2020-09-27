const get_meal_btn = document.getElementById(`get_meal`);
const meal_container = document.getElementById(`meal`);

// console.log(get_meal_btn);
//console.log(meal_container);

get_meal_btn.addEventListener(`click`, () => {
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((res) => {
      createMeal(res.meals[0]);
    })
    .catch((e) => {
      console.warn(e);
    });
});

const createMeal = (meal) => {
  const ingredients = [];

  // Get all ingredients from the object. Up to 20
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      // Stop if there are no more ingredients
      break;
    }
  }

  const newInnerHTML = `
		<div class="card mb-3">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="Meal Image">
        <div class="card-body">
        
				${
          meal.strCategory
            ? `<p class="card-text"><strong>Category:</strong> ${meal.strCategory}</p>`
            : ""
        }
				${
          meal.strArea
            ? `<p class="card-text"><strong>Area:</strong> ${meal.strArea}</p>`
            : ""
        }
				${
          meal.strTags
            ? `<p class="card-text"><strong>Tags:</strong> ${meal.strTags
                .split(",")
                .join(", ")}</p>`
            : ""
        }
        </div>
        <h5 class="card-titel">Ingredients:</h5>
        <div class="card-text">
				<ul>
					${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
        </ul>
        </div>
			<div class="columns seven">
				<h4 class="card-titel">${meal.strMeal}</h4>
				<p class="card-text">${meal.strInstructions}</p>
			</div>
		</div>
		${
      meal.strYoutube
        ? `
		<div class="card mb-3">
			<h5 class="card-titel">Video Recipe</h5>
			<div class="videoWrapper">
				<iframe width="420" height="315"
				src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
				</iframe>
			</div>
		</div>`
        : ""
    }
	`;

  meal_container.innerHTML = newInnerHTML;
};
