# Tourism-System

- A system that helps the user to create a trip that matches his preferences like budget, number of people, number of days, preferred places(natural, night, shopping, old), and preferred types of food (seafood, fine dining, etc).
- The generated trip has the shortest possible path, this was implemented using Dijkstra's algorithm.
- The system also has a recommender system that uses content-based filtering to recommend places to the user.
- This was my graduation project from Damascus University's Department of Computer Engineering.

### Back-end done by [Mosaab Dayoub](https://github.com/MosaabDayoub)

## Prerequisites
Before you begin, ensure you have the following installed:
- [Python](https://www.python.org/downloads/)
- [PHP](https://www.php.net/downloads)
- [Nodejs](https://nodejs.org/en/download)
- [Vite](https://vitejs.dev/guide/)

## Getting Started

### Running the Flask Server
To run the Flask server, follow these steps:

```bash
cd Recommendation-system
python -3 -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
flask run
```

### Running the Laravel Server
To run the Laravel server, follow these steps:

```bash
cd Back-end
composer install
php artisan serve
```

### Running the Vite Server
To run the Vite server, follow these steps:

```bash
cd Front-end
npm install
npm run dev
```
Now open your browser on http://localhost:5173 and you should see the website working.


