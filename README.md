### Esit Project - Giulia Cerniglia, Alessandro Turnu
# Meeting Rooms (2)

## 🔧  Prerequisites
- [Install and set up a local programming environment for Python 3](https://www.digitalocean.com/community/tutorial_series/how-to-install-and-set-up-a-local-programming-environment-for-python-3)
- [Install Node.js](https://nodejs.org/en/)

---

## 🏃‍ Run
Open and terminal and navigate your file system until the root of the project. 
###  · Frontend
```sh
cd frontend
npm install
npm start
```
The fronted will run on `localhost:3000`

### · Backend
To start the server open another terminal and step into the root of the project, then run the following commands:
```sh
cd backend 
```
then activate your python virtual environment `pipenv shell` then run:
```sh
python manage.py runserver
```
The backend server will run on `localhost:8000`

---


## 🔧 Technologies Used 
- Frontend
  - React.js 
  - Bootstrap (css)
  - Reactstrap (css)
  - Axios (to fetch requests to the backend)
- Backend
  - Django
  - Built-in Django database
  - djangorestframework (to use Rest APIs in Django)
  - django-cors-headers (to use JSON format in communication)
  - [Google Calendar APIs](https://developers.google.com/calendar/api/v3/reference) 

---


### 🐱 Utils 🐱
- [Tutorial used to build the basic configuration (Django & React)](https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react)
- [Timezones List](https://stackoverflow.com/a/59515559)
- [Google Calendar official APIs](https://developers.google.com/calendar/api/v3/reference) 
- [Google Calendar APIs YouTube Tutorials](https://www.youtube.com/playlist?list=PL3JVwFmb_BnTO_sppfTh3VkPhfDWRY5on)
