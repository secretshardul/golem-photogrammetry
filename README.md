# Photogrammetry (3D scanning) on Golem
An online IDE which lets you run Micmac photogrammetry workloads on Golem. Photogrammetry jobs are resource intensive and can run into hours. Golem is ideal for such batch workloads.

## Features
- Run Micmac builds online any local setup.
- Fully programmable. Look here for the entire list of commands.
- Run intense workloads on Golem cloud, without consuming local resources.
- Build results notified on email.

## Project demo
http://65.0.59.23/

Note: Ping @the.godfather on Golem Discord server or raise an issue if facing issues. Yagna daemon is unstable on EC2.

## Demo video
[![1 golem-youtube](https://user-images.githubusercontent.com/49580849/113905798-2a72a100-97f1-11eb-8365-1e080b9abbfb.png)](https://www.youtube.com/watch?v=A0-PHUgftMk)

### Photogrammetry for gaming
Chernobolyte is a sci-fi game based on 3D-Scanned Chernobyl. This game is also the inspiration for this project.

[![6-chernobolyte](https://user-images.githubusercontent.com/49580849/113909587-77587680-97f5-11eb-889d-b2048695b98c.png)](https://www.youtube.com/watch?v=vM6wGofkhxw)

https://80.lv/articles/chernobolyte-game-based-on-3d-scanned-chernobyl/

## Screenshots
### Web app
![2-app-top](https://user-images.githubusercontent.com/49580849/113908176-dfa65880-97f3-11eb-890b-f0dda6ac5988.png)

![3-app-bottom](https://user-images.githubusercontent.com/49580849/113908166-dd43fe80-97f3-11eb-983a-32ccd0febf9b.png)

### Email results
![4-success-email](https://user-images.githubusercontent.com/49580849/113908186-e1701c00-97f3-11eb-9ed4-291a15cbe4e4.png)

### Viewing generated `.ply` files in Meshlab
![5-results](https://user-images.githubusercontent.com/49580849/113908181-e03eef00-97f3-11eb-8590-6981d6f9fb30.png)

## Instructions to run locally
- Install node modules using `npm install`
- Create a `.env` file containing environment variables. This contains Sendgrid and Yagna provider keys. Copy from [`.env-template`](./.env-template) for reference.
- Start golem locally using `yagna service run`
- Open a new terminal and run `yagna payment init --sender`. Then start Node server using `npm run start:dev`
- Follow the instructions on `localhost:3000`

## Tech stack
- Golem requester and Golem Node.js SDK
- Typescript
- Express.js
- Sendgrid email service

## Limitations
- Micmac is a low-level programming framework. There is no GUI, but rather developers need to supply a shell script program and hyperparameters.
- There's no generic script for multiple scanning workloads. Developers are expected to provide the orientation data and processing instructions.

## References
- Photogrammetry: https://en.wikipedia.org/wiki/Photogrammetry
- Micmac: https://github.com/micmacIGN/micmac
- Chernobolyte: https://80.lv/articles/chernobolyte-game-based-on-3d-scanned-chernobyl/
