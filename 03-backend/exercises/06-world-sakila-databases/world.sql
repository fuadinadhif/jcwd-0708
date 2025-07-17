-- 1
SELECT Name
FROM country
ORDER BY Population DESC
LIMIT 1;

-- 2
SELECT Name
FROM country
ORDER BY Population DESC
OFFSET 1
LIMIT 1;

-- 3
SELECT Name
FROM country
ORDER BY Population ASC
LIMIT 1;

-- 4 
SELECT Name
FROM country
ORDER BY Population ASC
OFFSET 2
LIMIT 1;

-- 5
SELECT Continent
FROM country
WHERE LifeExpectancy > 75
GROUP BY Continent
ORDER BY SUM(SurfaceArea) DESC
LIMIT 1;

SELECT * FROM country;