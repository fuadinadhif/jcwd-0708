-- =================================================================
-- ONLINE STORE DATABASE DESIGN
-- =================================================================

-- Create the database
CREATE DATABASE online_store;
USE online_store;

-- =================================================================
-- TABLE CREATION
-- =================================================================

-- 1. Customers Table
CREATE TABLE customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    city VARCHAR(50) NOT NULL
);

-- 2. Products Table
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50) NOT NULL
);

-- 3. Orders Table
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    order_date DATE NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- 4. Order Details Table (Junction table for orders and products)
CREATE TABLE order_details (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- =================================================================
-- SAMPLE DATA INSERTION
-- =================================================================

-- Insert sample customers
INSERT INTO customers (name, email, city) VALUES
('Alice', 'alice@mail.com', 'Jakarta'),
('Bob', 'bob@mail.com', 'Bandung'),
('Charlie', 'charlie@mail.com', 'Surabaya'),
('John', 'john@mail.com', 'Jakarta'),
('Joko', 'joko@mail.com', 'Yogyakarta');

-- Insert sample products
INSERT INTO products (name, price, category) VALUES
('Laptop', 3000000, 'Electronics'),
('Headphones', 100, 'Electronics'),
('Book', 50000, 'Stationery'),
('Tumblr', 25000, 'Stationery'),
('Mouse', 200, 'Electronics');

-- Insert sample orders
INSERT INTO orders (customer_id, order_date) VALUES
(1, '2024-06-01'),  -- Alice's order
(2, '2024-06-03'),  -- Bob's order
(4, '2024-06-01'),  -- John's order
(1, '2024-06-05'),  -- Alice's second order
(2, '2024-06-07');  -- Bob's second order

-- Insert sample order details
INSERT INTO order_details (order_id, product_id, quantity) VALUES
(1, 1, 1),  -- Alice ordered 1 Laptop
(1, 3, 2),  -- Alice ordered 2 Books
(2, 2, 2),  -- Bob ordered 2 Headphones
(3, 1, 1),  -- John ordered 1 Laptop
(4, 2, 1),  -- Alice ordered 1 Headphones
(5, 3, 3);  -- Bob ordered 3 Books

-- =================================================================
-- SQL PRACTICE EXERCISES - SOLUTIONS
-- =================================================================

-- 1. Show all customer data
SELECT id, name, email, city 
FROM customers;

-- 2. Show names and cities of customers from Jakarta
SELECT id, name, city 
FROM customers 
WHERE city = 'Jakarta';

-- 3. List all products above Rp.100
SELECT id, name, price 
FROM products 
WHERE price > 100;

-- 4. Count the total number of products
SELECT COUNT(*) as total_products 
FROM products;

-- 5. Show all orders (with customer name and order date)
SELECT o.id as order_id, c.name as customer_name, o.order_date
FROM orders o
JOIN customers c ON o.customer_id = c.id;

-- 6. Show customer names with their order date and the product they buy
SELECT c.name, o.order_date, p.name as product
FROM customers c
JOIN orders o ON c.id = o.customer_id
JOIN order_details od ON o.id = od.order_id
JOIN products p ON od.product_id = p.id;

-- 7. Show products that have been ordered with the ordered quantity
SELECT p.name, SUM(od.quantity) as quantity
FROM products p
JOIN order_details od ON p.id = od.product_id
GROUP BY p.id, p.name;

-- 8. Show total price for each order
SELECT o.id as order_id, SUM(p.price * od.quantity) as total_amount
FROM orders o
JOIN order_details od ON o.id = od.order_id
JOIN products p ON od.product_id = p.id
GROUP BY o.id;

-- 9. Show how many orders each customer made
SELECT c.name, COUNT(o.id) as total_orders
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name
HAVING COUNT(o.id) > 0;

-- 10. Show the most expensive product
SELECT id as product_id, name, price
FROM products
WHERE price = (SELECT MAX(price) FROM products);

-- 11. Show all products and whether they have been ordered or not
SELECT p.name,
       CASE 
           WHEN od.product_id IS NOT NULL THEN 'Ordered'
           ELSE 'Not ordered'
       END as status
FROM products p
LEFT JOIN order_details od ON p.id = od.product_id
GROUP BY p.id, p.name;

-- 12. Show average price for each product category
SELECT category, AVG(price) as average_price
FROM products
GROUP BY category;

-- 13. Show customers who never made an order
SELECT c.id as customer_id, c.name
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.id IS NULL;

-- 14. Show total quantity sold per product
SELECT p.name, COALESCE(SUM(od.quantity), 0) as total_sold
FROM products p
LEFT JOIN order_details od ON p.id = od.product_id
GROUP BY p.id, p.name
HAVING SUM(od.quantity) > 0;

-- 15. Show the top spending customer
SELECT c.name, SUM(p.price * od.quantity) as total_spent
FROM customers c
JOIN orders o ON c.id = o.customer_id
JOIN order_details od ON o.id = od.order_id
JOIN products p ON od.product_id = p.id
GROUP BY c.id, c.name
ORDER BY total_spent DESC
LIMIT 1;

-- =================================================================
-- ADDITIONAL USEFUL QUERIES
-- =================================================================

-- View all tables structure
DESCRIBE customers;
DESCRIBE products;
DESCRIBE orders;
DESCRIBE order_details;