# NestJS Wikipedia API Proxy

This project is a **NestJS** API that serves as a proxy for the **Wikipedia Featured Content API** and includes translation functionality using the **LibreTranslate API**. The API fetches featured content from Wikipedia for a specific date and allows translation of content into different languages.

## Project Overview

This project contains two main functionalities:
1. **Wikipedia Featured Content Proxy**: Fetches featured content from the Wikipedia API based on a date.
2. **Translation of Featured Content**: Uses the LibreTranslate API to translate the fetched Wikipedia content into a specified language.

### Endpoints:

- **GET `/feed`**: Fetch featured content for a given date and language.
- **GET `/feed/translate/:language`**: Fetch and translate featured content for a given date into the specified language.

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **Axios**: For making HTTP requests to the Wikipedia and LibreTranslate APIs.
- **TypeScript**: For static typing and better developer experience.
- **Jest**: For unit testing.

## Prerequisites
docker pull libretranslate/libretranslate
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **LibreTranslate API**: You can either use a self-hosted LibreTranslate instance or an external service.
## API Endpoints

The backend service acts as a proxy for Wikipedia's Featured Content API and offers translation functionality using the LibreTranslate API.

### Get Featured Content

Fetches featured content from Wikipedia for a specific date and language.

- **URL**: `/feed`
- **Method**: `GET`
- **Query Parameters**:
  - `date`: The date for which to fetch the featured content in `YYYY/MM/DD` format.
  - `language`: The language code (e.g., `en` for English, `es` for Spanish).

#### Example Request

```bash
"/feed?date=2024/09/10&language=en"
```
## External Services
LibreTranslate API Locally via Docker
Using Docker is the easiest way to run LibreTranslate locally. Here's how you can set it up:

**Step 1: Install Docker**
If you don’t have Docker installed, you can download and install it from Docker's official website.

**Step 2: Pull and Run the LibreTranslate Docker Image**
Run the following commands to pull and run the LibreTranslate image
```bash
## Pull from DockerHub
docker pull libretranslate/libretranslate
## Run libre translate
docker run -d -p 5000:5000 libretranslate/libretranslate

```
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **LibreTranslate API**: You can either use a self-hosted LibreTranslate instance or an external service.

## Environment Variables

To configure the Wikipedia and LibreTranslate APIs, create a `.env` file in the root directory with the following content:

```bash
## Project setup
WIKIPEDIA_API_URL=https://en.wikipedia.org/api/rest_v1/feed
LIBRETRANSLATE_API_URL=https://libretranslate.com/translate
LIBRETRANSLATE_SUPPORTED_LANGUAGES=en,es,fr,de,it
```

## Compile and run the project

```
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Run tests

```bash
# unit tests
$ npm run test

#testCoverage
$ npm run test:cov
```
## PENDING

## Stay in touch

- Author - [Juan R. Ovalle](https://x.com/JuanRovalle)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).



## Future Enhancements
- **Infinite Scrolling**: Load additional content automatically as the user scrolls.
- **Search Functionality**: Allow users to search for specific articles or topics.
- **Additional APIs**: Incorporate more Wikipedia APIs to include other types of content, such as media or quotes.
- **User Authentication and Profiles**
   - **OAuth Integration**: Allow users to sign in via Google, Facebook, or GitHub to personalize the experience.
   - **Personalized Feeds**: Users can save their preferred language and date ranges to automatically load personalized content.
   - **Bookmarking**: Users can bookmark specific articles or news items to view later.
  **HTTPS**
   - Enforce HTTPS connections to ensure data transmitted between the client and server is encrypted and secure.
- **Logging and Monitoring**
   - Log all critical activities, such as failed requests, API errors, and suspicious access patterns.
   - Implement monitoring tools to detect unusual traffic and potential security threats in real-time.
### **Authentication and Authorization (Future)**
   - **JWT (JSON Web Token)**: Implement token-based authentication for secure access to protected routes.