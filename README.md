# Bit Casino -- Frontend

> [!NOTE]
> This app is under active development

A **React** application written in **TypeScript** serving as the frontend for **Bit Casino** - a virtual gambling simulator. The app is containerized using **Docker**.

## How to use this repository

To run this app on its own, you can clone this repository and run it locally using `npm run dev`. Running it this way will simulate API calls so that you can see the various parts of the app.

```bash
git clone http://github.com/b1gd3vd0g/bit-casino-frontend.git bit-casino-frontend
cd bit-casino-frontend
npm run dev
```

Better yet, to run the entire Bit Casino ecosystem locally, follow the instructions in the [Infrastructure](https://github.com/b1gd3vd0g/bit-casino-infra) repository to run the entire system locally using **Docker Compose**.

## Functionality

The frontend is still under active development, and is catching up with the
backend services.

At this point, the player can:

- Create an account, and then sign into that account to get to the home page.
- See their username, current balance, and daily bonus/streak information.
- Claim their daily bonus once per UTC day (5:00pm PST)

## Coming Soon

- The functionality to spend earned bits at the custom slot machine, **Byte Builder**.
- A live production deployment where players can play Bit Casino online.

## Related Repositories

- [Player Microservice](https://github.com/b1gd3vd0g/bit-casino-player-ms) - Handles account creation and player authentication.
- [Currency Microservice](https://github.com/b1gd3vd0g/bit-casino-currency-ms) - Handles bit wallet creation and safe transactions.
- [Reward Microservice](https://github.com/b1gd3vd0g/bit-casino-reward-ms) - Handles daily bonus claims and streaks.
- [Slots Microservice](https://github.com/b1gd3vd0g/bit-casino-slots-ms) - Handles the backend for the custom slot machine game, **Byte Builder**
- [Infrastructure](https://github.com/b1gd3vd0g/bit-casino-infra) - Allows for integration testing using docker compose.
