# TestingDoggos

Learn testing principles with doggos 🐶

![Automated tests](https://github.com/FilipParyz/TestingDoggos/actions/workflows/python_tests.yml/badge.svg) ![Pylint](https://github.com/FilipParyz/TestingDoggos/actions/workflows/pylint.yml/badge.svg) ![Autopep8](https://github.com/FilipParyz/TestingDoggos/actions/workflows/autopep8.yml/badge.svg)

![Python --version](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=black&label=3.12&labelColor=yellow&color=blue)
![Flask --version](https://img.shields.io/badge/Flask-3776AB%3F?style=flat&logo=flask&logoColor=black&labelColor=yellow&color=gray)
![Javascript --version](https://img.shields.io/badge/Javascript-3776AB?style=flat&logo=javascript&logoColor=yellow&labelColor=gray&color=yellow) 
![CSS --version](https://img.shields.io/badge/CSS-3776AB?style=flat&logo=css3&logoColor=black&labelColor=darkblue&color=darkorange)
![Pylint --version](https://img.shields.io/badge/Pylint-3776AB%253F?style=flat&logo=Pypi&logoColor=gray&labelColor=yellow&color=blue)

## About The Project

This project serves as a playground for learning and understanding the basics and importance of testing. It encompasses a wide range of testing methodologies, including manual and automated testing, TDD principles, code review, and optimization in terms of performance, UI, and UX. The final deliverable is a portal for an animal shelter, featuring guest and administrator modes.

### Deployment

  The project is deployed using PythonAnywhere. You can access it [here](http://testingdoggos.pythonanywhere.com/).

### Features

- **Guest Mode:**
  - View animals available for adoption.
  - Donate animal food.

- **Admin Mode\*:**
  - Monitor, add, remove, edit, and manage resources.
  - Manage animal details such as name, type, race, age, weight, health, and photo.
  - Oversee animal beds by type, amount, and occupancy.
  - Control food supplies by type and amount.

  \* *Currently, the project is in the development phase. The admin mode is not yet implemented, therefore all features should be available in guest mode.*

### Built With

- **Backend:** Python
- **Frontend:** JavaScript (Plain or Framework)

## Development

To get a local copy up and running follow these simple steps.

### Installation

1. Clone the repository
   
```bash
git clone https://github.com/your_username_/TestingDoggos.git
```
    
2. Install the required packages

```bash
pip install -r requirements.txt
```

3. Run the application

```bash
python testing_doggos.py
```

### Usage
Open the browser and go to the address: http://127.0.0.1:5000/

### Testing
To run the tests, use the following command:

```bash
  python tests.py
```