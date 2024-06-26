# VerifEye

This repository contains **VerifEye**, an application designed to help users determine the veracity of a given statement. The application is built with a ReactJS frontend and a Flask backend. The backend processes the fact-checking and provides the confidence level of the provided fact, and if the fact is false, it provides a counter-narrative.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Fact Verification**: Check if a given statement is true or false.
- **Confidence Level**: Get the confidence level of the provided fact.
- **Counter-Narrative**: If the fact is false, receive a counter-narrative explaining why.

## Installation

### Backend Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/verifeye.git
    cd verifeye/backend
    ```

2. Create a virtual environment and activate it:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install the required packages:
    ```bash
    pip install -r requirements.txt
  ```
4. Run the backend server:
    ```bash
    python app.py
    ```

### Frontend Setup
1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```

2. Install the required packages:
    ```bash
    npm install
    ```

3. Start the React development server:
    ```bash
    npm run dev
    ```

## Usage
1. Ensure both the backend and frontend servers are running.
2. Open your web browser and navigate to url provided.
3. Enter a statement in the input field and submit to check its veracity.
4. View the results including the confidence level and any counter-narratives if the statement is false.

## Contributing
We welcome contributions to VerifEye! To contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Thank you for using VerifEye! If you have any questions or feedback, please open an issue or contact the repository owner.
