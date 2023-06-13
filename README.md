Yago-Challenge-Xavier
===============	

Usage

Clone the repository
---------------	

Navigate to the project directory
---------------	

```bash
cd yago
```
Install Dependencies
---------------	

```bash
bundle install
```
⚠️ If your Ruby version is different, you may need to modify the Gemfile accordingly.

Set up the Database
---------------	

```bash
rails db:create 
rails db:migrate 
rails db:seed
```
Run the Test Suite
---------------	

```bash
rspec ./spec
```
Start the Server
---------------	

```bash
rails s
```

Accessing the Frontend

In a new terminal tab, use the following command to determine the frontend path:

```bash
current_path=$(pwd) | parent_path=$(dirname "$current_path") | frontend_path="$parent_path/frontend/index.html" | echo $frontend_path
```
Copy the output from the above command and paste it into your favorite browser to access the frontend.
