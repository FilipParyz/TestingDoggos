import time
import os
from git import Repo

# Function to check for changes and download them


def check_and_download_changes():
    # Get the current commit hash
    current_commit = repo.head.commit

    # Fetch the latest changes from the remote repository
    repo.remotes.origin.fetch()

    # Get the updated commit hash
    updated_commit = repo.head.commit

    # Check if there are any new changes
    if current_commit != updated_commit:

        # Pull the latest changes from the remote repository
        repo.remotes.origin.pull()

        # Print a message indicating that changes have been downloaded
        print('Changes downloaded successfully')

    else:
        # Print a message indicating that no changes were found
        print('No changes found')


if __name__ == '__main__':
    # Get the current directory
    current_dir = os.getcwd()

    # Initialize a Git repository object
    repo = Repo(current_dir)

    while True:
        # Run the check_and_download_changes function
        check_and_download_changes()

        # Sleep for 60 seconds before checking for changes again
        time.sleep(60)
