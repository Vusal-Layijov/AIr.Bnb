# AirBnB Clone
Air-we is Airbnb.com clone project.  Users can log in, sign-up, create bookings for vacation rentals, apartment rentals, hostel, hotel rooms and add reviews to spots. 

## Deployed Live Link

[Air-we](https://air-we.onrender.com)

## Built with
* Express,JavaScript,Sequelize
* React,Redux

## Database Schema Design

![airbnb-dbdiagram]

[airbnb-dbdiagram]: ./assets/airbnb_dbdiagram.png

* Sequelize Dependencies

   * bcryptjs@^2.4.3
   * cookie-parser@^1.4.6
   * cors@^2.8.5
   * csurf@^1.11.0
   * dotenv@^16.0.3
   * express@^4.18.2
   * express-async-errors@^3.1.1
   * express-validator@^6.14.2
   * helmet@^6.0.1
   * jsonwebtoken@^9.0.0
   * morgan@^1.10.0
   * per-env@^1.0.2
   * pg@^8.8.0
   * sequelize@^6.28.0
   * sequelize-cli@^6.5.2
   * dotenv-cli@^7.0.0
   * nodemon@^2.0.20



* React Dependencies

   * @fortawesome/fontawesome-svg-core: ^6.4.0
   * @fortawesome/free-regular-svg-icons: ^6.4.0
   * @fortawesome/free-solid-svg-icons: ^6.4.0
   * @fortawesome/react-fontawesome: ^0.2.0
   * @testing-library/jest-dom: ^5.16.5
   * @testing-library/react: ^11.2.7
   * @testing-library/user-event: ^12.8.3
   * js-cookie: ^3.0.1
   * markerwithlabel: ^2.0.2
   * react: ^18.2.0
   * react-datepicker: ^4.11.0
   * react-dom: ^18.2.0
   * react-redux: ^8.0.5
   * react-router-dom: ^5.3.4
   * react-scripts: 5.0.1
   * redux: ^4.2.1
   * redux-logger: ^3.0.6
   * redux-thunk: ^2.4.2
   * save: ^2.9.0


## MVP Core Features

* Users

	* Create, Read

* Spots

	* Create, Read, Update, Delete

* Bookings

	* Create, Read, Delete

* Reviews

	* Create, Read, Update, Delete

* Google Map API

	* Read

## Future Implementation Goals

- [ ] Add chat functionality

- [ ] Add AWS S3 

## Getting Started

After you clone this project, you will need to follow the next steps:

1. Install dependencies by running npm install using the package.json file
      ```bash
      npm install
      ```

2. Create a .env file based on your environments.

   This file should include:
   * A secret key for your app
   * Database configuration, including the database name, username, password, and host.
   * You can run the sequelize commands to migrate the database and seed data by running the following commands:

   ```bash
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```
3. You can start the application by running the following command:

   ```bash
   Copy code
   npm start
   ```
   Note: If you want to run the application in development mode, you can use the command npm run start:development. Similarly, to run the application in production mode, use the command npm run start:production.

4. In order to run the React App, run the following commands

	```bash
	cd react-app
	```

	```bash
	npm install
	```

	```bash
	npm start
	```


## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## Contact

Vusal Layijov - https://github.com/Vusal-Layijov

