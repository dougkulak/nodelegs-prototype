# Nodelegs - Robotlegs-inspired Micro-Architecture Written in Node.js

_Concept/prototype only! DO NOT USE IN PRODUCTION_

##Technologies
- Node.js
	- Express
	- Handlebars
	- Medic Injector
	- Mongoose
	- Nconf
	- Nodemailer
	- Underscore
	- Async
	- Socket.io
- Zurb Foundation
- SASS

##Git Branch Structure
This project utilizes [Git Flow](https://github.com/nvie/gitflow) to help separate development and production code.

- **develop**: Contains the latest and possibly unstable source code. All development should occur under this branch.
- **feature/featurename**: Contains the development code for unfinished or in-progress features.
- **master**: Contains the latest stable and production-ready source code.

##Folder Structure
- **/app**: The core of your application. This is where all of your models, views, controllers and commands will live.
- **/lib**: The core of the Nodelegs micro-architecture.
- **/public**: Static assets.
- **/sass**: SASS source files
- **app.js**: Entrypoint into the application.

##Notes
I started this project back in early 2012, where I successfully used it for some freelance work. I never got around
to porting my changes back to this core library, so consider this code strictly as a proof-of-concept.

NO SUPPORT PROVIDED -- USE AT YOUR OWN RISK!