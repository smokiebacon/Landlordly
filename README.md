# Landlordy

A web app that connects Landlord with confirmed tenants. Landlords are able to create an account, create properties, and send tenant invites.
Once an tenant accepts the invite from the landlord, the tenant is now associated with the landlord's property. The tenant can send rent payments and maintenance requests. 


[Check out Landlordly here](https://serene-chamber-98569.herokuapp.com/)

(Sending emails is in Sandbox mode, meaning can only send emails to myself currently...)




# Technology Used


* HTML
* CSS
* Javascript
*  Bootstrap
* MongoDB (NoSQL Database)
* Express
* Paypal
* Nodemailer (Email Sender) w/ Amazon Web Services SMTP
* Authentification (Bcrypt)

# Getting Started
Install and start the application by:

Forking this repository
Cloning this repository
Run npm install
Run node
Once the application has started, user can create an account as a landlord.

# User Stories
User Profile
As a LANDLORD, user should be able to:
Reach the landing page and see options to "Register" and "Log in"
Create a user profile by selecting "Register"
View the login form by selecting "Log in"
Be directed to their personal profile after successfully logging in or registering
On their private profile, see nav bar of:
My Properties, Maintence Requests, Payments (incomplete), Logout


# CRUD Actions
Landlord user should be able to...
Create a new property. Edit property info. Delete a property. Add a new tenant by invite only. Delete a tenant.
View a property and its maintenence requests, if any.

Tenant should be able to...
Pay rent via Paypal.
Submit Maintence Requests.
Edit Tenant info (incomplete).
Tenant should NOT be able to delete oneself. Landlord has that power.


# Wireframe

Home Page
![Image of Pic](https://i.imgur.com/ZaHYJXD.png)
![Imgur](https://i.imgur.com/i0SncmA.png)
![Imgur](https://i.imgur.com/JzVYs9s.png)
![Imgur](https://i.imgur.com/vkyQBVa.png)




Challenges:
Linking and comprehending 2 models was extremely difficult.

# Unsolved Problems
Nav bar header for Landlord and Tenant is unorganized and user-unfriendly. 

Once tenant is invited and tenant signed up for an account, tenant cannot edit their profile info.

Deleting the property with tenants inside does NOT delete the tenant within the database.


Sending emails to real users costs real money. This prototype only can send real emails to myself for demonstration purposes.





# Next Steps


* No Pictures; add some neat pictures.
* Perhaps connect to a Real Estate API to populate property images, info (# of beds, bathrooms, sqft, etc)
* Make nav bars for landlord/tenant
* Hide registration/login form if logged in
* Maintence form doesn't quite work well. Add ability to edit work order on Tenant Page. 
* In Landlord Page, ability to check off a work order as in progress or completed.
* Payments: link up Bank accounts for both Landlord and Tenants.







