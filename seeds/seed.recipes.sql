BEGIN;

INSERT INTO recipes_table (title, content, meal, is_vegan, img)
VALUES ('Fluffy Almond Breeze Blueberry Pancakes',
'{"1 cup all-purpose flour",
"2 tablespoons granulated sugar",
"¼ teaspoon salt",
"1 teaspoon baking powder",
"½ teaspoon baking soda",
"1 large egg",
"1 teaspoon lemon juice",
"½ cup Almond Breeze Unsweetened Vanilla almondmilk",
"2 tablespoons vegetable oil",
"½ cup fresh blueberries, or more to taste"}', 'breakfast', false, 'img'),




('Sweet Hot Mustard Chicken Thighs',

'{"8 large bone-in, skin-on chicken thighs",
"½ cup Dijon mustard",
"¼ cup packed brown sugar",
"¼ cup red wine vinegar",
"1 teaspoon dry mustard powder",
"1 teaspoon salt",
"1 teaspoon freshly ground black pepper",
"½ teaspoon ground dried chipotle pepper",
"1 pinch cayenne pepper, or to taste",
"4 cloves garlic, minced",
"1 onion, sliced into rings",
"2 teaspoons vegetable oil, or as needed"}',

'lunch', false, 'img'),


('Fluffy Almond Breeze Blueberry Pancakes',
'{"1 cup all-purpose flour",
"2 tablespoons granulated sugar",
"¼ teaspoon salt",
"1 teaspoon baking powder",
"½ teaspoon baking soda",
"1 large egg",
"1 teaspoon lemon juice",
"½ cup Almond Breeze Unsweetened Vanilla almondmilk",
"2 tablespoons vegetable oil",
"½ cup fresh blueberries, or more to taste"}', 
'dinner', false, 'img'),



('Sweet Hot Mustard Chicken Thighs',

'{"8 large bone-in, skin-on chicken thighs",
"½ cup Dijon mustard",
"¼ cup packed brown sugar",
"¼ cup red wine vinegar",
"1 teaspoon dry mustard powder",
"1 teaspoon salt",
"1 teaspoon freshly ground black pepper",
"½ teaspoon ground dried chipotle pepper",
"1 pinch cayenne pepper, or to taste",
"4 cloves garlic, minced",
"1 onion, sliced into rings",
"2 teaspoons vegetable oil, or as needed"}',

'dinner', false, 'img'),




('Ultimate Tofu Breakfast Burrito Bowls',
'{
"3 tablespoons olive oil, divided",
"1 (14 ounce) package extra-firm tofu, drained",
"½ teaspoon salt",
"black pepper to taste",
"1 ½ teaspoons onion powder",
"1 ½ teaspoons garlic powder",
"½ teaspoon ground turmeric",
"1 tablespoon fresh lemon juice",
"1 tablespoon olive oil",
"1 cup finely diced red onion",
"2 jalapeno peppers, seeded and chopped",
"½ teaspoon salt",
"3 cloves garlic, minced",
"2 cups chopped tomatoes",
"1 ½ teaspoons cumin",
"¼ cup chopped fresh cilantro",
"1 tablespoon fresh lemon juice",
"1 (15.5 ounce) can no-salt-added black beans, drained and rinsed",
"1 ½ cups cooked hash brown potatoes",
"1 avocado - peeled, pitted and sliced ",
"1 teaspoon fresh lemon juice",
"¼ cup chopped fresh cilantro",
"1 teaspoon hot sauce, or to taste"}', 
'breakfast', true, 'img'),


('Couscous with Olives and Sun-Dried Tomato', '{
"1 ¼ cups vegetable broth",
"1 ¼ cups water",
"2 cups pearl (Israeli) couscous",
"1 pinch salt",
"1 pinch ground black pepper",
"5 tablespoons olive oil, divided",
"½ cup pine nuts",
"4 cloves garlic, minced",
"1 shallot, minced",
"½ cup sliced black olives",
"⅓ cup sun-dried tomatoes packed in oil, drained and chopped",
"1 cup vegetable broth",
"¼ cup chopped fresh flat-leaf parsley"
}', 'lunch', true, 'img'),


('Egyptian Meatballs',
'{
"2 pounds leeks, trimmed and outer leaves removed",
"1 pound ground beef",
"1 cup white bread crumbs",
"2 eggs",
"salt and ground black pepper to taste",
"1 tablespoon olive oil",
"¾ cup water, or as needed",
"1 tablespoon lemon juice",
"1 tablespoon butter"}', 'lunch', false, 'img'),


('One-Pot Moroccan Shrimp Tagine', '{
"3 tablespoons olive oil",
"4 large carrots, chopped",
"1 large sweet onion, diced",
"1 large russet potato, peeled and diced",
"1 red bell pepper, thinly sliced",
"½ cup pitted Kalamata olives, sliced",
"2 tablespoons minced garlic",
"2 teaspoons ginger paste",
"2 large tomatoes, coarsely chopped",
"½ cup chopped fresh cilantro",
"1 tablespoon dried parsley",
"2 teaspoons ground cumin",
"2 teaspoons seasoned salt",
"1 (1.41 ounce) package sazon seasoning with saffron (such as Goya® Azafran)",
"1 teaspoon paprika",
"1 teaspoon ground turmeric",
"1 teaspoon lemon juice",
"½ teaspoon cayenne pepper",
"½ teaspoon ground black pepper",
"1 bay leaf",
"1 pound uncooked medium shrimp, peeled and deveined"}',
'lunch', false, 'img');





INSERT INTO recipes_users (user_name, full_name, password)
VALUES
  ('dunder', 'Dunder Mifflin', null, 'password'),
  ('b.deboop', 'Bodeep Deboop', 'Bo', 'bo-password'),
  ('c.bloggs', 'Charlie Bloggs', 'Charlie', 'charlie-password'),
  ('s.smith', 'Sam Smith', 'Sam', 'sam-password'),
  ('lexlor', 'Alex Taylor', 'Lex', 'lex-password'),
  ('wippy', 'Ping Won In', 'Ping', 'ping-password');


COMMIT;

