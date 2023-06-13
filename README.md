Yago-Challenge-Xavier
===============	

Backend
---------------	

#### Clone the repository


#### Navigate to the project directory
	

```bash
cd yago
```
#### Install Dependencies


```bash
bundle install
```
⚠️ If your Ruby version is different, you may need to modify the Gemfile accordingly.

#### Set up the Database


```bash
rails db:create 
rails db:migrate 
rails db:seed
```
#### Run the Test Suite


```bash
rspec ./spec
```
#### Start the Server


```bash
rails s
```

Frontend
---------------

In a new terminal tab, use the following command to determine the frontend path:

```bash
current_path=$(pwd) | parent_path=$(dirname "$current_path") | frontend_path="$parent_path/frontend/index.html" | echo $frontend_path
```
Copy the output from the above command and paste it into your favorite browser to access the frontend.


Additional informations
--------------

I used a a Rails backend API mode, a bit over killed for this project but easier in order to implement the mailing logic.  

I did a basic HTML front with some JS to handle HTTP requests and page rendering.  

I had some hard time hosting the project while my friend Heroku stop the free plan, so I spent hours (and hours, and hours ...) configuring a google cloud VM machine running on Debian with a Puma server and Apache as reverse proxy, some devops skills are always usefull :). 

Unfortunatly no way to optain an SSL certificate and no frontend hosters accept outgoing http request ...  

About the features, some dynamic advices are given during the form and when the quote in rendered, a mail is sent when a quote is created (with an SMTP server).  

it's possible to retreive the quote with the link in the mail (a token linked to the quote is passed), or directly with the IP (probably not legal but super efficient ;) ). 

All required information are stored in some diffentent tables associated to the users table (quotes, ip_adresses, addresses). 


Enjoy the warm days !  
