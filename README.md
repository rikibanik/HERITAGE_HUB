# API Documentation

## Admin Endpoints

### Register a New Admin
**POST** `/admin/register`

Registers a new admin.

#### Request Parameters
- **name** *(String)*: Name of the admin (minimum 5 characters).
- **email** *(String)*: Email of the admin (must be a valid email).
- **password** *(String)*: Password of the admin (minimum 5 characters).

#### Success Response
- **result** *(Object)*: The created admin object.

#### Error Response
- **errors** *(Object[])*: List of validation errors.

#### Example Request
```json
{
  "name": "Admin Name",
  "email": "admin@example.com",
  "password": "password123"
}
```

---

### Login an Admin
**POST** `/admin/login`

Logs in an admin.

#### Request Parameters
- **email** *(String)*: Email of the admin (must be a valid email).
- **password** *(String)*: Password of the admin (minimum 5 characters).

#### Success Response
- **token** *(String)*: JWT token for the authenticated admin.

#### Error Response
- **errors** *(Object[])*: List of validation errors.

#### Example Request
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

---

### Logout an Admin
**GET** `/admin/logout`

Logs out an admin.

#### Success Response
- **message** *(String)*: Success message.

#### Error Response
- **message** *(String)*: Error message.

---

## Venue Endpoints

### Add a New Venue
**POST** `/venue/add-entries`

Adds a new venue.

#### Request Parameters
- **name** *(String)*: Name of the venue (minimum 5 characters).
- **location** *(Object)*:
  - **address** *(String)*: Address of the venue (minimum 5 characters).
  - **city** *(String)*: City of the venue (minimum 3 characters).
  - **state** *(String)*: State of the venue (minimum 3 characters).
  - **pin** *(Number)*: Pin code of the venue (6 digits).
- **description** *(Object)*:
  - **line** *(String)*: Short description of the venue (minimum 5 characters).
  - **elaborated** *(String)*: Detailed description of the venue (minimum 5 characters).
- **fare** *(Object)*:
  - **indianAdult** *(Number)*: Fare for Indian adults.
  - **indianChild** *(Number)*: Fare for Indian children.
  - **foreignAdult** *(Number)*: Fare for foreign adults.
  - **foreignChild** *(Number)*: Fare for foreign children.
- **workingHours** *(Object)*:
  - **opening** *(Object)*:
    - **hour** *(Number)*: Opening hour (0-23).
    - **minute** *(Number)*: Opening minute (0-59).
  - **closing** *(Object)*:
    - **hour** *(Number)*: Closing hour (0-23).
    - **minute** *(Number)*: Closing minute (0-59).
- **workingDays** *(String[])*: Working days of the venue (array of days).
- **typeofVenue** *(String)*: Type of the venue (Museum, Monuments, Urban_Attraction).
- **imgLink** *(String)*: Image link of the venue (must be a valid URL).
- **phNo** *(String)*: Phone number of the venue (10 digits).
- **email** *(String)*: Email of the venue.

#### Success Response
- **result** *(Object)*: The created venue object.

#### Error Response
- **errors** *(Object[])*: List of validation errors.

#### Example Request
```json
{
  "name": "Heritage Museum",
  "location": {
    "address": "123 Heritage St",
    "city": "Heritage City",
    "state": "Heritage State",
    "pin": 123456
  },
  "description": {
    "line": "A short description",
    "elaborated": "A detailed description"
  },
  "fare": {
    "indianAdult": 100,
    "indianChild": 50,
    "foreignAdult": 200,
    "foreignChild": 100
  },
  "workingHours": {
    "opening": {
      "hour": 9,
      "minute": 0
    },
    "closing": {
      "hour": 18,
      "minute": 0
    }
  },
  "workingDays": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  "typeofVenue": "Museum",
  "imgLink": "http://example.com/image.jpg",
  "phNo": "1234567890",
  "email": "contact@heritagemuseum.com"
}
```

---

### Get All Venues
**GET** `/venue/get-entries`

Retrieves all venues.

#### Success Response
- **result** *(Object[])*: List of all venues.

#### Error Response
- **message** *(String)*: Error message.

