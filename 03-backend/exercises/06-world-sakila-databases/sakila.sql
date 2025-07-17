-- 1
SELECT country_id, country
FROM country
WHERE country IN ('China', 'Bangladesh', 'India');

SELECT country_id, country
FROM country
WHERE country = 'China' OR country = 'Bangladesh' OR country = 'India';

-- 2
SELECT first_name, last_name
FROM actor
WHERE last_name LIKE '%OD%'
ORDER BY first_name, last_name;

-- 3
ALTER TABLE actor
ADD COLUMN middle_name VARCHAR(15);

-- 4
SELECT last_name, COUNT(last_name)
FROM actor
GROUP BY last_name
HAVING COUNT(last_name) >= 2;

-- 5
SELECT staff.first_name, staff.last_name, address.address
FROM staff
RIGHT JOIN address ON staff.address_id = address.address_id;

SELECT * FROM staff;
SELECT * FROM address;

-- 6
SELECT * FROM film;
SELECT * FROM inventory;

SELECT COUNT(*)
FROM inventory
WHERE film_id = (
  SELECT film_id
  FROM film
  WHERE title ILIKE 'Hunchback Impossible'
);

-- 7
SELECT * FROM film;
SELECT * FROM rental;

SELECT film.title, COUNT(*) AS total_rent
FROM film
JOIN inventory ON  film.film_id = inventory.film_id
JOIN rental ON inventory.inventory_id = rental.inventory_id
GROUP BY film.title
ORDER BY total_rent DESC;

-- 8
SELECT * FROM store;
SELECT * FROM address;
SELECT * FROM city;
SELECT * FROM country;

SELECT store.store_id, city.city, country.country
FROM store
JOIN address ON store.address_id = address.address_id
JOIN city ON address.city_id = city.city_id
JOIN country ON city.country_id = country.country_id;

-- 9
SELECT actor.first_name, actor.last_name
FROM actor
JOIN film_actor ON actor.actor_id = film_actor.actor_id
JOIN film ON film_actor.film_id = film.film_id
WHERE LOWER(film.title) = LOWER('Alone Trip');

SELECT actor.first_name, actor.last_name
FROM actor
WHERE actor.actor_id IN (
  SELECT film_actor.actor_id
  FROM film_actor
  JOIN film ON film_actor.film_id = film.film_id
  WHERE title ILIKE 'Alone Trip'
);

-- 10
ALTER TABLE actor
DROP COLUMN middle_name;