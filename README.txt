#  Founder Comics (POC)

*An internship proof-of-concept demonstrating frontend development, backend APIs, database integration, and object storage.*
---

##  Project Journey & Deliverables (Full History)

This project was built from scratch as part of an internship. Below is the complete journey of the project and the work delivered.

### Phase 1: Foundation & Project Setup

* [x] **Frontend Foundation**: React JS application set up using **Vite**
* [x] **Backend Foundation**: Backend structured using **FastAPI (Python)** and **Node.js**
* [x] **Project Structure**: Clear separation of frontend and backend directories
* [x] **Version Control**: Git-based project structure suitable for GitHub submission

### Phase 2: Backend & Database Layer

* [x] **MySQL Database Integration**:

  * Database connection configured
  * Tables and schemas defined
  * CRUD operations implemented
* [x] **Backend APIs**:

  * API endpoints created using FastAPI
  * Request/response schemas implemented
  * API testing via Swagger UI (`/docs`)

### Phase 3: Object Storage & File Handling

* [x] **MinIO Integration**:

  * MinIO configured as object storage
  * Image upload functionality implemented
  * Storage handled separately from database
* [x] **Docker Usage**:

  * MinIO container managed using Docker
  * Health and logs verified via Docker commands

---

##  Key Features

###  Image Upload & Storage

* Image uploads handled via backend APIs
* Images stored using **MinIO object storage**
* Docker-based local storage environment

###  Database Management

* **MySQL** used for structured data storage(stores structured data & file metadata)
* CRUD operations handled through backend logic


---

##  Tech Stack

### Frontend Application

* **Framework**: React JS
* **Build Tool**: Vite
* **Languages**: JavaScript, HTML, CSS

### Backend Services

* **API Framework**: FastAPI (Python)
* **Runtime**: Node.js
* **Database**: MySQL
* **Object Storage**: MinIO

### Infrastructure

* **Containerization**: Docker

---

##  Prerequisites

Before running the project locally, ensure the following tools and software are installed on your system:

* **Node.js** (v16 or above)
* **npm** (comes with Node.js)
* **Python** (v3.9 or above)
* **Docker Desktop** (required for running MinIO containers)
* **MySQL** (local installation or Docker-based)
* **VS Code** (or any preferred code editor)

These prerequisites are necessary to run the frontend, backend, database, and object storage services smoothly.

---

##  Getting Started (VS Code – Local Setup)

Follow the steps below in the **VS Code terminal** to run the project locally.

###  Start the Frontend (React + Vite)

```
cd comic-generator
npm install
npm run dev
```

* Starts the frontend development server
* Access the app using the URL shown in the terminal (`http://localhost:5173`)

Stop the frontend:

```
Ctrl + C
```

---

###  Start the Backend (FastAPI)

```
cd ..
cd Backend/Backend
npm install
```

Run the backend server:

```
python main.py
```

OR (recommended during development):

```
python -m uvicorn main:app --reload
```

* Backend URL: `http://127.0.0.1:8000`
* API Documentation:

  ```
  http://127.0.0.1:8000/docs
  ```

Stop the backend:

```
Ctrl + C
```

---

###  Start MinIO (Docker)

Check running containers:

```
docker ps
```

Start the MinIO container:

```
docker start minio
```

Check MinIO logs / health:

```
docker logs minio
```

Access MinIO Console:

```
http://localhost:9001
```

---

##  Project Structure Map

```
COMIC-GENERATOR/
├── Backend/
│   ├── crud.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── main.py
│   ├── index.js
│   ├── upload.js
│   ├── minio_client.js
│   └── package.json
│
├── comic-generator/          # React + Vite Frontend
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── README.md
└── .gitignore
```

---

##  Project Purpose

This project was developed to:

* Work with **MySQL databases**
* Gain experience with **MinIO object storage**
* Fulfill **internship requirements**

---

##  Disclaimer

This project is a **Proof of Concept (POC)** created for internship purposes.
