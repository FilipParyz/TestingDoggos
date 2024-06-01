from testing_doggos import app as application
import sys

project_home = '/home/testingdoggos/TestingDoggos'
if project_home not in sys.path:
    sys.path = [project_home] + sys.path

# import flask app but need to call it "application" for WSGI to work
