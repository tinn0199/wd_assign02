COS10005 Web Development - Assignment 2
Tinn Kuljittiprasit 105281509

Concept
----------------------------

Famtime, a shortened version of "Family Time", 
the website used the colour green and orange together reflects the warmth when eating with family


Structure: HTML (5 files), CSS (1 file), Javascript (1 file)
----------------------------

-> index.html - Home page
-> restaurants.html - 6 restaurants
-> recommendations.html - Recommendation form based on user preferences
-> register.html - User registration form
-> reservation.html - Table reservation form

-> css/stylesheet.css - Adds colours and interactions for the websites

-> js/script.js - Validates the form within the website

-> images/ - all images used in the assignment (Free images from Pexels)

-> fonts/ - all fonts used in the assignment (Boska, Sukhumvit)


Validation Logic
----------------------------

Registration Form : User will be asked to fill a form to create an account, user needs to sign up first so they can reserve a table.

-> All fields must not be empty
-> Username must be at least 5 characters, letters/numbers/underscores only
-> Email must contain an @ symbol
-> Phone must be digits only
-> Password must be at least 10 characters and include an uppercase letter, lowercase letter, number, and special character
-> Confirm password must match password
-> A gender option must be selected
-> At least one dietary preference must be selected
-> Country must be selected

Reservation Form: User will be asked to fill a form and pay a deposit before reserve a table, but before that user needs to sign up first.

-> All required fields must not be empty (fields that marked with *)
-> Email must contain an @ symbol
-> Phone must be at least 10 digits
-> Number of people must be greater than 0
-> Reservation date cannot be in the past
-> A payment method must be selected
-> If user chooses online payment, Visa or Mastercard must be 16 digits, but American Express must be 15 digits
-> Billing email must contain an @ symbol

Recommendation Page: User selects dietary preference, budget range, and dining occasion and it'll show the restaurant the match the preferences


Limitations
---------------------------
- Registration does not connect to a real database, front-end only
- Users are required to register/sign up before making a reservation


Github
---------------------------
https://github.com/tinn0199/wd_assign02

