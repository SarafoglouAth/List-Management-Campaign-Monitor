## List Management Campaign Monitor 

This project is a simple React and Node.js application that integrates with the Campaign Monitor API to manage subscribers. The app includes features for displaying, adding, and deleting subscribers using a CRUD table interface. It utilizes several libraries and follows a modular code structure to ensure maintainability and scalability.

## Usage 
The application allows you to manage subscribers using the CRUD table interface in the React frontend.
The backend handles API requests for getting, adding, and deleting subscribers via the Campaign Monitor API.


## Technologies Used

### Backend (Node.js):
- **express**: Web framework for building the API server.
- **express-rate-limit**: Middleware for rate limiting requests to enhance security.
- **cors**: Enables cross-origin requests, allowing the React frontend to communicate with the Node.js backend.
- **createsend-node**: SDK for interacting with the Campaign Monitor API.
- **dotenv**: For loading environment variables from a `.env` file.
- **helmet**: Enhances security by setting various HTTP headers.
- **axios**: For making HTTP requests to the Campaign Monitor API.
- **xss**: To prevent cross-site scripting (XSS) attacks by sanitizing user input.

### Frontend (React):
- **react**: Core library for building user interfaces.
- **axios**: For making HTTP requests to the Node.js backend.
- **primereact**: A UI component library to build the CRUD table.
- **primeflex**: Utility-first CSS framework for responsive layout.
- **primeicons**: Icon library used in the application.
- **Google Analytics** : Integrated for tracking user interactions. Make sure to input your Google Analytics key to activate this feature.

## Getting Started

### Prerequisites
- [Node.js and npm](https://nodejs.org/) installed . Please use Node -v 20.11.1 ! 
- Campaign Monitor API credentials (API key and List ID).
- Google Analytics key (optional but recommended for tracking).

### Installation

#### 1. Clone the repository:
```bash
git clone https://github.com/SarafoglouAth/List-Management-Campaign-Monitor.git
```

#### 2. Backend Setup:
```bash
cd List-Management-Campaign-Monitor/backend
npm install
```

#### 3. Create a .env file in the root of the backend directory with your Campaign Monitor API key and List ID:

```bash
CAMPAIGN_MONITOR_API_KEY=your_api_key_here
CAMPAIGN_MONITOR_LIST_ID=your_list_id_here
```
#### 4. Start the backend server:
```bash
npm run dev
```


#### 5. Navigate to the frontend directory and install dependencies:
```bash
cd ../frontend
npm install
```


#### 6. Add your Google Analytics key:
```bash
In the frontend, find the section where Google Analytics is integrated and input your key to activate tracking.
```

#### 7. Start the React development server:
```bash
npm run dev
```