# MentorStream - a Web Application for Mentoring Stream Code Sessions!

This is an end-to-end full-stack web application for mentoring stream code sessions online. The application includes permissions for read-only access for the mentor, who is the first client to enter a specific code block, and editing access for students who enter the same code block.

## Technologies Used
The frontend of the application was written in Typescript using React with Redux store, services including HTTPService, and sockets using SocketIO to achieve instant updating between students and the mentor so that the mentor can watch them online.

The backend was written in Typescript using Node.js, Express.js, and MongoDB for storing data. It also includes a logger service to log events for easy debugging from deployment.

## Features
- Users can enter the code block and start coding online.
- The first user to enter the code block gets read-only access, while others get editing access.
- The mentor can watch the students' coding sessions online in real-time.
- The application includes instant updating between students and the mentor using SocketIO.
- The backend of the application uses a logger service to log events for easy debugging from deployment.
