# TestingDoggos
Learn testing principles with doggos 🐶

This project is playground for learning and understanding the basics and importance of testing.
Including but not limited to manual and automated testing, TDD principles, code review, and optimization in terms of performance, UI and UX.
The end result will be a portal for an animal shelter, with guest and administrator modes.
Guest mode will allow user to:
- view animals available for adoption
- donate animal food
Admin view will allow user to:
- monitor, add, remove, edit and otherwise manipulate resources:
  - animals:
    - name
    - type
    - race
    - age
    - weight
    - health
    - photo
  - animal beds
    - type
    - amount
    - occupied
  - food
    - type
    - amount

Backend of the application will be written in Python. The frontend will be written using Javascript (Plain or using a framework).
All of the implemented interfaces should allow for testing.

The project is an assignment for a subject "Testing and code optimizaiton" in the University of Economics in Katowice.

## Installation

1. Clone the repository
2. Install the required packages

```bash
  pip install -r requirements.txt
```

3. Run the application

'''bash
  python TestingDoggos.py
'''

## Usage
Open the browser and go to the address:

'''bash
http://127.0.0.1:5000/
'''

## Testing
To run the tests, use the following command:

'''bash
python test_TestingDoggos.py
'''